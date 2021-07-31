import { del, get, post, put } from "utils/xFetch";

export const getUserList = () => {
  return get("/user/list");
};

export const updateUser = ({ id, ...rest }) => {
  return put(`/user/${id}`, rest);
};

export const deleteUser = ({id}) => {
  return del(`/user/${id}`);
}

export const addUser = (params) => {
  return post('/user', params)
}
