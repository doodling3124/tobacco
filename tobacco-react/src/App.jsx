import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import SalesAnalysis from "./components/content/SalesAnalysis.jsx";
import CustomerAnalysis from "./components/content/CustomerAnalysis.jsx";
import PriceMonitoring from "./components/content/PriceMonitoring.jsx";
import BrandAnalysis from "./components/content/BrandAnalysis.jsx";
import SalesForecast from "./components/content/SalesForecast.jsx";
import Promotions from "./components/content/Promotions.jsx";
import axios from "axios";
import config from "./config";
import { Toast, Notification } from '@douyinfe/semi-ui';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (loggedIn) {
            setIsLoggedIn(true);
        }
    }, []);

    // 登录函数
    const handleLogin = async (username, password, remember_me) => {
        const data = {
            username: username,
            password: password,
        };
        try {
            const is_success = await login(data);
            if (is_success == "true") {
                localStorage.setItem("isLoggedIn", "true"); // 存储登录状态
                setIsLoggedIn(true);
                return Toast.success('登录成功')
            } else {
                return Notification.error({
                    title: '登录失败',
                    content: '账号或密码错误',
                    duration: 3,
                })
            }
        } catch (error) {
            console.log("登录出错:", error);
        }
    };

    const login = async (data) => {
        const url = config.API_BASE_URL + "/users/login";
        try {
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json", // 请求头
                },
            });
            return response.data.data;
        } catch (error) {
            console.log("error");
        }
    };
  

    return (
        <Router>
            <Routes>
                <Route path="/login" element={isLoggedIn ? (<Navigate to="/" replace />) : (<Login onLogin={handleLogin} />)} />
                <Route path="/" element={isLoggedIn ? (<Home />) : (<Navigate to="/login" replace />)} >
                  <Route index element={<SalesAnalysis />} />
                  <Route path="sales-analysis" element={<SalesAnalysis />} />
                  <Route path="customer-analysis" element={<CustomerAnalysis />} />
                  <Route path="price-monitoring" element={<PriceMonitoring />} />
                  <Route path="brand-analysis" element={<BrandAnalysis />} />
                  <Route path="sales-forecast" element={<SalesForecast />} />
                  <Route path="promotions" element={<Promotions />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                  {/* <Route path="histogram" element={<Histogram />} />
                  <Route path="live" element={<Live />} />
                  <Route path="setting" element={<Setting />} /> */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
