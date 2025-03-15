class Auth {
    isAuthenticated(): boolean {
        try {
            const user = JSON.parse(localStorage.getItem('user') || 'null');
            return user !== null && user.nombre !== undefined;
        } catch (error) {
            return false;
        }
    }

    user(): { nombre?: string } | null {
        try {
            // Obtener el objeto completo desde localStorage
            const storedData = localStorage.getItem('user');

            // Verificar si existe y parsear el JSON
            if (storedData) {
                const parsedData = JSON.parse(storedData);

                // Extraer solo el perfil
                return parsedData?.state?.profile || null;
            }

            return null;
        } catch (error) {
            return null;
        }
    }
}

export default new Auth();
