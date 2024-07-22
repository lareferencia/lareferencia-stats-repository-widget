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
2. Copiar y pega dentro de dicha etiqueta el siguiente script

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
   	scriptElement.defer = true;
   
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
  	"https://cdn.jsdelivr.net/gh/lareferencia/lareferencia-historic-widget@0.0.1/dist/historic-widget.js"
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
 			    value: "[[id del repositorio, por ejemplo opendoar::xxxx]]",
			},
   		scope_labels: { N: "[[Nombre Nodo Nacional]]" },
   		});
   </script>
   
   ```

3. Dicho script consta de dos partes, la primera es una función para cargar los archivos .js de cdn.jsdeliver ("https://cdn.jsdelivr.net/gh/lareferencia/lareferencia-historic-widget@0.0.1/dist/historic-widget.js"), el numero que sigue luego de la @ es la versión del widget, debe ser modificado cuando hayan actualizaciones disponibles.

4. La segunda parte es un objeto dentro de "window['lrhw]" que debe ser modificado con los repositorios que se quieren mostrar en el widget, a continuacion detallamos como modificarlos.

   ### 4. Configuracion de los repositorios a exhibir.

1. repositories_list, es un arreglo de objetos, cada objeto tiene un label, y un value.
      Reemplazar el valor del label quitando los [[]] con el nombre del repositorio, luego reemplazar el valor de value quitando los [[]] por el id del repositorio, por ejemplo:
      
   	```
       	{
	label:"[[Nombre del repositorio]]",
	value: "[[id del repositior, por ejemplo opendoar::xxxx]]",
    	}
	
	quedaria reemplazado por:
	
	{
	label:"Repositorio Institucional de la Universidad Carlos III de Madrid",
	value: "opendoar::912",
 	},
	```
    
      El widget posee un selector para cambiar de repositorios en tiempo real y ver las estadistcas, dichos repositorios estan tomados del arreglo repositories_list, por lo tanto agregar tantos objetos {} como repositorios se quiera mostrar.

2. default_repository, colocar aqui un unico objeto que sera el repositorio por default, es decir el que se va a mostrar en caso de no colocar ninguna lista de repositorios y a su vez el que se va a mostrar primero al entrar por primera vez al sitio. Ese repositroio, tambien debe ser colocado dentro del arreglo repositories_list ya que si no, no se mostrara en el selector de repositorios.

3. scope_labels: Reemplazar por el nombre correcto del Nodo Nacional, en caso contrario el widget mostrara "[[Nombre Nodo Nacional]]"
## Notas:
El widget ocupa el ancho y alto de la pantalla por lo tanto es ideal colocar el div en un lugar con suficiente espacio. Estamos trabajando, igualmente, en su capacidad responsive.