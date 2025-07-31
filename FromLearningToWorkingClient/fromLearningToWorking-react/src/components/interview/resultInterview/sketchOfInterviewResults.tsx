import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTotalResultsByInterviewId } from '../../../store/slices/totalResultSlice';
import { StoreType } from '../../../store/store';
import { CircularProgress, Typography } from '@mui/material';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SketchOfInterviewResultsProps {
    interviewId: number;
}

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const getPath = (x: number, y: number, width: number, height: number) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
};

const CustomBarShape = (props: any) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const SketchOfInterviewResults: React.FC<SketchOfInterviewResultsProps> = ({ interviewId }) => {
    const dispatch = useDispatch();
    const { results, loading, error } = useSelector((state: StoreType) => state.totalResult);

    useEffect(() => {
        if (interviewId) {
            dispatch(fetchTotalResultsByInterviewId(interviewId)); // Fetch total results by interview ID
        }
    }, [interviewId, dispatch]);

    if (loading) {
        return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
    }

    if (error) {
        return (
            <Typography variant="h6" color="error" style={{ textAlign: 'center', marginTop: '20px' }}>
                {error}
            </Typography>
        );
    }

    if (!results || results.length === 0) {
        return (
            <Typography variant="h6" style={{ textAlign: 'center', marginTop: '20px' }}>
                No results found for this interview.
            </Typography>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto', textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
                Total Results Overview
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={results}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="topic" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" shape={<CustomBarShape />} label={{ position: 'top' }}>
                        {results.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SketchOfInterviewResults;
