import * as React from "react";
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import {
    Layout,
    Nav,
    Button,
    Breadcrumb,
    Skeleton,
    Avatar,
    Icon,
} from "@douyinfe/semi-ui";
import {
    IconBell,
    IconHelpCircle,
    IconHome,
    IconHistogram,
    IconLive,
    IconSetting,
} from "@douyinfe/semi-icons";
import TobaccoIcon from "../assets/icon/TobaccoIcon";

function Home() {
    const { Header, Sider, Content } = Layout;
    const navigate = useNavigate();
    const handleNavSelect = (itemKey) => {
        console.log(itemKey.itemKey.toLowerCase());
        navigate(itemKey.itemKey.toLowerCase());
    };

    return (
        <Layout
            style={{
                border: "1px solid var(--semi-color-border)",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Header style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
                <div>
                    <Nav mode="horizontal" defaultSelectedKeys={["Home"]}>
                        <Nav.Header>
                            <Icon
                                svg={<TobaccoIcon />}
                                style={{ height: "36px", fontSize: 36 }}
                            />
                        </Nav.Header>
                        <span
                            style={{
                                color: "var(--semi-color-text-2)",
                            }}
                        >
                            <span>烟草营销分析决策系统</span>
                        </span>
                        <Nav.Footer>
                            <Button
                                theme="borderless"
                                icon={<IconBell size="large" />}
                                style={{
                                    color: "var(--semi-color-text-2)",
                                    marginRight: "12px",
                                }}
                            />
                            <Button
                                theme="borderless"
                                icon={<IconHelpCircle size="large" />}
                                style={{
                                    color: "var(--semi-color-text-2)",
                                    marginRight: "12px",
                                }}
                            />
                            <Avatar color="orange" size="small">
                                YJ
                            </Avatar>
                        </Nav.Footer>
                    </Nav>
                </div>
            </Header>
            <Layout style={{ flex: 1, overflow: "hidden" }}>
                <Sider style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
                    <Nav
                        style={{ maxWidth: 220, height: "100%" }}
                        defaultSelectedKeys={["Home"]}
                        onSelect={handleNavSelect}
                        items={[
                            {
                                itemKey: "Sales-Analysis",
                                text: "销量分析和结构分析",
                                icon: <IconHistogram size="large" />,
                            },
                            {
                                itemKey: "Customer-Analysis",
                                text: "客戶分析",
                                icon: <IconHistogram size="large" />,
                            },
                            {
                                itemKey: "Price-Monitoring",
                                text: "价格监测",
                                icon: <IconHistogram size="large" />,
                            },
                            {
                                itemKey: "Brand-Analysis",
                                text: "品牌分析",
                                icon: <IconHistogram size="large" />,
                            },
                            {
                                itemKey: "Sales-Forecast",
                                text: "销量预测和库存建议",
                                icon: <IconHistogram size="large" />,
                            },
                            {
                                itemKey: "Promotions",
                                text: "促销活动",
                                icon: <IconHistogram size="large" />,
                            },
                        ]}
                        footer={{
                            collapseButton: true,
                        }}
                    />
                </Sider>
                <Content
                    style={{
                        padding: "24px",
                        backgroundColor: "var(--semi-color-bg-0)",
                        overflow: "auto",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default Home;
