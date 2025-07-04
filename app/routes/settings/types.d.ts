export interface ProfileFields {
    name: string
    email: string
}

export interface DeleteUserFields {
    password: string
}

export interface UpdatePasswordFields {
    current_password: string
    password: string
    password_confirmation: string
}