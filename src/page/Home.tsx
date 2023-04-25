import { Button, Card, Layout, Space } from "antd";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  PayCircleOutlined,
  VideoCameraAddOutlined,
  UserDeleteOutlined,
  FlagOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps, MenuTheme } from "antd";
import { Menu, Switch } from "antd";
import { useJumpPage, useMessage } from "hooks";

const Home: React.FC = () => {
  const messageApi = useMessage();

  const { Header, Footer, Sider, Content } = Layout;
  const { jump } = useJumpPage();

  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 50,
    lineHeight: "64px",
    backgroundColor: "#7dbcea",
  };

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "rgb(252, 252, 252)",
    backgroundColor: "#108ee9",
  };

  const siderStyle: React.CSSProperties = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#3ba0e9",
  };

  const footerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#7dbcea",
  };

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group",
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("共享中心", "sub1", <AppstoreOutlined />, [
      getItem("Option 1", "1"),
      getItem("Option 2", "2"),
    ]),

    getItem("赛事中心", "sub2", <VideoCameraAddOutlined />, [
      getItem("Option 5", "5"),
      getItem("Option 6", "6"),
      getItem("Submenu", "sub3", null, [
        getItem("Option 7", "7"),
        getItem("Option 8", "8"),
      ]),
    ]),

    getItem("订单中心", "sub4", <PayCircleOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),

    getItem("用户中心", "sub5", <UserDeleteOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),

    getItem("球队中心", "sub7", <FlagOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ];

  const [theme, setTheme] = useState<MenuTheme>("dark");
  const [current, setCurrent] = useState("1");

  const changeTheme = (value: boolean) => {
    setTheme(value ? "dark" : "light");
  };

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const handToLogin = () => {
    messageApi.success("退出成功");
    jump("LOGIN");
  };

  return (
    <>
      <Card hoverable={true} style={{ height: "100%" }}>
        <Space direction="vertical" style={{ width: "100%" }} size={[0, 100]}>
          <Layout>
            <Header style={headerStyle}>Header</Header>
            <Layout>
              <Sider style={siderStyle}>
                <Switch
                  checked={theme === "dark"}
                  onChange={changeTheme}
                  checkedChildren="Dark"
                  unCheckedChildren="Light"
                />
                <Menu
                  theme={theme}
                  onClick={onClick}
                  style={{ width: 200 }}
                  defaultOpenKeys={["sub1"]}
                  selectedKeys={[current]}
                  mode="inline"
                  items={items}
                />
              </Sider>
              <Content style={contentStyle}>Content</Content>
            </Layout>
            <Footer style={footerStyle}>Footer</Footer>
          </Layout>
        </Space>

        <Button type="primary" icon={<LogoutOutlined />} onClick={handToLogin}>
          退出登录
        </Button>
      </Card>
    </>
  );
};

export { Home };
