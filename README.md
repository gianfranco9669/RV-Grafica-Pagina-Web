# RV Gráfica Integral - Sitio Web

Sitio estático multipágina diseñado para presentar los servicios de RV Gráfica Integral con una estética moderna inspirada en la referencia compartida por el cliente. Cada sección clave (ploteos, cartelería, vidrieras y contacto) cuenta con una página propia e interacciones diferenciadas para destacar los servicios.

## Estructura
- `index.html`: portada con hero enfocado en colectivos, panel de servicios, selector de flotas y simulador de alcance.
- `ploteos.html`: página dedicada a ploteos vehiculares con tabs de formatos, línea de tiempo interactiva y caso de estudio.
- `carteleria.html`: página con laboratorio de escenarios, calculadora de lúmenes y showcase de proyectos.
- `vidrieras.html`: página con comparador antes/después, tablero sensorial y flujo logístico.
- `contacto.html`: formulario de contacto, agenda de disponibilidad, FAQ interactivo y mapa embebido.
- `assets/css/styles.css`: hoja de estilos global con variaciones por página, layout responsivo y componentes compartidos.
- `assets/js/script.js`: lógica para el menú móvil, tabs, sliders, calculadoras y acordeones.
- `assets/img/`: carpeta para favicon, logo institucional en SVG (`logo.svg`) y futuras imágenes vectoriales de apoyo.

## Uso
Abrí cualquiera de las páginas HTML en tu navegador o serví el contenido con un servidor estático (por ejemplo, `npx serve`). El encabezado y pie permiten navegar entre secciones.

## Personalización
- Si querés reemplazar el isotipo, editá `assets/img/logo.svg` o reemplazalo por otro SVG manteniendo el nombre del archivo.
- Ajustá los textos, datos de contacto, enlaces de WhatsApp y redes sociales desde los archivos HTML.
- Actualizá las imágenes de fondo o agregá fotografías propias modificando las secciones relevantes en `styles.css`.
- Integra servicios de terceros (por ejemplo, formularios, CRM) conectando el formulario de `contacto.html` con tu backend preferido.

## Accesibilidad & Buenas prácticas
- Cada interacción cuenta con atributos `aria-` y estados activos para mejorar la experiencia con lector de pantalla.
- Los componentes son totalmente responsivos y adaptables a dispositivos móviles.
- Recordá optimizar las imágenes (logo y fotografías) para mejorar tiempos de carga.
Sitio estático de una sola página diseñado para presentar los servicios de RV Gráfica Integral. El proyecto prioriza la estética sobria y moderna inspirada en la propuesta visual de la marca y en referencias como FixerMix.

## Estructura
- `index.html`: página principal con secciones de bienvenida, servicios (ploteos, cartelería y vidrieras), metodología de trabajo y contacto.
- `assets/css/styles.css`: hoja de estilos con la paleta de colores institucional, componentes reutilizables y comportamiento responsive.
- `assets/js/script.js`: interacciones básicas como apertura del menú móvil, realce de navegación y actualización automática del año en el pie.
- `assets/img/favicon.svg`: ícono de la marca estilizado.

## Uso
Abrí el archivo `index.html` en tu navegador preferido o serví el contenido con cualquier servidor estático.

## Personalización
- Actualizá los textos, datos de contacto y enlaces de WhatsApp según corresponda.
- Reemplazá la imagen de fondo (definida en `styles.css`) o incorporá fotografías propias en los bloques destacados.
- Podés integrar un backend o servicio de terceros para gestionar el formulario de contacto.
