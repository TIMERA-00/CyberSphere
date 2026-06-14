import { navigation } from '../../JS/router.js';

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
            Compte créé avec succès ! Redirection en cours...
          </div>

          <div class="champ-ligne">
            <div class="champ-groupe">
              <label class="champ-label" for="input-prenom">Prénom</label>
              <input class="champ-input" type="text" id="input-prenom" placeholder="Adama">
            </div>
            <div class="champ-groupe">
              <label class="champ-label" for="input-nom">Nom</label>
              <input class="champ-input" type="text" id="input-nom" placeholder="Timera">
            </div>
          </div>

          <div class="champ-groupe">
            <label class="champ-label" for="input-email">Email</label>
            <input class="champ-input" type="email" id="input-email" placeholder="hunterkey@gmail.com">
          </div>

          <div class="champ-groupe">
            <label class="champ-label" for="input-tel">Numéro de téléphone</label>
            <input class="champ-input" type="tel" id="input-tel" placeholder="+221 77 777 77 77">
          </div>

          <div class="champ-groupe">
            <label class="champ-label" for="input-mdp">Mot de passe</label>
            <input class="champ-input" type="password" id="input-mdp" placeholder="************">
          </div>

          <div class="champ-groupe">
            <label class="champ-label" for="input-mdp-confirm">Confirmer le mot de passe</label>
            <input class="champ-input" type="password" id="input-mdp-confirm" placeholder="************">
          </div>

          <button class="btn-soumettre" id="btn-inscrire">S'inscrire</button>

          <div class="inscription-liens">
            <button class="inscription-lien" id="lien-login"> Déjà un compte ? Se connecter </button>
            <span class="inscription-separateur">--------------- DIADIEUF ------------------</span>
            <button class="inscription-lien" id="lien-accueil"> <- Retour à l'accueil </button>
          </div>

        </div>
      </div>

    </div>
  `;
}

Inscription.afterRender = () => {
  const btnInscrire   = document.getElementById('btn-inscrire');
  const inputPrenom   = document.getElementById('input-prenom');
  const inputNom      = document.getElementById('input-nom');
  const inputEmail    = document.getElementById('input-email');
  const inputTel      = document.getElementById('input-tel');
  const inputMdp      = document.getElementById('input-mdp');
  const inputConfirm  = document.getElementById('input-mdp-confirm');
  const msgErreur     = document.getElementById('msg-erreur');
  const msgSucces     = document.getElementById('msg-succes');
  const lienLogin     = document.getElementById('lien-login');
  const lienAccueil   = document.getElementById('lien-accueil');

  if (btnInscrire) {
    btnInscrire.addEventListener('click', () => {

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

      msgErreur.classList.remove('visible');
      msgSucces.classList.add('visible');

      setTimeout(() => navigation('login'), 2000);
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


  if (lienLogin) {
    lienLogin.addEventListener('click', () => navigation('login'));
  }

  if (lienAccueil) {
    lienAccueil.addEventListener('click', () => navigation(''));
  }
};

export default Inscription;