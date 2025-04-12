# Proyecto de Tarea: Manipulación del DOM y Llamadas AJAX

Este proyecto es una tarea escolar que tiene como objetivo aprender a manipular el DOM (Document Object Model) usando JavaScript, realizar llamadas AJAX para obtener datos dinámicos desde el servidor, y construir una interfaz interactiva con la que el usuario pueda interactuar. No es nada espectacular pero ya que estoy la subo a github y además en un año de experiencia jamás he tenido que parsear un xml para convertirlo en objeto, me resultó interesante :). Si la página se ve fea es porque tenía que hacerla asi :(

## Descripción del Proyecto

El propósito de este proyecto es crear una página web interactiva que permita manipular el contenido del DOM mediante JavaScript, como agregar, eliminar o modificar elementos HTML. Además, el proyecto hace uso de llamadas AJAX para obtener datos de un servidor de manera asincrónica, sin tener que recargar la página.

### Funcionalidades

1. **Manipulación del DOM**:
    
    * Crear elementos dinámicamente (como divs, botones, etc.).
        
    * Modificar el contenido de los elementos ya existentes.
        
    * Eliminar o agregar elementos al DOM de forma interactiva.
        
2. **Llamadas AJAX**:
    
    * Obtener datos de un servidor remoto sin recargar la página.
        
    * Mostrar los datos obtenidos en el DOM de forma interactiva.
        
    * Actualizar la UI con la información proveniente de la respuesta de AJAX.

### Tecnologías Usadas

* **HTML**: Para la estructura básica de la página.
    
* **CSS**: Para el estilo y presentación de la página.
    
* **JavaScript**:
    
    * Manipulación del DOM.
        
    * Llamadas AJAX utilizando `XMLHttpRequest` o `fetch`.


## Problema de CORS

Al intentar hacer una llamada a la API desde el navegador, puedes encontrarte con un error relacionado con **CORS (Cross-Origin Resource Sharing)**. Este error ocurre porque la API que estamos utilizando no permite solicitudes desde otros dominios (como el de tu servidor local) por razones de seguridad.

### Soluciones para manejar el error de CORS:

1. **Usar un servicio de proxy CORS**:
   Existen servicios gratuitos como **CORS Anywhere** ([https://cors-anywhere.herokuapp.com/](https://cors-anywhere.herokuapp.com/)) que permiten eludir la política de CORS haciendo la solicitud a través de su servidor. Sin embargo, este enfoque no es ideal para un entorno de producción debido a cuestiones de seguridad.

2. **Desactivar temporalmente CORS en el navegador** (solo para pruebas locales):
   Si solo necesitas realizar pruebas en tu entorno local, puedes desactivar la política de CORS en el navegador. Esto no es recomendado para producción, ya que puede ser riesgoso desde el punto de vista de seguridad. Si deseas hacerlo en **Google Chrome**, puedes iniciar el navegador con la opción `--disable-web-security`.

Recuerda que estos enfoques están orientados a solucionar problemas de CORS en el desarrollo local.