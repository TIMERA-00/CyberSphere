import { navigation } from "../../JS/router.js";

function accueil() {
  return `
    <link rel="stylesheet" href="./src/css/acceuil.css">

    <nav class="navbar">
      <div class="navbar-logo"> Cyber<span>Sphere</span></div>
      <button class="btn-connexion" id="btn-vers-login"> Se connecter </button>
    </nav>

    <section class="hero">
      <h1 class="hero-titre">
        La cybersécurité,<br>
        <span>centralisée.</span>
      </h1>

      <p class="hero-description">
        Formation, gestion SOC et services de sécurité
        réunis dans une seule plateforme simple et efficace.
      </p>

      <button class="btn-cta" id="btn-cta-login"> Commencer → </button>
    </section>


    <section class="section-piliers">
      <div class="carte-pilier">
        <div class="carte-pilier-icone">🎓</div>
        <div class="carte-pilier-titre">Academy</div>
        <p class="carte-pilier-description">
          Apprenez le pentest, le SOC et l'OSINT
          à votre rythme avec des modules pratiques.
        </p>
      </div>

      <div class="carte-pilier">
        <div class="carte-pilier-icone">🛡️</div>
        <div class="carte-pilier-titre">SOC Center</div>
        <p class="carte-pilier-description">
          Surveillez votre infrastructure, gérez
          les alertes et incidents en temps réel.
        </p>
      </div>

      <div class="carte-pilier">
        <div class="carte-pilier-icone">🔧</div>
        <div class="carte-pilier-titre">Services Hub</div>
        <p class="carte-pilier-description">
          Pentest, audit, hardening et OSINT —
          des services de sécurité sur mesure.
        </p>
      </div>
    </section>

    <footer class="footer"> CyberSphere © 2025 — Tous droits réservés </footer>
  `;
}

accueil.afterRender = () => {
  const btnLogin = document.getElementById('btn-vers-login');
  const btnCta = document.getElementById('btn-cta-login');

  if (btnLogin) {
    btnLogin.addEventListener('click', () => navigation('login'));
  }

  if (btnCta) {
    btnCta.addEventListener('click', () => navigation('login'));
  }
};

export default accueil;