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
import { produce } from "immer";
import { Theme } from "antd/es/config-provider/context";

type LoginObj = {
  username: string;
  password: string;
};

const Login: FC = () => {
  const messageApi = useMessage();

  const { jump } = useJumpPage();
  const [loginObj, setLoginObj] = useState<LoginObj>();

  const chaeckLoginObj = () => {
    if (
      loginObj === undefined ||
      loginObj.username === undefined ||
      loginObj.password === undefined
    ) {
      messageApi.error("参数异常");
      return false;
    }
    return true;
  };

  const handToRegiste = () => {
    jump("REGISTE");
  };

  const handToForget = () => {
    jump("FORGET");
  };

  const handJump = () => {
    jump("DEMO");
  };

  const loginContainerStyle = {  
    display: 'flex',  
    justifyContent: 'center', // 水平居中  
    alignItems: 'center',     // 垂直居中  
    height: '100vh',         // 使容器高度占满视口  
    backgroundColor: '#ffffff', // 可选：设置背景色  
    margin: '0',             // 清除默认边距  
    padding: '0',             // 清除默认内边距  
  };  


  const handToHome = () => {
    //TODO 目前只是保证接口通，后续要接入springSecurity
    const checkResult = chaeckLoginObj();
    if (checkResult) {
      login(loginObj!).then((res) => {
        if (res.code === 200) {
          messageApi.success(res.msg);
          jump("HOME");
        }
        if (res.code !== 200) {
          messageApi.error(res.msg);
        }
      });
    }
  };

  return (
    <>
      <Space direction="vertical" style={loginContainerStyle}>
          <Card title="登录页面" style={{ width: 650, backgroundColor: '#33FFDD'}} hoverable={true}  bordered={true} >  
            <MyCarousel />
               <br />
              <Space direction="vertical">
                <Space
                  direction="vertical"
                  align={"center"}
                  wrap={true}
                  size={"middle"}
                  style={{width: 600,backgroundColor: '#33FFDD'}}
                >
                  <Input
                    placeholder={"username"}
                    size={"middle"}
                    allowClear={true}
                    style={{ width: 600 }}
                    //单个数据
                    // onChange={(event) => {
                    //   setUserName(event.target.value);
                    // }}
                    value={loginObj?.username}
                    onChange={(event) => {
                      const username = event.target.value;
                      setLoginObj(
                        produce((draft) => {
                          if (draft === undefined) {
                            return { username: username };
                          }
                          draft.username = username;
                        }),
                      );
                    }}
                  />
                  {/* 密码输入框 */}
                  <Input.Password
                    placeholder="input password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    style={{ width: 600 }}
                    value={loginObj?.password}
                    onChange={(event) => {
                      const password = event.target.value;
                      setLoginObj(
                        produce((draft) => {
                          if (draft === undefined) {
                            return { password: password };
                          }
                          draft.password = password;
                        }),
                      );
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
      </Space>
    </>
  );
};

export { Login };
  function makeStyles(arg0: (theme: Theme) => any) {
    throw new Error("Function not implemented.");
  }



