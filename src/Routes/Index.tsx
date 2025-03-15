import { Routes, Route, Outlet } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/components/login/LoginPage";
import { TemplateCategoryPage } from "@/pages/TemplateCategoryPage";
import { Preview } from "@/components/Preview";
import { EventoPage } from "@/pages/EventoPage";
import { PreviewEventPage } from "@/pages/PreviewEventPage";

import { EditEvento } from "@/components/evento/Form/Edit";
import ProtectedRoute from "@/Routes/ProtectedRoute";
import setupInterceptors from '../shared/services/_base/interceptor.tsx';

function Index() {
    setupInterceptors();
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute> <Outlet /> </ProtectedRoute>}>
                <Route path="/templates/:category" element={<TemplateCategoryPage />} />
                <Route path="/preview" element={<Preview />} />
                <Route path="/events" element={<EventoPage />} />
                <Route path="/event/preview/:codigo" element={<PreviewEventPage />} />
                <Route path="/event/edit/:codigo" element={<EditEvento />} />
            </Route>
        </Routes>
    );
}


export default Index;