import React, { FC } from "react";
import { Carousel } from "antd";

const contentStyle: React.CSSProperties = {
  height: "260px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Nba1: FC = () => {
  return (
    <img src="nba1.jpg" alt="NBA1" style={{ width: 650, height: 338.2 }} />
  );
};

const Nba2: FC = () => {
  return (
    <img src="nba2.png" alt="NBA2" style={{ width: 650, height: 338.2 }} />
  );
};

const Nba3: FC = () => {
  return (
    <img src="nba3.jpg" alt="NBA3" style={{ width: 650, height: 338.2 }} />
  );
};

const Nba4: FC = () => {
  return (
    <img src="nba4.jpg" alt="NBA4" style={{ width: 650, height: 338.2 }} />
  );
};

const MyCarousel: React.FC = () => {
  return (
    <Carousel autoplay>
      <div>
        <h3 style={contentStyle}>
          <Nba1 />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <Nba2 />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <Nba3 />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <Nba4 />
        </h3>
      </div>
    </Carousel>
  );
};

export { MyCarousel };
