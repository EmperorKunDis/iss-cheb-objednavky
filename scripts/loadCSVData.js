#!/usr/bin/env node

import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = path.resolve(__dirname, '../public/kompletni_cenik_2025.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

const results = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
});

const productsByCategory = {};

results.data.forEach((row) => {
    const kategorie = row.Kategorie;
    const podkategorie = row.Podkategorie;
    const menuTyp = row.Menu_Typ;

    if (!kategorie) return;

    const key = `${kategorie} - ${menuTyp}`;

    if (!productsByCategory[key]) {
        productsByCategory[key] = [];
    }

    productsByCategory[key].push({
        name: row.Název,
        category: kategorie,
        subcategory: podkategorie,
        menuType: menuTyp,
        price: parseFloat(row.Cena) || 0,
        weight: row.Váha || '',
        storage: row.Skladování || '',
        durability: row.Trvanlivost || '',
        allergens: row.Alergeny || '',
    });
});

const output = `// Auto-generated from CSV
// Run 'node scripts/loadCSVData.js' to regenerate

export interface Product {
  name: string;
  category: string;
  subcategory: string;
  menuType: string;
  price: number;
  weight?: string;
  storage?: string;
  durability?: string;
  allergens?: string;
}

export const PRODUCTS_BY_CATEGORY: Record<string, Product[]> = ${JSON.stringify(productsByCategory, null, 2)};

export async function loadAllPriceLists(): Promise<Record<string, Product[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PRODUCTS_BY_CATEGORY);
    }, 300);
  });
}
`;

const outputPath = path.resolve(__dirname, '../src/lib/productData.ts');
fs.writeFileSync(outputPath, output, 'utf-8');

console.log('✅ CSV data loaded successfully!');
console.log(`📊 Total categories: ${Object.keys(productsByCategory).length}`);
console.log(`📦 Total products: ${Object.values(productsByCategory).flat().length}`);
