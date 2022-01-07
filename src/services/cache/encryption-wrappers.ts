export const encrypt = (data: string) => {
  return btoa(data);
};

export const decrypt = (data: string) => {
  return atob(data);
};
