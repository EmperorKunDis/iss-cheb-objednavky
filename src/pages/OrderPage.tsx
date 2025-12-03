import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { FIELDS_OF_STUDY, type FieldOfStudy } from '../types';

export const OrderPage = () => {
    const { fieldId } = useParams();
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Validate fieldId
    const isValidField = FIELDS_OF_STUDY.includes(fieldId as FieldOfStudy);

    if (!isValidField) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Obor nenalezen</h2>
                <p className="mb-8 text-slate-600">Požadovaný obor neexistuje.</p>
                <button
                    onClick={() => navigate('/')}
                    className="text-primary-600 hover:underline"
                >
                    Zpět na hlavní stránku
                </button>
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
        }, 1000);
    };

    if (isSubmitted) {
        return (
            <div className="container mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mb-6 rounded-full bg-green-100 p-4 text-green-600"
                >
                    <CheckCircle2 className="h-16 w-16" />
                </motion.div>
                <h2 className="mb-4 text-3xl font-bold text-slate-900">Objednávka odeslána!</h2>
                <p className="mb-8 text-lg text-slate-600">
                    Děkujeme za vaši objednávku. Brzy vás budeme kontaktovat pro potvrzení termínu a detailů.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="rounded-xl bg-slate-900 px-8 py-3 font-medium text-white transition-colors hover:bg-slate-800"
                >
                    Zpět na úvod
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-2xl px-4 py-12">
            <button
                onClick={() => navigate('/')}
                className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
            >
                <ArrowLeft className="h-4 w-4" />
                Zpět na výběr služeb
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-white p-8 shadow-lg md:p-12"
            >
                <div className="mb-8">
                    <span className="mb-2 inline-block rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
                        Nová objednávka
                    </span>
                    <h1 className="text-3xl font-bold text-slate-900">
                        {fieldId}
                    </h1>
                    <p className="mt-2 text-slate-600">
                        Vyplňte prosím formulář níže a my se vám ozveme s nabídkou.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-slate-700">
                                Jméno a příjmení
                            </label>
                            <input
                                required
                                type="text"
                                id="name"
                                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                                placeholder="Jan Novák"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                                Telefon
                            </label>
                            <input
                                required
                                type="tel"
                                id="phone"
                                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                                placeholder="+420 777 123 456"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            required
                            type="email"
                            id="email"
                            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                            placeholder="jan.novak@email.cz"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium text-slate-700">
                            Popis poptávky
                        </label>
                        <textarea
                            required
                            id="description"
                            rows={4}
                            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                            placeholder="Popište co nejpřesněji, co potřebujete udělat..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-8 py-4 font-semibold text-white transition-all hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/30"
                    >
                        Odeslat nezávaznou poptávku
                        <Send className="h-5 w-5" />
                    </button>
                </form>
            </motion.div>
        </div>
    );
};
