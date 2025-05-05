import axios from 'axios';

const sendEmail = async (email: string, subject: string, message: string): Promise<void> => {
    try {
        await axios.post('http://localhost:5000/api/email/send-email', {
            email,
            subject,
            message,
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
export default sendEmail;