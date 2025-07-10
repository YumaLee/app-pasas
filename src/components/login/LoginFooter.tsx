import { Link } from "react-router-dom";

export function LoginFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center text-sm text-white/60 space-y-4">
      <p>© {currentYear} Pasas™</p>
      <div className="flex items-center justify-center gap-4">
        <Link to="#" className="hover:text-white transition-colors">Términos</Link>
        <span>&</span>
        <Link to="#" className="hover:text-white transition-colors">Privacidad</Link>
        <span>|</span>
        <Link to="#" className="hover:text-white transition-colors">Carreras</Link>
      </div>
    </footer>
  );
}
