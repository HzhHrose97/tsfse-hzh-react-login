import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { App as AntdApp } from "antd";

import { ErrorBoundary } from "./ErrorBoundary";
import { Router } from "./Router";

const App: FC = () => {
  return (
    <ErrorBoundary>
      <AntdApp>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AntdApp>
    </ErrorBoundary>
  );
};

export { App };
