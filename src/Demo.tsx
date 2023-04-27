import { Button, Card, Space } from "antd";
import { GetAllChinaCityResObj, getAllChinaCity, getAllpagination } from "api";
import { useJumpPage } from "hooks";
import { FC, useState } from "react";

const Demo: FC = () => {
  const { jump } = useJumpPage();

  const [allChinaCity, setAllChinaCity] = useState<GetAllChinaCityResObj>();

  const [allpagination, setAllpagination] = useState<any>();

  const handToLogin = () => {
    jump("LOGIN");
  };

  const handleGetQuery = () => {
    getAllChinaCity().then((res) => {
      setAllChinaCity(res.data);
    });
  };

  const handlePostQuery = () => {
    getAllpagination({
      size: 10,
      current: 1,
    }).then((res) => {
      setAllpagination(res.data);
    });
  };

  console.log(allChinaCity);

  console.log(allpagination);

  return (
    <>
      <Card hoverable={true} size={"small"} title="测试接口页面">
        <Space>
          <Button type="primary" onClick={handleGetQuery}>
            GET请求
          </Button>
          <Button type="primary" onClick={handlePostQuery}>
            POST请求
          </Button>
          <Button type="primary" onClick={handToLogin}>
            Login
          </Button>
        </Space>

        {allChinaCity?.map((cityInfo) => {
          // return <div key={cityInfo.id}>{cityInfo.cityname}</div>;
          return (
            <Card
              key={cityInfo.id}
              title={cityInfo.cityname}
              style={{ width: 300 }}
            >
              <p>{cityInfo.cityname}</p>
            </Card>
          );
        })}

        {allpagination?.records.map((cityInfo: any) => {
          // return <div key={cityInfo.id}>{cityInfo.cityname}</div>;
          return (
            <Card
              key={cityInfo.id}
              title={cityInfo.cityname}
              style={{ width: 300 }}
            >
              <p>{cityInfo.cityname}</p>
            </Card>
          );
        })}
      </Card>
    </>
  );
};

export { Demo };
