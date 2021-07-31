import { Article } from "containers/article";
import { User } from "containers/user";
import { routers } from "./routers";

export const menu = [
  {
    title: '文章管理',
    component: Article,
    path: routers.ARTICLE
  },
  {
    title: '用户管理',
    component: User,
    path: routers.USER
  }
]