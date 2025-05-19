import { useDispatch } from 'react-redux';
import { useNotification } from '../context/NotificationContext';

const useAsyncDispatch = () => {
    const dispatch = useDispatch();
    const { showNotification } = useNotification();

    const asyncDispatch = async (
        action: any,
        successMessage: string,
        defaultErrorMessage?: string
    ) => {
        try {
            const resultAction = await dispatch(action);

            if (resultAction?.type?.endsWith('/fulfilled')) {
                showNotification(successMessage, 'success');
                return resultAction.payload;
            } else if (resultAction?.type?.endsWith('/rejected')) {
                const error = extractErrorMessage(resultAction.payload, defaultErrorMessage);
                showNotification(error, 'error');
                throw new Error(error);
            } else {
                throw new Error('Unexpected action type');
            }
        } catch (error: any) {
            const errorMsg = error.message || 'An unexpected error occurred.';
            showNotification(errorMsg, 'error');
        }
    };

    const extractErrorMessage = (error: any, defaultErrorMessage?: string): string => {
        if (!error) {
            return defaultErrorMessage || 'An unexpected error occurred.';
        }

        if (typeof error === 'string') {
            return error;
        }

        if (error.message) {
            return error.message;
        }

        if (error.response?.data) {
            return typeof error.response.data === 'string'
                ? error.response.data
                : JSON.stringify(error.response.data);
        }

        return defaultErrorMessage || 'An unexpected error occurred.';
    };

    return { asyncDispatch };
};

export default useAsyncDispatch;