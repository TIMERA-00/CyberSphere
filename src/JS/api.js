
const URL_BASE = 'http://localhost:3000';

const api = {


    obtenirUtilisateurs: async () => {
        const reponse = await fetch(`${URL_BASE}/utilisateurs`);
        return reponse.json();
    },


    inscrireUtilisateur: async (utilisateur) => {
        const reponse = await fetch(`${URL_BASE}/utilisateurs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(utilisateur)
    });
        return reponse.json();
    },


    obtenirStats: async () => {
    const reponse = await fetch(`${URL_BASE}/stats`);
    return reponse.json();
    },

    obtenirAlertes: async () => {
        const reponse = await fetch(`${URL_BASE}/alertes`);
        return reponse.json();
    },

    obtenirIncidents: async () => {
        const reponse = await fetch(`${URL_BASE}/incidents`);
        return reponse.json();
    },

    obtenirActivites: async () => {
        const reponse = await fetch(`${URL_BASE}/activites`);
        return reponse.json();
    },
};

export default api;