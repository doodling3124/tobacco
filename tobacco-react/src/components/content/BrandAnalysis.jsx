import React, { useState, useEffect, useMemo } from "react";
import {
    Select,
    DatePicker,
    Col,
    Row,
    RadioGroup,
    Radio,
} from "@douyinfe/semi-ui";
import "../../assets/css/content/BrandAnalysis.css";

import { VChart } from "@visactor/react-vchart";
import axios from "axios";
import config from "../../config";
import { get } from "@visactor/vtable/es/themes";

function BrandAnalysis() {
    const [main_brand, setMainBrand] = useState("中华");
    const [contrast_brand, setContrastBrand] = useState([
        "和天下",
        "黄鹤楼",
        "苏烟",
        "芙蓉王",
    ]);
    const [dateRange, setDateRange] = useState([
        new Date("2024-01-01"),
        new Date("2025-01-01"),
    ]);
    const [lineRange, setLineRange] = useState([]);

    // 品牌对比图
    const [brandContrastSpec, setBrandContrastSpec] = useState([]);

    // 不同规格折线图
    const [selectedSpec, setSelectedSpec] = useState("pack_type");
    const [specificationLineData, setSpecificationLineData] = useState({});
    const [specificationPieData, setSpecificationPieData] = useState({});

    const initialBrandList = [
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
    // 动态生成对比品牌的选项列表
    const contrastBrandOptions = useMemo(() => {
        return initialBrandList.map((brand) => ({
            ...brand,
            disabled: brand.value === main_brand,
        }));
    }, [main_brand]);

    const brands_spec = {
        type: "rose",
        title: {
            text: "各品牌销量",
        },
        data: [
            {
                values: brandContrastSpec,
            },
        ],
        outerRadius: 0.8,
        innerRadius: 0.2,
        categoryField: "brand",
        valueField: "value",
        seriesField: "brand",
        animationAppear: {
            duration: 1500,
            easing: "linear",
        },
        label: {
            visible: true,
            layout: {
                tangentConstraint: false,
            },
        },
    };

    const specification_line_spec = {
        type: "line",
        title: {
            text: `${main_brand} 不同规格销量变化 (万包)`,
        },
        data: [
            {
                values: specificationLineData[selectedSpec],
            },
        ],
        xField: "date",
        yField: "value",
        axes: [
            {
                orient: "left",
                min: lineRange[0],
                max: lineRange[1],
            },
        ],
        seriesField: "specification",
        point: {},
        smooth: true,
        animation: {
            enter: {
                duration: 1000,
            },
        },
        tooltip: {
            shared: true,
        },
    };

    const specification_pie_spec = {
        type: "common",
        padding: {
            top: 8,
            bottom: 16,
        },
        layout: {
            type: "grid",
            col: 3,
            row: 2,
            elements: [
                {
                    modelId: "pack_type_pie",
                    col: 0,
                    row: 0,
                },
                {
                    modelId: "diameter_pie",
                    col: 1,
                    row: 0,
                },
                {
                    modelId: "taste_pie",
                    col: 2,
                    row: 0,
                },
                {
                    modelId: "pack_type_legend",
                    col: 0,
                    row: 1,
                },
                {
                    modelId: "diameter_legend",
                    col: 1,
                    row: 1,
                },
                {
                    modelId: "taste_legend",
                    col: 2,
                    row: 1,
                },
            ],
        },
        region: [
            {
                id: "pack_type_pie",
            },
            {
                id: "diameter_pie",
            },
            {
                id: "taste_pie",
            },
        ],
        legends: [
            {
                visible: true,
                orient: "bottom",
                id: "pack_type_legend",
                regionId: ["pack_type_pie"],
                item: {
                    visible: true,
                    background: {
                        style: {
                            fill: "transparent",
                        },
                    },
                },
            },
            {
                visible: true,
                orient: "bottom",
                id: "diameter_legend",
                regionId: ["diameter_pie"],
                item: {
                    visible: true,
                    background: {
                        style: {
                            fill: "transparent",
                        },
                    },
                },
            },
            {
                visible: true,
                orient: "bottom",
                id: "taste_legend",
                regionId: ["taste_pie"],
                item: {
                    visible: true,
                    background: {
                        style: {
                            fill: "transparent",
                        },
                    },
                },
            },
        ],
        series: [
            {
                id: "pack_type_pie",
                regionId: "pack_type_pie",
                type: "pie",
                valueField: "value",
                categoryField: "pack_type",
                data: {
                    id: "pack_type_pie",
                    values: specificationPieData.pack_type,
                },
                seriesField: "pack_type",
                label: {
                    style: {
                        visible: false,
                    },
                },
            },
            {
                id: "diameter_pie",
                regionId: "diameter_pie",
                type: "pie",
                animationAppear: {
                    preset: "fadeIn",
                },
                valueField: "value",
                categoryField: "diameter",
                data: {
                    id: "diameter_pie",
                    values: specificationPieData.diameter,
                },
                seriesField: "diameter",
                label: {
                    style: {
                        visible: false,
                    },
                },
            },
            {
                id: "taste_pie",
                regionId: "taste_pie",
                type: "pie",
                valueField: "value",
                categoryField: "taste",
                animationAppear: {
                    preset: "growRadius",
                },
                data: {
                    id: "taste_pie",
                    values: specificationPieData.taste,
                },
                seriesField: "taste",
                label: {
                    style: {
                        visible: false,
                    },
                },
            },
        ],
    };

    const handleMainBrandChange = (value) => {
        setMainBrand(value);
        // 如果新选择的主品牌在对比品牌中，则从对比品牌中移除
        setContrastBrand((prev) => prev.filter((brand) => brand !== value));
    };

    useEffect(() => {
        const line_data = {
            main_brand: main_brand,
            contrast_brand: contrast_brand,
            start_date: dateRange[0].toISOString().slice(0, 10),
            end_date: dateRange[1].toISOString().slice(0, 10),
        };
        getBrandContrastSpec(line_data);
        const pie_data = {
            main_brand: main_brand,
            start_date: dateRange[0].toISOString().slice(0, 10),
            end_date: dateRange[1].toISOString().slice(0, 10),
        };
        getLineAndPieSpec(pie_data);
    }, []);

    // 主品牌改变
    useEffect(() => {
        const data = {
            main_brand: main_brand,
            start_date: dateRange[0].toISOString().slice(0, 10),
            end_date: dateRange[1].toISOString().slice(0, 10),
        };
        getLineAndPieSpec(data);
    }, [main_brand]);

    // 对比品牌更改之后, 请求各品牌销量数据
    useEffect(() => {
        const data = {
            main_brand: main_brand,
            contrast_brand: contrast_brand,
            start_date: dateRange[0].toISOString().slice(0, 10),
            end_date: dateRange[1].toISOString().slice(0, 10),
        };
        getBrandContrastSpec(data);
    }, [main_brand, contrast_brand, dateRange]);

    const getBrandContrastSpec = async (data) => {
        const url = config.API_BASE_URL + "/sales_data/contrast_brand";
        try {
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json", // 请求头
                },
            });
            setBrandContrastSpec(response.data.data);
        } catch (error) {
            console.log("error");
        }
    };

    const getLineAndPieSpec = async (data) => {
        const url = config.API_BASE_URL + "/sales_data/main_brand";
        try {
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json", // 请求头
                },
            });
            setSpecificationLineData(response.data.data.Line);
            setSpecificationPieData(response.data.data.Pie);
            setLineRange(
                [0.99 * Math.min(...specificationLineData[selectedSpec].map((item) => item.value)),
                1.01 * Math.max(...specificationLineData[selectedSpec].map((item) => item.value))]
            )
            console.log(lineRange);
        } catch (error) {
            console.log("error");
        }
    };

    return (
        <div className="frame">
            <div className="filter">
                <Select
                    placeholder="请选择"
                    filter
                    searchPosition="dropdown"
                    insetLabel="主品牌"
                    optionList={initialBrandList}
                    value={main_brand}
                    className="selectMainBrand"
                    onChange={handleMainBrandChange}
                />
                <Select
                    placeholder="请选择"
                    filter
                    multiple
                    maxTagCount={4}
                    expandRestTagsOnClick={true}
                    showRestTagsPopover={true}
                    searchPosition="dropdown"
                    insetLabel="对比品牌"
                    optionList={contrastBrandOptions}
                    value={contrast_brand}
                    className="selectContrastBrand"
                    onChange={(value) => setContrastBrand(value)}
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
            </div>
            <Row gutter={16} style={{ width: "100%", marginTop: "32px" }}>
                <Col
                    span={10}
                    className="raised-block"
                    style={{ height: "500px" }}
                >
                    <VChart spec={brands_spec} />
                </Col>
                <Col span={14} style={{ height: "500px" }}>
                    <Row className="raised-block" style={{ height: "250px" }}>
                        <Col span={19}>
                            <VChart
                                spec={specification_line_spec}
                                style={{ height: "250px" }}
                            />
                        </Col>
                        <Col className="specification-group">
                            <RadioGroup
                                direction="vertical"
                                aria-label="单选组合示例"
                                value={selectedSpec}
                                onChange={(value) => {
                                    console.log(value);
                                    setSelectedSpec(value.target.value);
                                }}
                            >
                                <Radio
                                    value={"pack_type"}
                                    style={{ marginBottom: "10px" }}
                                >
                                    包装类型
                                </Radio>
                                <Radio
                                    value={"diameter"}
                                    style={{ marginBottom: "10px" }}
                                >
                                    直径
                                </Radio>
                                <Radio value={"taste"}>香烟口味</Radio>
                            </RadioGroup>
                        </Col>
                    </Row>
                    <Row className="raised-block" style={{ height: "250px" }}>
                        <Row style={{ marginTop: "8px" }}>
                            <span
                                style={{
                                    fontSize: "15px",
                                    fontWeight: "bold",
                                    paddingLeft: "20px",
                                }}
                            >
                                {main_brand} 不同规格占比
                            </span>
                        </Row>
                        <VChart
                            spec={specification_pie_spec}
                            style={{ height: "85%" }}
                        />
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default BrandAnalysis;
