import React from "react";
import millify from "millify"; // To format our numbers.
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../components";
import Loader from "./Loader";

const { Title } = Typography;

const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(10); // Declare our custom hook that we will use to dynamically display our data.
    const globalStats = data?.data?.stats;

    if (isFetching) return <Loader />;

    return (
        <>
            <Title level={2} className="heading">
                Global Crypto Stats
            </Title>
            <Row>
                <Col span={12}>
                    <Statistic
                        title="Total Cryptocurrencies"
                        value={globalStats.total}
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title="Total Exchanges"
                        value={millify(globalStats.totalExchanges)}
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title="Total Market Cap"
                        value={millify(globalStats.totalMarketCap)}
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title="Total 24h Volume"
                        value={millify(globalStats.total24hVolume)}
                    />
                </Col>
            </Row>
            <div className="home-heading-container">
                <Title level={2} className="home-title">
                    Top 10 Cryptocurrencies
                </Title>
                <Title level={3} className="show-more">
                    <Link style={{ color: "#00a59a" }} to="/cryptocurrencies">
                        Show more
                    </Link>
                </Title>
            </div>
            <Cryptocurrencies simplified />
            <div className="home-heading-container">
                <Title level={2} className="home-title">
                    Latest Crypto News
                </Title>
                <Title level={3} className="show-more">
                    <Link style={{ color: "#00a59a" }} to="/news">
                        Show more
                    </Link>
                </Title>
            </div>
            <News simplified />
        </>
    );
};

export default Homepage;
