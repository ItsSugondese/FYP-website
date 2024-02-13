export interface FeedbackStatus {
    label: string;
    style: string;
}

export interface FeedbackStatistics {
    positivePercentage: number;
    negativePercentage: number;
    neutralPercentage: number;
    totalFeedback: number;
    positiveCount: number;
    negativeCount: number;
    neutralCount: number;
    sentiment: string;
}
