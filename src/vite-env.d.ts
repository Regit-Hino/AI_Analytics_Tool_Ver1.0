/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AI_ENDPOINT: string
  readonly VITE_SAVE_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}