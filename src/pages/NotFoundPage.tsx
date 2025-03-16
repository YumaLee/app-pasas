
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-t from-black via-purple-900 to-blue-700 text-white">
      <span className="text-6xl md:text-8xl mb-4">😬</span>
      <h1 className="text-2xl md:text-4xl font-bold mb-2 text-center">PAGINA NO ENCONTRADA</h1>
      <p className="text-sm md:text-lg mb-8 text-center">Parece que esta página no existe.</p>
      <a
        href="/"
        className="px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
      >
        Ir a Login
      </a>
    </div>
  );
};

export default NotFoundPage;