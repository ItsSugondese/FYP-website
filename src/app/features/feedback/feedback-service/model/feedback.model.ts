export interface Feedback {
    id: number;
    feedbacks: string;
    feedbackStatus: string;
    isAnonymous: boolean;
    username: string;
    userProfileUrl: string | null; 
    date: string// Assuming userProfileUrl can be nullable
}

