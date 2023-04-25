// 路由跳转
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { APP_PATHS } from "@common/config";
import { Demo } from "Demo";
import { Forget, Home, Login, Registe } from "page";

const Router: FC = () => {
  return (
    <Routes>
      <Route path={APP_PATHS.ROOT} element={<div>root</div>} />
      <Route path={APP_PATHS.DEMO} element={<Demo />} />
      <Route path={APP_PATHS.LOGIN} element={<Login />} />
      <Route path={APP_PATHS.HOME} element={<Home />} />
      <Route path={APP_PATHS.REGISTE} element={<Registe />} />
      <Route path={APP_PATHS.FORGET} element={<Forget />} />
    </Routes>
  );
};

export { Router };
