const { PUBLIC_URL } = process.env;

const ensureStartingSlash = (uri: string) => uri.startsWith('/') ? uri : `/${uri}`;

export const pubUrl = (uri: string) => `${PUBLIC_URL}${ensureStartingSlash(uri)}`;
