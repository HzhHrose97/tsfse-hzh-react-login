// hzh-user请求路由
import { createInstance } from "shared/utils";

const hzhUserBaseUrl = "http://localhost:6001";

const axiosInstance = createInstance(hzhUserBaseUrl);

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

type BasketballEventInfo = {
  physicalId: number;
  physicalName: string;
  heldCountry: string;
  heldLocation: string;
  heldHome: string;
  maximumCapacity: string;
  awayGround: string;
  physicalHeldLogo: string;
  physicalDesc: string;
  physicalStatus: number;
  matchTime: string;
  heldVenues: string;
};

const login = (parmas: LoginObj) => {
  return axiosInstance.post("/hzh-user/hzhUser/login", parmas);
};

//获取篮球赛事全部信息(包含历史赛事)
const getAllBashetballEventInfo = (parmas: BasketballEventInfo) => {
  return axiosInstance.post<BasketballEventInfo>(
    "/hzh-event/basketballEventInfo/getAllBashetballEventInfo",
    parmas,
  );
};

export { login, getAllBashetballEventInfo };
export type { LoginObj, Result, BasketballEventInfo };
