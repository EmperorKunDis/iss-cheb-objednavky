import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Wrench,
    Car,
    Hammer,
    Zap,
    UtensilsCrossed,
    CakeSlice,
    Sandwich,
    ArrowRight
} from 'lucide-react';
import type { FieldOfStudy } from '../types';

interface ServiceInfo {
    id: FieldOfStudy;
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    image: string;
    hasProducts?: boolean;
}

const services: ServiceInfo[] = [
    {
        id: 'Instalatér',
        title: 'Instalatér',
        description: 'Kompletní vodoinstalatérské a topenářské práce, montáže sanitární techniky.',
        icon: Wrench,
        color: 'bg-blue-500',
        image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'Automechanik',
        title: 'Automechanik',
        description: 'Diagnostika, údržba a opravy osobních automobilů všech značek.',
        icon: Car,
        color: 'bg-red-500',
        image: 'https://images.unsplash.com/photo-1486262715619-01b8c2297605?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'Truhlář',
        title: 'Truhlář',
        description: 'Zakázková výroba nábytku, dřevěných konstrukcí a renovace.',
        icon: Hammer,
        color: 'bg-amber-600',
        image: 'https://images.unsplash.com/photo-1601058268499-e52642d15d39?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'Elektromechanik',
        title: 'Elektromechanik',
        description: 'Opravy domácích spotřebičů, elektroinstalace a revize.',
        icon: Zap,
        color: 'bg-yellow-500',
        image: 'https://images.unsplash.com/photo-1621905251189-fc01530c6036?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'Řezník',
        title: 'Řezník',
        description: 'Kvalitní bourání masa, výroba uzenin a masných specialit.',
        icon: UtensilsCrossed,
        color: 'bg-rose-600',
        image: 'https://images.unsplash.com/photo-1553163147-621957516919?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'Cukrář',
        title: 'Cukrář',
        description: 'Zákusky, dorty, mini zákusky a sváteční cukroví. Kompletní nabídka s cenami.',
        icon: CakeSlice,
        color: 'bg-pink-500',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
        hasProducts: true
    },
    {
        id: 'Výrobce lahůdek',
        title: 'Výrobce lahůdek',
        description: 'Chlebíčky, obložené mísy, saláty a teplá kuchyně. Vše čerstvé a na objednávku.',
        icon: Sandwich,
        color: 'bg-green-500',
        image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&q=80&w=800',
        hasProducts: true
    }
];

export const HomePage = () => {
    return (
        <div className="flex flex-col gap-16 pb-20">
            {/* Hero Section */}
            <section className="relative flex h-[500px] items-center justify-center overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=2000"
                        alt="School Workshop"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                <div className="relative container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 text-4xl font-bold leading-tight md:text-6xl"
                    >
                        Profesionální služby <br />
                        <span className="text-primary-400">od našich studentů</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mx-auto mb-8 max-w-2xl text-lg text-slate-300"
                    >
                        Podpořte vzdělávání budoucích profesionálů. Nabízíme kvalitní služby za výhodné ceny pod dohledem zkušených mistrů.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <a
                            href="#sluzby"
                            className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/30"
                        >
                            Vybrat službu
                            <ArrowRight className="h-5 w-5" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section id="sluzby" className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-slate-900">Naše obory</h2>
                    <p className="text-slate-600">Vyberte si z naší široké nabídky služeb</p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/50"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20 ${service.color}`} />
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow-sm backdrop-blur-sm">
                                    <service.icon className={`h-6 w-6 ${service.color.replace('bg-', 'text-')}`} />
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="mb-2 text-xl font-bold text-slate-900">{service.title}</h3>
                                <p className="mb-6 flex-1 text-sm text-slate-600">{service.description}</p>

                                {service.hasProducts ? (
                                    <div className="flex gap-2">
                                        <Link
                                            to={`/produkty/${service.id}`}
                                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 font-medium text-white transition-colors hover:bg-primary-500"
                                        >
                                            Ceník
                                        </Link>
                                        <Link
                                            to={`/objednavka/${service.id}`}
                                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-900 hover:text-white"
                                        >
                                            Objednat
                                        </Link>
                                    </div>
                                ) : (
                                    <Link
                                        to={`/objednavka/${service.id}`}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-900 hover:text-white"
                                    >
                                        Objednat
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};
