#!/usr/bin/env node

/**
 * Script to extract data from Excel files and generate TypeScript data file
 * Run with: node scripts/extractExcelData.js
 */

import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excelFiles = [
    { path: '../public/objListy/092025ceník cukrárna.xlsx', category: 'Cukrář' },
    { path: '../public/objListy/092025ceník celých dortů.xlsx', category: 'Cukrář - Dorty' },
    { path: '../public/objListy/092025ceník mini zákusků.xlsx', category: 'Cukrář - Mini zákusky' },
    { path: '../public/objListy/092025 ceník cukrárna Křížovníci.xlsx', category: 'Cukrář - Křížovníci' },
    { path: '../public/objListy/092025 ceník celých dortů KAVÁRNA.xlsx', category: 'Cukrář - Dorty Kavárna' },
    { path: '../public/objListy/092025 ceník mini KAVÁRNA.xlsx', category: 'Cukrář - Mini Kavárna' },
    { path: '../public/objListy/09 2025 ceník studených výrobků.xlsx', category: 'Výrobce lahůdek' },
    { path: '../public/objListy/09 2025 KAV ceník studených výrobků.xlsx', category: 'Výrobce lahůdek - Kavárna' },
];

function extractProductsFromExcel(filePath, category) {
    try {
        const fullPath = path.resolve(__dirname, filePath);
        const workbook = XLSX.readFile(fullPath);
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const products = [];

        // Skip header row and process data
        for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i];
            if (row && row.length > 0 && row[0]) {
                const name = String(row[0] || '').trim();
                const priceStr = String(row[1] || '0').replace(',', '.').replace(/[^\d.]/g, '');
                const price = parseFloat(priceStr) || 0;
                const unit = row[2] ? String(row[2]).trim() : undefined;
                const description = row[3] ? String(row[3]).trim() : undefined;

                if (name && price > 0) {
                    products.push({
                        name,
                        price,
                        unit,
                        description,
                        category
                    });
                }
            }
        }

        return products;
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
        return [];
    }
}

function generateTypeScriptFile(allProducts) {
    const output = `// Auto-generated from Excel files
// Run 'node scripts/extractExcelData.js' to regenerate

export interface Product {
  name: string;
  price: number;
  unit?: string;
  description?: string;
  category?: string;
}

export const MOCK_PRODUCTS: Record<string, Product[]> = ${JSON.stringify(allProducts, null, 2)};

export async function loadAllPriceLists(): Promise<Record<string, Product[]>> {
  // Simulate async loading
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PRODUCTS);
    }, 500);
  });
}
`;

    const outputPath = path.resolve(__dirname, '../src/lib/excelLoader.ts');
    fs.writeFileSync(outputPath, output, 'utf-8');
    console.log(`✅ Generated ${outputPath}`);
}

// Main execution
console.log('🔄 Extracting data from Excel files...\n');

const allProducts = {};

for (const file of excelFiles) {
    console.log(`Processing: ${file.path}`);
    const products = extractProductsFromExcel(file.path, file.category);
    console.log(`  Found ${products.length} products\n`);

    if (products.length > 0) {
        allProducts[file.category] = products;
    }
}

generateTypeScriptFile(allProducts);

console.log('\n✨ Done! Product data has been extracted and saved.');
console.log(`📊 Total categories: ${Object.keys(allProducts).length}`);
console.log(`📦 Total products: ${Object.values(allProducts).flat().length}`);
