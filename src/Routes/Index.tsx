import { Routes, Route, Outlet } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/components/login/LoginPage";
import { TemplateNewPage } from "@/pages/TemplateNewPage.tsx";
import { Preview } from "@/components/preview/Preview.tsx";
import { EventoPage } from "@/pages/EventoPage";
import { PreviewEventPage } from "@/pages/PreviewEventPage";

import { EditEvento } from "@/components/evento/Form/Edit";
import ProtectedRoute from "@/Routes/ProtectedRoute";
import setupInterceptors from '../shared/services/_base/interceptor.tsx';
import { LoadScriptNext } from "@react-google-maps/api";
import PaymentSuccess from "@/components/payment/PaymentSuccess.tsx";
import PaymentError from "@/components/payment/PaymentError.tsx";


export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_API_TOKEN_MAPS;

function Index() {
    setupInterceptors();
    return (

        <LoadScriptNext googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="e/:codigo" element={<PreviewEventPage />} />

                <Route element={<ProtectedRoute> <Outlet /> </ProtectedRoute>}>
                    <Route path="/templates/:category" element={<TemplateNewPage />} />
                    <Route path="/preview" element={<Preview />} />
                    <Route path="/events" element={<EventoPage />} />
                    <Route path="/event/edit/:codigo" element={<EditEvento />} />
                    
                    <Route path="/payment/success" element={<PaymentSuccess />} />
                    <Route path="/payment/error" element={<PaymentError />} />

                </Route>
            </Routes>
        </LoadScriptNext>
    );
}


export default Index;