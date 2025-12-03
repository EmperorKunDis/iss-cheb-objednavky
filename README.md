# 🎓 ISS Cheb - Objednávkový Systém

Moderní webová aplikace pro objednávání služeb a produktů od studentů Integrované střední školy Cheb.

## ✨ Funkce

### 🏠 Hlavní stránka
- **Hero sekce** s atraktivním designem
- **7 oborů** s vlastními kartami:
  - Instalatér
  - Automechanik
  - Truhlář
  - Elektromechanik
  - Řezník
  - Cukrář (s ceníkem)
  - Výrobce lahůdek (s ceníkem)

### 📋 Ceník produktů
- **Automatické načítání** z Excel souborů
- **Vyhledávání** produktů
- **Filtrování** podle kategorií
- **Responzivní design** - funguje na všech zařízeních
- **176 produktů** z reálných ceníků

### 📝 Objednávkový formulář
- Jednoduchý formulář pro poptávky
- Validace vstupů
- Potvrzení odeslání s animací

## 🛠️ Technologie

- **React 19** + **TypeScript**
- **Vite** - rychlý build tool
- **Tailwind CSS v4** - moderní styling
- **React Router** - navigace
- **Framer Motion** - animace
- **Lucide React** - ikony
- **XLSX** - čtení Excel souborů

## 🚀 Instalace a spuštění

### Prerekvizity
- Node.js 18+ a npm

### Instalace
\`\`\`bash
npm install
\`\`\`

### Vývoj
\`\`\`bash
npm run dev
\`\`\`
Aplikace poběží na http://localhost:5173

### Build pro produkci
\`\`\`bash
npm run build
\`\`\`

### Preview produkční verze
\`\`\`bash
npm run preview
\`\`\`

## 📊 Aktualizace ceníků

### Automatická extrakce z Excel souborů

1. Umístěte Excel soubory do složky \`public/objListy/\`
2. Spusťte extrakční skript:

\`\`\`bash
node scripts/extractExcelData.js
\`\`\`

Skript automaticky:
- Načte všechny Excel soubory
- Extrahuje produkty (název, cena, jednotka, popis)
- Vygeneruje TypeScript soubor s daty
- Zobrazí statistiky (176 produktů z 7 kategorií)

### Formát Excel souborů

Excel soubory by měly mít následující strukturu:

| Sloupec A | Sloupec B | Sloupec C | Sloupec D |
|-----------|-----------|-----------|-----------|
| Název produktu | Cena | Jednotka | Popis |
| Větrník | 35 | ks | Klasický větrník |

## 📁 Struktura projektu

\`\`\`
ObjednavkovySystem/
├── public/
│   └── objListy/          # Excel soubory s ceníky
├── scripts/
│   └── extractExcelData.js # Skript pro extrakci dat
├── src/
│   ├── components/
│   │   ├── layout/        # Layout komponenty (Navbar, Footer)
│   │   └── ui/            # UI komponenty
│   ├── lib/
│   │   ├── excelLoader.ts # Načítání produktů
│   │   └── utils.ts       # Utility funkce
│   ├── pages/
│   │   ├── HomePage.tsx   # Hlavní stránka
│   │   ├── ProductsPage.tsx # Stránka s produkty
│   │   └── OrderPage.tsx  # Objednávkový formulář
│   ├── types/
│   │   └── index.ts       # TypeScript typy
│   ├── App.tsx            # Hlavní komponenta
│   ├── main.tsx           # Entry point
│   └── index.css          # Globální styly
├── tailwind.config.js     # Tailwind konfigurace
└── package.json
\`\`\`

## 🎨 Design

- **Moderní barevná paleta** - primární modrá, sekundární fialová
- **Inter font** - čistá typografie
- **Glassmorphism** efekty
- **Smooth animace** pomocí Framer Motion
- **Responzivní grid** layout
- **Hover efekty** a interaktivní prvky

## 📝 Další vývoj

### Plánované funkce
- [ ] Backend API pro ukládání objednávek
- [ ] Administrační rozhraní
- [ ] Email notifikace
- [ ] Správa objednávek
- [ ] Galerie prací studentů
- [ ] Recenze a hodnocení

## 📄 Licence

© 2025 Integrovaná střední škola Cheb. Všechna práva vyhrazena.
