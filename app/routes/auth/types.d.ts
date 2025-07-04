export interface LoginFields {
    email: string
    password: string
    remember: boolean
}

export interface RegisterFields {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export interface ForgotPasswordFields {
    email: string
}

export interface ResetPasswordFields {
    token: string
    email: string
    password: string
    password_confirmation: string
}

export interface LoginResponse {
    two_factor: boolean
}

export interface MessageResponse {
    message: string
}