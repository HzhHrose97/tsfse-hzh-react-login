import { FC, useState } from "react";
import { useJumpPage, useMessage } from "hooks";
import { Button, Card, Input, Space, Statistic } from "antd";
import { ShakeOutlined, KeyOutlined, MailOutlined } from "@ant-design/icons";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  LeftCircleTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import {
  sendUpadatePasswordMailCode,
  updatePasswordByuserSelf,
} from "api/hzh-user/login";
import dayjs, { Dayjs } from "dayjs";
import { isEmail, isPoneAvailable } from "shared/utils";
import { produce } from "immer";
import { MyCarousel } from "page/common/MyCarousel";

type ForgetObj = {
  password: string;
  phonenumber: string;
  email: string;
  mailCode: string;
};

const getDeadlineFromNow = () => {
  return dayjs().add(60, "second");
};

const Forget: FC = () => {
  const messageApi = useMessage();
  const { jump } = useJumpPage();

  const [secondPassword, setSecondPassword] = useState("");
  const [showCountDown, setShowCountDown] = useState(false);
  const [deadline, setDeadline] = useState<Dayjs>();
  const [forgetObj, setForgetObj] = useState<ForgetObj>();

  const handToLogin = () => {
    jump("LOGIN");
  };

  const updatePassword = () => {
    // 先对数据校验
    if (isPoneAvailable(forgetObj?.phonenumber!)) {
      updatePasswordByuserSelf(forgetObj!).then((res) => {
        if (res.code === 200) {
          messageApi.success(res.msg);
          jump("LOGIN");
        }
        if (res.code !== 200) {
          messageApi.error(res.msg);
        }
      });
    } else {
      messageApi.warning("phonenumber 格式异常");
    }
  };

  const sendToMailCode = () => {
    // TODO 邮箱校验
    if (isEmail(forgetObj?.email!)) {
      setShowCountDown(true);
      setDeadline(getDeadlineFromNow());
      sendUpadatePasswordMailCode({
        email: forgetObj?.email!,
      }).then((res) => {
        if (res.code === 200) {
          messageApi.success(res.msg);
        }
        if (res.code !== 200) {
          messageApi.error(res.msg);
        }
      });
    } else {
      messageApi.warning("邮箱格式不正确");
    }
  };

  const forgetContainerStyle = {  
    width: 650, 
    left: 645, 
    fontFamily: 'Arial', 
    backgroundImage: 'url("tilte.png")' ,
    backgroundPosition: 'center top'
  };

  const inputStyle = {
    width: 600
  }

  const gorgetContainerStyle = {  
    display: 'flex',
    justifyContent: 'center', // 水平居中
    alignItems: 'center',     // 垂直居中
    height: '100vh',         // 使容器高度占满视口
    backgroundColor: '#ffffff', // 可选：设置背景色
    margin: '0',             // 清除默认边距
    padding: '0',             // 清除默认内边距
  };

  return (
    //backgroundPosition 设置背景图片显示在顶部中间位置
    //backgroundSize 设置背景图片高度为30像素，宽度按照图片比例自适应 
    <div>
      <Space direction="vertical" style={gorgetContainerStyle}>
      <Card 
        title="找回密码"
        bordered={false}
        //style={{ width: 600, left: 645 }}
        hoverable={true}
        style={ {backgroundColor: '#FFB3FF',width: 650}}
      >
        <MyCarousel />
        <br />
          <Space direction="vertical">
            <Space
              direction="vertical"
              align={"center"}
              wrap={true}
              size={"middle"}
              style={{width: 600,backgroundColor: '#FFB3FF'}}
              >
            <Input
              placeholder="phonenumber"
              prefix={<ShakeOutlined />}
              style={inputStyle}
              onChange={(event) => {
                const phonenumber = event.target.value;
                setForgetObj(
                  produce((draft) => {
                    if (draft === undefined) {
                      return { phonenumber: phonenumber };
                    }
                    draft.phonenumber = phonenumber;
                  }),
                );
              }}
            />
            <Input
            placeholder="email"
            prefix={<MailOutlined />}
            style={inputStyle}
            // onChange={(event) => {
            //   setEmail(event.target.value);
            // }}
            onChange={(event) => {
              const email = event.target.value;
              setForgetObj(
                produce((draft) => {
                  if (draft === undefined) {
                    return { email: email };
                  }
                  draft.email = email;
                }),
              );
            }}
          />
          <Input.Password
            placeholder="input password"
            prefix={<KeyOutlined />}
            style={inputStyle}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(event) => {
              const password = event.target.value;
              setForgetObj(
                produce((draft) => {
                  if (draft === undefined) {
                    return { password: password };
                  }

                  draft.password = password;
                }),
              );
            }}
          />
          <Input.Password
            placeholder="make true password "
            prefix={<KeyOutlined />}
            style={inputStyle}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(event) => {
              setSecondPassword(event.target.value);
            }}
            // 失焦时
            onBlur={() => {
              if (forgetObj?.password !== secondPassword) {
                messageApi.error("两次密码不一致");
              }
            }}
          />
          <Input
            placeholder="验证码"
            prefix={<MailOutlined />}
            style={inputStyle}
            onChange={(event) => {
              const mailCode = event.target.value;
              setForgetObj(
                produce((draft) => {
                  if (draft === undefined) {
                    return { mailCode: mailCode };
                  }

                  draft.mailCode = mailCode;
                }),
              );
            }}
          />
          <div/>
          <div/>

          <div style={{ display: 'flex', justifyContent: 'center' }}> {/* 添加容器 */}
            <Space size={"large"} direction="horizontal">
              <Button
                type="primary"
                icon={<LeftCircleTwoTone />}
                onClick={handToLogin}
              >
                返回登录
              </Button>
              <Space size={"large"} /> {/* 在两个按钮之间添加一个 Space */}
              <Space size={"large"} /> {/* 在两个按钮之间添加一个 Space */}
              <Button
                type="primary"
                disabled={showCountDown}
                icon={
                  showCountDown ? (
                    <Statistic.Countdown
                      style={{ display: "inline-block", width: "20%" }}
                      valueStyle={{ fontSize: "6px", marginLeft: "-8px" }}
                      format="s"
                      // @ts-ignore:next-line
                      value={deadline}
                      onFinish={() => {
                        setShowCountDown(false);
                      }}
                    />
                  ) : (
                    <CheckCircleTwoTone />
                  )
                }
                onClick={sendToMailCode}
              >
                发送验证码
              </Button>
              <Space size={"large"} /> {/* 在两个按钮之间添加一个 Space */}
              <Space size={"large"} /> {/* 在两个按钮之间添加一个 Space */}
              <Button
                type="primary"
                icon={<CheckCircleTwoTone />}
                onClick={updatePassword}
              >
                确定
              </Button>
            </Space>
          </div>
            </Space>
        </Space>
      </Card>
      </Space>
    </div>
  );
};

export { Forget };
