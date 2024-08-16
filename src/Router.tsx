// 路由跳转
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { APP_PATHS } from "@common/config";
import { Demo } from "Demo";
import {
  BasketballEvent,
  ChinaCity,
  Forget,
  Home,
  Login,
  Registe,
  GlobalCountries,
  BasketballTeam,
} from "page";
import Test from "page/login/Test";

const Router: FC = () => {
  return (
    <Routes>
      <Route path={APP_PATHS.ROOT} element={<div>root</div>} />
      <Route path={APP_PATHS.DEMO} element={<Demo />} />
      <Route path={APP_PATHS.LOGIN} element={<Login />} />
      <Route path={APP_PATHS.TEST} element={<Test />} />
      <Route path={APP_PATHS.HOME} element={<Home />} />
      <Route path={APP_PATHS.HOME} element={<Home />}>
        <Route
          path="chinaCity"
          element={
            <div style={{ height: "100%" }}>
              <ChinaCity></ChinaCity>
            </div>
          }
        />
        <Route
          path="globalCountries"
          element={
            <div>
              <h1>全球城市</h1>
              <GlobalCountries></GlobalCountries>
            </div>
          }
        />
        <Route
          path="NBAEvent"
          element={
            <div style={{ height: "100%" }}>
              <h1>NBAEvent 篮球赛事中心 NBA </h1>
              <BasketballEvent></BasketballEvent>
            </div>
          }
        />

        <Route
          path="CBAEvent"
          element={
            <div style={{ height: "100%" }}>
              <h1>CBAEvent 篮球赛事中心 CBA </h1>
            </div>
          }
        />
        <Route
          path="NBATeams"
          element={
            <div style={{ height: "100%" }}>
              <h1>NBATeams 篮球球队中心 NBA </h1>
              <BasketballTeam></BasketballTeam>
            </div>
          }
        />
        <Route
          path="CBATeams"
          element={
            <div style={{ height: "100%" }}>
              <h1>CBATeams 篮球球队中心 CBA </h1>
            </div>
          }
        />
        <Route
          path="hzhUser"
          element={
            <div style={{ height: "100%" }}>
              <h1>hzhUser 用户中心 </h1>
            </div>
          }
        />
      </Route>
      <Route path={APP_PATHS.REGISTE} element={<Registe />} />
      <Route path={APP_PATHS.FORGET} element={<Forget />} />
    </Routes>
  );
};

export { Router };
