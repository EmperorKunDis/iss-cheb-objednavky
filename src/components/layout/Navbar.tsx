
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary-700 transition-colors hover:text-primary-800">
                    <GraduationCap className="h-8 w-8" />
                    <span>ISS Cheb Služby</span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/" className="text-sm font-medium text-slate-600 transition-colors hover:text-primary-600">
                        Domů
                    </Link>
                    <a href="#" className="text-sm font-medium text-slate-600 transition-colors hover:text-primary-600">
                        O škole
                    </a>
                    <a href="#" className="text-sm font-medium text-slate-600 transition-colors hover:text-primary-600">
                        Kontakt
                    </a>
                </div>
            </div>
        </nav>
    );
};
