import { useState, ChangeEvent, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info } from 'lucide-react';
import { lst_tipoMoneda } from '@/common/types/tipoMonedaType';
import { lst_tipoPago } from '@/common/types/tipoPagoType';

import { usePaymentStore } from "@/store/settingPayment";
import toast, { Toaster } from 'react-hot-toast';



interface Payment {
    requireAmount: string;
    currency: string;
    amount: number;
    methodPay: number;
    codigo: string;
}

const ChipIn = () => {
    const { payment, settingPayment } = usePaymentStore((state) => state);


    const [requireAmount, setRequireAmount] = useState<string>("1");
    const [currency, setCurrency] = useState('1');
    const [amount, setAmount] = useState<string>('');
    const [paypalUsername, setPaypalUsername] = useState('');


    useEffect(() => {
        if (payment) {
            setRequireAmount(payment.requireAmount ? payment.requireAmount.toString() : "1");
            setCurrency(payment.currency ? payment.currency.toString() : '1');
            setAmount(payment.amount ? payment.amount.toString() : '0');
        }
    }, [payment]);



    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const regex = /^[0-9]*(\.[0-9]*)?$/;
        if (inputValue !== "") {
            if (regex.test(inputValue)) {
                setAmount(inputValue);
            } else {
                setAmount('')
            }
        } else {
            setAmount('')
        }
    };

    const handleGuardar = () => {

        if (parseFloat(amount) > 0) {

            var _codigo = lst_tipoMoneda.filter(e => e.id == parseInt(requireAmount))
            const defaultPayment: Payment = {
                requireAmount: requireAmount,
                currency: currency,
                amount: parseFloat(amount),
                methodPay: 1,
                codigo: _codigo[0].codigo
            };

            settingPayment(defaultPayment);


            toast.success('Successfully!', {
                icon: '👏',
            })
        } else {
            toast.error('ingrese el monto!', {
                icon: '👏',
            })
        }



        // Opcional: Limpiar el input después de guardar

    };

    const handleSelect = (e: any) => {

        if (e === "1") {
            const defaultPayment: Payment = {
                requireAmount: "1",
                currency: "1",
                amount: 0,
                methodPay: 1,
                codigo:'USD'
            };

            settingPayment(defaultPayment);
        }
        setRequireAmount(e);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold flex items-center gap-1">
                    Costo <Info className="w-4 h-4 text-muted-foreground" />
                </h2>
                <p className="text-sm text-muted-foreground">
                    Solicitar dinero a los invitados. Se les pedirá que paguen al confirmar su asistencia.
                </p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    No compatible con la aprobación de invitados ni con Buscar un horario
                </p>
            </div>

            <div className="border rounded-md p-4 space-y-4 bg-muted/30">
                <div className="flex justify-between items-center">
                    <span className="font-medium">Costo</span>
                    <Select value={requireAmount} onValueChange={handleSelect}>
                        <SelectTrigger className="w-50">
                            <SelectValue placeholder="Required amount" />
                        </SelectTrigger>
                        <SelectContent>
                            {lst_tipoPago.map((moneda) => (
                                <SelectItem key={moneda.id} value={moneda.id.toString()}>
                                    {moneda.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {requireAmount == "2" ?
                <>
                    <div>
                        <h3 className="font-medium text-sm mb-2">Costo por persona</h3>
                        <div className="flex gap-2">
                            <Select value={currency} onValueChange={setCurrency}>
                                <SelectTrigger className="w-50">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {lst_tipoMoneda.map((moneda) => (
                                        <SelectItem key={moneda.id} value={moneda.id.toString()}>
                                            {moneda.codigo} {moneda.simbolo} - {moneda.nombre}
                                        </SelectItem>
                                    ))}

                                </SelectContent>
                            </Select>
                            <Input
                                placeholder="Precio"
                                value={amount}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium text-sm mb-2">Métodos de pago</h3>
                        <label className="text-sm">PayPal</label>
                        <Input
                            placeholder="@ username"
                            value={paypalUsername}
                            onChange={(e) => setPaypalUsername(e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <p className="text-xs text-muted-foreground">
                        Tenga en cuenta: no podemos verificar las transacciones monetarias,
                        pero se les solicitará a los invitados que paguen cuando confirmen su asistencia y deberán confirmar que lo han hecho.
                    </p>
                    <Button className="w-full mt-2" onClick={handleGuardar}>Guardar</Button>
                </>

                : null
            }


            <Toaster
                position="top-center"
                reverseOrder={false}
            />


        </div>
    );
};

export default ChipIn;
