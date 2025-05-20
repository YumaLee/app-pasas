import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Crown, Globe, Clock, VolumeX, Trash2, ImageDown } from "lucide-react";
import { AvatarImage, Avatar } from "@/components/ui/avatar";


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LoadingOverlay from "@/components/ui/loadingOverlay";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ViewUser } from "@/components/usuario/ViewUser";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import userService from "@/shared/services/UserService";
import eventoService from "@/shared/services/EventoService";

import { useAuthStore } from "@/store/authStore";
import { HeaderHome } from "@/components/header/HeaderHome";
import DialogDefault from "@/components/ui/dialog-confirm";
import { usePaymentStore } from "@/store/settingPayment";
import { usePrivacyStore } from "@/store/privaceStore";


interface Evento {
  eventoID: number;
  titulo: string;
  foto: string;
  codigo: string;
  fechaStart: string;
  fechaEnd: string;
  organizador: string;
  avatar: string;
}

const tabs = [
  { id: 1, name: "Proxima", count: 1, icon: Clock },
  { id: 2, name: "Hospedaje", count: 0, icon: Crown },
  { id: 3, name: "Invitacion", count: 0, icon: Globe },
  { id: 4, name: "Asistio", count: 0, icon: Clock }
];


export function EventoPage() {
  const [activeTab, setActiveTab] = useState("Proxima");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [listaEvent, setIsListEvent] = useState<Evento[]>([]);

  const [selectedCodigo, setSelectedCodigo] = useState<string | null>(null);

  const setProfileName = useAuthStore((state) => state.setProfileName);

  const _profile = useAuthStore((state) => state.profile);
  const { resetPayment } = usePaymentStore((state) => state);
  const { resetPrivacy } = usePrivacyStore((state) => state);
  const hasFetched = useRef(false);

  const navigate = useNavigate();



  useEffect(() => {
    fetchData();
    resetPayment();
    resetPrivacy();
  }, [_profile]); // Se ejecuta cuando perfil cambia


  const handleSave = async (data: any) => {
    setIsLoading(true)
    var response = await userService.updateAuth(data);

    if (response.status === 200) {
      setProfileName(data.nombre)
      setShowProfile(false);

    }
    setIsLoading(false)
  }

  const handleEdit = async () => {
    setShowProfile(true);
  }


  const fetchData = async () => {
    try {
      if (!_profile || hasFetched.current) return;
      hasFetched.current = true; // Marca que ya se hizo la petición
      setIsLoading(true);
      var response = await eventoService.listarPorAnfitrion(_profile.telefono!);
      if (response.status === 200) {
        const data = response.data;
        setIsListEvent(data)
      }
      if (response.status === 400) {
        //dialog.warning(<ul>{response.data.messages.map(item => (<li>{item}</li>))}</ul>);
        return;
      }
      setIsLoading(false);

    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };


  const openDeleteModal = (codigo: string) => {
    setSelectedCodigo(codigo);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    if (!selectedCodigo) return;
    var response = await eventoService.eliminar({ codigo: selectedCodigo });
    if (response.status === 200) {
      setIsListEvent((prev) => prev.filter((c) => c.codigo !== selectedCodigo));
      setIsModalOpen(false);

    }

    setIsLoading(false);
  }

  const handlePreview = async (codigo: string) => {
    navigate(`/e/${codigo}`)
  }

  const renderTabContent = () => {

    return (
      <div className="mb-12 md:mb-16">
        {activeTab === "Hospedaje" ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {listaEvent.map((card, index) => (
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/4 lg:basis-1/5">
                  <div className="group relative aspect-square bg-neutral-900 rounded-xl overflow-hidden">

                    {card.foto ?
                      <img
                        src={card.foto}
                        alt={card.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      /> :
                      <ImageDown
                        className="w-full h-full object-cover   bg-neutral-300 group-hover:scale-105 transition-transform duration-300"
                      />

                    }

                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60">
                      <div className="absolute top-4 right-4">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-white/70 hover:text-white hover:bg-white/20"
                            >
                              <MoreHorizontal className="w-5 h-5" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-48 p-0 bg-[#1A0505] border-neutral-800"
                            side="left"
                            align="start"
                          >
                            <div className="py-2">
                              <button
                                className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 text-white/70 hover:bg-white/10 hover:text-white"
                                onClick={() => console.log('Mute event:', card.titulo)}
                              >
                                <VolumeX className="w-4 h-4" />
                                Mute event
                              </button>
                              <button
                                className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 text-red-400 hover:bg-white/10 hover:text-red-300"
                                onClick={() => openDeleteModal(card.codigo)}
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete event
                              </button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 backdrop-blur-sm rounded-md text-white text-sm bg-neutral-500/20"
                        >
                          <span className="text-sm text-white/70">Organizado Por</span>

                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4"
                        onClick={() => handlePreview(card.codigo)}
                      >
                        <h3 className="text-lg font-bold text-white mb-2">{card.titulo}</h3>
                        <div className="flex items-center gap-2">
                          {card.avatar ? (
                            <Avatar>
                              <AvatarImage className="Avatar Image" src={card.avatar} alt={card.organizador} />
                            </Avatar>
                          ) : (
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl">
                              😶
                            </div>
                          )}
                          <span className="text-sm text-white/70">{card.organizador}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}

              {/* New Event Card - Only show in Hosting tab */}
              {activeTab === "Hospedaje" && (
                <CarouselItem className="pl-4 basis-full sm:basis-1/4 lg:basis-1/5">
                  <div
                    className="aspect-square rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center cursor-pointer hover:border-white/20 transition-colors group"
                    onClick={() => navigate('/templates/new')}
                  >
                    <div className="text-center">
                      <span className="text-3xl mb-2 block text-white/50 group-hover:text-white/70">+</span>
                      <span className="text-sm text-white/50 group-hover:text-white/70">Nuevo Evento</span>
                    </div>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            {listaEvent.length > 1 && (
              <>
                <CarouselPrevious className="hidden md:flex -left-12 text-white border-white/20 hover:bg-white/10 hover:text-white" />
                <CarouselNext className="hidden md:flex -right-12 text-white border-white/20 hover:bg-white/10 hover:text-white" />
              </>
            )}
          </Carousel>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
              {activeTab === "Hospedaje" ? <Crown className="w-8 h-8 text-white/50" /> :
                activeTab === "Invitacion" ? <Globe className="w-8 h-8 text-white/50" /> :
                  <Clock className="w-8 h-8 text-white/50" />}
            </div>
            <h3 className="text-xl text-white font-medium mb-2">
              No {activeTab.toLowerCase()} events  sssss
            </h3>
            <p className="text-white/70 max-w-sm">
              {activeTab === "Hospedaje" ? "Create an event to get started!" :
                activeTab === "Invitacion" ? "No open invites available right now" :
                  "You don't have any events in this category"}
            </p>
            {activeTab === "Hospedaje" && (
              <Button
                className="mt-6 bg-[#8B3DFF] hover:bg-[#9B4DFF] text-white"
                onClick={() => navigate('/templates/new')}
              >
                Create Event
              </Button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#020817] relative">
      {/* Header */}
      <LoadingOverlay isLoading={isLoading} />
      <HeaderHome
        isCreate={true}
        checkedMotion={reduceMotion}
        onReduceMotion={() => setReduceMotion(true)}
        onEdit={handleEdit}
      />


      <DialogDefault
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />

      {/* Main Content */}
      <main className="relative pt-14 md:pt-22 px-4">
        <div className="max-w-[1400px] mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-2xl md:text-2xl lg:text-4xl font-bold text-white mb-2 md:mb-4">
              Bienvenido de nuevo, {_profile?.nombre}
            </h1>
            <p className="text-lg md:text-xl text-white/70">
              Tienes 1 evento próximo.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto no-scrollbar gap-4 border-b border-white/10 mb-6 md:mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={`px-3 md:px-4 py-2 md:py-3 text-sm font-medium relative whitespace-nowrap ${activeTab === tab.name
                  ? "text-white"
                  : "text-white/50 hover:text-white"
                  }`}
                onClick={() => setActiveTab(tab.name)}
              >
                <span className="flex items-center gap-2">
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                  {tab.count > 0 && (
                    <span className="bg-white/10 px-1.5 py-0.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </span>
                {activeTab === tab.name && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B3DFF]" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {renderTabContent()}

       {/* Mutuals Section */}
          <div className="py-12 md:py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Mutuals
            </h2>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl">
                😶
              </div>
              <div className="max-w-sm mx-auto">
                <h3 className="text-xl text-white font-medium mb-2">
                  Aún no hay mutuas
                </h3>
                <p className="text-white/70">
                  ¡Vuelve a consultar esta página cuando vayas a tu primer evento!
                </p>
              </div>
            </div>
            <div className="mt-12 md:mt-16 text-sm text-white/50 flex flex-wrap items-center justify-center gap-2 md:gap-4 px-4">
              <span>© 2025 Partiful™</span>
              <span className="hidden md:inline">|</span>
              <Link to="/terms" className="hover:text-white">Terms</Link>
              <span className="hidden md:inline">&</span>
              <Link to="/privacy" className="hover:text-white">Privacy</Link>
              <span className="hidden md:inline">|</span>
              <Link to="/careers" className="hover:text-white">Careers</Link>
              <span className="hidden md:inline">|</span>
          
            </div>
          </div>
        </div>
      </main>

      {/* Profile Dialog */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-none p-4 bg-[#1A0505] text-white border-neutral-800">
          <DialogTitle className="text-2xl font-bold mt-3 text-center">

          </DialogTitle>
          <DialogDescription className="text-center text-white/70 mb-4">

          </DialogDescription>
          <ViewUser
            loading={isLoading}
            onSave={handleSave}
            onCancel={() => setShowProfile(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}