export interface InterviewResult {
    id: number;
    topic: string;
    score: number;
    interviewId: number;
    feedback?: string;
    date: Date;
}