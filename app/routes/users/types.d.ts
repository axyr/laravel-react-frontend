export interface User {
    id: number;
    name: string;
    email: string;
    password?: string | null;
    password_confirmation?: string | null;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;

    [key: string]: unknown;
}
