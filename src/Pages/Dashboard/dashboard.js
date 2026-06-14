import { navigation, logout } from '../../JS/router.js';


const donnees = {
  stats: [
    {
      icone: '🛡️',
      fond: '#eff6ff',
      valeur: '142',
      label: 'Alertes actives',
      delta: '▲ +12 aujourd\'hui',
      type: 'hausse'
    },
    {
      icone: '⚠️',
      fond: '#fef9c3',
      valeur: '8',
      label: 'Incidents ouverts',
      delta: '▼ 3 critiques',
      type: 'baisse'
    },
    {
      icone: '✅',
      fond: '#f0fdf4',
      valeur: '37',
      label: 'Actifs surveillés',
      delta: '▲ +2 cette semaine',
      type: 'hausse'
    },
    {
      icone: '🎓',
      fond: '#fdf4ff',
      valeur: '5',
      label: 'Modules complétés',
      delta: 'Progression : 68%',
      type: 'neutre'
    },
  ],

  barres: [60, 40, 75, 50, 90, 65, 80],
  jours: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],

  alertes: [
    { niveau: 'critique', badge: 'badge-critique', texte: 'Brute force SSH — 192.168.1.10', heure: '09:14' },
    { niveau: 'critique', badge: 'badge-critique', texte: 'Exfiltration DNS détectée', heure: '08:52' },
    { niveau: 'eleve',    badge: 'badge-eleve',    texte: 'Scan de ports — 10.0.0.5', heure: '08:30' },
    { niveau: 'moyen',    badge: 'badge-moyen',    texte: 'Compte inactif connecté', heure: '07:55' },
  ],

  incidents: [
    { couleur: '#E24B4A', titre: 'Ransomware suspect — Finance-04', meta: 'Il y a 2h · Équipe SOC', badge: 'badge-ouvert', statut: 'Ouvert' },
    { couleur: '#EF9F27', titre: 'Accès non autorisé — Firewall-01', meta: 'Il y a 4h · Admin', badge: 'badge-en-cours', statut: 'En cours' },
    { couleur: '#639922', titre: 'Fuite d\'identifiants — App interne', meta: 'Résolu hier à 15:00', badge: 'badge-resolu', statut: 'Résolu' },
  ],

  activites: [
    { couleur: '#378ADD', texte: 'Module Academy complété : <strong>Pentest – Recon</strong>', heure: 'Il y a 10 min' },
    { couleur: '#E24B4A', texte: 'Alerte critique assignée à l\'équipe SOC', heure: 'Il y a 25 min' },
    { couleur: '#639922', texte: 'Agent Wazuh installé sur Serveur Web-02', heure: 'Il y a 1h' },
    { couleur: '#EF9F27', texte: 'Rapport hebdomadaire généré et envoyé', heure: 'Il y a 3h' },
  ],
};


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
            <div class="banner-hero-titre">Bienvenue sur CyberSphere 👋</div>
            <p class="banner-hero-desc">
              Votre plateforme unifiée de cybersécurité : formation,
              gestion SOC et services de sécurité au même endroit.
            </p>
          </div>
          <div class="banner-hero-emoji">🔐</div>
        </div>

        <!-- Stats -->
        <div class="grille-stats">
          ${donnees.stats.map(rendreStat).join('')}
        </div>

        <!-- Graphique + Alertes -->
        <div class="grille-2col">
          <div class="carte">
            <div class="carte-entete">
              <span class="carte-titre">Activité des alertes — 7 derniers jours</span>
            </div>
            <div class="carte-corps">
              ${rendreBarres(donnees.barres, donnees.jours)}
            </div>
          </div>
          <div class="carte">
            <div class="carte-entete">
              <span class="carte-titre">🔔 Alertes critiques</span>
              <button class="carte-lien">Voir tout →</button>
            </div> ${donnees.alertes.map(rendreAlerte).join('')}</div>
        </div>

        <!-- Incidents + Activité -->
        <div class="grille-2col-equal">
          <div class="carte">
            <div class="carte-entete">
              <span class="carte-titre">🚨 Incidents récents</span>
              <button class="carte-lien">Voir tout →</button>
            </div>
            ${donnees.incidents.map(rendreIncident).join('')}
          </div>
          <div class="carte">
            <div class="carte-entete">
              <span class="carte-titre">⚡ Activité récente</span>
            </div>
            ${donnees.activites.map(rendreActivite).join('')}
          </div>
        </div>

      </main>
    </div>
  `;
}

Dashboard.afterRender = () => {

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
};

export default Dashboard;