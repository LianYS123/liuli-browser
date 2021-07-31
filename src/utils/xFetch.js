import qs from "query-string";

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

const showError = (opts) => {
  console.log(opts);
};

// const methodMessage = {
//   POST: "添加成功",
//   PUT: "修改成功",
//   DELETE: "删除成功",
// };

const jumpLogin = (response) => {
  if (response && response.status === 401) {
    // console.log("redirect to login");
    // history.push({
    //   pathname: "/login",
    // });
    return true;
  }
  return false;
};

/**
 * 异常处理程序
 */
const errorHandler = (error) => {
  const { response, isSuccess, message } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    jumpLogin(response);
    const { status, url } = response;
    showError({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (isSuccess === false) {
    showError({ message });
  } else if (!response) {
    showError({
      description: "您的网络发生异常，无法连接服务器",
      message: "网络异常",
    });
  }
  throw error;
};

export const xFetch = async (url, options = {}, config = {}) => {
  const { withPrefix = true } = config;
  try {
    const token = "Bearer " + localStorage.getItem("token");
    const response = await fetch(withPrefix ? `/api${url}` : url, {
      ...options,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    if (!response.ok) {
      const error = new Error("request error");
      error.response = response;
      throw error;
    }

    // if (isJumped) {
    //   return;
    // }
    const result = await response.json();
    return result;
  } catch (error) {
    return errorHandler(error);
  }
};

export const get = (url, data, options) => {
  const realUrl = `${url}?${qs.stringify(data)}`;
  return xFetch(realUrl, {
    method: "GET",
    ...options,
  });
};

export const post = (url, data, options) => {
  return xFetch(url, {
    method: "POST",
    body: data && JSON.stringify(data),
    ...options,
  });
};

export const del = (url, data, options) => {
  const realUrl = `${url}?${qs.stringify(data)}`;
  return xFetch(realUrl, {
    method: "DELETE",
    ...options,
  });
};

export const put = (url, data, options) => {
  return xFetch(url, {
    method: "PUT",
    body: data && JSON.stringify(data),
    ...options,
  });
};
