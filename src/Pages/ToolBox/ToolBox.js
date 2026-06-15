import { navigation, logout } from '../../JS/router.js';


function rendreSidebar(pageActive) {
  const liens = [
    { section: 'Menu' },
    { chemin: 'dashboard',  icone: '📊', label: 'Dashboard' },
    { section: 'Formation' },
    { chemin: 'academy',    icone: '🎓', label: 'Academy' },
    { chemin: 'challenges', icone: '🏆', label: 'Challenges' },
    { section: 'Outils' },
    { chemin: 'commandes',  icone: '💻', label: 'Cyber Command Explorer' },
    { chemin: 'toolbox',    icone: '🧰', label: 'Cyber Toolbox' },
    { section: 'SOC' },
    { chemin: 'soc',        icone: '🛡️', label: 'SOC Center' },
    { chemin: 'services',   icone: '🔧', label: 'Services Hub' },
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
  const utilisateur = utilisateurJSON ? JSON.parse(utilisateurJSON) : null;
  const prenom   = utilisateur?.prenom || 'Admin';
  const role     = utilisateur?.role   || 'Utilisateur';
  const initiale = prenom.charAt(0).toUpperCase();

  return `
    <aside class="menu-lateral">
      <div class="menu-logo">Cyber<span>Sphere</span></div>
      <nav class="menu-nav">${liensHTML}</nav>
      <div class="menu-profil">
        <div class="menu-profil-avatar">${initiale}</div>
        <div>
          <div class="menu-profil-nom">${prenom}</div>
          <div class="menu-profil-role">${role}</div>
        </div>
        <button class="menu-profil-logout" id="btn-logout" title="Se déconnecter">⏻</button>
      </div>
    </aside>
  `;
}


function Toolbox() {
  return `
    <link rel="stylesheet" href="./src/css/dashboard.css">
    <link rel="stylesheet" href="./src/css/toolbox.css">

    <div class="disposition">

      ${rendreSidebar('toolbox')}

      <main class="contenu-principal">

        <div class="topbar">
          <div>
            <div class="topbar-titre">Cyber Toolbox</div>
            <div class="topbar-sous-titre">Outils utilitaires pour vos missions de cybersécurité</div>
          </div>
        </div>

        <div class="toolbox-banner">
          <div>
            <div class="toolbox-banner-titre">🧰 Vos outils à portée de clic</div>
            <p class="toolbox-banner-desc">
              Générateurs, encodeurs, calculateurs réseau — tout ce dont vous avez besoin.
            </p>
          </div>
          <div class="toolbox-banner-emoji">🔧</div>
        </div>

        <div class="grille-outils">

          <div class="carte-outil">
            <div class="carte-outil-entete">
              <div class="carte-outil-icone" style="background:#eff6ff;">🔑</div>
              <div>
                <div class="carte-outil-nom">Générateur de mot de passe</div>
                <div class="carte-outil-desc">Créez des mots de passe sécurisés</div>
              </div>
            </div>
            <div class="carte-outil-corps">
              <label class="outil-label">Longueur</label>
              <div class="slider-row">
                <input type="range" id="mdp-longueur" min="8" max="64" value="16">
                <span class="slider-valeur" id="mdp-longueur-val">16</span>
              </div>
              <div class="options-row">
                <label class="option-check">
                  <input type="checkbox" id="mdp-maj" checked> Majuscules
                </label>
                <label class="option-check">
                  <input type="checkbox" id="mdp-min" checked> Minuscules
                </label>
                <label class="option-check">
                  <input type="checkbox" id="mdp-chiffres" checked> Chiffres
                </label>
                <label class="option-check">
                  <input type="checkbox" id="mdp-symboles" checked> Symboles
                </label>
              </div>
              <button class="btn-outil" id="btn-generer-mdp">Générer</button>
              <label class="outil-label">Résultat</label>
              <div class="resultat-box" id="resultat-mdp">—</div>
            </div>
          </div>

          <div class="carte-outil">
            <div class="carte-outil-entete">
              <div class="carte-outil-icone" style="background:#f0fdf4;">🛡️</div>
              <div>
                <div class="carte-outil-nom">Analyse de mot de passe</div>
                <div class="carte-outil-desc">Évaluez la robustesse</div>
              </div>
            </div>
            <div class="carte-outil-corps">
              <label class="outil-label">Mot de passe à analyser</label>
              <input class="outil-input" type="text" id="analyse-mdp" placeholder="Tapez un mot de passe...">
              <div class="force-barre-piste">
                <div class="force-barre-remplissage" id="force-barre" style="width:0%;background:#E24B4A;"></div>
              </div>
              <div class="force-label" id="force-label">—</div>
              <div class="force-details" id="force-details"></div>
            </div>
          </div>


          <div class="carte-outil">
            <div class="carte-outil-entete">
              <div class="carte-outil-icone" style="background:#fdf4ff;">🔄</div>
              <div>
                <div class="carte-outil-nom">Base64 Encode / Decode</div>
                <div class="carte-outil-desc">Encodage et décodage</div>
              </div>
            </div>
            <div class="carte-outil-corps">
              <label class="outil-label">Texte source</label>
              <input class="outil-input" type="text" id="base64-input" placeholder="Entrez du texte...">
              <div class="btn-row">
                <button class="btn-outil" id="btn-encoder">Encoder →</button>
                <button class="btn-outil-secondaire" id="btn-decoder">← Décoder</button>
              </div>
              <label class="outil-label">Résultat</label>
              <div class="resultat-box" id="resultat-base64">—</div>
            </div>
          </div>

          <div class="carte-outil">
            <div class="carte-outil-entete">
              <div class="carte-outil-icone" style="background:#fff7ed;">🔐</div>
              <div>
                <div class="carte-outil-nom">Générateur de Hash</div>
                <div class="carte-outil-desc">SHA-1, SHA-256, SHA-512</div>
              </div>
            </div>
            <div class="carte-outil-corps">
              <label class="outil-label">Texte à hasher</label>
              <input class="outil-input" type="text" id="hash-input" placeholder="Entrez du texte...">
              <div class="hash-options">
                <button class="hash-opt" data-algo="SHA-1">SHA-1</button>
                <button class="hash-opt actif" data-algo="SHA-256">SHA-256</button>
                <button class="hash-opt" data-algo="SHA-512">SHA-512</button>
              </div>
              <button class="btn-outil" id="btn-hasher">Générer le hash</button>
              <label class="outil-label">Résultat</label>
              <div class="resultat-box" id="resultat-hash">—</div>
            </div>
          </div>

          <div class="carte-outil">
            <div class="carte-outil-entete">
              <div class="carte-outil-icone" style="background:#f0f9ff;">🌐</div>
              <div>
                <div class="carte-outil-nom">Calculateur CIDR</div>
                <div class="carte-outil-desc">Calcul de plages réseau</div>
              </div>
            </div>
            <div class="carte-outil-corps">
              <label class="outil-label">Adresse réseau CIDR</label>
              <input class="outil-input" type="text" id="cidr-input" placeholder="ex: 192.168.1.0/24">
              <button class="btn-outil" id="btn-calculer-cidr">Calculer</button>
              <div class="cidr-grille" id="cidr-resultat" style="display:none;">
                <div class="cidr-item">
                  <div class="cidr-cle">Masque</div>
                  <div class="cidr-val" id="cidr-masque">—</div>
                </div>
                <div class="cidr-item">
                  <div class="cidr-cle">Réseau</div>
                  <div class="cidr-val" id="cidr-reseau">—</div>
                </div>
                <div class="cidr-item">
                  <div class="cidr-cle">Broadcast</div>
                  <div class="cidr-val" id="cidr-broadcast">—</div>
                </div>
                <div class="cidr-item">
                  <div class="cidr-cle">Hôtes disponibles</div>
                  <div class="cidr-val" id="cidr-hotes">—</div>
                </div>
              </div>
            </div>
          </div>

          <div class="carte-outil">
            <div class="carte-outil-entete">
              <div class="carte-outil-icone" style="background:#f0f9ff;">🌍</div>
              <div>
                <div class="carte-outil-nom">Lookup IP</div>
                <div class="carte-outil-desc">Géolocalisation et infos réseau</div>
              </div>
            </div>
            <div class="carte-outil-corps">
              <label class="outil-label">Adresse IP à analyser</label>
              <input class="outil-input" type="text" id="lookup-input" placeholder="ex: 8.8.8.8">
              <button class="btn-outil" id="btn-lookup">Analyser</button>
              <div id="lookup-resultat" style="display:none;">
                <div class="cidr-grille">
                  <div class="cidr-item">
                    <div class="cidr-cle">Pays</div>
                    <div class="cidr-val" id="lookup-pays">—</div>
                  </div>
                  <div class="cidr-item">
                    <div class="cidr-cle">Ville</div>
                    <div class="cidr-val" id="lookup-ville">—</div>
                  </div>
                  <div class="cidr-item">
                    <div class="cidr-cle">FAI</div>
                    <div class="cidr-val" id="lookup-fai">—</div>
                  </div>
                  <div class="cidr-item">
                    <div class="cidr-cle">Organisation</div>
                    <div class="cidr-val" id="lookup-org">—</div>
                  </div>
                  <div class="cidr-item">
                    <div class="cidr-cle">Timezone</div>
                    <div class="cidr-val" id="lookup-timezone">—</div>
                  </div>
                  <div class="cidr-item">
                    <div class="cidr-cle">Proxy / VPN</div>
                    <div class="cidr-val" id="lookup-proxy">—</div>
                  </div>
                </div>
              </div>
              <div id="lookup-erreur" style="display:none;color:var(--couleur-erreur);font-size:var(--taille-texte-sm);margin-top:var(--espacement-sm);"></div>
            </div>
          </div>

          <div class="carte-outil">
            <div class="carte-outil-entete">
              <div class="carte-outil-icone" style="background:#f0fdf4;">🔗</div>
              <div>
                <div class="carte-outil-nom">Encodeur / Décodeur URL</div>
                <div class="carte-outil-desc">Encode et décode les caractères spéciaux</div>
              </div>
            </div>
            <div class="carte-outil-corps">
              <label class="outil-label">Texte source</label>
              <input
                class="outil-input"
                type="text"
                id="url-input"
                placeholder="ex: hello world / %68%65%6C%6C%6F"
              >
              <div class="btn-row">
                <button class="btn-outil" id="btn-url-encoder">Encoder →</button>
                <button class="btn-outil-secondaire" id="btn-url-decoder">← Décoder</button>
              </div>
              <label class="outil-label">Résultat</label>
              <div class="resultat-box" id="resultat-url">—</div>
              <div style="margin-top:var(--espacement-sm);font-size:var(--taille-texte-xs);color:var(--texte-secondaire);">
                Utile pour tester les injections dans les paramètres d'URL
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  `;
}


function genererMotDePasse(longueur, maj, min, chiffres, symboles) {
  let caracteres = '';
  if (maj)      caracteres += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (min)      caracteres += 'abcdefghijklmnopqrstuvwxyz';
  if (chiffres) caracteres += '0123456789';
  if (symboles) caracteres += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (!caracteres) return 'Sélectionnez au moins une option';

  let mdp = '';
  for (let i = 0; i < longueur; i++) {
    mdp += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return mdp;
}

function analyserMotDePasse(mdp) {
  let score = 0;
  const details = [];

  if (mdp.length >= 8)  { score += 1; details.push('✅ Longueur suffisante'); }
  else                  { details.push('❌ Trop court (minimum 8 caractères)'); }

  if (mdp.length >= 16) { score += 1; details.push('✅ Très bonne longueur'); }

  if (/[A-Z]/.test(mdp)) { score += 1; details.push('✅ Majuscules présentes'); }
  else                    { details.push('❌ Pas de majuscules'); }

  if (/[a-z]/.test(mdp)) { score += 1; details.push('✅ Minuscules présentes'); }
  else                    { details.push('❌ Pas de minuscules'); }

  if (/[0-9]/.test(mdp)) { score += 1; details.push('✅ Chiffres présents'); }
  else                    { details.push('❌ Pas de chiffres'); }

  if (/[^A-Za-z0-9]/.test(mdp)) { score += 1; details.push('✅ Symboles présents'); }
  else                           { details.push('❌ Pas de symboles'); }

  let niveau, couleur, pourcentage;

  if (score <= 2)      { niveau = '🔴 Très faible'; couleur = '#E24B4A'; pourcentage = 20; }
  else if (score <= 3) { niveau = '🟠 Faible';      couleur = '#EF9F27'; pourcentage = 40; }
  else if (score <= 4) { niveau = '🟡 Moyen';       couleur = '#EF9F27'; pourcentage = 60; }
  else if (score <= 5) { niveau = '🟢 Fort';        couleur = '#639922'; pourcentage = 80; }
  else                 { niveau = '🟢 Très fort';   couleur = '#639922'; pourcentage = 100; }

  return { niveau, couleur, pourcentage, details };
}

function encoderBase64(texte) {
  return btoa(unescape(encodeURIComponent(texte)));
}

function decoderBase64(texte) {
  try {
    return decodeURIComponent(escape(atob(texte)));
  } catch {
    return '❌ Texte Base64 invalide';
  }
}

async function genererHash(texte, algo) {
  const encoder    = new TextEncoder();
  const data       = encoder.encode(texte);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  const hashArray  = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function calculerCIDR(cidr) {
  const [ip, prefixStr] = cidr.split('/');
  const prefix = parseInt(prefixStr);

  if (!ip || isNaN(prefix) || prefix < 0 || prefix > 32) return null;

  const ipParts = ip.split('.').map(Number);
  if (ipParts.length !== 4 || ipParts.some(p => p < 0 || p > 255)) return null;

  const masqueNum = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
  const masque = [
    (masqueNum >>> 24) & 255,
    (masqueNum >>> 16) & 255,
    (masqueNum >>> 8)  & 255,
     masqueNum         & 255,
  ].join('.');

  const ipNum     = (ipParts[0] << 24 | ipParts[1] << 16 | ipParts[2] << 8 | ipParts[3]) >>> 0;
  const reseauNum = (ipNum & masqueNum) >>> 0;
  const reseau    = [
    (reseauNum >>> 24) & 255,
    (reseauNum >>> 16) & 255,
    (reseauNum >>> 8)  & 255,
     reseauNum         & 255,
  ].join('.');

  const broadcastNum = (reseauNum | (~masqueNum >>> 0)) >>> 0;
  const broadcast    = [
    (broadcastNum >>> 24) & 255,
    (broadcastNum >>> 16) & 255,
    (broadcastNum >>> 8)  & 255,
     broadcastNum         & 255,
  ].join('.');

  const hotes = Math.max(0, Math.pow(2, 32 - prefix) - 2);

  return { masque, reseau, broadcast, hotes };
}

async function lookupIP(ip) {
  const reponse = await fetch(
    `http://ip-api.com/json/${ip}?fields=status,message,country,city,isp,org,timezone,proxy,hosting`
  );
  const data = await reponse.json();

  if (data.status === 'fail') {
    throw new Error(data.message || 'IP invalide');
  }

  return {
    pays:     data.country  || '—',
    ville:    data.city     || '—',
    fai:      data.isp      || '—',
    org:      data.org      || '—',
    timezone: data.timezone || '—',
    proxy:    data.proxy || data.hosting ? '⚠️ Oui détecté' : '✅ Non détecté',
  };
}

function encoderURL(texte) {
  try {
    return encodeURIComponent(texte);
  } catch {
    return '❌ Texte invalide';
  }
}

function decoderURL(texte) {
  try {
    return decodeURIComponent(texte);
  } catch {
    return '❌ URL encodée invalide';
  }
}


Toolbox.afterRender = () => {

  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) btnLogout.addEventListener('click', () => logout());

  document.querySelectorAll('.menu-lien[data-chemin]').forEach(lien => {
    lien.addEventListener('click', () => {
      const chemin = lien.dataset.chemin;
      if (chemin) navigation(chemin);
    });
  });

  const slider    = document.getElementById('mdp-longueur');
  const sliderVal = document.getElementById('mdp-longueur-val');
  const btnMdp    = document.getElementById('btn-generer-mdp');
  const resMdp    = document.getElementById('resultat-mdp');

  if (slider) {
    slider.addEventListener('input', () => {
      sliderVal.textContent = slider.value;
    });
  }

  if (btnMdp) {
    btnMdp.addEventListener('click', () => {
      const mdp = genererMotDePasse(
        parseInt(slider.value),
        document.getElementById('mdp-maj').checked,
        document.getElementById('mdp-min').checked,
        document.getElementById('mdp-chiffres').checked,
        document.getElementById('mdp-symboles').checked,
      );
      resMdp.textContent = mdp;
    });
  }

  const analyseMdp = document.getElementById('analyse-mdp');
  if (analyseMdp) {
    analyseMdp.addEventListener('input', () => {
      const mdp = analyseMdp.value;
      if (!mdp) {
        document.getElementById('force-barre').style.width = '0%';
        document.getElementById('force-label').textContent = '—';
        document.getElementById('force-details').innerHTML = '';
        return;
      }
      const { niveau, couleur, pourcentage, details } = analyserMotDePasse(mdp);
      document.getElementById('force-barre').style.width      = pourcentage + '%';
      document.getElementById('force-barre').style.background = couleur;
      document.getElementById('force-label').textContent      = niveau;
      document.getElementById('force-label').style.color      = couleur;
      document.getElementById('force-details').innerHTML      = details.join('<br>');
    });
  }

  const btnEncoder  = document.getElementById('btn-encoder');
  const btnDecoder  = document.getElementById('btn-decoder');
  const base64Input = document.getElementById('base64-input');
  const resBase64   = document.getElementById('resultat-base64');

  if (btnEncoder) {
    btnEncoder.addEventListener('click', () => {
      resBase64.textContent = encoderBase64(base64Input?.value || '');
    });
  }

  if (btnDecoder) {
    btnDecoder.addEventListener('click', () => {
      resBase64.textContent = decoderBase64(base64Input?.value || '');
    });
  }

  let algoActif = 'SHA-256';

  document.querySelectorAll('.hash-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.hash-opt').forEach(b => b.classList.remove('actif'));
      btn.classList.add('actif');
      algoActif = btn.dataset.algo;
    });
  });

  const btnHasher = document.getElementById('btn-hasher');
  const hashInput = document.getElementById('hash-input');
  const resHash   = document.getElementById('resultat-hash');

  if (btnHasher) {
    btnHasher.addEventListener('click', async () => {
      const texte = hashInput?.value || '';
      if (!texte) { resHash.textContent = '❌ Entrez du texte'; return; }
      resHash.textContent = 'Calcul en cours...';
      const hash = await genererHash(texte, algoActif);
      resHash.textContent = hash;
    });
  }

  const btnCIDR = document.getElementById('btn-calculer-cidr');
  if (btnCIDR) {
    btnCIDR.addEventListener('click', () => {
      const cidrInput = document.getElementById('cidr-input')?.value.trim();
      const resultat  = calculerCIDR(cidrInput);

      if (!resultat) {
        document.getElementById('cidr-resultat').style.display = 'none';
        document.getElementById('cidr-input').style.borderColor = '#E24B4A';
        return;
      }

      document.getElementById('cidr-input').style.borderColor   = '';
      document.getElementById('cidr-masque').textContent        = resultat.masque;
      document.getElementById('cidr-reseau').textContent        = resultat.reseau;
      document.getElementById('cidr-broadcast').textContent     = resultat.broadcast;
      document.getElementById('cidr-hotes').textContent         = resultat.hotes.toLocaleString();
      document.getElementById('cidr-resultat').style.display    = 'grid';
    });
  }

  const btnLookup   = document.getElementById('btn-lookup');
  const lookupInput = document.getElementById('lookup-input');

  if (btnLookup) {
    btnLookup.addEventListener('click', async () => {
      const ip = lookupInput?.value.trim();

      if (!ip) {
        const erreur = document.getElementById('lookup-erreur');
        erreur.textContent  = '❌ Entrez une adresse IP.';
        erreur.style.display = 'block';
        return;
      }

      btnLookup.textContent = 'Analyse en cours...';
      btnLookup.disabled    = true;
      document.getElementById('lookup-resultat').style.display = 'none';
      document.getElementById('lookup-erreur').style.display   = 'none';

      try {
        const infos = await lookupIP(ip);

        document.getElementById('lookup-pays').textContent     = infos.pays;
        document.getElementById('lookup-ville').textContent    = infos.ville;
        document.getElementById('lookup-fai').textContent      = infos.fai;
        document.getElementById('lookup-org').textContent      = infos.org;
        document.getElementById('lookup-timezone').textContent = infos.timezone;
        document.getElementById('lookup-proxy').textContent    = infos.proxy;
        document.getElementById('lookup-resultat').style.display = 'block';

      } catch (erreur) {
        const msgErreur      = document.getElementById('lookup-erreur');
        msgErreur.textContent  = `❌ ${erreur.message || 'Erreur lors de l\'analyse.'}`;
        msgErreur.style.display = 'block';

      } finally {
        btnLookup.textContent = 'Analyser';
        btnLookup.disabled    = false;
      }
    });
  }

  const btnURLEncoder = document.getElementById('btn-url-encoder');
  const btnURLDecoder = document.getElementById('btn-url-decoder');
  const urlInput      = document.getElementById('url-input');
  const resURL        = document.getElementById('resultat-url');

  if (btnURLEncoder) {
    btnURLEncoder.addEventListener('click', () => {
      resURL.textContent = encoderURL(urlInput?.value || '');
    });
  }

  if (btnURLDecoder) {
    btnURLDecoder.addEventListener('click', () => {
      resURL.textContent = decoderURL(urlInput?.value || '');
    });
  }
};

export default Toolbox;