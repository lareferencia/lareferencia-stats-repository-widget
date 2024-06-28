# LA Referencia historic widget

## Instalacíon

### 1. Etiqueta HTML y renderizado

1. Ubicar el lugar del HTML donde se desee incrustrar el widget.
2. Colocar una etiqueta, por ejemplo <div> con el id "lrhw-widget" (dentro de esa etiqueta se renderizará el widget), quedará de esta forma:
   
   ```
   <div id="lrhw-widget"></div>
   ```

### 2. Script que utiliza los archivos Javascript

1. Ubicar la etiqueta <body>, posiblemente dentro de "index.html"
2. Copiar y pega dentro de dicha etiqueta el siguiente <script></script>

   ```
    <script>

   (function (window, document, scriptTag, globalVar, paramsKey, cdnUrl) {
   	window[globalVar] = window[globalVar] || function () {
   	window[globalVar][paramsKey] = window[globalVar][paramsKey] || {};
   	Object.assign(window[globalVar][paramsKey], arguments[0] || {});
   };
   
	const scriptElement = document.createElement(scriptTag);
   	scriptElement.id = globalVar;
   	scriptElement.src = cdnUrl;
   	scriptElement.type = 'module';
   	scriptElement.defer = true; // Use defer instead of async if appropriate
   
   	scriptElement.onerror = function() {
 	console.error(`Failed to load script ${scriptElement.src}`);
	};
   
   	const firstScript = document.getElementsByTagName(scriptTag)[0];
	firstScript.parentNode.insertBefore(scriptElement, firstScript);
  	})(
   	window,
   	document,
	"script",
   	"lrhw",
	"parameters",
  	"https://cdn.jsdelivr.net/gh/lareferencia/lrw@1.1.5/dist/lrw.js"
   	);
   	window['lrhw']({
    		widget_div_id: "lrhw-widget",
   		repositories_list: [
   			{
   			label:"[[Nombre del repositorio]]",
   			value: "[[id del repositior, por ejemplo opendoar::xxxx]]",
   			},
   			{
   			label:"[[Nombre del repositorio]]",
   			value: "[[id del repositior, por ejemplo opendoar::xxxx]]",
   			},
   		],
    		default_repository:
   			{
   			label:"[[Nombre del repositorio]]",
 			value: "[[id del repositior, por ejemplo opendoar::xxxx]]",
			},
   		scope_labels:
   		{
    			N: "[[Nombre Nodo Nacional]]",
   		},
   		});
   </script>
   
   ```

   3. Dicho script consta de dos partes, la primera es una función para cargar los archivos .js de cdn.jsdeliver ("https://cdn.jsdelivr.net/gh/lareferencia/lrw@1.1.5/dist/lrw.js"), el numero que sigue luego de la @ es la versión del widget, debe ser modificado cuando hayan actualizaciones disponibles.

   4. La segunda parte es un objeto dentro de "window['lrhw]" que debe ser modificado con los repositorios que se quieren mostrar en el widget, a continuacion detallamos como modificarlos.

   ### 4. Configuracion de los repositorios a exibir.

   1. repositories_list, es arreglo de objetos, cada objeto tiene un label, y un value.
      Reemplazar el valor de label quitando los [[]] con el nombre del repositorio, luego reemplazar el valor de value quitando los [[]] por el id del repositorio, por ejemplo
      
   	```
       	{
	    label:"[[Nombre del repositorio]]",
		value: "[[id del repositior, por ejemplo opendoar::xxxx]]",
	}
	
	Por ejemplo, Reemplazar por:
	
	{
	    label:"Repositorio Institucional de la Universidad Carlos III de Madrid",
		value: "opendoar::912",
	
 	},
	```
      El widget posee un selector para cambiar de repositorios en tiempo real y ver las estadistcas, dichos repositorios estan tomados de ese arreglo, por lo tanto agregar tantos objetos {} como se quiera.

3. default_repository, colocar aqui el repositorio por default, es decir el repositorio que primero se va a mostrar al entrar en el widget. Por otro lado, si no se colocan repositorios en repositories_list, solo se mostrara el que este por default, es decir el que este en default_repository. Por lo tanto este parametro no debe estar nunca vacio.
   Aclaracion: El repositorio colocado aqui, puede estar tambien incluido dentro de la lista de repositories_list, recomendable.
