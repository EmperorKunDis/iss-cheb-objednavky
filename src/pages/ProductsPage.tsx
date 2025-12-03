import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Search, Filter } from 'lucide-react';
import { loadAllPriceLists, type Product } from '../lib/productData';

export const ProductsPage = () => {
    const { fieldId } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
    const [selectedMenuType, setSelectedMenuType] = useState<string>('Standard');

    useEffect(() => {
        loadProducts();
    }, [fieldId]);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const allPriceLists = await loadAllPriceLists();

            let relevantProducts: Product[] = [];

            // Filter products based on field
            Object.entries(allPriceLists).forEach(([, prods]) => {
                prods.forEach(product => {
                    if (
                        (fieldId === 'Cukrář' && (product.category === 'Zákusky' || product.category === 'Dorty' || product.category === 'Mini zákusky')) ||
                        (fieldId === 'Výrobce lahůdek' && (product.category === 'Lahůdky' || product.category === 'Teplá kuchyně' || product.category === 'Pečivo'))
                    ) {
                        relevantProducts.push(product);
                    }
                });
            });

            setProducts(relevantProducts);
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    };

    const subcategories = Array.from(new Set(products.map(p => p.subcategory).filter(Boolean))) as string[];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSubcategory = selectedSubcategory === 'all' || product.subcategory === selectedSubcategory;
        const matchesMenuType = product.menuType === selectedMenuType;
        return matchesSearch && matchesSubcategory && matchesMenuType;
    });

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
                    <p className="text-slate-600">Načítám produkty...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <button
                onClick={() => navigate('/')}
                className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
            >
                <ArrowLeft className="h-4 w-4" />
                Zpět na výběr služeb
            </button>

            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-slate-900">{fieldId}</h1>
                <p className="text-slate-600">Prohlédněte si naši nabídku a ceník</p>
            </div>

            {/* Menu Type Toggle */}
            <div className="mb-6 flex gap-2">
                <button
                    onClick={() => setSelectedMenuType('Standard')}
                    className={`rounded-lg px-6 py-2.5 font-medium transition-all ${selectedMenuType === 'Standard'
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                >
                    Standard prodej
                </button>
                <button
                    onClick={() => setSelectedMenuType('Kavárna')}
                    className={`rounded-lg px-6 py-2.5 font-medium transition-all ${selectedMenuType === 'Kavárna'
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                >
                    Kavárna
                </button>
            </div>

            {/* Search and Filter */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Hledat produkty..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                    />
                </div>

                {subcategories.length > 1 && (
                    <div className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-slate-400" />
                        <select
                            value={selectedSubcategory}
                            onChange={(e) => setSelectedSubcategory(e.target.value)}
                            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                        >
                            <option value="all">Všechny kategorie</option>
                            {subcategories.map((subcat) => (
                                <option key={subcat} value={subcat}>
                                    {subcat}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                    {searchTerm ? 'Žádné produkty nenalezeny.' : 'Momentálně nemáme produkty v této kategorii.'}
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={`${product.name}-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: Math.min(index * 0.03, 0.5) }}
                            className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-primary-300 hover:shadow-lg"
                        >
                            <div className="mb-3 flex-1">
                                <h3 className="mb-1 font-semibold text-slate-900">{product.name}</h3>

                                <div className="mb-2 flex flex-wrap gap-1">
                                    {product.subcategory && (
                                        <span className="inline-block rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">
                                            {product.subcategory}
                                        </span>
                                    )}
                                    {product.weight && (
                                        <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                                            {product.weight}
                                        </span>
                                    )}
                                </div>

                                {product.storage && (
                                    <p className="mb-1 text-xs text-slate-500">
                                        <span className="font-medium">Skladování:</span> {product.storage}
                                    </p>
                                )}
                                {product.durability && (
                                    <p className="mb-1 text-xs text-slate-500">
                                        <span className="font-medium">Trvanlivost:</span> {product.durability}
                                    </p>
                                )}
                                {product.allergens && (
                                    <p className="text-xs text-orange-600">
                                        <span className="font-medium">Alergeny:</span> {product.allergens}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-end justify-between border-t border-slate-100 pt-3">
                                <div>
                                    <div className="text-2xl font-bold text-primary-600">
                                        {product.price > 0 ? `${product.price} Kč` : 'Na dotaz'}
                                    </div>
                                    {product.weight && (
                                        <div className="text-xs text-slate-500">{product.weight}</div>
                                    )}
                                </div>

                                <button
                                    onClick={() => navigate(`/objednavka/${fieldId}?product=${encodeURIComponent(product.name)}`)}
                                    className="rounded-lg bg-slate-100 p-2 text-slate-700 transition-colors hover:bg-primary-600 hover:text-white"
                                    title="Objednat"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Order CTA */}
            <div className="mt-12 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 p-8 text-center text-white">
                <h2 className="mb-2 text-2xl font-bold">Máte zájem o objednávku?</h2>
                <p className="mb-6 text-primary-100">
                    Kontaktujte nás a my vám připravíme nezávaznou cenovou nabídku.
                </p>
                <button
                    onClick={() => navigate(`/objednavka/${fieldId}`)}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 font-semibold text-primary-600 transition-all hover:shadow-lg"
                >
                    <ShoppingCart className="h-5 w-5" />
                    Vytvořit objednávku
                </button>
            </div>
        </div>
    );
};
