import { Article } from "containers/article";
import { routers } from "./routers";

export const menu = [
  {
    title: '文章',
    component: Article,
    path: routers.ARTICLE
  },
  // {
  //   title: '用户管理',
  //   component: User,
  //   path: routers.USER
  // }
]