export const urlWithCacheBuster = (path: string) : string => {
  const url = new URL(path, window.location.origin);
  url.searchParams.set('_', String(Date.now()));

  return url.toString();
};
