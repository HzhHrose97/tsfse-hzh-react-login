import { FC, useState } from "react";
import { Button, Space, Card, Input } from "antd";
import { login } from "api";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  LoginOutlined,
} from "@ant-design/icons";

import { useJumpPage, useMessage } from "hooks";
import { MyCarousel } from "page/common/MyCarousel";

const Login: FC = () => {
  const messageApi = useMessage();

  // const [passwordVisible, setPasswordVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");

  const { jump } = useJumpPage();

  const handToRegiste = () => {
    jump("REGISTE");
  };

  const handToForget = () => {
    jump("FORGET");
  };

  const handJump = () => {
    jump("DEMO");
  };

  // const success = () => {};
  // const fail = () => {};

  const handToHome = () => {
    //TODO
    jump("HOME");
    // login({
    //   username: userName,
    //   password: passWord,
    // }).then((res) => {
    //   console.log(res.msg);
    //   if (res.code === 200) {
    //     messageApi.success(res.msg);
    //     jump("HOME");
    //   }

    //   if (res.code !== 200) {
    //     messageApi.error(res.msg);
    //   }
    //   // res.code === 200 ? success() : fail();
    // });
  };

  //  function loginFunction(username: string, password: string);

  return (
    <>
      <Space direction="vertical">
        <Card style={{ width: 650, left: 645 }} hoverable={true}>
          <MyCarousel />
          <Card
            className={"loginCard"}
            hoverable={true}
            size={"small"}
            title="登录页面"
          >
            <Space direction="vertical">
              <Space
                direction="vertical"
                align={"center"}
                wrap={true}
                size={"middle"}
              >
                <Input
                  placeholder={"username"}
                  size={"middle"}
                  allowClear={true}
                  // maxLength={500}
                  style={{ width: 550 }}
                  value={userName}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setUserName(event.target.value);
                  }}
                />
                {/* 密码输入框 */}
                <Input.Password
                  placeholder="input password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  value={passWord}
                  style={{ width: 550 }}
                  onChange={(event) => {
                    setPassWord(event.target.value);
                  }}
                />
              </Space>
              <br />
              <Space size={"large"}>
                <br />
                <br />
                <Button type={"primary"} onClick={handToRegiste}>
                  注册
                </Button>
                <br />
                <Button type="primary" onClick={handToForget}>
                  忘记密码
                </Button>
                <br />
                <Button type="primary" onClick={handJump}>
                  Jump Demo
                </Button>
                <br />
                <Button
                  type="primary"
                  icon={<LoginOutlined />}
                  onClick={handToHome}
                >
                  登录
                </Button>
              </Space>
            </Space>
          </Card>
        </Card>
      </Space>
    </>
  );
};

export { Login };
