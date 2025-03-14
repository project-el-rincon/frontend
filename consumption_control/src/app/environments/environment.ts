// environment.ts (développement)
export const environment = {
    production: false,
    apiBaseUrl: 'http://localhost:3000/api',
    websocketUrl: 'ws://localhost:8080', // Ajout de l'URL WebSocket
    refreshInterval: 10000 // 10 secondes pour le polling
};
