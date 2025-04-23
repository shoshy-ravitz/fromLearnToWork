import { Question } from "./question.model";

export interface InterviewState {
    IdInterview?:number,
    questions: Question[],
    currentQuestionIndex: number,
    mark: number,
    feedback: string | null,
    summary: '',
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null,
    timeInterview: number
    result: {topic:string,score:number}[]
}
