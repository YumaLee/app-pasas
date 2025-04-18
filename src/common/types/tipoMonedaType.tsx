interface TipoMoneda {
    id: number;
    codigo: string;
    simbolo: string;
    nombre: string;
}

export const lst_tipoMoneda: TipoMoneda[] = [
    { id: 1, codigo: "PEN", simbolo: "S/", nombre: "SOLES" },
    { id: 2, codigo: "USD", simbolo: "$", nombre: "DOLARES" },
    { id: 3, codigo: "EUR", simbolo: "€", nombre: "EUROS" }
];


export const SOLES = 1;
export const DOLARES = 2;
export const EUROS = 3;

