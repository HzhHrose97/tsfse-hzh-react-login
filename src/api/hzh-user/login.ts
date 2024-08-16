// hzh-user请求路由
import { createInstance } from "shared/utils";

const hzhUserBaseUrl = "http://localhost:9001";

const axiosInstance = createInstance(hzhUserBaseUrl);

type sendMailCodeObj = {
  email: string;
};

type RegisteObj = {
  userName: string;
  password: string;
  phonenumber: string;
  email: string;
  sex: string;
  mailCode: string;
  userDescription: string;
};

type Result<T> = {
  success: boolean;
  code: number;
  msg: string;
  data: T;
};

type LoginObj = {
  username: string;
  password: string;
};

type ForgetObj = {
  password: string;
  phonenumber: string;
  email: string;
  mailCode: string;
};

const login = (parmas: LoginObj) => {
  return axiosInstance.post("/hzh-user/hzhUser/login", parmas);
};

// 用户注册时验证码
const sendMailCode = (parmas: sendMailCodeObj) => {
  return axiosInstance.get("/hzh-user/hzhUser/user/sendEmailCode", parmas);
};

// 用户修改密码时验证码
const sendUpadatePasswordMailCode = (parmas: sendMailCodeObj) => {
  return axiosInstance.get(
    "/hzh-user/hzhUser/user/sendEmailCodeWhenUpdatePassword",
    parmas,
  );
};

const registerUser = (parmas: RegisteObj) => {
  return axiosInstance.post<RegisteObj>(
    "/hzh-user/hzhUser/user/register",
    parmas,
  );
};

const updatePasswordByuserSelf = (parmas: ForgetObj) => {
  return axiosInstance.post<ForgetObj>(
    "/hzh-user/hzhUser/user/updatePasswordByuserSelf",
    parmas,
  );
};

export {
  login,
  sendMailCode,
  registerUser,
  updatePasswordByuserSelf,
  sendUpadatePasswordMailCode,
};
export type { LoginObj, Result };
