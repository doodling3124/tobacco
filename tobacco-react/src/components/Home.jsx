import * as React from "react";
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import {
    Layout,
    Nav,
    Button,
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
import { IconCascader, IconChart, IconGrid, IconLayout, IconModal, IconToast } from "@douyinfe/semi-icons-lab"

function Home({loggedUser}) {
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
                height: "110vh",
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
                                {loggedUser}
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
                                icon: <IconCascader size="large" />,
                            },
                            {
                                itemKey: "Customer-Analysis",
                                text: "客戶分析",
                                icon: <IconChart size="large" />,
                            },
                            {
                                itemKey: "Price-Monitoring",
                                text: "价格监测",
                                icon: <IconGrid size="large" />,
                            },
                            {
                                itemKey: "Brand-Analysis",
                                text: "品牌分析",
                                icon: <IconLayout size="large" />,
                            },
                            {
                                itemKey: "Sales-Forecast",
                                text: "销量预测和库存建议",
                                icon: <IconModal size="large" />,
                            },
                            {
                                itemKey: "Promotions",
                                text: "促销活动",
                                icon: <IconToast size="large" />,
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
            <Layout
                style={{
                    flex: 0.01,
                    justifyContent: 'space-between',
                    padding: '20px',
                    color: 'var(--semi-color-text-2)',
                    backgroundColor: 'rgba(var(--semi-grey-0), 1)',
                }}
            >
                <>
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {/* <IconBytedanceLogo size="large" style={{ marginRight: '8px' }} /> */}
                        <span>Copyright © {new Date().getFullYear()} <a href="https://catblog.life">Pigking</a>. UI by <a href="https://semi.design/zh-CN/">Semi</a>.</span>
                    </span>
                </>
            </Layout>
        </Layout>
    );
}

export default Home;
