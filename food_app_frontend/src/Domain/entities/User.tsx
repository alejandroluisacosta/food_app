export interface User {
    id?:              string;
    name:            string;
    lastName:        string;
    email:           string;
    phone:           string;
    password:        string;
    confirmPassword: string;
    session_token?: string;
}