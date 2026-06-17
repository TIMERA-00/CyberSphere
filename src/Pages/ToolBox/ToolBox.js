import { navigation } from "../../JS/router.js";


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

function ToolBox(){
    return `
        <div class= "disposition">
            ${rendreSidebar('Toolbox')}
            <main class="contenu-principal">
                <div class = "topbar">
                    <div class="topbar-titre">Cyber ToolBox</div>
                    <div class="topbar-sous-titre">Les Outils</div>
                </div>
            </main>

        </div>
    
    `

}
