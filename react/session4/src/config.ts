const APP_NAME =
  import.meta.env.VITE_APP_NAME;

if (!APP_NAME) {
  throw new Error(
    "config: VITE_APP_NAME is required"
  );
}

export const config = {
  appName: APP_NAME,
};