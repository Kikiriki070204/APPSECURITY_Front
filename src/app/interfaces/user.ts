export interface User {
    id: number
    username: string
    name:string
    email: string
    password: string
    access_token: string

}
export interface Register {
    username: string
    email: string
    password: string
}

export interface Login {
    email: string
    password: string
}

export interface UsuariosActivos {
    usuarios: User[]
}
