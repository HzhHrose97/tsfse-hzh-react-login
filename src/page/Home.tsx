import { Button, Card, Layout, Space } from "antd";
import { CSSProperties, FC, Key, ReactNode, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  PieChartOutlined,
  LogoutOutlined,
  VideoCameraOutlined,
  UsergroupDeleteOutlined,
  FlagOutlined,
  TransactionOutlined,
  DribbbleOutlined,
  CopyrightOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useJumpPage, useMessage } from "hooks";
import { getAllChinaCity } from "api";
import { APP_PATHS } from "@common/config";

const { Header, Footer, Content, Sider } = Layout;

const headerStyle: CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};

const contentStyle: CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  // lineHeight: "120px",
  // color: "#fff",
  // backgroundColor: "#108ee9",
};

const siderStyle: CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#3ba0e9",
};

const footerStyle: CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
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
  getItem("共享中心", "hzhCenter", <PieChartOutlined />, [
    getItem("中国城市", "chinaCity", <CopyrightOutlined />),
    getItem("全球城市", "globalCountries", <DribbbleOutlined />),
  ]),

  getItem("赛事中心", "hzhEvent", <VideoCameraOutlined />, [
    getItem("篮球", "basketballEvent", null, [
      getItem("NBA", "NBAEvent"),
      getItem("CBA", "CBAEvent"),
    ]),
    getItem("足球", "footballEvent", null, [
      getItem("国足", "3"),
      getItem("意大利联赛", "4"),
    ]),
  ]),
  getItem("球队中心", "hzhTeam", <FlagOutlined />, [
    getItem("篮球", "BasketTeam", null, [
      getItem("NBA", "NBATeams"),
      getItem("CBA", "CBATeams"),
    ]),
    getItem("足球", "sub5", null, [
      getItem("国足", "9"),
      getItem("意大利联赛", "10"),
    ]),
  ]),
  getItem("订单中心", "hzhOrder", <TransactionOutlined />, [
    getItem("篮球", "sub7", null, [getItem("NBA", "11"), getItem("CBA", "13")]),
    getItem("足球", "sub8", null, [
      getItem("国足", "11"),
      getItem("意大利联赛", "12"),
    ]),
  ]),
  getItem("用户中心", "hzhUser", <UsergroupDeleteOutlined />),
];

const Home: FC = () => {
  const navigate = useNavigate();
  const messageApi = useMessage();

  const [collapsed] = useState(false);

  const { jump } = useJumpPage();

  const handToLogin = () => {
    messageApi.success("退出成功");
    jump("LOGIN");
  };

  return (
    <>
      <Card hoverable={true} style={{ height: "100%" }}>
        <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
          <Layout>
            <Header style={headerStyle}>Header</Header>
            <Layout>
              <Sider style={siderStyle}>
                <Menu
                  // defaultSelectedKeys={["1"]}
                  // defaultOpenKeys={["hzhCenter"]}
                  onClick={getAllChinaCity}
                  onSelect={(event) => {
                    navigate(`${APP_PATHS.HOME}/${event.key}`);
                  }}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={collapsed}
                  items={items}
                />
              </Sider>
              <Content style={contentStyle}>
                <Outlet />
              </Content>
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
