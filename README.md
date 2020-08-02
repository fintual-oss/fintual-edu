Para correr el proyecto es necesario tener [Hugo](https://gohugo.io/) instalado. Si no lo tienes, puedes correr:

```
brew install hugo
```

Si no tienes MacOS, lo lamento mucho, te recomiendo comprarte uno para no perder el tiempo.

O, puedes instalar Hugo en el Linux de turno de la siguiente forma:

- Instalando brew normalmente y luego instalando Hugo con el comando anterior.

También para Ubuntu existen estas opciones:

- sudo snap install hugo
- sudo apt  install hugo


Una vez hayas instalado Hugo, puedes hacer clone del proyecto y luego inicializar todos los submódulos corriendo este comando:

```
git submodule update --init --recursive
```

Luego puedes correr:

```
hugo server
```

Y con eso ya puedes partir editando Fintual Edu.
