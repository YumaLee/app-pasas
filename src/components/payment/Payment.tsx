
import { useState } from "react";
import { DollarSign, Ticket } from "lucide-react";
import { Button } from '../ui/button';
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'react-hot-toast';
import eventoService from "@/shared/services/EventoService";
import { useAuthStore } from "@/store/authStore";

interface ActionProps {
  dataItem: any;
  open: boolean;
  onClose: () => void;

}

export default function EventPayment({
  dataItem,
  open,
  onClose
}: ActionProps) {

  const [isLoading, setIsLoading] = useState(false);
  const _storeProfile = useAuthStore((state) => state);

  const handlePayment = async () => {
    setIsLoading(true);
    const response = await eventoService.payment({ idUsuario: _storeProfile.profile?.id, codigo: dataItem.codigo })
    if (response.status === 200) {
      const { sessionId, status, typeAssistance } = response.data;
      setIsLoading(false);

      if (status) {
        toast.success('Pago ya fue realizado!');
      } else {
        if (typeAssistance == 3) {
          toast.error('No se puede realizar el pago tu confirmacion de asitencia es "No Puedo Ir"!');
          return;
        }
        window.open(sessionId, '_blank');
      }
    } else {
      toast.error('response error payment!');
    }
    setIsLoading(false);

  };


  return (



    <Dialog open={open} onOpenChange={onClose} >
      <DialogTitle></DialogTitle>
      <DialogContent >
        <div className="flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white p-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-green-100 p-3 rounded-xl">
              <DollarSign className="text-green-600" />
            </div>
            <div className="bg-red-100 p-3 rounded-xl">
              <Ticket className="text-red-500" />
            </div>
          </div>

          <p className="text-gray-600">{dataItem.titulo} </p>
          <h2 className="text-2xl font-semibold mt-1 mb-6">{dataItem.precio} {dataItem.moneda} por persona</h2>

          <div className="bg-gray-100 border border-gray-200 rounded-xl px-3 py-3 w-full max-w-sm flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-2">
              <img
                src="https://cdn.brandfolder.io/KGT2DTA4/at/8vbr8k4mr5xjwk4hxq4t9vs/Stripe_wordmark_-_blurple.svg"
                alt="PayPal"
                className="w-15 h-10"
              />
            </div>
            <Button
              className=" text-white px-4 py-1.5 rounded-full text-sm font-semibold"
              onClick={handlePayment}
            >
              {
                isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Cargando</> : 'Pagar'
              }
            </Button>
          </div>

          <Button className="mt-6 text-sm font-medium bg-green-600"
            onClick={onClose}>
            Ya he pagado
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

