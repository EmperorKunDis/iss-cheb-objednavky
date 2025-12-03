export type FieldOfStudy =
    | 'Instalatér'
    | 'Automechanik'
    | 'Truhlář'
    | 'Elektromechanik'
    | 'Řezník'
    | 'Cukrář'
    | 'Výrobce lahůdek';

export const FIELDS_OF_STUDY: FieldOfStudy[] = [
    'Instalatér',
    'Automechanik',
    'Truhlář',
    'Elektromechanik',
    'Řezník',
    'Cukrář',
    'Výrobce lahůdek'
];

export interface Order {
    id: string;
    customerName: string;
    email: string;
    phone: string;
    field: FieldOfStudy;
    description: string;
    status: 'pending' | 'accepted' | 'completed' | 'rejected';
    createdAt: Date;
}
