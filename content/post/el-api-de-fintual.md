---
author: Agustín Feuerhake
author_thumbnail: "/uploads/agustin_feuerhake.jpg"
date: 2018-11-30 13:01:31 +0000
description: Fintual es la primera Administradora General de Fondos en ofrecer un
  API para acceder a sus datos. Aquí una descripción de cómo usarla.
image: "/uploads/api-fintual.png"
title: El API de Fintual
categories:
- noticias
url: "/el-api-de-fintual/"

---
En Fintual somos más ingenieros de software que comerciales / financieros así que no podíamos pasar demasiado tiempo sin ofrecer un API.

![](/uploads/api-fintual.png)

Aunque no teníamos claro para qué podría llegar a usarse, liberamos una primera versión:

Para documentar nuestra API usamos Swagger y la dejamos en este URL https://fintual.cl/api-docs

Hay una parte pública que tiene que ver con información de nuestros fondos y una parte privada que tiene más que ver con cuánta plata tiene un usuario en un momento dado.

### **La parte pública**

Fintual tiene 3 fondos. A cada persona que invierte en Fintual se le ofrece una combinación distinta de estos 3 fondos. Cada uno tiene un "valor cuota" que básicamente es como el "precio de la acción" del fondo y se actualiza una vez al día.

**Conservative Clooney:** principalmente renta fija. id: 188

Ej: Su valor cuota diario durante Julio en JSON: [https://fintual.cl/api/real_assets/188/days?from_date=2018-07-01&to_date=2018-07-31](https://fintual.cl/api/real_assets/188/days?from_date=2018-07-01&to_date=2018-07-31 "https://fintual.cl/api/real_assets/188/days?from_date=2018-07-01&to_date=2018-07-31")

**Moderate Pit:** la justa mezcla de renta fija y ETFs accionarios. id: 187

Ej: Su valor cuota diario antes de Julio en JSON: [https://fintual.cl/api/real_assets/187/days](https://fintual.cl/api/real_assets/187/days "https://fintual.cl/api/real_assets/187/days")[?to_date=2018-07-31](https://fintual.cl/api/real_assets/187/days?to_date=2018-07-31 "https://fintual.cl/api/real_assets/187/days?to_date=2018-07-31")

**Risky Norris:** casi solamente ETFs accionarios. id: 186

Ej: Su valor cuota diario desde Julio en JSON: [https://fintual.cl/api/real_assets/186/days?from_date=2018-07-01](https://fintual.cl/api/real_assets/186/days?from_date=2018-07-01 "https://fintual.cl/api/real_assets/186/days?from_date=2018-07-01")

### **La parte privada**

Para acceder a la parte privada hay que tener una cuenta en Fintual (duh!)

Lo primero es obtener un Token haciendo POST a la url

https://fintual.cl/api/access_tokens

con un header ContentType: application/json y un body así:

    {
     "user": {
       "email": "tuemail@shemail.com",
       "password": "nombredelgato92"
         }
     }

Ahí la API te devolverá un token que tienes que agregar en el resto de las llamadas como un parámetro "user_token" (además de user_email)

**Ejemplo que no funciona porque no tiene un token válido** (a menos que estés logeado en tu cuenta de Fintual en este navegador):

https://fintual.cl/api/goals?user_token=ESTONOESUNTOKENVALIDO&user_email=tuemail@shemail.com

Eso por el momento! saludos y suerte.

Ah, te dejo esto que hizo Oscar Estay usando el API pública. [https://www.fintual-charts.oscarestay.dev/](https://www.fintual-charts.oscarestay.dev/ "https://www.fintual-charts.oscarestay.dev/")
 {{< newsletter_signup >}}