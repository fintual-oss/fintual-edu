+++
aliases = []
author = "Francesca Finaldi"
categories = ["educación financiera"]
date = 2020-06-18T21:36:23Z
description = "La gracia de esto es que es fácil y vas a poder hacerlo incluso si no sabes programar :)"
draft = true
hide = false
image = ""
title = "Usando la API de Fintual: importar fondos desde Google Spreadsheets"
url = "/usar-la-api-de-fintual-google-spreadsheets"

+++
Un cliente de Fintual, Tomás Campos, usa harto la API de Fintual y se motivó a hacer un tutorial para que cualquier persona pueda importar fondos a una planilla de Google Spreadsheets.

La gracia de esto es que es fácil y vas a poder hacerlo incluso si no sabes programar :)

1. Crea un nuevo libro en Google Spreadsheets

![](/uploads/2020-06-18/tutorial1.png)

2. Antes de poder consumir la API tienes que solicitar tu token de usuario. Para esto tienes que ir a **Herramientas → Editor de Secuencia de Comandos.  
   ![](/uploads/2020-06-18/tutorial2.png)**
3. Le pones un nombre al nuevo proyecto y copias este código remplazando el mail y contraseña tu usuario en Fintual:

       function GetToken() {  
         var url = "https://fintual.cl/api/access_tokens";
         var data = {
           "user": {
             "email": "MAILREGISTRADOENFINTUAL",
             "password": "CLAVEDEUSUARIO"
           }
         }
         var options = {
           'method' : 'post',
           'contentType': 'application/json',
           // Convert the JavaScript object to a JSON string.
           'payload' : JSON.stringify(data)
         }
         var response = UrlFetchApp.fetch(url, options);
         Logger.log(response.getContentText());
       }

   Debería verse así:  
   ![](/uploads/2020-06-20/tutorial3.png)

   4\. Le das play ► y te va a pedir los permisos necesarios para correr el código desde tu cuenta en Gmail. Si te sale este mensaje tienes que hacer clic en **Configuración Avanzada** y luego ir al **NombredeTuProyecto  
   ![](/uploads/2020-06-20/tutorial4.png)**