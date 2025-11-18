declare module "*?url" {
  const result: string;
  export default result;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_URL_DEV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}