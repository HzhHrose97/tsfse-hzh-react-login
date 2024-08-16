import axios from "axios";
import qs from "qs";
import { produce } from "immer";

import type {
  AxiosInstance as RawAxiosInstance,
  AxiosRequestConfig,
} from "axios";
import type { IStringifyOptions } from "qs";

// import { getApiServerURL, getApiTimeOut } from "./envUtils";

type Result<T> = {
  success: boolean;
  code: number;
  msg: string;
  data: T;
};

type RequestConfig = AxiosRequestConfig & {
  /**
   * @param indices
   * qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices' })
   * 'a[0]=b&a[1]=c'
   * @param brackets
   * qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets' })
   * 'a[]=b&a[]=c'
   * @param repeat
   * qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' })
   * 'a=b&a=c'
   * @param comma
   * qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'comma' })
   * 'a=b,c'
   */
  arrayFormat?: IStringifyOptions["arrayFormat"];
};

type AxiosInstance = Omit<
  RawAxiosInstance,
  "get" | "post" | "put" | "delete"
> & {
  get: <T = unknown, R = Result<T>>(
    url: string,
    params?: Record<string, unknown>,
    config?: RequestConfig,
  ) => Promise<R>;

  post: <T = unknown, R = Result<T>>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ) => Promise<R>;

  put: <T = unknown, R = Result<T>>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ) => Promise<R>;

  delete: <T = unknown, R = Result<T>>(
    url: string,
    params?: Record<string, unknown>,
    config?: RequestConfig,
  ) => Promise<R>;
};

/**
 * request interceptor
 * 拦截器函数的作用是在发送请求前对请求进行拦截和处理，可以用来实现一些通用的请求处理逻辑。
 */
const interceptRequest = (instance: RawAxiosInstance) => {
  instance.interceptors.request.use((config) => {
    return config;
  });
};

/**
 * response interceptor
 * 函数的作用是在接收到响应后对响应数据进行拦截和处理，可以用来统一处理接口返回的数据，提取有效信息并传递给后续处理逻辑。
 */
const interceptResponse = (instance: RawAxiosInstance) => {
  instance.interceptors.response.use((res) => {
    return res.data;
  });
};

/**
 *  convert request
 */
const setRequestProxy = (instance: RawAxiosInstance) => {
  const _get = instance.get;
  const _delete = instance.delete;

  const appendParamsToUrl = (
    url: string,
    params?: Record<string, unknown>,
    arrayFormat?: RequestConfig["arrayFormat"],
  ) => {
    return `${url}${qs.stringify(params, {
      addQueryPrefix: true,
      arrayFormat: arrayFormat ?? "repeat",
    })}`;
  };

  const filterConfig = (config: RequestConfig) => {
    return produce(config, (draft) => {
      delete draft.arrayFormat;
    });
  };

  instance.get = (
    url: string,
    params?: Record<string, unknown>,
    config?: RequestConfig,
  ) => {
    return _get(
      appendParamsToUrl(url, params, config?.arrayFormat),
      config?.arrayFormat ? filterConfig(config) : config,
    );
  };

  instance.delete = (
    url: string,
    params?: Record<string, unknown>,
    config?: RequestConfig,
  ) => {
    return _delete(
      appendParamsToUrl(url, params, config?.arrayFormat),
      config?.arrayFormat ? filterConfig(config) : config,
    );
  };
};

// hzh-centre 后端URL配置
const createInstance = (baseURL: string) => {
  const axiosInstance = axios.create({
    // baseURL: getApiServerURL(),
    // timeout: getApiTimeOut(),
    // baseURL: "http://localhost:5003",
    baseURL: baseURL,
    timeout: 999999,
  });

  interceptRequest(axiosInstance);
  interceptResponse(axiosInstance);
  setRequestProxy(axiosInstance);

  return axiosInstance as AxiosInstance;
};

// export const axiosInstance = createInstance();
export { createInstance };
