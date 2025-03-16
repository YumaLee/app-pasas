import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { EditForm } from "@/components/evento/Form/EditForm";
import { EventSettings } from "@/components/EventSettings";
import { BrowseTemplatesBanner } from "@/components/BrowseTemplatesBanner";
import { ActionButtons } from "@/components/evento/Form/ActionButtons";
import { Link, useParams } from "react-router-dom";
import eventoService from "@/shared/services/EventoService";
import { useAuthStore } from "@/store/authStore";

export function EditEvento() {
    const [selectedFont, setSelectedFont] = useState("Classic");
    const [showBanner, setShowBanner] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    //const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const _profile = useAuthStore((state) => state.profile);

    const [itemEvent, setItemEvent] = useState<any>({});

    const { codigo } = useParams();

    const hasFetched = useRef(false);

    const handleSave = async (data: any) => {
        console.log(data)
        data.codigo = codigo; 

        var response = await eventoService.actualizar(data);
        if (response.status === 200) {
            alert('succes');
        } else {
            alert('response update');
        }
    }
    const fetchData = async () => {
        try {
            if (!codigo || hasFetched.current) return;
            hasFetched.current = true;

            var response = await eventoService.getByCode(codigo,_profile?.telefono!);
            if (response.status === 200) {
                const data = response.data;
                console.log(data)
                setItemEvent(data);
            }
            if (response.status === 400) {
                //dialog.warning(<ul>{response.data.messages.map(item => (<li>{item}</li>))}</ul>);
                return;
            }

        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };


    useEffect(() => {
        fetchData();
    }, [codigo]); // Se ejecuta cuando perfil cambia




    return (
        <div className="min-h-screen bg-gradient-to-b from-[#310f7a] to-[#821c8d] relative overflow-hidden">
            {/* Fixed Header */}
            <div
                className="top-0 left-0 right-0 z-50 bg-[#000]/80 backdrop-blur-sm border-b border-white/10 transition-transform duration-300"
            >
                <header className="max-w-[1400px] mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="https://pasas001.blob.core.windows.net/micontenedor-logo/logo.png"
                            alt="Pasas Logo"
                            className="h-8 w-auto"
                        />
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/faq" className="text-sm text-white/60 hover:text-white transition-colors">
                            FAQ
                        </Link>
                        <Button className="bg-[#7226ff] hover:bg-purple-700 text-white">
                            LOGIN
                        </Button>
                    </div>
                </header>
            </div>

            {/* Browse Templates Banner */}
            <BrowseTemplatesBanner
                showBanner={showBanner}
                onCloseBanner={() => setShowBanner(false)}
                isHeaderVisible={false}
            />

            {/* Right Side Fixed Buttons - Desktop Only */}
            <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col">
                <div className="w-[100px] bg-[#100229] py-6 flex flex-col items-center gap-8">
                    <ActionButtons
                        onThemeClick={() => setShowSettings(true)}
                        onEfectClick={() => setShowSettings(true)}
                        onSettingClick={() => setShowSettings(true)}
                        onDoneClick={() => setShowSettings(true)}
                    />
                </div>
            </div>

            {/* Main Content */}
            <main className="pt-10 pb-32 md:pb-12 px-4">
                <div className="max-w-[1200px] mx-auto">
                    <EditForm
                        dataItem={itemEvent}
                        selectedFont={selectedFont}
                        onFontSelect={setSelectedFont}
                        onSave={handleSave}
                    />
                </div>
            </main>

            <EventSettings
                open={showSettings}
                onOpenChange={setShowSettings}
            />


        </div>
    );
}