// Désactiver le chargement de chart.js côté serveur
if (typeof window !== 'undefined') {
    Object.defineProperty(global, 'window', {
    value: {}
    });

    Object.defineProperty(global, 'document', {
    value: {
        createElement: () => ({})
    }
    });
}
