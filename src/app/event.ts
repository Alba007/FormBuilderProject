export interface Event {
    type: string;
    payload?: any;
}

export interface NewForm {
    id: string,
    name: string,
    description: string
}

export interface editForm {
    id: string,
    name: string,
    description: string,
    json: JSON
}

