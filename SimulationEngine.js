const SimulationEngine = {
    calculateIncome: (shops, strains) => {
        return shops.reduce((total, s) => total + (s.baseIncome * s.owned * strains.efficiency), 0);
    },
    
    calculateHeatImpact: (shops, strains) => {
        const clampedStealth = Math.max(0.2, 1 / (1 + (strains.stealth - 1) * 0.5));
        return shops.reduce((heat, s) => {
            let multiplier = (s.type === 'high-heat') ? 0.0002 : 0.00005;
            return heat + ((s.owned * s.baseIncome) * clampedStealth * multiplier);
        }, 0);
    },

    getAuditState: (heat) => {
        if (heat >= 100) return { active: true, severity: "SHUTDOWN" };
        if (heat >= 85) return { active: true, severity: "CRITICAL" };
        if (heat >= 70) return { active: false, severity: "WARNING" };
        return { active: false, severity: "STABLE" };
    },

    processFailure: (state) => {
        // Lose 20% of high-heat assets
        let target = state.shops.find(s => s.owned > 0 && s.type === 'high-heat') || state.shops[0];
        if (target.owned > 0) {
            target.owned = Math.max(0, target.owned - Math.ceil(target.owned * 0.2));
        }
        // Reset strains to base
        state.strains = { efficiency: 1.0, stealth: 1.0, aggressivity: 1.0 };
        return state;
    }
};