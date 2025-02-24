import React, { useState, useEffect, useRef } from "react";
import {
    Col,
    Row,
    Table,
    Avatar,
    Input,
    Space,
    Tag,
    Divider,
} from "@douyinfe/semi-ui";
import { VChart } from "@visactor/react-vchart";
import axios from "axios";
import config from "../../config";

function CustomerAnalysis() {
    const [dataSource, setData] = useState([]);
    const [filteredValue, setFilteredValue] = useState([]);
    const [customerName, setCustomerName] = useState([]);
    const [mainSpecification, setMainSpecification] = useState([]);
    const [orderFullRate, setOrderFullRate] = useState([]);
    const compositionRef = useRef({ isComposition: false });
    

    const handleChange = (value) => {
        if (compositionRef.current.isComposition) {
            return;
        }
        const newFilteredValue = value ? [value] : [];
        setFilteredValue(newFilteredValue);
    };
    const handleCompositionStart = () => {
        compositionRef.current.isComposition = true;
    };

    const handleCompositionEnd = (event) => {
        compositionRef.current.isComposition = false;
        const value = event.target.value;
        const newFilteredValue = value ? [value] : [];
        setFilteredValue(newFilteredValue);
    };

    const colors = [
        "amber",
        "blue",
        "cyan",
        "green",
        "grey",
        "indigo",
        "light-blue",
        "light-green",
        "lime",
        "orange",
        "pink",
        "purple",
        "red",
        "teal",
        "violet",
        "yellow",
    ];

    const columns = [
        {
            title: (
                <Space>
                    <span>客户姓名</span>
                    <Input
                        placeholder="请输入客户姓名"
                        style={{ width: 130 }}
                        onCompositionStart={handleCompositionStart}
                        onCompositionEnd={handleCompositionEnd}
                        onChange={handleChange}
                        showClear
                    />
                </Space>
            ),
            dataIndex: "customer_name",
            align: "center",
            width: 260,
            render: (text, record, index) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: "20px",
                        }}
                    >
                        <Avatar
                            size="small"
                            color={colors[record.key % colors.length]}
                            style={{ marginRight: 4 }}
                        >
                            {typeof text === "string" && text.slice(0, 1)}
                        </Avatar>
                        {text}
                    </div>
                );
            },
            onFilter: (value, record) => record.customer_name.includes(value),
            filteredValue,
        },
        {
            title: "地址",
            dataIndex: "address",
            align: "center",
            render: (text) => text,
        },
        {
            title: "电话号码",
            dataIndex: "telephone",
            align: "center",
            render: (text) => text,
        },
        {
            title: "客户等级",
            dataIndex: "level",
            align: "center",
            render: (text) => {
                const tagConfig = {
                    5: {
                        color: "#FFD700",
                        backgroundColor: "black",
                        text: "至尊客户",
                    },
                    4: { color: "red", text: "核心客户" },
                    3: { color: "blue", text: "活跃客户" },
                    2: { color: "green", text: "普通客户" },
                    1: { color: "grey", text: "观望客户" },
                };
                const tagProps = tagConfig[text];
                return (
                    <Tag
                        size="large"
                        {...tagProps}
                        style={{
                            color: tagProps.color,
                            backgroundColor: tagProps.backgroundColor,
                            marginLeft: "27px",
                        }}
                    >
                        {tagProps.text}
                    </Tag>
                );
            },
        },
    ];

    const main_specification_spec = {
        type: "pie",
        data: [
            {
                values: mainSpecification,
            },
        ],
        valueField: "value",
        categoryField: "specification",
        title: {
            visible: true,
            text: `${customerName} 主销规格(过去一年)`,
        },
        legends: {
            visible: true,
            orient: "left",
        },
        label: {
            visible: false,
        },
        tooltip: {
            mark: {
                content: [
                    {
                        key: (datum) => datum["specification"],
                        value: (datum) => datum["value"] + "%",
                    },
                ],
            },
        },
    };

    const order_full_rate_spec = {
        type: "line",
        title: {
            visible: true,
            text: `${customerName} 订足率变化`,
        },
        data: {
            values: orderFullRate,
        },
        xField: "date",
        yField: "value",
    };

    useEffect(() => {
        getPriceRange();
        getDetails(1);
    }, []);

    const [currentClickedKey, setCurrentClickedKey] = useState(null);
    const onRowClick = (record, index) => {
        return {
            onClick: (event) => {
                // 如果点击的是当前行，则取消样式（即将currentClickedKey设为null）
                if (record.key === currentClickedKey) {
                    setCurrentClickedKey(null);
                } else {
                    setCurrentClickedKey(record.key);
                }
                setCustomerName(record.customer_name)
                // 获取图表数据
                getDetails(record.key);
            },
            // 根据当前行的key判断是否应用点击样式
            style: record.key === currentClickedKey? { backgroundColor: 'var(--semi-color-fill-0)' } : {}
        };
    };

    const getPriceRange = async () => {
        const url = config.API_BASE_URL + "/customers";
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
    const getDetails = async (id) => {
        const data = {
            "id": id
        }
        const url = config.API_BASE_URL + "/customers/details";
        try {
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json", // 请求头
                },
            });
            setMainSpecification(response.data.data.main_selling_spec);
            setOrderFullRate(response.data.data.order_full_rate);
        } catch (error) {
            console.log("error");
        }
    };

    return (
        <Row className="raised-block" gutter={16} style={{ height: "100%" }}>
            <Col span={16} style={{ height: "100%" }}>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{ y: 475 }}
                    onRow={onRowClick}
                />
            </Col>
            {/* <Divider style={{ borderWidth: "3px" }}/> */}
            <Col span={8} style={{ height: "100%" }}>
                <Row style={{ height: "50%" }}>
                    <VChart spec={main_specification_spec} />
                </Row>
                {/* <Divider style={{ borderWidth: "3px" }}/> */}
                <Row style={{ height: "50%" }}>
                    <VChart spec={order_full_rate_spec} />
                </Row>
            </Col>
        </Row>
    );
}

export default CustomerAnalysis;
