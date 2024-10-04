export const Storage = (path: string) => {
    const storageUrl = process.env.REACT_APP_STORAGE_URL;
    return `${storageUrl}/${path}`;
  };
  