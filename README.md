Para correr el proyecto es necesario tener [Hugo](https://gohugo.io/) instalado. Si no lo tienes, puedes correr:

```
brew install hugo
```

Si eres usuario Ubuntu, una de estas dos, según tu preferencia:

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
