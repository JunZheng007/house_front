export interface User {
    id: number | null,
    username: string,
    password: string | null,
    email: string,
    phone: string,
    type: string,
    photo: string
}