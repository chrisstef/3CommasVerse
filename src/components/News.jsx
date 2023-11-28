import React, { useState } from "react";
import { Select, Typography, Row, Col, Card } from "antd";
import moment from "moment";

import Loader from "./Loader";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
    const { data } = useGetCryptosQuery(100);
    const { data: cryptoNews } = useGetCryptoNewsQuery({
        newsCategory,
        count: simplified ? 6 : 18,
    });

    if (!cryptoNews?.value) return <Loader />;

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Enter your crypto here..."
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) =>
                            option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="Cryptocurency">Cryptocurrency</Option>
                        {data?.data?.coins?.map((currency) => (
                            <Option value={currency.name}>
                                {currency.name}
                            </Option>
                        ))}
                    </Select>
                </Col>
            )}
            {cryptoNews.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={5}>
                                    {news.name.length > 100
                                        ? `${news.name.substring(0, 100)}...`
                                        : news.name}
                                </Title>
                                <img
                                    src={news?.image?.thumbnail?.contentUrl}
                                    alt=""
                                    key={i}
                                />
                            </div>
                            <p>
                                {news.description.length > 140
                                    ? `${news.description.substring(0, 140)}...`
                                    : news.description}
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Text className="provider-name">
                                        {news.provider[0]?.name}
                                    </Text>
                                </div>
                                <Text>
                                    {moment(news.datePublished)
                                        .startOf("ss")
                                        .fromNow()}
                                </Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default News;
