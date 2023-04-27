import { FC, useState } from "react";
import { useJumpPage, useMessage } from "hooks";
import { Button, Card, Input, Radio, Space, Statistic } from "antd";
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
import { registerUser, sendMailCode } from "api/hzh-user/login";
import dayjs, { Dayjs } from "dayjs";
import { isEmail, isPoneAvailable } from "shared/utils";
import { produce } from "immer";

type RegisteObj = {
  userName: string;
  password: string;
  phonenumber: string;
  email: string;
  sex: string;
  mailCode: string;
  userDescription: string;
};

const getDeadlineFromNow = () => {
  return dayjs().add(60, "second");
};

const Registe: FC = () => {
  const messageApi = useMessage();
  const { jump } = useJumpPage();

  const [secondPassword, setSecondPassword] = useState("");
  const [showCountDown, setShowCountDown] = useState(false);
  const [deadline, setDeadline] = useState<Dayjs>();
  const [registeObj, setRegisteObj] = useState<RegisteObj>();

  const handToLogin = () => {
    jump("LOGIN");
  };

  const makeTrueToLogin = () => {
    // 先对数据校验
    if (registeObj?.userName !== null && registeObj?.userName !== undefined) {
      if (isPoneAvailable(registeObj.phonenumber)) {
        registerUser(registeObj).then((res) => {
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
    } else {
      messageApi.warning("userName 不能为空");
    }
  };

  const sendToMailCode = () => {
    // TODO 邮箱校验
    if (isEmail(registeObj?.email!)) {
      setShowCountDown(true);
      setDeadline(getDeadlineFromNow());
      sendMailCode({
        email: registeObj?.email!,
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

  const { TextArea } = Input;

  return (
    <>
      <Card
        title="注册页面"
        bordered={false}
        style={{ width: 600, left: 645 }}
        hoverable
      >
        <Space
          direction="vertical"
          align={"center"}
          wrap={true}
          size={"middle"}
        >
          <Input
            placeholder="username"
            prefix={<UserOutlined />}
            style={{ width: 550 }}
            value={registeObj?.userName}
            onChange={(event) => {
              const userName = event.target.value;

              setRegisteObj(
                produce((draft) => {
                  if (draft === undefined) {
                    return { userName: userName };
                  }
                  draft.userName = userName;
                }),
              );
            }}
            // 失焦时
            // onBlur={() => {
            //   if (registeObj?.userName === undefined) {
            //     messageApi.error("不能为空");
            //   }
            // }}
          />
          <Input
            placeholder="phonenumber"
            prefix={<ShakeOutlined />}
            style={{ width: 550 }}
            onChange={(event) => {
              const phonenumber = event.target.value;
              setRegisteObj(
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
              setRegisteObj(
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
              setRegisteObj(
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
              if (registeObj?.password !== secondPassword) {
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
              setRegisteObj(
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
            <Radio.Group
              defaultValue={"1"}
              value={registeObj?.sex}
              onChange={(event) => {
                const sex = event.target.value;

                setRegisteObj(
                  produce((draft) => {
                    if (draft === undefined) {
                      return { sex: sex };
                    }
                    draft.sex = sex;
                  }),
                );
              }}
            >
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </Radio.Group>
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
          </Space>
          <TextArea
            rows={4}
            placeholder="maxLength is 100"
            maxLength={100}
            showCount={true}
            style={{ width: 550 }}
            allowClear={true}
            onChange={(event) => {
              const userDescription = event.target.value;
              setRegisteObj(
                produce((draft) => {
                  if (draft === undefined) {
                    return { userDescription: userDescription };
                  }

                  draft.userDescription = userDescription;
                }),
              );
            }}
          />
          <Space size={"large"}>
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
              icon={<CheckCircleTwoTone />}
              onClick={makeTrueToLogin}
            >
              确定
            </Button>
          </Space>
        </Space>
      </Card>
    </>
  );
};

export { Registe };
