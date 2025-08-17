# FrontendDAA

FrontendDAA es una aplicación web desarrollada con Angular que permite la gestión avanzada de usuarios, chefs, clientes y pedidos en el contexto de un sistema administrativo moderno. Su diseño intuitivo y responsivo facilita la administración eficiente de los recursos y usuarios.

## Tabla de Contenidos

- [Introducción](#introducción)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Ejemplos de comandos](#ejemplos-de-comandos)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Introducción

FrontendDAA es el frontend de un sistema de gestión que utiliza Angular y TailwindCSS para ofrecer una experiencia de usuario moderna y eficiente. Permite registrar, editar y visualizar usuarios, chefs y clientes, así como gestionar pedidos y estadísticas.

## Requisitos previos

Antes de instalar y ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [npm](https://www.npmjs.com/) (v9 o superior)
- [Angular CLI](https://angular.dev/tools/cli) (v20.x)
- Git (opcional, para clonar el repositorio)

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/DDR144/frontend-DAA.git
   cd frontend-daa
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura TailwindCSS (opcional):**

   Si necesitas inicializar TailwindCSS:

   ```bash
   npm run tailwind:init
   ```

## Uso

### Servidor de desarrollo

Inicia el servidor de desarrollo con:

```bash
ng serve
```

Luego abre [http://localhost:4200](http://localhost:4200) en tu navegador.

### Compilar para producción

```bash
ng build
```

Los archivos compilados se almacenarán en el directorio `dist/`.

### Ejecutar pruebas unitarias

```bash
ng test
```

### Ejecutar pruebas end-to-end

```bash
ng e2e
```

## Ejemplos de comandos

- Generar un nuevo componente:

  ```bash
  ng generate component nombre-componente
  ```

- Ver todas las opciones de generación:

  ```bash
  ng generate --help
  ```

## Contribución

¡Las contribuciones son bienvenidas! Para colaborar:

1. Haz un fork del repositorio.
2. Crea una rama para tu feature o fix:
   ```bash
   git checkout -b mi-feature
   ```
3. Realiza tus cambios y haz commit:
   ```bash
   git commit -m "Descripción de mi cambio"
   ```
4. Haz push a tu rama:
   ```bash
   git push origin mi-feature
   ```
5. Abre un Pull Request en GitHub.

Por favor, sigue las buenas prácticas de desarrollo y asegúrate de que tu código pase los tests antes de enviar tu contribución.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
