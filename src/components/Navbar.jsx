import React, { useState, useEffect, useRef } from "react";
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
    const [activeMenu, setActiveMenu] = useState(false);
    const [screensize, setScreenSize] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (screensize > 768) {
            setActiveMenu(true);
        } else {
            setActiveMenu(false);
        }
    }, [screensize]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                activeMenu
            ) {
                setActiveMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [activeMenu]);

    const handleMenuToggle = () => {
        setActiveMenu(!activeMenu);
    };

    const handleMenuItemClick = () => {
        if (screensize < 768) {
            setActiveMenu(false);
        }
    };

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
                {screensize < 768 && (
                    <Button
                        className="menu-control-container"
                        style={{
                            background: "#00a59a",
                            paddingTop: "0px",
                            marginLeft: "2px",
                        }}
                        onClick={handleMenuToggle}
                    >
                        <MenuOutlined />
                    </Button>
                )}
            </div>
            <div ref={menuRef}>
                <Menu
                    style={{
                        background: "#fff",
                        display:
                            screensize >= 768 || activeMenu ? "block" : "none",
                    }}
                    theme="light"
                >
                    <Menu.Item
                        style={{ color: "#000000" }}
                        key="1"
                        icon={<HomeOutlined />}
                        onClick={handleMenuItemClick}
                    >
                        <Link style={{ color: "#000000" }} to="/">
                            Home
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        style={{ color: "#000000" }}
                        key="2"
                        icon={<FundOutlined />}
                        onClick={handleMenuItemClick}
                    >
                        <Link
                            style={{ color: "#000000" }}
                            to="/cryptocurrencies"
                        >
                            Cryptocurrencies
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        style={{ color: "#000000" }}
                        key="3"
                        icon={<BulbOutlined />}
                        onClick={handleMenuItemClick}
                    >
                        <Link style={{ color: "#000000" }} to="/news">
                            News
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    );
};

export default Navbar;
