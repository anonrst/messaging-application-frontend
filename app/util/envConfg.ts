

export const EnvConfig = {
    backend: import.meta.env.VITE_API_URL,
    basePath: import.meta.env.VITE_BASE_PATH,
    dev: import.meta.env.VITE_NODE,
    googleClient: import.meta.env.VITE_SSO_CLIENT_ID,
    googleRedirectURI: import.meta.env.VITE_SSO_REDIRECT_URL,
}