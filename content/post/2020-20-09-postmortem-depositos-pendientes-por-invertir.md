+++
aliases = []
author = "Daniel Martínez"
categories = ["noticias"]
date = 2020-09-21T20:54:39Z
description = "El martes 20 de septiembre se mostraron por error los depósitos por invertir. Acá el detalle del bug."
hide = true
image = "/uploads/2020-09-03/logo-post.png"
title = "2020-22-09: Postmortem depósitos pendientes por invertir"
url = "/postmortem-2020-22-09"

+++
#### Summary

Debido a un proceso de refactoring de código que hemos estado realizando en este último mes, tuvimos un problema en una de las queries internas que se encargaba de mostrar a los usuarios los depósitos pendientes de ser invertidos.

Este bug interno, que se introdujo en un pull request de la fase 3 de este refactoring, fue enviado hoy en la mañana a producción y rápidamente recibimos alertas de nuestros usuarios sobre esta situación. 

Afortunadamente logramos encontrar rápidamente el problema, que afectaba solo a la UI (parte visual que ve el usuario) y no a otros procesos internos en nuestro backend.

#### Impact

Esto afectó a usuarios que no tenían depósitos pendientes de ser invertidos, y causó que le aparecieran depósitos que no correspondían. En cualquier caso, no se podían realizar acciones sobre estos depósitos pendientes de otros usuarios debido.

#### Resolution

Se procedió a hacer rollback en el momento, al anterior estado estable. Se hizo revert del PR con problemas y se notificó a los usuarios afectados vía Chat.

#### Detection

Usuarios avisando por chat.

#### Action items

*  Se consideró mejorar los scopes de ciertos usos de la query con problemas, para así evitar que esto pueda volver a ocurrir, usando una capa extra de seguridad a la hora de armar la query.
* Se consideró mejorar la query con problemas, mejorando los filtros soportados y su semántica, para poder usarlos de forma correcta.

### Lessons Learned

#### What went well

La reacción del equipo fue muy rápida, todos ayudando en los procesos que se ejecutaron para volver a la última versión estable, y también ayudando en el chat para aclarar la situación.

La detección del PR con el problema fue muy rápida, los que nos permitió poco después conversar sobre qué había ocurrido y los detalles específicos para su arreglo.

#### What went wrong

Usuarios vieron depósitos que no les correspondían por aproximadamente 20 minutos.

Tuvimos un aumento de chats debido a preguntas relacionadas a este incidente.

La atención de parte del equipo se movió hacia este problema por aproximadamente 30 minutos.

#### Where we got lucky

La información filtrada solo correspondía a montos y no había relación alguna con información privada de usuarios.

Ninguna acción errónea o maliciosa fue realiza sobre estos depósitos, ya que habían todas las validaciones correspondientes a nivel de backend.