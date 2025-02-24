import React, { useState, useEffect } from "react";
import { Select, Cascader, Row, Col, Table, Tag } from "@douyinfe/semi-ui";

import { VChart } from "@visactor/react-vchart";
import axios from "axios";
import config from "../../config";
import "../../assets/css/content/PriceMonitoring.css";
import { IconTick, IconAlertTriangle } from "@douyinfe/semi-icons";

function PriceMonitoring() {
    const [brand, setBrand] = useState("中华");
    const [specification, setSpecification] = useState([
        "硬盒",
        "粗支",
        "烤烟型",
    ]);
    const [region, setRegion] = useState("华北地区");

    const [monitoring, setMonitoring] = useState({});
    const [monitoringTableData, setMonitoringTableData] = useState([]);

    const brandList = [
        { value: "中华", label: "中华" },
        { value: "和天下", label: "和天下" },
        { value: "黄鹤楼", label: "黄鹤楼" },
        { value: "苏烟", label: "苏烟" },
        { value: "芙蓉王", label: "芙蓉王" },
        { value: "云烟", label: "云烟" },
        { value: "利群", label: "利群" },
        { value: "红塔山", label: "红塔山" },
        { value: "双喜烟", label: "双喜烟" },
        { value: "南京", label: "南京" },
        { value: "娇子", label: "娇子" },
        { value: "黄山", label: "黄山" },
        { value: "黄金叶", label: "黄金叶" },
        { value: "泰山", label: "泰山" },
        { value: "贵烟", label: "贵烟" },
        { value: "七匹狼", label: "七匹狼" },
        { value: "真龙", label: "真龙" },
        { value: "好猫", label: "好猫" },
        { value: "钻石", label: "钻石" },
        { value: "金圣", label: "金圣" },
    ];

    const tobaccoTypes = [
        { label: "烤烟型", value: "烤烟型" },
        { label: "雪茄型", value: "雪茄型" },
        { label: "薄荷型", value: "薄荷型" },
    ];

    const packTypes = [
        { label: "硬盒", value: "硬盒" },
        { label: "软盒", value: "软盒" },
    ];
    const branchTypes = [
        { label: "粗支", value: "粗支" },
        { label: "中支", value: "中支" },
        { label: "细支", value: "细支" },
    ];

    const specificationData = packTypes.map((pack) => ({
        ...pack,
        children: branchTypes.map((branch) => ({
            ...branch,
            children: tobaccoTypes,
        })),
    }));

    const regionList = [
        { value: "华北地区", label: "华北地区" },
        { value: "东北地区", label: "东北地区" },
        { value: "华中地区", label: "华中地区" },
        { value: "西南地区", label: "西南地区" },
        { value: "华东地区", label: "华东地区" },
        { value: "西北地区", label: "西北地区" },
        { value: "华南地区", label: "华南地区" },
    ];

    const monitoring_spec = {
        type: "bar",
        data: [
            {
                values: monitoring.difference_values,
            },
        ],
        direction: "horizontal",
        xField: "difference",
        yField: "date",
        title: {
            visible: true,
            text: "建议价格:" + monitoring.advice_price + "(元/包)",
        },
        bar: {
            style: {
                fill(datum) {
                    if (datum.difference < 0) {
                        return "rgb(233, 163, 201)";
                    }

                    return "rgb(161, 215, 106)";
                },
            },
        },
        axes: [
            {
                orient: "left",
                domainLine: {
                    onZero: true,
                },
                tick: {
                    visible: true,
                },
                label: {
                    visible: true,
                },
            },
            {
                orient: "top",
                title: {
                    visible: true,
                    text: "← 低于 · 高于 →",
                    position: "center",
                },
            },
        ],
    };

    const monitoring_table_columns = [
        {
            title: "品牌",
            dataIndex: "brand",
            align: "center",
            render: (text) => text,
        },
        {
            title: "区域",
            dataIndex: "region",
            align: "center",
        },
        {
            title: "规格",
            dataIndex: "specification",
            align: "center",
            render: (text) => text,
        },
        {
            title: "建议价格",
            dataIndex: "advice_price",
            align: "center",
        },
        {
            title: "当前价格",
            dataIndex: "actual_price",
            align: "center",
            render: (text) => text,
        },
        {
            title: "偏差",
            dataIndex: "deviation",
            align: "center",
            render: (text, record) => {
                return `${
                    ((parseFloat(record.actual_price) -
                        parseFloat(record.advice_price)) /
                        parseFloat(record.advice_price)) *
                        100 >=
                    0
                        ? "+"
                        : ""
                }${Math.round(
                    ((parseFloat(record.actual_price) -
                        parseFloat(record.advice_price)) /
                        parseFloat(record.advice_price)) *
                        100
                )}%`;
            },
        },
        {
            title: "状态",
            dataIndex: "status",
            align: "center",
            render: (text, record) => {
                const deviationValue =
                    ((parseFloat(record.actual_price) - parseFloat(record.advice_price)) /
                        parseFloat(record.advice_price)) *
                    100;
                const absDeviation = Math.abs(deviationValue);
                const status = absDeviation >= 30 ? "serious_abnormality" : absDeviation >= 25 ? "slight_abnormality" : "normal";
                const tagConfig = {
                    normal: {
                        color: "green",
                        prefixIcon: <IconTick />,
                        text: "正常",
                    },
                    slight_abnormality: {
                        color: "orange",
                        prefixIcon: <IconAlertTriangle />,
                        text: "轻微异常",
                    },
                    serious_abnormality: {
                        color: "red",
                        prefixIcon: <IconAlertTriangle />,
                        text: "严重异常",
                    },
                };
                const tagProps = tagConfig[status];
                return (
                    <Tag size="large" {...tagProps}>
                        {" "}
                        {tagProps.text}
                    </Tag>
                );
            },
        },
    ];

    useEffect(() => {
        const data = {
            brand: brand,
            pack_type: specification[0],
            diameter: specification[1],
            taste: specification[2],
            region: region,
        };
        handleInputChange(data);
    }, [brand, specification, region]);

    useEffect(() => {
        const data = {
            brand: brand,
            pack_type: specification[0],
            diameter: specification[1],
            taste: specification[2],
            region: region,
        };
        handleInputChange(data);
        getMonitoringTableData();
    }, []);

    const getMonitoringTableData = async () => {
        const url = config.API_BASE_URL + "/actual_price";
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json", // 请求头
                },
            });
            setMonitoringTableData(response.data.data);
        } catch (error) {
            console.log("error");
        }
    };

    const handleInputChange = async (data) => {
        const url = config.API_BASE_URL + "/actual_price/";
        try {
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json", // 请求头
                },
            });
            setMonitoring(response.data.data);
        } catch (error) {
            console.log("error");
        }
    };

    return (
        <Row gutter={16} className="raised-block" style={{ height: "100%" }}>
            <Col className="sales-analysis " span={8}>
                <Row className="filter">
                    <Select
                        placeholder="请选择"
                        filter
                        searchPosition="dropdown"
                        insetLabel="品牌"
                        optionList={brandList}
                        defaultValue={brand}
                        className="selectBrand"
                        onChange={(value) => setBrand(value)}
                    />
                    <Select
                        placeholder="区域"
                        searchPosition="dropdown"
                        insetLabel="区域"
                        optionList={regionList}
                        defaultValue={region}
                        className="selectRegion"
                        onChange={(value) => setRegion(value)}
                    />
                </Row>
                <Row className="filter">
                    <Cascader
                        checkRelation="unRelated"
                        treeData={specificationData}
                        defaultValue={specification}
                        insetLabel="规格"
                        className="monitoring-select-specification"
                        dropdownStyle={{ height: "120px" }}
                        onChange={(value) => setSpecification(value)}
                    />
                </Row>
                <Row className="monitoring-chart">
                    <VChart spec={monitoring_spec} />
                </Row>
            </Col>
            <Col
                span={16}
                style={{ height: "100%", padding: "0px 0px 0px 20px" }}
            >
                <Row
                    style={{
                        height: "50px",
                        fontSize: "20px",
                        marginTop: "20px",
                        marginLeft: "12px",
                        fontWeight: "bold",
                    }}
                >
                    价格监测(最近1个月)
                </Row>

                <Table
                    columns={monitoring_table_columns}
                    dataSource={monitoringTableData}
                    pagination={true}
                    scroll={{ y: 410 }}
                />
            </Col>
        </Row>
    );
}

export default PriceMonitoring;
