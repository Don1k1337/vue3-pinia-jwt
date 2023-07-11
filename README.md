# vue3-pinia-jwt

This pet-project aims to provide a sign-up and sign-in system using Vue 3, Vue Router, Pinia, and Firebase with JWT token authentication.

Technologies Used:
- Vue 3: The core JavaScript framework used for building the user interface.
- Vue Router: The official router for Vue.js, used for managing navigation and routing within the application.
- PrimeVue: A popular UI component library for Vue.js, used to create the user interface components.
- Pinia: A state management pattern and library for Vue.js, used for managing the application's state.
- Firebase: A cloud-based platform by Google, used for backend services such as authentication in this project.
- REST API: The Firebase REST API is used to interact with Firebase services, such as user authentication and token-based authorization.

## Project Setup

```sh
yarn
```

### Env configuration
To configure the environment variables for this Vue 3 Pinia JWT project, replace the placeholder values with your own appropriate values from your Firebase project.

Here are the environment variables that need to be updated in your project's configuration `.env` file:

```
VITE_BASE_URL=<replace-with-firebase-base-url>
VITE_API_KEY=<replace-with-firebase-api-key>
VITE_AUTH_DOMAIN=<replace-with-firebase-auth-domain>
VITE_PROJECT_ID=<replace-with-firebase-project-id>
VITE_STORAGE_BUCKET=<replace-with-firebase-storage-bucket>
VITE_MESSAGING_SENDER_ID=<replace-with-firebase-messaging-sender-id>
VITE_APP_ID=<replace-with-firebase-app-id>
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```



