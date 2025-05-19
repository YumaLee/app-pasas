import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { EventForm } from "@/components/EventForm";
import { EventSettings } from "@/components/EventSettings";
import { ActionButtons } from "@/components/ActionButtons";
import { useParams, useNavigate } from "react-router-dom";
import LoadingOverlay from "@/components/ui/loadingOverlay";
import { HeaderHome } from "@/components/header/HeaderHome";
import Drawer from "@/components/drawer/Drawer";
import FloatingPetals from "@/components/animations/FloatingPetals";
import eventoService from "@/shared/services/EventoService";
import { usePaymentStore } from "@/store/settingPayment";



interface Payment {
  requireAmount: string;
  currency: string;
  amount: number;
  methodPay: number;
  codigo: string;
}
export function TemplateNewPage() {

  const [showSettings, setShowSettings] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [itemEvent, setItemEvent] = useState<any>({});

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { settingPayment } = usePaymentStore((state) => state);

  const { codigo } = useParams();
  const hasFetched = useRef(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (!codigo || hasFetched.current) return;
      hasFetched.current = true;
      var response = await eventoService.getByCode(codigo);
      if (response.status === 200) {

        response.data.isEdit = true;
        response.data.codigo = codigo;
        setItemEvent(response.data);

        if (response.data.precio > 0) {
          const defaultPayment: Payment = {
            requireAmount: "2",
            currency: "1",
            amount: parseFloat(response.data.precio),
            methodPay: 1,
            codigo: response.data.moneda
          };
          settingPayment(defaultPayment);
        }
      } else {

        //dialog.warning(<ul>{response.data.messages.map(item => (<li>{item}</li>))}</ul>);
        console.error("Error al obtener los datos:");
      }

    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };



  useEffect(() => {
    if (typeof codigo !== "string" || codigo.trim() === "") return;
    fetchData();
  }, [codigo]);



  return (
    <div className="min-h-screen bg-gradient-to-b from-[#310f7a] to-[#821c8d] relative overflow-hidden">
      {/* Fixed Header */}
      <FloatingPetals />

      <div
        className="top-0 left-0 right-0 z-50 bg-[#000]/80 backdrop-blur-sm border-b border-white/10 transition-transform duration-300"
      >
        {/* Fixed Header */}
        <div
          className="top-0 left-0 right-0 z-50 bg-gradient-to-br from-blue-900 via-purple-900 transition-transform duration-300"
        >
          <LoadingOverlay isLoading={isLoading} />
          <HeaderHome
            isCreate={false}
            checkedMotion={false}
            onReduceMotion={() => console.log('first')}
            onEdit={() => console.log('first')}
          />
        </div>

      </div>

      {/* Right Side Fixed Buttons - Desktop Only */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col">
        <div className="w-[100px] bg-[#100229] py-6 flex flex-col items-center gap-8">
          <ActionButtons
            onSettingsClick={() => setShowDrawer(true)}
            onPreviewClick={() => navigate('/preview')}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-10 pb-32 md:pb-12 px-4">
        <div className="max-w-[1200px] mx-auto">
          <EventForm
            onSettingsClick={() => setShowDrawer(true)}
            eventData={itemEvent}
          />
        </div>
      </main>

      <EventSettings
        open={showSettings}
        onOpenChange={setShowSettings}
      />

      {/* Drawer */}
      <Drawer
        isOpen={showDrawer}
        onClose={() => setShowDrawer(!showDrawer)}
      />


      {/* Mobile Footer Menu */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-[#7226ff] border-t border-white/10">
          <div className="grid grid-cols-4 gap-1 p-2">
            <ActionButtons
              onSettingsClick={() => setShowSettings(true)}
              onPreviewClick={() => navigate('/preview')}
            />
          </div>
          <Button className="w-full bg-gradient-to-r from-[#7226ff] to-[#f042ff] hover:from-[#5e1fdc] hover:to-[#d936d3] text-white py-4 text-lg font-medium rounded-none">
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
}