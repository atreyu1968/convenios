# Inicializa un repositorio en la carpeta del proyecto
git init

# Agrega los archivos al staging
git add .

# Haz el primer commit
git commit -m "Primer commit del juego de convenios colectivos"

# Enlaza el repositorio local con el remoto en GitHub
git remote add origin https://github.com/tu-usuario/proyecto-convenios.git

# Sube los cambios a GitHub
git push -u origin master
