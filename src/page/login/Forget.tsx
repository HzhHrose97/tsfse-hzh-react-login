import { useJumpPage } from "hooks";
import { Button, Card, Input, Space } from "antd";

import {
  UserOutlined,
  ShakeOutlined,
  KeyOutlined,
  MailOutlined,
} from "@ant-design/icons";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  LeftCircleTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { MyCarousel } from "page/common/MyCarousel";

const Forget: React.FC = () => {
  const { jump } = useJumpPage();

  const handToLogin = () => {
    jump("LOGIN");
  };

  return (
    <>
      <Card
        hoverable={true}
        size={"small"}
        title="找回密码"
        bordered={false}
        style={{ width: 600, left: 645 }}
      >
        <MyCarousel />
        <br />
        <Space direction="vertical">
          <Input
            placeholder="username"
            prefix={<UserOutlined />}
            style={{ width: 550 }}
          />
          <Input placeholder="phone" prefix={<ShakeOutlined />} />
          <Input placeholder="email" prefix={<MailOutlined />} />
          <Input.Password
            placeholder="input password"
            prefix={<KeyOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Input.Password
            placeholder="make true password "
            prefix={<KeyOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Input placeholder="验证码" prefix={<MailOutlined />} />
          <Space size={"large"}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Button
              type="primary"
              icon={<LeftCircleTwoTone />}
              onClick={handToLogin}
            >
              返回登录
            </Button>
            <br />
            <br />
            <br />
            <Button
              type="primary"
              icon={<CheckCircleTwoTone />}
              onClick={handToLogin}
            >
              确定
            </Button>
          </Space>
        </Space>
      </Card>
    </>
  );
};

export { Forget };
