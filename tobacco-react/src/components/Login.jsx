"use client";

import { Form, Button, Icon, Notification } from "@douyinfe/semi-ui";
import TobaccoIcon from "../assets/icon/TobaccoIcon";

import "../assets/css/Login.css";
function Login({ onLogin }) {
    function submit(values) {
        const username = values.username;
        const password = values.password;
        const remember_me = values.remember_me;
        if (typeof username === "undefined" || password === "undefined")
            return Notification.error({
            title: '登录失败',
            content: '账号或密码不能为空',
            duration: 3,
        });
        onLogin(username, password, remember_me);
    }

    return (
        <div className="frame">
            <div className="main">
                <div className="login">
                    <span className="logo">
                        <Icon svg={<TobaccoIcon />} size="inherit" />
                    </span>
                    <div className="header">
                        <p className="title">烟草营销分析决策系统</p>
                        {/* <p className="text">
                <span>登录</span>
                <span className="semi-text"> Semi Design </span>
                <span>账户</span>
              </p> */}
                    </div>
                    <div className="form">
                        <Form className="inputs" onSubmit={submit}>
                            <Form.Input
                                label={{ text: "用户名" }}
                                field="username"
                                placeholder="输入用户名"
                                style={{ width: "100%" }}
                            />
                            <Form.Input
                                label={{ text: "密码" }}
                                field="password"
                                type="password"
                                placeholder="输入密码"
                                style={{ width: "100%" }}
                            />
                            <Form.Checkbox
                                className="remember-me"
                                field="remember_me"
                                initValue={false}
                                noLabel
                            >
                                记住我
                            </Form.Checkbox>
                            <Button
                                theme="solid"
                                type="primary"
                                className="login-button"
                                htmlType="submit"
                            >
                                登录
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
