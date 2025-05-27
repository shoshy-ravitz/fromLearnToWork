export interface Resume {
    id: string;
    fileName: string;
    filePath: string;
    UploadDate: Date; 
    userID: string;
}
export interface ResumeState {
    resume: Resume;
    loading: boolean;
    error: string | null;
}

