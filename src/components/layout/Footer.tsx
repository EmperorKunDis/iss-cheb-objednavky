

export const Footer = () => {
    return (
        <footer className="border-t border-slate-200 bg-white py-8">
            <div className="container mx-auto px-4 text-center text-slate-500">
                <p>&copy; {new Date().getFullYear()} Integrovaná střední škola Cheb. Všechna práva vyhrazena.</p>
                <p className="mt-2 text-sm">
                    Systém pro objednávání služeb žákovských prací.
                </p>
            </div>
        </footer>
    );
};
