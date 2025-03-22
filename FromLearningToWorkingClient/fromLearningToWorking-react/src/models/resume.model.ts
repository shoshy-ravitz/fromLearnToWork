export interface Resume {
    id: string;
    fileName: string;
    filePath: string;
    UploadDate: Date; 
    userID: string;
}
export interface ResumeState {
    resumes: Resume[];
    loading: boolean;
    error: string | null;
}

