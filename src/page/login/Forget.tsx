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
            placeholder="phonenumber"
            prefix={<ShakeOutlined />}
            style={{ width: 550 }}
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
            style={{ width: 550 }}
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
            style={{ width: 550 }}
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
            style={{ width: 550 }}
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
            style={{ width: 550 }}
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
          <Space size={"large"}>
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
            <br />
            <Button
              type="primary"
              icon={<CheckCircleTwoTone />}
              onClick={updatePassword}
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
