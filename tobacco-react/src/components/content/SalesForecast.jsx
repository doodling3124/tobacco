import React, { useState, useEffect } from "react";
import { Select, Row, Col, Table, Tag, Cascader } from "@douyinfe/semi-ui";
import "../../assets/css/content/SalesForecast.css";

import { VChart } from "@visactor/react-vchart";
import axios from "axios";
import config from "../../config";
import { IconTick, IconAlertTriangle } from "@douyinfe/semi-icons";

function SalesForecast() {
    const [brand, setBrand] = useState("中华");
    const [specification, setSpecification] = useState([
            "硬盒",
            "粗支",
            "烤烟型",
        ]);
    const [region, setRegion] = useState("华北地区");
    const [sales_forecast, setSalesForecast] = useState([   
        {
            date: "2024-01",
            sales: 10005,
        },
        {
            date: "2024-02",
            sales: 9980,
        },
        {
            date: "2024-03",
            sales: 10012,
        },
        {
            date: "2024-04",
            sales: 9990,
        },
        {
            date: "2024-05",
            sales: 10020,
        },
        {
            date: "2024-06",
            sales: 9975,
        },
        {
            date: "2024-07",
            sales: 10018,
        },
        {
            date: "2024-08",
            sales: 9988,
        },
        {
            date: "2024-09",
            sales: 10025,
        },
        {
            date: "2024-10",
            sales: 9970,
        },
        {
            date: "2024-11",
            sales: 10015,
        },
        {
            date: "2024-12",
            sales: 9985,
        },
        {
            date: "2025-01 (预测)",
            sales: 10008,
            latest: true,
        },
        {
            date: "2025-02 (预测)",
            sales: 9992,
            latest: true,
        },
        {
            date: "2025-03 (预测)",
            sales: 10010,
            latest: true,
        },
        {
            date: "2025-04 (预测)",
            sales: 9995,
            latest: true,
        },
        {
            date: "2025-05 (预测)",
            sales: 10022,
            latest: true,
        },
        {
            date: "2025-06 (预测)",
            sales: 9978,
            latest: true,
        },
        {
            date: "2025-07 (预测)",
            sales: 10016,
            latest: true,
        },
        {
            date: "2025-08 (预测)",
            sales: 9983,
            latest: true,
        },
        {
            date: "2025-09 (预测)",
            sales: 10028,
            latest: true,
        },
        {
            date: "2025-10 (预测)",
            sales: 9968,
            latest: true,
        },
        {
            date: "2025-11 (预测)",
            sales: 10013,
            latest: true,
        },
        {
            date: "2025-12 (预测)",
            sales: 9982,
            latest: true,
        },
    ]);
    const [inventory_table_data, setInventoryTableData] = useState([]);

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
    const forecast_spec = {
        type: "line",
        title: {
            text: "销量预测",
        },
        data: {
            values: sales_forecast,
        },
        xField: "date",
        yField: "sales",
        axes: [
            {
                type: "linear",
                orient: "left",
                min:
                    0.999 *
                    Math.min(...sales_forecast.map((item) => item.sales)),
                max:
                    1.001 *
                    Math.max(...sales_forecast.map((item) => item.sales)),
            },
        ],
        line: {
            style: {
                lineDash: (data) => {
                    if (data.latest) {
                        return [5, 5];
                    }
                    return [0];
                },
            },
        },
    };

    const inventory_table_columns = [
        {
            title: "品牌",
            dataIndex: "brand",
            align: "center",
            render: (text) => text,
        },
        {
            title: "规格",
            dataIndex: "specification",
            align: "center",
            render: (text) => text,
        },
        {
            title: "区域",
            dataIndex: "region",
            align: "center",
        },
        {
            title: "当前库存",
            dataIndex: "current_inventory",
            align: "center",
        },
        {
            title: "预测销量",
            dataIndex: "forecast_sales",
            align: "center",
            render: (text) => text,
        },
        {
            title: "建议进货量",
            dataIndex: "recommended_purchase_quantity",
            align: "center",
            render: (text) => text,
        },
        {
            title: "缺货率",
            dataIndex: "out_of_stock_rate",
            align: "center",
            sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
            render: (text) => {
                var status = "normal"
                if (text >= 0.65) {
                    status = "danger"
                } else if (text >= 0.5) {
                    status = "slight_danger"
                }
                const tagConfig = {
                    normal: {
                        color: "green",
                        prefixIcon: <IconTick />,
                        text: text,
                    },
                    slight_danger: {
                        color: "orange",
                        prefixIcon: <IconAlertTriangle />,
                        text: text,
                    },
                    danger: {
                        color: "red",
                        prefixIcon: <IconAlertTriangle />,
                        text: text,
                    },
                };
                const tagProps = tagConfig[status];
                return (
                    <Tag size="large" {...tagProps}>
                        {tagProps.text}
                    </Tag>
                );
            },
        },
        {
            title: "预计成本",
            dataIndex: "estimated_cost",
            align: "center",
            render: (text) => "¥" + text,
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
        getForecastSpec(data);
        getInventory();
    }, []);

    useEffect(() => {
        const data = {
            brand: brand,
            pack_type: specification[0],
            diameter: specification[1],
            taste: specification[2],
            region: region,
        };
        getForecastSpec(data);
    }, [brand, specification, region]);

    const getForecastSpec = async (data) => {
        const url = config.API_BASE_URL + "/sales_data_predictions/";
        try {
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json", // 请求头
                },
            });
            setSalesForecast(response.data.data);
        } catch (error) {
            console.log("error");
        }
    };

    const getInventory = async () => {
        const url = config.API_BASE_URL + "/inventory/";
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json", // 请求头
                },
            });
            setInventoryTableData(response.data.data)
        } catch (error) {
            console.log("error");
        }
    };


    return (
        <Row gutter={16} style={{ height: "100%" }}>
            <Row style={{ height: "50%" }}>
                <Col
                    className="sales-forecast raised-block"
                    span={24}
                    style={{ height: "100%" }}
                >
                    <Row className="filter">
                        <Select
                            filter
                            searchPosition="dropdown"
                            insetLabel="品牌"
                            optionList={brandList}
                            defaultValue={brand}
                            className="selectBrand"
                            onChange={(value) => setBrand(value)}
                        />
                        <Cascader
                            checkRelation="unRelated"
                            treeData={specificationData}
                            defaultValue={specification}
                            insetLabel="规格"
                            className="selectSpecification"
                            dropdownStyle={{ height: "120px" }}
                            onChange={(value) => setSpecification(value)}
                        />
                        <Select
                            insetLabel="区域"
                            optionList={regionList}
                            defaultValue={region}
                            className="selectRegion"
                            onChange={(value) => setRegion(value)}
                        />
                    </Row>
                    <Row className="forecast-chart" style={{ height: "100%" }}>
                        <VChart spec={forecast_spec} />
                    </Row>
                </Col>
            </Row>
            <Row style={{ height: "50%" }}>
                <Col span={24} style={{ height: "100%" }}>
                    <Row className="raised-block" style={{ height: "100%" }}>
                        <Table
                            columns={inventory_table_columns}
                            dataSource={inventory_table_data}
                            scroll={{ y: 200 }}
                            style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                            }}
                        />
                    </Row>
                </Col>
            </Row>
        </Row>
    );
}

export default SalesForecast;
