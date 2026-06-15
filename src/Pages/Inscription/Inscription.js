import { navigation } from '../../JS/router.js';
import api from '../../JS/api.js';

function Inscription() {
  return `
    <link rel="stylesheet" href="./src/css/inscription.css">

    <div class="inscription-page">

      <div class="inscription-gauche">
        <div class="inscription-gauche-overlay">
          <div class="inscription-gauche-titre">Cyber<span>Sphere</span></div>
          <p class="inscription-gauche-desc">
            Rejoignez la plateforme et commencez
            votre parcours cybersécurité dès aujourd'hui.
          </p>
        </div>
      </div>

      <div class="inscription-droite">
        <div class="inscription-cadre">

          <h1 class="inscription-titre">Créer un compte</h1>
          <p class="inscription-sous-titre">
            Remplissez les informations ci-dessous pour vous inscrire.
          </p>

          <div class="message-erreur" id="msg-erreur">
            Veuillez corriger les erreurs avant de continuer.
          </div>

          <div class="message-succes" id="msg-succes">
              Dalal AKK DJAMM !
          </div>

          <div class="champ-ligne">
            <div class="champ-groupe">
              <label class="champ-label" for="input-prenom">Prénom</label>
              <input class="champ-input" type="text" id="input-prenom" placeholder="ADAMA">
            </div>
            <div class="champ-groupe">
              <label class="champ-label" for="input-nom">Nom</label>
              <input class="champ-input" type="text" id="input-nom" placeholder="TIMERA">
            </div>
          </div>

          <div class="champ-groupe">
            <label class="champ-label" for="input-email">Email</label>
            <input class="champ-input" type="email" id="input-email" placeholder="timera@gmail.com">
          </div>

          <div class="champ-groupe">
            <label class="champ-label" for="input-tel">Numéro de téléphone</label>
            <input class="champ-input" type="tel" id="input-tel" placeholder="+221 77 888 88 88">
          </div>

          <div class="champ-groupe">
            <label class="champ-label" for="input-mdp">Mot de passe</label>
            <input class="champ-input" type="password" id="input-mdp" placeholder="***************">
          </div>

          <div class="champ-groupe">
            <label class="champ-label" for="input-mdp-confirm">Confirmer le mot de passe </label>
            <input class="champ-input" type="password" id="input-mdp-confirm" placeholder="***************">
          </div>

          <a class="btn-soumettre" id="btn-inscrire"> S'inscrire </a>

          <div class="inscription-liens">
            <button class="inscription-lien" id="lien-login">
                Déjà un compte ? Se connecter
            </button>
            <span class="inscription-separateur">-------------LEPP LOY DOUGAL NANG KO KHAM-------------</span>
            <button class="inscription-lien" id="lien-accueil">
              <- Retour à l'accueil
            </button>
          </div>

        </div>
      </div>

    </div>
  `;
}

Inscription.afterRender = () => {
  const btnInscrire  = document.getElementById('btn-inscrire');
  const inputPrenom  = document.getElementById('input-prenom');
  const inputNom     = document.getElementById('input-nom');
  const inputEmail   = document.getElementById('input-email');
  const inputTel     = document.getElementById('input-tel');
  const inputMdp     = document.getElementById('input-mdp');
  const inputConfirm = document.getElementById('input-mdp-confirm');
  const msgErreur    = document.getElementById('msg-erreur');
  const msgSucces    = document.getElementById('msg-succes');
  const lienLogin    = document.getElementById('lien-login');
  const lienAccueil  = document.getElementById('lien-accueil');

  if (btnInscrire) {
    btnInscrire.addEventListener('click', async () => {

      const prenom  = inputPrenom?.value.trim();
      const nom     = inputNom?.value.trim();
      const email   = inputEmail?.value.trim();
      const tel     = inputTel?.value.trim();
      const mdp     = inputMdp?.value.trim();
      const confirm = inputConfirm?.value.trim();

      if (!prenom || !nom || !email || !tel || !mdp || !confirm) {
        msgErreur.textContent = 'Tous les champs sont obligatoires.';
        msgErreur.classList.add('visible');
        msgSucces.classList.remove('visible');
        return;
      }

      if (mdp !== confirm) {
        msgErreur.textContent = 'Les mots de passe ne correspondent pas.';
        msgErreur.classList.add('visible');
        msgSucces.classList.remove('visible');
        return;
      }

      if (mdp.length < 6) {
        msgErreur.textContent = 'Le mot de passe doit contenir au moins 6 caractères.';
        msgErreur.classList.add('visible');
        msgSucces.classList.remove('visible');
        return;
      }

      try {
        const utilisateurs = await api.obtenirUtilisateurs();
        const dejainscrit = utilisateurs.find(u => u.email === email);

        if (dejainscrit) {
          msgErreur.textContent = 'Cet email est déjà utilisé.';
          msgErreur.classList.add('visible');
          msgSucces.classList.remove('visible');
          return;
        }

        await api.inscrireUtilisateur({
          prenom,
          nom,
          email,
          telephone: tel,
          motDePasse: mdp,
          role: 'utilisateur',
          dateInscription: new Date().toISOString()
        });

        msgErreur.classList.remove('visible');
        msgSucces.classList.add('visible');
        setTimeout(() => navigation('login'), 2000);

      } catch (erreur) {
        console.error(erreur);
        msgErreur.textContent = 'Erreur serveur. Vérifiez que le serveur est lancé.';
        msgErreur.classList.add('visible');
      }
    });
  }

  const tousLesChamps = [inputPrenom, inputNom, inputEmail, inputTel, inputMdp, inputConfirm];
  tousLesChamps.forEach(champ => {
    if (champ) {
      champ.addEventListener('input', () => {
        msgErreur?.classList.remove('visible');
      });
    }
  });

  if (lienLogin) lienLogin.addEventListener('click', () => navigation('Dashboard'));
  if (lienAccueil) lienAccueil.addEventListener('click', () => navigation(''));
};

export default Inscription;
