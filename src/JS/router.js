const mesPages=['accueil','Login', 'Inscription', 'Dashboard'];

const chemins = {
    '/' : 'accueil',
    'login' : 'Login',
    'dashboard' : 'Dashboard',
}

const pageProteger=['dashboard'];

function isLoggedIn(){
    return sessionStorage.getItem('isLoggedIn') === 'true';
}

let cheminActuel = null;

const afficher = async (chemin) => {
    if (chemin === cheminActuel) return;
    cheminActuel = chemin;

    const app = document.getElementById('app');
    if(!app) return;

    const pageName= chemins[chemin];
    if (pageProteger.includes(pageName) && isLoggedIn()){
        cheminActuel = null;
        location.hash = 'login';
        return;
    }

    let pageModule;

    try {
        if(!pageName || !mesPages.includes(pageName)){
            pageModule = await import('../Pages/NotFound/NotFound.js');
        } else {
            pageModule = await import(`../Pages/${pageName}/${pageName}.js`);
        }
        const page = pageModule.default;
        app.innerHTML = page();
        page.afterRender?.();
    } catch (error) {
        console.error(`Erreur de chargement : ${error}`);
        app.innerHTML = '<h1>Erreur technique</h1>';
    }
};

const navigation = (chemin) => {
    location.hash = chemin;
};

const logout = () =>{
    sessionStorage.removeItem('isLoggedIn');
    cheminActuel = null;
    navigation('login');
}

const handleHashChange = async () => {
    const chemin = window.location.hash.replace('#', '') || '/';
    await afficher(chemin);
};

const initRouter = () => {
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
};

export { initRouter, navigation, logout, isLoggedIn };



