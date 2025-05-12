/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // הוסף משתני סביבה נוספים אם יש צורך
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}