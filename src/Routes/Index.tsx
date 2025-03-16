import { Routes, Route, Outlet } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/components/login/LoginPage";
import { TemplateNewPage } from "@/pages/TemplateNewPage.tsx";
import { Preview } from "@/components/Preview";
import { EventoPage } from "@/pages/EventoPage";
import { PreviewEventPage } from "@/pages/PreviewEventPage";

import { EditEvento } from "@/components/evento/Form/Edit";
import ProtectedRoute from "@/Routes/ProtectedRoute";
import setupInterceptors from '../shared/services/_base/interceptor.tsx';
import { LoadScriptNext } from "@react-google-maps/api";
const GOOGLE_MAPS_API_KEY = "AIzaSyCJw95Ci1CUQKejVjZ1FxDbQKDc6MyAMdI"; // Reemplázalo con tu clave de API

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
                </Route>
            </Routes>
        </LoadScriptNext>
    );
}


export default Index;