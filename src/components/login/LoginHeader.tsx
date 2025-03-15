import { Link } from "react-router-dom";

export function LoginHeader() {
  return (
    <header className="flex items-center justify-between py-6">
      <Link to="/" className="flex items-center gap-2">
        <img 
          src="https://pasas001.blob.core.windows.net/micontenedor-logo/logo.png" 
          alt="Pasas Logo" 
          className="h-8 w-auto"
        />
      </Link>
      <Link to="/faq" className="text-sm text-white/60 hover:text-white transition-colors">
        FAQ
      </Link>
    </header>
  );
}