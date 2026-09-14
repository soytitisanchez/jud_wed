# Judweb

Plataforma gratuita para prepararse para el ingreso al Poder Judicial. Reúne en un solo lugar:

- **Cuadernillo 2026** — teoría por tema, videos cortos, práctica y examen general (`apps/cuadernillo`).
- **Corrector de textos judiciales** — 1000 ejercicios de ortografía contra reloj (`apps/corrector`).
- **Mecanografía** — práctica de velocidad y precisión de tipeo (`apps/mecanografia`).

`index.html` es el **hub** desde donde se accede a las tres.

## Cómo probarla ahora mismo

Simplemente abrí `index.html` con doble clic en cualquier navegador (Chrome, Edge, Firefox, Safari). No necesita
instalación, servidor ni conexión a internet para funcionar — salvo los videos de YouTube dentro del Cuadernillo,
que sí requieren datos o wifi para reproducirse.

## Cómo publicarla como página web (para que funcione "sin internet" luego de instalada)

Para que el botón **"Instalar Judweb"** aparezca y para que quede disponible sin conexión después de la primera
visita (gracias al *service worker*, `sw.js`), el sitio tiene que estar servido por **https** — los navegadores no
habilitan estas funciones cuando el archivo se abre directo desde el disco (`file://`).

Opciones gratuitas para publicarla así, subiendo esta misma carpeta tal cual:

- **GitHub Pages**: subí la carpeta a un repositorio y activá Pages en la configuración del repo.
- **Netlify** o **Vercel**: arrastrás la carpeta a su panel y te dan una URL https en segundos.

Una vez publicada:

1. Se entra a la URL con internet la primera vez.
2. En el celular (Android/Chrome) aparece el botón para instalar, o "Agregar a la pantalla de inicio" desde el
   menú del navegador. En iPhone (Safari), se instala desde *Compartir → Agregar a inicio*.
3. De ahí en adelante, Judweb se abre como una app, con ícono propio, y funciona sin gastar datos.

## Estructura de archivos

```
judweb/
├── index.html                 ← página principal (hub)
├── manifest.webmanifest       ← metadatos de la app instalable
├── sw.js                      ← service worker (caché offline)
├── assets/                    ← íconos
└── apps/
    ├── cuadernillo/index.html
    ├── corrector/index.html, style.css, script.js
    └── mecanografia/index.html
```

## Personalización

Cada app sigue siendo independiente y editable por separado (ver los README originales de cada una si los tenía).
El botón "← Judweb" que aparece flotando en cada app vuelve al hub (`../../index.html`).
