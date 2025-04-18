interface TipoPago{
    id: number;
    nombre: string;
}

export const lst_tipoPago: TipoPago[] = [
    { id: 1, nombre: "Pago Opcional" },
    { id: 2, nombre: "Pago requerida" },
];


export const PAGO_OPCIONAL = 1;
export const PAGO_REQUERIDA = 2;

