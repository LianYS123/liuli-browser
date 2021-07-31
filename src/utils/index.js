// utils

export const delay = (t = 500, data) =>
  new Promise((resolve) => setTimeout(() => resolve(data), t));
