export interface ForgotPassword{
    userEmail: string;
}

export interface ValidateToken{
    resetToken: string;
}

export interface ChangePassword{
    resetToken: string;
    password: string
}