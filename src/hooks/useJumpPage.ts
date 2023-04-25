import { useNavigate } from "react-router-dom";
import { useMemoizedFn } from "ahooks";

import { APP_PATHS, AppPathsKey } from "@common/config";

/**
 * useJumpPage
 * 指定のページへジャンプする
 * @example
 * const {jump, navigate } = useJumpPage();
 * // ...
 * jumpPage("XX")
 * navigate("/path")
 */
const useJumpPage = () => {
  const navigate = useNavigate();

  const jump = (path: AppPathsKey) => {
    navigate(APP_PATHS[path]);
  };

  const goHome = () => {
    jump("ROOT");
  };

  return {
    jump: useMemoizedFn(jump),
    goHome: useMemoizedFn(goHome),
  };
};

export type JumpPage = ReturnType<typeof useJumpPage>;
export { useJumpPage };
