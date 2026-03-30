# HYTORC Colombia — Sitio Web Oficial 🛠️

Sitio web institucional de **HYTORC Colombia**, distribuidores oficiales de soluciones industriales de torque hidráulico, neumático, eléctrico y manual. Este proyecto ha sido migrado y optimizado para ofrecer una experiencia de usuario moderna, rápida y totalmente adaptable.

## 🚀 Características Principales

- **Diseño Móvil Primero:** Optimizaciones críticas para navegación en smartphones, incluyendo un logo de marca un 150% más grande para máxima visibilidad.
- **Catálogo Extendido:** Páginas dedicadas para cada categoría de herramienta con especificaciones técnicas.
- **Gestión de Calidad:** Implementación de buzón de **Quejas y Sugerencias** para cumplimiento corporativo.
- **Estructura Modular:** Uso de CSS moderno y una capa dedicada de correcciones móviles (`mobile-fixes.css`).

## 🌐 Estructura de Páginas

### Principales
| Página | Descripción |
|---|---|
| `index.html` | Portal de inicio con Hero dinámico, carrusel de productos y sectores. |
| `productos.html` | Selector de categorías de herramientas. |
| `servicios.html` | Resumen de Laboratorio de Calibración, Alquiler y Capacitación. |
| `industrias.html` | Soluciones para Minería, Petróleo, Eólica, Energía, etc. |
| `contacto-ubicacion.html` | Ubicación exacta en Cota (Bogotá) con mapa interactivo. |
| `quejas-y-sugerencias.html` | Canal oficial de PQRS. |

### Catálogo Técnico
- **Hidráulicas:** `productos_hidraulica.html`, `productos_bombas.html`.
- **Eléctricas / Neumáticas:** `productos_electricas.html`, `productos_neumatica.html`.
- **Manuales y Accesorios:** `herramienta-manual.html`, `productos_sujetadores.html`, `productos_accesorios.html`.

## 📁 Estructura del Proyecto

```text
hytorc-colombia/
├── index.html # Landing Page
├── css/
│ ├── styles.css # Estilos globales y core design
│ ├── mobile-fixes.css # Parches específicos para UX móvil (Crucial)
│ └── mx_style_fonts.css # Tipografías corporativas
├── assets/
│ ├── Logo col.png # Identidad visual
│ ├── img/ # Iconos y activos SVG/PNG
│ └── LIGHTNING PUMP.mp4 # Fondo de video para Hero
└── js/
 ├── nav.js # Lógica de Mega Menú y Hamburger
 └── animations.js # Efectos de aparición (scroll-reveal)
```

## 🎨 Especificaciones Técnicas

- **Frontend:** HTML5, CSS3 (Flexbox/Grid), JavaScript Vanilla.
- **Frameworks:** Bootstrap 5.3 (Cargado en páginas específicas de formularios).
- **Tipografías:** Acumin Pro Condensed, Montserrat y fuentes corporativas Hytorc.
- **Ajustes Móviles:** 
 - Altura de encabezado dinámica (120px en móvil).
 - Logo escalado a 102px de alto para impacto de marca.
 - Menú hamburguesa táctil optimizado (48x48px).

## 🛠️ Desarrollo Manual (Uso Local)

No se requieren preprocesadores. Para ver el sitio con todas sus funcionalidades (especialmente el video de fondo):

1. Clona el repositorio.
2. Abre un servidor local:
 ```bash
 # Usando Python
 python -m http.server 8000
 ```
3. Navega a `http://localhost:8000`.

## 🏢 Contacto y Ubicación

**HYTORC Colombia** 
📍 PARQUE INDUSTRIAL 100 OIKOS | BODEGA G 106 
Autopista Medellín Km 5 Vía Bogotá a Siberia, Cota, Cundinamarca. 
📧 contactanos@hytorccolombia.com.co 
🌐 [www.hytorc.com.co](https://www.hytorc.com.co)

---

*HYTORC® es una marca registrada de HYTORC Inc. Distribuidores Oficiales Autorizados en Colombia.*
