import { theme, App } from "antd";

const useThemeToken = () => theme.useToken().token;
const useModal = () => App.useApp().modal;
const useNotification = () => App.useApp().notification;
const useMessage = () => App.useApp().message;

export { useThemeToken, useModal, useNotification, useMessage };
