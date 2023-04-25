import { FC } from "react";

const Profile: FC = () => {
  return (
    <img
      src="nba1.jpg"
      alt="Katherine Johnson"
      style={{ width: 600, height: 338.2 }}
    />
  );
};

const Header: FC = () => {
  return (
    <section>
      <h1>Tsfse-Hzh-Cloud</h1>
      <Profile />
    </section>
  );
};

export { Header };
