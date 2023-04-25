import React, { useState } from "react";
import { useJumpPage, useMessage } from "hooks";
import { Button, Card, Input, Radio, Space, DatePicker } from "antd";
import type { RadioChangeEvent, DatePickerProps } from "antd";
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
import { sendMailCode } from "api/hzh-user/login";
import { CountDown } from "page/common/CountDown";

const Registe: React.FC = () => {
  const messageApi = useMessage();
  const { jump } = useJumpPage();

  const [email, setEmail] = useState("");

  const handToLogin = () => {
    jump("LOGIN");
  };

  const makeTrueToLogin = () => {
    // TODO 注册接口
    jump("LOGIN");
  };

  const sendToMailCode = () => {
    // TODO 注册接口
    // jump("LOGIN");
    sendMailCode({
      email: email,
    }).then((res) => {
      if (res.code === 200) {
        messageApi.success(res.msg);
      }
      if (res.code !== 200) {
        messageApi.error(res.msg);
      }
    });
  };

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const { TextArea } = Input;

  return (
    <>
      <Card
        title="注册页面"
        bordered={false}
        style={{ width: 600, left: 645 }}
        hoverable={true}
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
          />
          <Input
            placeholder="phone"
            prefix={<ShakeOutlined />}
            style={{ width: 550 }}
          />
          <Input
            placeholder="email"
            prefix={<MailOutlined />}
            style={{ width: 550 }}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <Input.Password
            placeholder="input password"
            prefix={<KeyOutlined />}
            style={{ width: 550 }}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Input.Password
            placeholder="make true password "
            prefix={<KeyOutlined />}
            style={{ width: 550 }}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Input
            placeholder="验证码"
            prefix={<MailOutlined />}
            style={{ width: 550 }}
          />
          <Space size={"large"}>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </Radio.Group>
            <Space direction="vertical">
              <DatePicker onChange={onChangeDate} />
            </Space>
            <Button
              type="primary"
              icon={<CheckCircleTwoTone />}
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
            <CountDown />
          </Space>
        </Space>
      </Card>
    </>
  );
};

export { Registe };
