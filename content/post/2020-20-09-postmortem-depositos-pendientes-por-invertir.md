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

Debido a una mejora del código que hemos estado realizando en este último mes, tuvimos un problema en una de las consultas internas que se encargaba de mostrar a los usuarios los depósitos pendientes de ser invertidos.

Este bug interno fue enviado hoy en la mañana a producción y rápidamente recibimos alertas de nuestros usuarios sobre esta situación.

Afortunadamente logramos encontrar rápidamente el problema, que afectaba solo a la UI (parte visual que ve el usuario) y no a otros procesos internos en nuestro backend.

#### Impact

Esto afectó a usuarios que no tenían depósitos pendientes de ser invertidos, y causó que le aparecieran depósitos que no correspondían. En cualquier caso, no se podían realizar acciones sobre estos depósitos pendientes de otros usuarios.

#### Resolution

Se procedió a hacer rollback en el momento, al anterior estado estable. Se hizo revert del PR con problemas y se notificó a los usuarios afectados vía chat.

#### Detection

Usuarios avisando por chat.

#### Action items

En lo inmediato corregiremos la consulta que introdujo el error. 

Además, estamos considerando agregar más escenarios de prueba a nuestros tests de integración para evitar problemas similares en el futuro. Los tests de integración son pruebas automáticas que se ejecutan contra el código de Fintual simulando diferentes escenarios para detectar posibles errores. 

Este problema en particular se hubiese evitado, antes de llegar a producción, si hubiéramos tenido un test que pruebe que: "la vista de los objetivos de un usuario se ve correctamente cuando este no tiene depósitos pendientes de asignación".

#### Lessons Learned

#### What went well

La reacción del equipo fue muy rápida, todos ayudando en los procesos que se ejecutaron para volver a la última versión estable, y también ayudando en el chat para aclarar la situación.

La detección del PR con el problema fue muy rápida, lo que nos permitió poco después conversar sobre qué había ocurrido y los detalles específicos para su arreglo.

#### What went wrong

Usuarios vieron depósitos que no les correspondían por aproximadamente 20 minutos.

Tuvimos un aumento de chats debido a preguntas relacionadas a este incidente.

La atención de parte del equipo se movió hacia este problema por aproximadamente 30 minutos.

Durante el tiempo que duró el problema, los usuarios afectados pudieron ver nombres de objetivos de otros usuarios.

#### Where we got lucky

Ninguna acción errónea o maliciosa fue realiza sobre estos depósitos, ya que había todas las validaciones correspondientes a nivel de backend.