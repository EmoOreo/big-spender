// SimulationEngine.js
const SimulationEngine = {
    // Calculates income based on base values, owned count, and efficiency strain
    calculateIncome: (shops, strains) => {
        return shops.reduce((total, s) => {
            return total + (s.baseIncome * s.owned * strains.efficiency);
        }, 0);
    },
    
    // Calculates heat accumulation based on shop type and stealth strain
    calculateHeatImpact: (shops, strains) => {
        return shops.reduce((heat, s) => {
            let load = (s.owned * s.baseIncome) / strains.stealth;
            // High-heat items (e.g., Toy Store) generate more risk
            let multiplier = (s.type === 'high-heat') ? 0.0002 : 0.00005;
            return heat + (load * multiplier);
        }, 0);
    },

    // Logic for the prestige "Recombination" event
    recombine: (currentStrains, targetStrain) => {
        let nextStrains = { ...currentStrains };
        // Increase the selected strain by a drift factor
        nextStrains[targetStrain] += 0.05;
        return nextStrains;
    }
};
