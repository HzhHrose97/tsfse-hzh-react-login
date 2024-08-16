// 写路由路径的常量
const BASEURL = "/";

const APP_PATHS = {
  ROOT: BASEURL,

  DEMO: `${BASEURL}demo`,

  ANTD: `${BASEURL}antd`,

  // 登录页
  LOGIN: `${BASEURL}login`,

  // 登录成功跳转主页面
  HOME: `${BASEURL}home`,

  // 注册页面
  REGISTE: `${BASEURL}registe`,

  // 找回密码页面
  FORGET: `${BASEURL}forget`,

  // 测试
  TEST: `${BASEURL}test`,
} as const;

type AppPathsKey = keyof typeof APP_PATHS;

export { APP_PATHS };
export type { AppPathsKey };
