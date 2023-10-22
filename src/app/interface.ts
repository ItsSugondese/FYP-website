export interface role {
    role: string
}

export interface jwtResponse {
    jwtToken: string,
    role: string[],
    username : string
}

export interface loginFormHeader{
    status : string,
    color : string
}