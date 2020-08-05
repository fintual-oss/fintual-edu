+++
aliases = []
author = "Juan Francisco Weitz"
categories = ["noticias"]
date = 2020-08-05T21:54:39Z
description = "El martes 4 de agosto Fintual estuvo caído un rato. Acá la explicación."
hide = true
image = "/uploads/2020-08-05/error.png"
title = "2020-08-05: Postmortem sitio de Fintual no disponible"
url = "/postmortem-2020-08-05"

+++
#### Summary

Actualización en el código hizo que colapsara base de datos dejando los sitios web intermitentes. Rollback a último binario que funcionaba bien mitigó momentáneamente el problema. Inicialmente parecía que exceso de requests caros a API por un partner había generado en colapso de db. Se procedió a hacer rollforward de binario con problemas lo que volvió a colapsar db y se revirtió inmediatamente.    Lamentablemente ya habían quedado muchas queries pendientes en la DB (no son canceladas al cambiar de binario) agotando la CPU y conexiones disponibles. Se intentó publicar binario nuevo con arreglos pero al no haber conexiones heroku no realizó el release. Finalmente se procedió a matar manualmente las queries pegadas lo que liberó CPU/conexiones permitiendo el release del binario arreglado.

![](/uploads/2020-08-05/error.png)

#### Impact

* Sitios web públicos y privados intermitente durante 3 hrs (70% availability):
* API: 814 requests fallidos
* Web: 1180 requests fallidos
* Como afectó al admin también se vio afectado atención por chat
* Página de error con chat no se mostró en ciertos casos

#### Root cause

En PR se introdujo una query cuya ejecución tomaba minutos en vez de mili-segundos y la db tenía mal configurado el timeout para queries. Esto hizo que se acumularan dichas queries en exceso agotando CPU y conexiones disponibles.

#### Resolution

Matamos manualmente las queries pegadas lo que liberó CPU/conexiones permitiendo el release del binario arreglado.

#### Detection

Alerta de carga de db y posteriormente usuarios avisando por chat

#### Action items

* Corregir el statement_timeout de la db para evitar acumular queries lentas
* Más recursos para DB, no debería saturarse con requests pesados a api
* Página de error tiene que tener chat simplificado que no dependa de db

  Agregar a buenas prácticas:
* Cambios a queries de alto impacto tienen que estar flag guarded
* Índices nuevos tienen que estar en PRs solos

### Lessons Learned

#### What went well

* Alerta de db alertó al equipo que inmediatamente se puso a revisar.
* Lista de cambios automática en cada release facilita identificación de problemas.
* Comunicación y apoyo del equipo facilitaron llegar a una resolución rápida.
* Scout logró mostrar query problemática.

#### What went wrong

* Partner hizo exceso de request a la misma hora del release con problemas. Usualmente lo hacen a las 6am y siempre utilizan db al 100%. Esto agravó el problema al utilizar la db al 100% en hora punta dificultando la identificación del problema real. Incluso sin el release malo esto hubiese afectado al sitio web.
* Base de datos tenía configurado un timeout para queries excesivamente largo causando que se acumularan y agotaran las conexiones.
* Heroku no logró hacer release de binario arreglado, ya que no había conexiones a db disponibles. La necesita para verificar que no necesita hacer migraciones de db antes del release.
* Como la cpu de la DB estaba a 100% todas las queries se volvieron lentas dificultando la detección de la query culpable.
* Un cambio introdujo un índice a la db, eso produjo confusión, ya que antes habían causado problemas (no deberia esta vez por strong migrations) pero no teníamos forma de verificar rápido.

#### Where we got lucky

* Solo se afectó disponibilidad de sitios web. No hubo que reparar datos.