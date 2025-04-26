import React, { useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Question } from '../models/question.model';

interface QuestionResultProps {
    question: Question;
}

const QuestionResult: React.FC<QuestionResultProps> = ({ question }) => {
    // useEffect(() => {
    //     console.log(question);
    // }
    // , []);
        
    return (
        <Card style={{ marginBottom: '15px' }}>
            <CardContent>
                <Typography variant="h6">Question:</Typography>
                <Typography variant="body1" style={{ marginBottom: '10px' }}>
                    {question.question}
                </Typography>
                <Typography variant="h6">Your Answer:</Typography>
                <Typography variant="body1" style={{ marginBottom: '10px' }}>
                    {question.answer || 'No answer provided.'}
                </Typography>
                <Typography variant="h6">Feedback:</Typography>
                <Typography variant="body1" style={{ marginBottom: '10px' }}>
                    {question.feedback || 'No feedback provided.'}
                </Typography>
                <Typography variant="h6">Mark:</Typography>
                <Typography variant="body1">{question.mark}</Typography>
            </CardContent>
        </Card>

    );
};

export default QuestionResult;