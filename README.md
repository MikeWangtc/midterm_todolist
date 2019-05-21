# Midterm Projct - Advanced TodoList
Project Link : https://github.com/MikeWangtc/midterm_todolist
## Fulfilled Requirements
- React.js for frontend
- Node.js for backend
- MongoDB for database
- Promise/Async/Await for Google map API
## 簡要說明
Todo List 的延伸功能：結合 google map api 得以及時在地圖上顯示執行待辦事項的地點，並提供代辦事項執行地點間的詳細路徑資訊。

## 使用說明
### 執行環境—本機端
* 建議使用 google chrome 以全螢幕開啟並且允許存取使用者地理位置
* npm install
* npm start
* At google chrome : http://localhost:3000
### 操作
- **登入系統（login）**
提供使用者名稱輸入欄（user name）、電子郵件（email）。每個電子郵件僅供註冊一次。
> 注意：瀏覽器搜尋使用者位置的時間端視使用者 WIFI 訊號強弱決定，首次連線需要數十秒鐘，請耐心等候 Orz。
> 
> Message : ***Waiting for the browser to get your current location...... It takes a couple seconds!***

- **主頁面（homepage）**
右側的 Dashboard 依序有：使用者照片、名稱、Todo List、Google map、Traffic information、Logout/Save、Calendar 
    #### **Todo List**
    顯示所有待辦事項，並提供編輯與完成的按鍵
    1. Dashboard 最下方有 **Create Todo** 的按鈕，點擊後會有彈出式表單，可以填入 **Todo thing**、**Date**、**Time**、**Location**，四個待辦事項的細節。
    2. 左側的 Todo list 將會即時顯示新增的待辦事項
    3. todos 可以依照 location, date, time 排序（default: sort by date）
    4. Todo list 支援所有 homework2 的功能（Filter, Delete a single task, Clear completed tasks）
    #### **Google map**
    顯示使用者位置與待辦事項的地點，能清楚知道任務執行地點之間的距離關係
    #### **Traffic Information**
    上半部的表格可以勾選，下半部的表格會顯示：詳細的路線資訊、移動時間、距離。（預設為開車模式的路線資訊）。當曾經勾選過後，任務的執行地點將會有詳細的地址說明在 location 欄位中。
    #### **Logout/Save**
    保存此次登入修改的資料
    #### Calendar （未完成）
    有待辦事項的日期以其他顏色顯示，數量和顏色深度呈正相關，點擊特定的日期可以查詢當日的任務。
    


## 使用的框架與模組
### Frontend
- React.js
     1. react-router
     2. react-calender
     3. react-google-map
- Material-UI
- html5up
### Backend
- Noode.js
- Express.js
- Mongoose
- MongoDB
### Interaction of frontend and backend
- fetch
- axios.js

### Google Map API
- Map Javascripts API
- Direction Service API
- Geolocation API
## 貢獻
- 手寫所有後端的程式碼（in server.js）
    - Request/Response between server.js & react component
    - Write async/await function for Google Map API
- 前端 react component 的結構設計、資料流移動）
- 其他除了 main.css, material-ui 的 component 的部分
## 未來將新增的功能
1. 登入系統增加安全性驗證與加密
2. Todo list 提供 inline edit、重要性權重
3. 支援上傳使用者照片
4. Google map 中使用 label 標記任務執行順序與細節（地點、時間）
5. Traffic Information 提供「行走、摩托車、大眾運輸、汽車」四個不同的路線規劃選項，並且將「大眾運輸」的轉乘細節與費用交代清楚。
6. 完成 Calendar 功能 
## 心得
整體的時間分配大致上為：前端 70%、後端 20%、Google map API 15%。在開發網頁應用前，沒想到花最久的部份是在前端的 react component 的 data flow 和 css 的文件閱讀，老實說這部分蠻無趣的。剩下 30% 的時間在處理 Google map API response 的資料和表單提交的任務資料，這個部分才是真正有趣的。希望以後開發網頁時能多著重在後端的資料存取功能。
### 設計理由
有鑒於在 App Store 的待辦事項軟體，多半僅有提交、紀錄、提醒待辦任務的功能。當執行任務，想要查詢兩兩任務之間的行徑方式時，需要在另開 google map 查詢，但卻無法將查詢記錄保存下來。再者，google map 對於多個地點之間的查詢的使用者體驗較差，因此我想完成的是「結合待辦事項、排程、多點路徑規劃、資料視覺化的網頁應用」。