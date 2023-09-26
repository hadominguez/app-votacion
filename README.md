# Sistema de Votación Online con Tecnología Blockchain

Este repositorio contiene el código fuente de la aplicación móvil para un sistema de votación online que utiliza la tecnología blockchain para asegurar la integridad y anonimato de los votos. Este sistema fue desarrollado como parte de la tesis de licenciatura en Gestión de Tecnologías de la Información por Hernán Ariel Domínguez.

## Descripción

El sistema de votación online busca ofrecer una alternativa segura, transparente y accesible para la realización de elecciones mediante dispositivos móviles. Utiliza tecnología blockchain para registrar cada voto de manera que garantiza que no puedan ser alterados posteriormente.

## Características

- **Aplicación móvil**: Permite a los votantes emitir sus votos de forma segura y verificar el estado de su voto.
- **Backend en Node.js**: Gestiona la lógica del negocio, la autenticación de votantes y la comunicación con la blockchain.
- **Blockchain**: Registra los votos de manera inmutable usando MongoDB como base de datos.

## Tecnologías Utilizadas

- **React Native**: Utilizado para desarrollar la aplicación móvil.
- **Node.js**: Para el backend, maneja la lógica y las APIs.
- **MongoDB**: Almacena la blockchain con los registros de los votos.
- **PostgreSQL**: Utilizado para el manejo de los datos del padrón electoral y otros datos relacionados con la gestión de la elección.

## Instalación

### Prerrequisitos

- Node.js (versión recomendada 16.15.1)
- MongoDB (versión 5.0.9)
- PostgreSQL (versión 13.7)

### Configuración

1. Clonar el repositorio:
   ```
   git clone https://github.com/hadominguez/app-votacion.git
   ```
2. Instalar dependencias:
   ```
   cd app-votacion
   npm install
   ```
3. Configurar las variables de entorno en un archivo `.env` basado en el ejemplo `.env.example`.

### Ejecución

Para iniciar el servidor backend:
```
npm start
```

Para ejecutar la aplicación móvil, asegúrate de tener configurado tu entorno de desarrollo para React Native y luego:
```
npm run android
```

## Contacto

Hernán Ariel Domínguez - dhariel2904@gmail.com