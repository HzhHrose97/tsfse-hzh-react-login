import React, { useState } from "react";
import { Divider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  // key: React.Key;
  physicalId: number;
  physicalName: string;
  heldCountry: string;
  heldLocation: string;
  heldHome: string;
  maximumCapacity: string;
  awayGround: string;
  physicalHeldLogo: string;
  physicalDesc: string;
  physicalStatus: number;
  matchTime: string;
  heldVenues: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "举办国家",
    dataIndex: "heldCountry",
  },
  {
    title: "举办地",
    dataIndex: "heldLocation",
  },
  {
    title: "举办主场",
    dataIndex: "heldHome",
  },
  {
    title: "场地最大容纳人数",
    dataIndex: "maximumCapacity",
  },
  {
    title: "客场方",
    dataIndex: "awayGround",
  },
  {
    title: "举办主场方logo URL",
    dataIndex: "physicalHeldLogo",
  },
  {
    title: "体育描述",
    dataIndex: "physicalDesc",
  },
  {
    title: "体育状态",
    dataIndex: "physicalStatus",
  },
  {
    title: "开赛时间",
    dataIndex: "matchTime",
  },
  {
    title: "举办场馆",
    dataIndex: "heldVenues",
  },
];

const data: DataType[] = [
  {
    physicalId: 1,
    physicalName: "篮球",
    heldCountry: "7",
    heldLocation: "北京",
    heldHome: "北京队",
    maximumCapacity: "100000",
    awayGround: "陕西队",
    physicalHeldLogo: "新增",
    physicalDesc: "",
    physicalStatus: 0,
    matchTime: "2022-03-21 15:52:47",
    heldVenues: "五棵松体育馆",
  },
  {
    physicalId: 2,
    physicalName: "新增",
    heldCountry: "新增",
    heldLocation: "新增",
    heldHome: "新增",
    maximumCapacity: "新增",
    awayGround: "新增",
    physicalHeldLogo: "新增",
    physicalDesc: "新增",
    physicalStatus: 0,
    matchTime: "新增",
    heldVenues: "新增",
  },
  {
    physicalId: 3,
    physicalName: "修改",
    heldCountry: "修改",
    heldLocation: "修改",
    heldHome: "修改",
    maximumCapacity: "修改",
    awayGround: "修改",
    physicalHeldLogo: "修改",
    physicalDesc: "修改",
    physicalStatus: 0,
    matchTime: "修改",
    heldVenues: "修改",
  },
  {
    physicalId: 4,
    physicalName: "添加redis测试",
    heldCountry: "添加redis测试",
    heldLocation: "添加redis测试",
    heldHome: "添加redis测试",
    maximumCapacity: "添加redis测试",
    awayGround: "添加redis测试",
    physicalHeldLogo: "添加redis测试",
    physicalDesc: "添加redis测试",
    physicalStatus: 0,
    matchTime: "添加redis测试",
    heldVenues: "添加redis测试",
  },
  {
    physicalId: 5,
    physicalName: "篮球",
    heldCountry: "中国",
    heldLocation: "西安",
    heldHome: "野球帝",
    maximumCapacity: "1000",
    awayGround: "三皮队",
    physicalHeldLogo: "添加redis测试",
    physicalDesc: "添加redis测试",
    physicalStatus: 0,
    matchTime: "2022-07-21 15:50:00",
    heldVenues: "赛格",
  },
  {
    physicalId: 6,
    physicalName: "羽毛球",
    heldCountry: "中国",
    heldLocation: "北京",
    heldHome: "东单",
    maximumCapacity: "1000",
    awayGround: "OJBK队",
    physicalHeldLogo: "添加redis测试",
    physicalDesc: "添加redis测试",
    physicalStatus: 0,
    matchTime: "2022-07-21 15:50:00",
    heldVenues: "东单户外羽毛球场地",
  },
  {
    physicalId: 7,
    physicalName: "羽毛球",
    heldCountry: "中国",
    heldLocation: "北京",
    heldHome: "东单",
    maximumCapacity: "1000",
    awayGround: "OJBK队",
    physicalHeldLogo: "添加redis测试",
    physicalDesc: "添加redis测试",
    physicalStatus: 0,
    matchTime: "2022-07-21 15:50",
    heldVenues: "东单户外羽毛球场地",
  },
  {
    physicalId: 8,
    physicalName: "羽毛球",
    heldCountry: "中国",
    heldLocation: "北京",
    heldHome: "东单",
    maximumCapacity: "1000",
    awayGround: "OJBK队",
    physicalHeldLogo: "添加redis测试",
    physicalDesc: "添加redis测试",
    physicalStatus: 0,
    matchTime: "2022-07-21 15:50",
    heldVenues: "东单户外羽毛球场地",
  },
  {
    physicalId: 9,
    physicalName: "羽毛球",
    heldCountry: "中国",
    heldLocation: "北京",
    heldHome: "东单",
    maximumCapacity: "1000",
    awayGround: "OJBK队",
    physicalHeldLogo: "添加redis测试",
    physicalDesc: "添加redis测试",
    physicalStatus: 0,
    matchTime: "2022-07-21 15:50",
    heldVenues: "东单户外羽毛球场地",
  },
  {
    physicalId: 10,
    physicalName: "羽毛球",
    heldCountry: "中国",
    heldLocation: "北京",
    heldHome: "东单",
    maximumCapacity: "1000",
    awayGround: "OJBK队",
    physicalHeldLogo: "添加redis测试",
    physicalDesc: "添加redis测试",
    physicalStatus: 0,
    matchTime: "2022-07-21 15:50",
    heldVenues: "东单户外羽毛球场地",
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows,
    );
  },
};

const BasketballEvent: React.FC = () => {
  const [selectionType] = useState<"checkbox" | "radio">("checkbox");

  return (
    <div>
      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export { BasketballEvent };
