import React, { useState, useEffect } from "react";
import {
    Select,
    DatePicker,
    Cascader,
    Row,
    Col,
    Dropdown,
    Button,
} from "@douyinfe/semi-ui";
import "../../assets/css/content/SalesAnalysis.css";

import { VChart } from "@visactor/react-vchart";
import axios from "axios";
import config from "../../config";
import { IconChevronRight } from "@douyinfe/semi-icons";

function SalesAnalysis() {
    const [brand, setBrand] = useState("中华");
    const [specification, setSpecification] = useState([
        "硬盒",
        "粗支",
        "烤烟型",
    ]);
    const [dateRange, setDateRange] = useState([
        new Date("2024-01-01"),
        new Date("2024-05-01"),
    ]);
    const [advice, setAdvice] = useState([
        {
            node: "item",
            name: "华北地区, 维持现有营销力度，适时适度增加",
            icon: <IconChevronRight />,
        },
        {
            node: "item",
            name: "东北地区, 加大营销投入",
            icon: <IconChevronRight />,
        },
        {
            node: "item",
            name: "华中地区, 保持当前营销规模，精准营销",
            icon: <IconChevronRight />,
        },
        {
            node: "item",
            name: "西南地区, 加大营销投入",
            icon: <IconChevronRight />,
        },
        {
            node: "item",
            name: "华东地区, 根据波动原因分析结果，灵活调整营销力度",
            icon: <IconChevronRight />,
        },
        {
            node: "item",
            name: "西北地区, 加大营销力度",
            icon: <IconChevronRight />,
        },
        {
            node: "item",
            name: "华南地区, 在总结成功经验基础上，针对性加大营销",
            icon: <IconChevronRight />,
        },
    ]);
    const [sales, setSales] = useState([]);
    const [structure, setStructure] = useState([]);
    const [price_range, setPriceRange] = useState([]);

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

    const sales_spec = {
        type: "line",
        data: {
            values: sales,
        },
        title: {
            visible: true,
            text: "各区域销量变化",
        },
        axes: [
            {
                orient: "left",
                min: 0.9 * Math.min(...sales.map(item => item.value)),
                max: 1.1 * Math.max(...sales.map(item => item.value)),
            },
        ],
        xField: "date",
        yField: "value",
        seriesField: "region",
        lineLabel: { visible: true },
        legends: [{ visible: true, position: "middle", orient: "bottom" }],
    };

    const structure_spec = {
        type: "pie",
        data: [
            {
                values: structure,
            },
        ],
        outerRadius: 0.8,
        valueField: "value",
        categoryField: "level",
        pie: {
            state: {
                active: {
                    outerRadius: 0.9,
                },
            },
        },
        title: {
            visible: true,
            text: "高中低端产品占比",
        },
        legends: {
            visible: true,
            orient: "left",
        },
        label: {
            visible: true,
        },
        tooltip: {
            mark: {
                content: [
                    {
                        key: (datum) => datum["level"],
                        value: (datum) => datum["value"] + "%",
                    },
                ],
            },
        },
        interactions: [
            {
                type: "element-active-by-legend",
            },
        ],
    };

    const price_spec = {
        type: "bar",
        title: {
            visible: true,
            text: "不同价位段市场表现(年度销量/包)",
        },
        data: [
            {
                values: price_range,
            },
        ],
        direction: "horizontal",
        xField: "value",
        yField: "scope",
        axes: [
            {
                orient: "bottom",
                visible: false,
            },
        ],
        label: {
            visible: true,
        },
    };

    useEffect(() => {
        const data = {
            brand: brand,
            pack_type: specification[0],
            diameter: specification[1],
            taste: specification[2],
            start_date: dateRange[0].toISOString().slice(0, 10),
            end_date: dateRange[1].toISOString().slice(0, 10),
        };
        handleInputChange(data);
    }, [brand, specification, dateRange]);

    useEffect(() => {
        const icon_advice = advice.map((item) => ({
            ...item,
            icon: <IconChevronRight />,
        }));
        setAdvice(icon_advice);
        getStructure();
        getPriceRange();
    }, []);

    const handleInputChange = async (data) => {
        const url = config.API_BASE_URL + "/sales_data/";
        try {
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json", // 请求头
                },
            });
            setSales(response.data.data);
        } catch (error) {
            console.log("error");
        }
    };

    const getStructure = async () => {
        const url = config.API_BASE_URL + "/brands/structure";
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json", // 请求头
                },
            });
            setStructure(response.data.data);
        } catch (error) {
            console.log("error");
        }
    };

    const getPriceRange = async () => {
        const url = config.API_BASE_URL + "/sales_data/price_range";
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json", // 请求头
                },
            });
            setPriceRange(response.data.data);
        } catch (error) {
            console.log("error");
        }
    };


    return (
        <Row gutter={16} style={{ height: "100%" }}>
            <Col className="sales-analysis raised-block" span={16}>
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
                    <Cascader
                        checkRelation="unRelated"
                        treeData={specificationData}
                        defaultValue={specification}
                        insetLabel="规格"
                        className="selectSpecification"
                        dropdownStyle={{ height: "120px" }}
                        onChange={(value) => setSpecification(value)}
                    />
                    <DatePicker
                        type="monthRange"
                        insetLabel="日期"
                        className="datePickerTrigger"
                        showClear={false}
                        endYear={new Date().getFullYear()}
                        defaultValue={dateRange}
                        onChange={(value) => setDateRange(value)}
                    />
                    <Dropdown
                        trigger={"click"}
                        position={"bottom"}
                        menu={advice}
                    >
                        <Button
                            theme="solid"
                            type="secondary"
                            style={{ marginBottom: 20 }}
                        >
                            营销建议
                        </Button>
                    </Dropdown>
                </Row>
                <Row className="sales-chart">
                    <VChart spec={sales_spec} />
                </Row>
            </Col>
            <Col span={8} style={{ height: "100%" }}>
                <Row className="raised-block" style={{ height: "60%" }}>
                    <VChart spec={structure_spec} />
                </Row>
                <Row className="raised-block" style={{ height: "40%" }}>
                    <VChart spec={price_spec} />
                </Row>
            </Col>
        </Row>
    );
}

export default SalesAnalysis;
