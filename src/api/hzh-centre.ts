// hzh-centre请求路由
import { createInstance } from "shared/utils";

const hzhUserBaseUrl = "http://localhost:5003";

const axiosInstance = createInstance(hzhUserBaseUrl);

type GetAllChinaCityResObj = Array<{
  cityname: string;
  id: number;
  pid: number;
  state: string;
  type: number;
}>;
type PageParmsObj = {
  size: number;
  current: number;
};

const getAllChinaCity = () => {
  return axiosInstance.get<GetAllChinaCityResObj>(
    "hzh-centre/chinaCity/getAllChinaCity",
  );
};

const getAllpagination = (parmas: PageParmsObj) => {
  return axiosInstance.post<GetAllChinaCityResObj>(
    "hzh-centre/chinaCity/paginationGetAll",
    parmas,
  );
};

export { getAllChinaCity, getAllpagination };
export type { GetAllChinaCityResObj, PageParmsObj };
