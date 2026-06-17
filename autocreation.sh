#!/bin/bash

read -p "SA tourou page lanla: " NOM

if [ -z "$NOM" ]; then
  echo "DIOKHEL TOUR BI"
  exit 1
fi


DOSSIER_PAGE="src/Pages/$NOM"
FICHIER_JS="$DOSSIER_PAGE/$NOM.js"
ROUTER="src/JS/router.js"
NOM_LOWER=$(echo "$NOM" | tr '[:upper:]' '[:lower:]')

if [ -d "$DOSSIER_PAGE" ]; then
  echo "Le dossier '$DOSSIER_PAGE' amna ba parer"
  exit 1
fi

mkdir -p "$DOSSIER_PAGE"
echo "Dossier créé : $DOSSIER_PAGE"

cat > "$FICHIER_JS" << JSEOF
import { navigation, logout } from '../../JS/router.js';

function $NOM() {
  return \`
    <div>
      <h1>DIADIEUF depuis $NOM</h1>
    </div>
  \`;
}

$NOM.afterRender = () => {};

export default $NOM;
JSEOF
echo "Fichier JS créé : $FICHIER_JS"

# sed -i "s/const mesPages=\['/const mesPages=['$NOM', '/" "$ROUTER"

sed -i "s/const chemins = {/const chemins = {\n  '$NOM_LOWER' : '$NOM',/" "$ROUTER"

