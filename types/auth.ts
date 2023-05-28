export interface CREDENTIALS {
    email: string;
    password: string;
}

export interface USER {
    id: number;
    first_name: string
    other_names: string
    phone_number: string
    employee_id: string
    role: "superadmin" | "admin"
    email: string
    motel_id: number;
    email_verified_at: null | string
    created_at: string
    updated_at: string
    default_password: number;
    active: number;
}

export interface POST_RESPONSE {
    success: boolean;
    data: string | {} | string[];
}



