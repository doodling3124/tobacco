# 烟草营销分析决策系统

## 开发环境

### 数据库:

- mysql: 8.1.0

### 后端:

- python: 3.10.6
- flask: 3.1.0

### 前端:

- vite: 6.1.0
- react, react-dom: 18.2.0
- npm: 10.2.3
- node.js: 20.10.0
- semi-ui: 2.74.0

## 如何部署

### 数据库:

> 执行 /sql/tobacco.sql

### 后端:

1. 修改配置文件数据库账号密码  /tobacco/tobacco-flask/edu/fjut/config.py
2. 执行app.py

### 前端:

先确保安装了node.js

````
cd /tobacco/tobacco-react
npm install
// 开发环境
npm run dev
// 编译部署
npm run build
````

