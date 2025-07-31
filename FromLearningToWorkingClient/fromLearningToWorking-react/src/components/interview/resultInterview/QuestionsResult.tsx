// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getQuestionsByInterviewId } from '../../../store/slices/interviewSlice';
// import { StoreType } from '../../../store/store';
// import { CircularProgress, Typography } from '@mui/material';
// import QuestionResult from './QuestionResult';

// interface QuestionsResultProps {
//     interviewId: number;
// }

// const QuestionsResult: React.FC<QuestionsResultProps> = ({ interviewId }) => {
//     const dispatch = useDispatch();
//     const { questions, status, error } = useSelector((state: StoreType) => state.interview);
    
//     // useEffect(() => {
//     //     if (interviewId) {
//     //         dispatch(getQuestionsByInterviewId(Number(interviewId))); // Fetch questions by interview ID
//     //     }
//     // }, []);

//     if (status === 'loading') {
//         return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
//     }

//     if (status === 'failed') {
//         return (
//             <Typography variant="h6" color="error" style={{ textAlign: 'center', marginTop: '20px' }}>
//                 {error}
//             </Typography>
//         );
//     }

//     // if (!questions || questions.length === 0) {
//     //     return (
//     //         <Typography variant="h6" style={{ textAlign: 'center', marginTop: '20px' }}>
//     //             No questions found for this interview.
//     //         </Typography>
//     //     );
//     // }
//     const handleFetchQuestions = () => {
//         dispatch(getQuestionsByInterviewId(Number(interviewId))); // Fetch questions by interview ID
//     };

//     return (
//         <>
//         <button onClick={()=>handleFetchQuestions()}>fetch questions</button>
//         <div style={{ maxWidth: '800px', margin: '20px auto' }}>
//             <Typography variant="h4" gutterBottom>
//                 Questions Result
//             </Typography>
//             {questions.map((question) => (
//                 <QuestionResult key={question.id} question={question} />
//             ))}
//         </div>
//         </>
        
//     );
// };

// export default QuestionsResult;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionsByInterviewId } from '../../../store/slices/interviewSlice';
import { StoreType } from '../../../store/store';
import { 
    CircularProgress, 
    Typography, 
    Box, 
    Container,
    Paper,
    Button,
    Alert,
    Stack,
    Fade
} from '@mui/material';
import {
    QuestionAnswer as QuestionIcon,
    Refresh as RefreshIcon
} from '@mui/icons-material';
import QuestionResult from './QuestionResult';

interface QuestionsResultProps {
    interviewId: number;
}

const QuestionsResult: React.FC<QuestionsResultProps> = ({ interviewId }) => {
    const dispatch = useDispatch();
    const { questions, status, error } = useSelector((state: StoreType) => state.interview);
    
    // useEffect(() => {
    //     if (interviewId) {
    //         dispatch(getQuestionsByInterviewId(Number(interviewId)));
    //     }
    // }, [dispatch, interviewId]);

    const handleFetchQuestions = () => {
        dispatch(getQuestionsByInterviewId(Number(interviewId)));
    };

    if (status === 'loading') {
        return (
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8
            }}>
                <CircularProgress 
                    size={60} 
                    sx={{ color: 'rgb(255, 204, 0)', mb: 3 }} 
                />
                <Typography variant="h6" sx={{ 
                    color: '#666',
                    textAlign: 'center'
                }}>
                    Loading detailed question analysis...
                </Typography>
            </Box>
        );
    }

    if (status === 'failed') {
        return (
            <Paper elevation={0} sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 4,
                border: '1px solid #f44336',
                background: 'rgba(244, 67, 54, 0.05)'
            }}>
                <Alert 
                    severity="error" 
                    sx={{ 
                        mb: 3,
                        borderRadius: 3,
                        backgroundColor: 'transparent',
                        border: 'none'
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        Unable to Load Question Details
                    </Typography>
                    <Typography variant="body2">
                        {error || 'There was an issue loading the detailed question analysis.'}
                    </Typography>
                </Alert>
                
                <Button
                    onClick={handleFetchQuestions}
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    sx={{
                        borderColor: '#f44336',
                        color: '#f44336',
                        '&:hover': {
                            borderColor: '#d32f2f',
                            backgroundColor: 'rgba(244, 67, 54, 0.08)'
                        }
                    }}
                >
                    Try Again
                </Button>
            </Paper>
        );
    }

    if (!questions || questions.length === 0) {
        return (
            <Paper elevation={0} sx={{
                p: 6,
                textAlign: 'center',
                borderRadius: 4,
                border: '1px solid #f0f0f0',
                background: '#ffffff'
            }}>
                <Box sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'rgba(255, 204, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3
                }}>
                    <QuestionIcon sx={{ fontSize: 40, color: 'rgb(255, 204, 0)' }} />
                </Box>
                
                <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    color: '#1a1a1a',
                    mb: 2
                }}>
                    No Questions Available
                </Typography>
                
                <Typography variant="body1" sx={{ 
                    color: '#666',
                    mb: 3,
                    maxWidth: 400,
                    mx: 'auto'
                }}>
                    We couldn't find any questions for this interview. 
                    This might be because the interview is still being processed.
                </Typography>
                
                <Button
                    onClick={handleFetchQuestions}
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    sx={{
                        bgcolor: 'rgb(255, 204, 0)',
                        color: '#1a1a1a',
                        fontWeight: 600,
                        '&:hover': {
                            bgcolor: '#f0b800'
                        }
                    }}
                >
                    Refresh Questions
                </Button>
            </Paper>
        );
    }

    return (
        <Box>
            {/* Section Header */}
            <Fade in={true} timeout={600}>
                <Box sx={{ mb: 4 }}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                        <Box sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            background: 'rgba(255, 204, 0, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <QuestionIcon sx={{ color: 'rgb(255, 204, 0)', fontSize: 24 }} />
                        </Box>
                        
                        <Box>
                            <Typography variant="h4" sx={{ 
                                fontWeight: 600,
                                color: '#1a1a1a'
                            }}>
                                Question-by-Question Analysis
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                color: '#666'
                            }}>
                                Detailed breakdown of each question with AI feedback
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Fade>

            {/* Questions List */}
            <Box>
                {questions.map((question, index) => (
                    <Fade 
                        key={question.id} 
                        in={true} 
                        timeout={800 + index * 200}
                    >
                        <Box>
                            <QuestionResult 
                                question={question} 
                                index={index + 1}
                            />
                        </Box>
                    </Fade>
                ))}
            </Box>

            {/* Summary Footer */}
            <Fade in={true} timeout={1200}>
                <Paper elevation={0} sx={{
                    p: 4,
                    mt: 4,
                    textAlign: 'center',
                    borderRadius: 4,
                    border: '1px solid #f0f0f0',
                    background: 'rgba(255, 204, 0, 0.05)'
                }}>
                    <Typography variant="h6" sx={{ 
                        fontWeight: 600,
                        color: '#1a1a1a',
                        mb: 1
                    }}>
                        Analysis Complete
                    </Typography>
                    
                    <Typography variant="body1" sx={{ 
                        color: '#666'
                    }}>
                        You've reviewed all {questions.length} questions from this interview.
                        Use this feedback to improve your future interview performance!
                    </Typography>
                </Paper>
            </Fade>
        </Box>
    );
};

export default QuestionsResult;
