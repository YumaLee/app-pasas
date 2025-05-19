
import { useEffect, useRef, useState } from "react";
import { DownloadCloud, Ticket } from "lucide-react";
import { Button } from '../ui/button';
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'react-hot-toast';
import ticketService from "@/shared/services/TicketService";
import { useAuthStore } from "@/store/authStore";

interface ActionProps {
  dataItem: any;
  open: boolean;
  onClose: () => void;

}

export default function ItemTickets({
  dataItem,
  open,
  onClose
}: ActionProps) {

  const [isLoading, setIsLoading] = useState(false);
  const _storeProfile = useAuthStore((state) => state);

  const [item, setItem] = useState<any[]>([]);
  const hasFetched = useRef(false);


  const handlePayment = async (emoji: any) => {
    setIsLoading(true);
    const response = await ticketService.getFilePdf(dataItem.codigo, emoji.idInvitado, emoji.invitado)
    if (response.status === 200) {
      setIsLoading(false);

      if (response !== undefined) {
        var file = window.URL.createObjectURL(response.data);
        var win = window.open(file, '_blank');
        //win.focus();
      }

    } else {
      toast.error('no se pudo descagar el archivo!');
    }
    setIsLoading(false);

  };



  const fetchData = async () => {
    try {

      if (!dataItem.codigo || hasFetched.current) return;
      hasFetched.current = true;
      setIsLoading(true);

      var eventoData = await ticketService.getListTicket(dataItem.codigo, _storeProfile.profile?.id!);

      if (eventoData.status === 200) {

        setItem(eventoData.data);
        setIsLoading(false);
        toast.success('Successfully!')
      }

    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [dataItem.codigo]);


  return (

    <Dialog open={open} onOpenChange={onClose} >
      <DialogTitle>.</DialogTitle>
      <DialogContent >
        <div className="flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white p-2">

          <h2 className="text-2xl font-semibold mt-1 mb-6">Lista de Entradas</h2>


          {item.map((emoji, index) => (

            <div key={index}
              className="bg-gray-100 border border-gray-200 mt-3 rounded-xl px-3 py-3 w-full max-w-sm flex items-center justify-between shadow-sm">
              <div
                className="flex items-center space-x-2">
                <div className="bg-red-100 p-3 rounded-xl">
                  <Ticket className="text-red-500" />
                </div>
                <h2 className="text-1xl font-semibold mt-1 mb-1">{emoji.nombre}</h2>
              </div>
              <Button
                className="text-white/70 hover:text-white hover:bg-white/10 gap-2"
                variant={'primary'}
                onClick={() => handlePayment(emoji)}
              >
                <DownloadCloud className="text-red-500 pr-1" />
                {
                  isLoading ? <><Loader2 className="h-4 w-4 animate-spin" />Cargando</> : ' Descargar'
                }
              </Button>
            </div>
          ))}

        </div>
      </DialogContent>
    </Dialog>
  );
};

