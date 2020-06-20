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

1. Crea un nuevo libro en Google Spreadsheets. Hack: entra a tu cuenta Gmail, escribe **sheets.new** en el navegador y dale enter.  
   ![](/uploads/2020-06-20/tutorials1.png)
2. Antes de poder consumir la API tienes que solicitar tu token de usuario. Para esto tienes que ir a **Herramientas → Editor de Secuencia de Comandos.  
   ![](/uploads/2020-06-20/tutorials2.png)**
3. Le pones un nombre al nuevo proyecto y copias este código remplazando el mail y contraseña tu usuario en Fintual:

       function GetToken() {  
         var url = "https://fintual.cl/api/access_tokens";
         var data = {
           "user": {
             "email": "MailQueUsasEnFintual",
             "password": "TuContraseñaMuySegura"
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
   ![](/uploads/2020-06-20/tutorials3.png)
4. Haz clic en ► y te va a pedir los permisos necesarios para correr el código desde tu cuenta en Gmail. Si te sale un mensaje de alerta tienes que hacer clic en **Configuración Avanzada** y luego ir al **NombredeTuProyecto**
5. Dale al botón ► de nuevo. Una vez ejecutado vas a **Ver → Registros** y vas a ver una ventana como esta con tu token:

![](/uploads/2020-06-20/tutorials4.png)  
Selecciona lo que está entre comillas.  
 6. Una vez que tengas el token, vas a la función GetToken() y pegas este código, reemplazando el token y tu mail:

    function GetFintualFunds() {  
      var url = "https://fintual.cl/api/goals?user_token=PEGARTOKEN&user_email=REMPLAZARCONMAIL";
      var response = UrlFetchApp.fetch(url);
      var json = JSON.parse(response);
      var date = new Date();
      var ss = SpreadsheetApp.getActive().getSheetByName('FondosFintual');
      
      var oldTotal= ss.getRange('H2').getValue();
      var newTotal = 0;
      
      for (var i in json.data) {
        newTotal= newTotal + json.data[i].attributes['nav']
      }
    
      if (newTotal!=oldTotal){
        ss.insertRowBefore(2)
        ss.getRange('3:3').copyTo(ss.getRange('2:2'))
        ss.getRange('A2').setValue(date)
        
        for (var i in json.data) {
          ss.getRange('B2:G2').getCell(1,Number(i)+1).setValue(json.data[i].attributes['nav'])
        }
      }
    }