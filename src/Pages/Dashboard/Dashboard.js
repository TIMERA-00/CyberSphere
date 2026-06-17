import { navigation, logout } from '../../JS/router.js';
import api from '../../JS/api.js';

function rendreStat(stat) {
  return `
    <div class="carte-stat">
      <div class="carte-stat-icone" style="background:${stat.fond};">${stat.icone}</div>
      <div class="carte-stat-valeur">${stat.valeur}</div>
      <div class="carte-stat-label">${stat.label}</div>
      <div class="carte-stat-delta delta-${stat.type}">${stat.delta}</div>
    </div>
  `;
}

function rendreBarres(barres, jours) {
  const barresHTML = barres.map(h =>
    `<div class="barre" style="height:${h}%;"></div>`
  ).join('');

  const labelsHTML = jours.map(j =>
    `<span class="graphique-label">${j}</span>`
  ).join('');

  return `
    <div class="graphique-barres">${barresHTML}</div>
    <div class="graphique-labels">${labelsHTML}</div>
  `;
}

function rendreAlerte(alerte) {
  return `
    <div class="alerte-item">
      <span class="badge ${alerte.badge}">${alerte.niveau.charAt(0).toUpperCase() + alerte.niveau.slice(1)}</span>
      <span class="alerte-texte">${alerte.texte}</span>
      <span class="alerte-heure">${alerte.heure}</span>
    </div>
  `;
}

function rendreIncident(incident) {
  return `
    <div class="incident-item">
      <div class="incident-barre" style="background:${incident.couleur};"></div>
      <div class="incident-info">
        <div class="incident-titre">${incident.titre}</div>
        <div class="incident-meta">${incident.meta}</div>
      </div>
      <span class="badge ${incident.badge}">${incident.statut}</span>
    </div>
  `;
}

function rendreActivite(activite) {
  return `
    <div class="activite-item">
      <div class="activite-point" style="background:${activite.couleur};"></div>
      <div>
        <div class="activite-texte">${activite.texte}</div>
        <div class="activite-heure">${activite.heure}</div>
      </div>
    </div>
  `;
}


function rendreSidebar(pageActive) {
  const liens = [
    { section: 'Menu' },
    { chemin: 'dashboard', icone: '📊', label: 'Dashboard' },
    { section: 'Formation' },
    { chemin: 'academy', icone: '🎓', label: 'Academy' },
    { chemin: 'challenges', icone: '🏆', label: 'Challenges' },
    { section: 'Outils' },
    { chemin: 'commandes', icone: '💻', label: 'Cyber Command Explorer' },
    { chemin: 'toolbox', icone: '🧰', label: 'Cyber Toolbox' },
    { section: 'SOC' },
    { chemin: 'soc', icone: '🛡️', label: 'SOC Center' },
    { chemin: 'services', icone: '🔧', label: 'Services Hub' },
  ];

  const liensHTML = liens.map(lien => {
    if (lien.section) {
      return `<div class="menu-section">${lien.section}</div>`;
    }
    const actif = pageActive === lien.chemin ? 'actif' : '';
    return `
      <button class="menu-lien ${actif}" data-chemin="${lien.chemin}">
        <span class="menu-icone">${lien.icone}</span>
        ${lien.label}
      </button>
    `;
  }).join('');

  const utilisateurJSON = sessionStorage.getItem('utilisateur');
  const ustilisateur = utilisateurJSON ? JSON.parse(utilisateurJSON) : null;
  const prenom = ustilisateur?.prenom || 'Admin';
  const role = ustilisateur?.role || 'utilisateur';
  const initiale = prenom.charAt(0).toUpperCase();

  return `
    <aside class="menu-lateral">
      <div class="menu-logo">Cyber<span>Sphere</span></div>
      <nav class="menu-nav">${liensHTML}</nav>
      <div class="menu-profil">
        <div class="menu-profil-avatar">A</div>
        <div>
          <div class="menu-profil-nom">Admin</div>
          <div class="menu-profil-role">Super Admin</div>
        </div>
        <button class="menu-profil-logout" id="btn-logout" title="Se déconnecter">⏻</button>
      </div>
    </aside>
  `;
}


function Dashboard() {
  return `
    <link rel="stylesheet" href="./src/css/dashboard.css">
    <div class="disposition">
      ${rendreSidebar('dashboard')}
      <main class="contenu-principal">

        <div class="topbar">
          <div>
            <div class="topbar-titre">Dashboard</div>
            <div class="topbar-sous-titre">Vue d'ensemble de la plateforme — Aujourd'hui</div>
          </div>
          <button class="btn-incident">+ Nouvel incident</button>
        </div>

        <div class="banner-hero">
          <div>
            <div class="banner-hero-titre">Bienvenue sur CyberSphere</div>
            <p class="banner-hero-desc">
              Votre plateforme unifiée de cybersécurité : formation,
              gestion SOC et services de sécurité au même endroit.
            </p>
          </div>
          <div class="banner-hero-emoji"></div>
        </div>

        <div id="dashboard-contenu">
          <div class="chargement">Chargement des données...</div>
        </div>

      </main>
    </div>
  `;
}

Dashboard.afterRender = async () => {

  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => logout());
  }

  const liensNav = document.querySelectorAll('.menu-lien[data-chemin]');
  liensNav.forEach(lien => {
    lien.addEventListener('click', () => {
      const chemin = lien.dataset.chemin;
      if (chemin) navigation(chemin);
    });
  });


  try {
    const [stats, alertes, incidents, activites] = await Promise.all([
      api.obtenirStats(),
      api.obtenirAlertes(),
      api.obtenirIncidents(),
      api.obtenirActivites(),
    ]);

    const contenu = document.getElementById('dashboard-contenu');
    if (contenu) {
      contenu.innerHTML = `

        <div class="grille-stats">
          ${stats.map(rendreStat).join('')}
        </div>

        <div class="grille-2col">
          <div class="carte">
            <div class="carte-entete">
              <span class="carte-titre">Activité des alertes — 7 derniers jours</span>
            </div>
            <div class="carte-corps">
              ${rendreBarres(
                [60, 40, 75, 50, 90, 65, 80],
                ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
              )}
            </div>;
          </div>

          <div class="carte">
            <div class="carte-entete">
              <span class="carte-titre">🔔 Alertes critiques</span>
              <button class="carte-lien">Voir tout →</button>
            </div>
            ${alertes.map(rendreAlerte).join('')}
          </div>
        </div>

        <div class="grille-2col-equal">
          <div class="carte">
            <div class="carte-entete">
              <span class="carte-titre">🚨 Incidents récents</span>
              <button class="carte-lien">Voir tout →</button>
            </div>
            ${incidents.map(rendreIncident).join('')}
          </div>
          <div class="carte">
            <div class="carte-entete">
              <span class="carte-titre">⚡ Activité récente</span>
            </div>
            ${activites.map(rendreActivite).join('')}
          </div>
        </div>
      `;
    }

  } catch (erreur) {
    console.error(erreur);
    const contenu = document.getElementById('dashboard-contenu');
    if (contenu) {
      contenu.innerHTML = `
        <div style="color:var(--couleur-erreur);padding:var(--espacement-xl);">
          Impossible de charger les données. Vérifiez que le serveur est lancé.
        </div>
      `;
    }
  }
};

export default Dashboard;