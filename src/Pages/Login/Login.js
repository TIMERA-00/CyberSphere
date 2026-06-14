import { navigation } from "../../JS/router.js";
import api from '../../JS/api.js';

function Login() {
  return `
    <link rel="stylesheet" href="./src/css/login.css">

    <div class="login-page">

      <div class="login-gauche">
        <div class="login-gauche-overlay">
          <div class="login-gauche-titre">Cyber<span>Sphere</span></div>
          <p class="login-gauche-desc">
            Formation, surveillance et services de
            cybersécurité réunis en une seule plateforme.
          </p>
        </div>
      </div>

      <div class="login-droite">
        <div class="login-cadre">

          <h1 class="login-titre">Connectez-vous pour accéder à la plateforme</h1>

          <div class="message-erreur" id="msg-erreur">
            linga dougal bakhoul, dougalattal
          </div>

          <div class="champ-groupe">
            <label class="champ-label" for="input-email">Email</label>
            <input class="champ-input" type="email" id="input-email" placeholder="timera@cybersphere.com">
          </div>

          <div class="champ-groupe">
            <label class="champ-label" for="input-mdp">Mot de passe</label>
            <input class="champ-input" type="password" id="input-mdp" placeholder="********">
          </div>

          <button class="btn-soumettre" id="btn-soumettre"> Se connecter </button>

          <div class="login-liens">
            <a class="login-lien" id="lien-inscription"> Pas encore de compte ? S'inscrire </a>
            <span class="login-separateur">---------{}-----------{}-----------{}---------</span>
            <button class="login-lien" id="lien-accueil"> <- Retour à l'accueil </button>
          </div>

        </div>
      </div>

    </div>
  `;
}

Login.afterRender = () => {
  const btnSoumettre = document.getElementById('btn-soumettre');
  const inputEmail   = document.getElementById('input-email');
  const inputMdp     = document.getElementById('input-mdp');
  const msgErreur    = document.getElementById('msg-erreur');
  const lienInscript = document.getElementById('lien-inscription');
  const lienAccueil  = document.getElementById('lien-accueil');

  if (btnSoumettre) {
    btnSoumettre.addEventListener('click', async () => {

      const email = inputEmail?.value.trim();
      const mdp   = inputMdp?.value.trim();

      if (!email || !mdp) {
        msgErreur.textContent = 'Veuillez remplir tous les champs.';
        msgErreur.classList.add('visible');
        return;
      }

      try {
        const utilisateurs = await api.obtenirUtilisateurs();
        const utilisateur  = utilisateurs.find(
          u => u.email === email && u.motDePasse === mdp
        );

        if (utilisateur) {
 
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('utilisateur', JSON.stringify(utilisateur));
          navigation('dashboard');
        } else {
          msgErreur.textContent = 'Email ou mot de passe incorrect.';
          msgErreur.classList.add('visible');
        }

      } catch (erreur) {
        console.error(erreur);
        msgErreur.textContent = 'Erreur serveur. Vérifiez que le serveur est lancé.';
        msgErreur.classList.add('visible');
      }
    });
  }

  if (inputEmail) {
    inputEmail.addEventListener('input', () => {
      msgErreur?.classList.remove('visible');
    });
  }

  if (inputMdp) {
    inputMdp.addEventListener('input', () => {
      msgErreur?.classList.remove('visible');
    });
  }

  if (lienInscript) lienInscript.addEventListener('click', () => navigation('inscription'));
  if (lienAccueil)  lienAccueil.addEventListener('click',  () => navigation(''));
};

export default Login;