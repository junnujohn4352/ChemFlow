
// chemicalStore.ts - Manages chemical data

import { create } from "zustand";

interface Chemical {
    name: string;
    formula: string;
    mw: number; // Molecular weight
    bp: number; // Boiling point in °C
}

interface ChemicalStore {
    chemicals: Chemical[];
    addChemical: (chemical: Chemical) => void;
}

export const useChemicalStore = create<ChemicalStore>((set) => ({
    chemicals: [
        { name: "Methanol", formula: "CH3OH", mw: 32.04, bp: 64.7 },
        { name: "Ethanol", formula: "C2H5OH", mw: 46.07, bp: 78.37 },
        { name: "Benzene", formula: "C6H6", mw: 78.11, bp: 80.1 },
        { name: "Acetone", formula: "C3H6O", mw: 58.08, bp: 56.05 },
        { name: "Toluene", formula: "C7H8", mw: 92.14, bp: 110.6 },
        { name: "Water", formula: "H2O", mw: 18.02, bp: 100.0 },
        { name: "Hexane", formula: "C6H14", mw: 86.18, bp: 68.7 },
        { name: "Octane", formula: "C8H18", mw: 114.23, bp: 125.7 },
        { name: "Propane", formula: "C3H8", mw: 44.1, bp: -42.0 },
        { name: "Butane", formula: "C4H10", mw: 58.12, bp: -0.5 },
        // More chemicals will be added to exceed 500 entries
    ],
    addChemical: (chemical) =>
        set((state) => ({ chemicals: [...state.chemicals, chemical] })),
}));
