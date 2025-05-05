import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInterviews } from '../../../store/slices/userInterviewsSlice';
import { StoreType } from '../../../store/store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography, CircularProgress } from '@mui/material';

const InterviewFeedback: React.FC = () => {
    const userId = localStorage.getItem('userId'); // Get the user ID from localStorage
    const dispatch = useDispatch();
    const { interviews, status, error } = useSelector((state: StoreType) => state.userInterviews);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserInterviews(Number(userId))); // Fetch user interviews
        }
    }, [dispatch, userId]);

    // Add a running index to each interview
    const interviewsWithIndex = interviews.map((interview, index) => ({
        ...interview,
        index: index + 1, // Add a running index starting from 1
    }));

    // Calculate average mark
    const averageMark = interviews.length
        ? Math.round(
              interviews.reduce((sum, interview) => sum + interview.mark, 0) / interviews.length
          )
        : 0;

    // Generate feedback based on average mark
    const getFeedback = () => {
        if (averageMark >= 80) return 'מצוין! אתה מוכן לראיון עבודה.';
        if (averageMark >= 60) return 'טוב, אך יש מקום לשיפור.';
        return 'יש צורך בשיפור נוסף כדי להיות מוכן לראיון.';
    };

    if (status === 'loading') {
        return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
    }

    if (status === 'failed') {
        return (
            <Typography variant="h6" color="error" style={{ textAlign: 'center', marginTop: '20px' }}>
                {error}
            </Typography>
        );
    }

    return (
        <Box sx={{ maxWidth: '800px', margin: '20px auto', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                משוב כללי
            </Typography>
            <Typography variant="h6" gutterBottom>
                הציון הממוצע שלך: {averageMark}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {getFeedback()}
            </Typography>

            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h5" gutterBottom>
                    גרף הציונים מהראיונות הקודמים
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={interviewsWithIndex} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="index" // Use the running index for the X-axis
                            label={{ value: 'מספר ראיון', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis label={{ value: 'ציון', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="mark" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default InterviewFeedback;