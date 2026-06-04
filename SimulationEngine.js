const SimulationEngine = {
    calculateIncome: (shops, strains) => {
        return shops.reduce((total, s) => {
            return total + (s.baseIncome * s.owned * strains.efficiency);
        }, 0);
    },
    
    calculateHeatImpact: (shops, strains) => {
        const stealthCap = 0.2; 
        const effectiveStealth = 1 / (1 + (strains.stealth - 1) * 0.5);
        const clampedStealth = Math.max(stealthCap, effectiveStealth);

        return shops.reduce((heat, s) => {
            let load = (s.owned * s.baseIncome) * clampedStealth;
            let multiplier = (s.type === 'high-heat') ? 0.0002 : 0.00005;
            return heat + (load * multiplier);
        }, 0);
    },

    recombine: (currentStrains, targetStrain) => {
        let nextStrains = { ...currentStrains };
        nextStrains[targetStrain] += 0.05;
        return nextStrains;
    }
};