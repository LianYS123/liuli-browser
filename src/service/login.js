import { post } from "utils/xFetch";

export const login = (params) => {
  return post('/auth/login', params);
};
