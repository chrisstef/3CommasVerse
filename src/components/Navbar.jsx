import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  FundOutlined,
  MenuOutlined,
  BulbOutlined,
} from "@ant-design/icons";

import icon from "../images/3commas_logo.png";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screensize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screensize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screensize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Link to="/">
          <Avatar
            shape="square"
            src={icon}
            style={{ verticalAlign: "middle" }}
            size="medium"
          />
        </Link>
        <Typography.Title level={3} className="logo">
          <Link style={{ color: "#000000" }} to="/">
            3CommasVerse
          </Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          style={{
            background: "#21A698",
            paddingTop: "0px",
            marginLeft: "2px",
          }}
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>{" "}
      </div>
      {activeMenu && (
        <Menu style={{ background: "#fff" }} theme="light">
          <Menu.Item
            style={{ color: "#000000" }}
            key="1"
            icon={<HomeOutlined />}
          >
            <Link style={{ color: "#000000" }} to="/">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item
            style={{ color: "#000000" }}
            key="2"
            icon={<FundOutlined />}
          >
            <Link style={{ color: "#000000" }} to="/cryptocurrencies">
              Cryptocurrencies
            </Link>
          </Menu.Item>
          <Menu.Item
            style={{ color: "#000000" }}
            key="3"
            icon={<BulbOutlined />}
          >
            <Link style={{ color: "#000000" }} to="/news">
              News
            </Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
