// hzh-user请求路由
import { createInstance } from "shared/utils";

const hzhUserBaseUrl = "http://localhost:9001";

const axiosInstance = createInstance(hzhUserBaseUrl);

type loginObj = {
  username: string;
  password: string;
};

type sendMailCodeObj = {
  email: string;
};

const login = (parmas: loginObj) => {
  return axiosInstance.post("/hzh-user/hzhUser/login", parmas);
};

const sendMailCode = (parmas: sendMailCodeObj) => {
  return axiosInstance.get("/hzh-user/hzhUser/user/sendEmailCode", parmas);
};

export { login, sendMailCode };
export type { loginObj };
