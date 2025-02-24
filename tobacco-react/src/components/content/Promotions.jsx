import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Table,
    Button,
    SideSheet,
    Card,
    CardGroup,
    Typography,
} from "@douyinfe/semi-ui";
import { VChart } from "@visactor/react-vchart";
import axios from "axios";
import config from "../../config";
function StrategyRecommendation() {
    // 表格数据
    const [dataSource, setData] = useState([]);
    const [side_visible, setSideVisible] = useState(false);
    // 点击表格的key, 用于获取ROI报告
    const [currentClickedKey, setCurrentClickedKey] = useState(null);
    const [activity_roi, setActicityROI] = useState([]);
    const [card_data, setCardData] = useState([]);


    const activity_roi_spec = {
        type: "common",
        title: {
            text: "市场活动ROI",
        },
        data: activity_roi,
        series: [
            {
                type: "bar",
                id: "bar",
                dataIndex: 0,
                label: { visible: true },
                seriesField: "type",
                stack: true,
                xField: "x",
                yField: "y",
            },
            {
                type: "line",
                id: "line",
                dataIndex: 1,
                label: { visible: true, position: "top" },
                seriesField: "type",
                xField: "x",
                yField: "y",
                stack: false,
            },
        ],
        axes: [
            { orient: "left", seriesIndex: [0] }, // 左侧 Y 轴对应柱状图
            { orient: "right", seriesId: ["line"], grid: { visible: false } }, // 右侧 Y 轴对应折线图
            {
                orient: "bottom",
                type: "band",
                sampling: false,
                label: {
                    autoRotate: true,
                    autoHide: true,
                },
            }, // X 轴
        ],
        legends: {
            visible: true,
            orient: "bottom", // 图例显示在底部
        },
    };

    const side_change = (key) => {
        setCurrentClickedKey(key);
        setSideVisible(!side_visible);
    };

    const columns = [
        {
            title: "活动名称",
            dataIndex: "activity_name",
            align: "center",
            width: "150px",
        },
        {
            title: "活动日期",
            dataIndex: "activity_date",
            align: "center",
        },
        {
            title: "参与人数",
            dataIndex: "participants",
            align: "center",
        },
        {
            title: "销售额",
            dataIndex: "sales_amount",
            align: "center",
            render: (text) => "¥" + text
        },
        {
            title: "新客户数量",
            dataIndex: "new_customers",
            align: "center",
        },
        {
            title: "活动成本",
            dataIndex: "activity_cost",
            align: "center",
            render: (text) => "¥" + text
        },
        {
            title: "投资回报率 (ROI)",
            dataIndex: "roi",
            align: "center",
            render: (text) => text
        },
        {
            title: "ROI分析报告",
            dataIndex: "ROI_report",
            align: "center",
            render: (text, record) => (
                <>
                    <Button
                        type="primary"
                        onClick={() => side_change(record.key)}
                    >
                        生成
                    </Button>
                </>
            ),
        },
    ];

    useEffect(() => {
        getActivities();
        getActicityROI();
        getCardData();
    }, []);

    // Card 数据
    const cardData = [
        {
            title: "市场活动投入",
            value: "¥ " + card_data[0],
            backgroundColor: "rgb(53,106,188)",
            textColor: "white",
        },
        {
            title: "产出销售额",
            value: "¥ " + card_data[1],
            backgroundColor: "rgb(243,146,95)",
            textColor: "white",
        },
        {
            title: "市场活动平均ROI",
            value: card_data[2],
            backgroundColor: "rgb(8,158,152)",
            textColor: "white",
        },
        {
            title: "产出客户数",
            value: card_data[3],
            backgroundColor: "rgb(8,143,199)",
            textColor: "white",
        },
    ];

    const getROIReportContent = () => {
        if (!currentClickedKey) return null;

        const currentActivity = dataSource.find(
            (item) => item.key === currentClickedKey
        );
        if (!currentActivity) return null;

        return (
            <div>
                <h3>ROI分析报告</h3>
                <p>
                    <strong>活动名称:</strong> {currentActivity.activity_name}
                </p>
                <p>
                    <strong>活动日期:</strong> {currentActivity.activity_date}
                </p>
                <p>
                    <strong>参与人数:</strong> {currentActivity.participants}
                </p>
                <p>
                    <strong>销售额:</strong> {currentActivity.sales_amount}
                </p>
                <p>
                    <strong>新客户数量:</strong> {currentActivity.new_customers}
                </p>
                <p>
                    <strong>活动成本:</strong> {currentActivity.activity_cost}
                </p>
                <p>
                    <strong>投资回报率 (ROI):</strong> {currentActivity.roi}
                </p>
                <p>
                    <strong>备注:</strong> {currentActivity.remarks}
                </p>
            </div>
        );
    };

    const getActivities = async () => {
        const url = config.API_BASE_URL + "/activity/";
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json", // 请求头
                },
            });
            setData(response.data.data);
        } catch (error) {
            console.log("error");
        }
    };

    const getActicityROI = async () => {
        const url = config.API_BASE_URL + "/activity/roi";
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json", // 请求头
                },
            });
            setActicityROI(response.data.data);
        } catch (error) {
            console.log("error");
        }
    };

    const getCardData = async () => {
        const url = config.API_BASE_URL + "/activity/card_data";
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json", // 请求头
                },
            });
            setCardData(response.data.data);
        } catch (error) {
            console.log("error");
        }
    };

    return (
        <Row gutter={16} style={{ height: "100%" }}>
            <Row style={{ height: "50%" }}>
                <Col span={12} style={{ height: "100%" }}>
                    <CardGroup
                        spacing={12}
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        {cardData.map((card, index) => (
                            <Card
                                key={index}
                                shadows="hover"
                                title={
                                    <div style={{ color: card.textColor }}>
                                        {card.title}
                                    </div>
                                }
                                headerLine={false}
                                style={{
                                    width: "48%",
                                    height: "48%",
                                    backgroundColor: card.backgroundColor,
                                }}
                            >
                                <Typography
                                    style={{
                                        color: card.textColor,
                                        fontSize: "30px",
                                    }}
                                >
                                    {card.value}
                                </Typography>
                            </Card>
                        ))}
                    </CardGroup>
                </Col>
                <Col span={12} style={{ height: "100%" }}>
                    <VChart spec={activity_roi_spec} />
                </Col>
            </Row>
            <Row className="raised-block" style={{ marginTop: "20px" }}>
                <Row
                    style={{
                        marginTop: "20px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginLeft: "20px",
                    }}
                >
                    活动明细
                </Row>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{ y: 300 }}
                    style={{ paddingLeft: "20px" }}
                />
                <SideSheet
                    title="ROI分析报告"
                    visible={side_visible}
                    onCancel={() => setSideVisible(false)}
                    maskStyle={{
                        backgroundColor: "rgba(var(--semi-grey-9), .15)",
                    }}
                >
                    {getROIReportContent()}
                </SideSheet>
            </Row>
        </Row>
    );
}

export default StrategyRecommendation;
