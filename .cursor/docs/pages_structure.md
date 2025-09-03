# 專案頁面與元件結構說明

## 前台（front）

### views/front/

- **Template.vue**：前台主版型，包含 Navbar、Footer 與 <router-view />，統一前台頁面結構。
- **Home.vue**：前台首頁，提供平台簡介與三種角色入口（財稅局、其他局處、一般民眾）。
- **PublicAssetList.vue**：公開資產列表頁，顯示所有可公開查詢的資產，支援搜尋與篩選功能。
- **PublicAssetDetail.vue**：公開資產詳情頁，顯示單一資產的詳細資訊。
- **PublicDemandForm.vue**：民眾需求表單頁，讓一般民眾可針對資產提出需求或申請。
- **About.vue**：平台說明/公告頁，提供平台使用說明、公告與聯絡資訊。

### components/front/

- **Navbar.vue**：前台導覽列，提供主要導覽連結。
- **AssetCard.vue**：前台資產卡片元件，用於資產列表的單一資產預覽。
- **AssetList.vue**：前台資產列表元件，負責渲染多個資產卡片。
- **AssetDetail.vue**：前台資產詳情元件，顯示資產的完整資訊。
- **Footer.vue**：前台頁尾，顯示版權、聯絡資訊等。

---

## 後台（back）

### views/back/

- **Template.vue**：後台主版型，包含 Sidebar 與 <router-view />，統一後台頁面結構。
- **Login.vue**：後台登入頁，供財稅局與其他局處人員登入。
- **Dashboard.vue**：後台 Dashboard，顯示資產統計、異動紀錄、最新動態等總覽資訊。
- **AssetManage.vue**：後台資產管理頁，管理所屬資產（新增、編輯、狀態更新、查詢等）。
- **DemandManage.vue**：後台需求/媒合管理頁，管理需求表單、媒合狀態與紀錄。

### components/back/

- **Sidebar.vue**：後台側邊選單，依權限顯示不同功能選項。
- **Dashboard.vue**：後台 Dashboard 元件，呈現統計圖表與總覽資訊。
- **AssetList.vue**：後台資產列表元件，渲染多個資產卡片。
- **AssetCard.vue**：後台資產卡片元件，單一資產預覽。
- **AssetDetail.vue**：後台資產詳情元件，顯示資產完整資訊與編輯功能。
- **DemandForm.vue**：後台需求表單元件，填寫或編輯需求。
- **MatchResult.vue**：後台媒合結果元件，顯示媒合狀態與紀錄。
- **Notification.vue**：後台通知元件，顯示系統通知與訊息。

---

## 補充說明

- 前台與後台皆有各自的 Template 作為主版型，其他頁面內容會以 <router-view /> 插入。
- 元件依照前台（front）與後台（back）分開管理，方便維護與擴充。
- 若有共用元件，可視需求新增 common 資料夾。
