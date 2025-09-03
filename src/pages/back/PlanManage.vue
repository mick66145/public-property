<script setup>
import { ref, computed } from "vue";

const headers = [
  { title: "計畫編號", value: "id" },
  { title: "計畫標題", value: "title" },
  { title: "相關資產", value: "assetInfo" },
  { title: "計畫期程", value: "timeline" },
  { title: "狀態", value: "status" },
  { title: "建立時間", value: "createdAt" },
  { title: "動作", value: "actions", sortable: false },
];

const plans = ref([
  {
    id: "P001",
    title: "文化展示空間活化計畫",
    assetId: "A001",
    assetName: "台南市立圖書館新總館",
    timeline: "2024年3月-2024年12月",
    status: "執行中",
    currentStatus: "資產閒置中，建築物結構良好但需要整修",
    content:
      "將該資產改造為地方文化展示空間，包含展覽區、互動體驗區及文創商品販售區。預計投入經費500萬元，分三階段進行：第一階段進行建築物安全檢測及基礎整修，第二階段進行內部空間規劃設計，第三階段進行展示設備安裝及試營運。",
    createdAt: "2024-01-20 09:30",
  },
  {
    id: "P002",
    title: "社區活動中心轉型計畫",
    assetId: "A001",
    assetName: "台南市立圖書館新總館",
    timeline: "2024年6月-2025年6月",
    status: "規劃中",
    currentStatus: "已完成初步評估，等待預算核定",
    content:
      "考量周邊社區需求，規劃將部分空間轉為社區活動中心，提供長者關懷、親子活動、社區會議等服務。結合文化展示功能，打造多元化的社區文化空間。預計需要300萬元進行空間改造及設備採購。",
    createdAt: "2024-02-15 16:45",
  },
  {
    id: "P003",
    title: "美術館教育推廣計畫",
    assetId: "A002",
    assetName: "台南市美術館二館",
    timeline: "2024年4月-2024年10月",
    status: "執行中",
    currentStatus: "美術館營運正常，具備良好的展示空間和設施",
    content:
      "擴大美術館教育功能，建立藝術教育推廣中心，提供學校團體參訪、藝術工作坊、親子美術課程等服務。結合數位科技，開發互動式藝術體驗設施，提升參觀品質。",
    createdAt: "2024-03-05 14:20",
  },
  {
    id: "P004",
    title: "運動休閒園區開發計畫",
    assetId: "A003",
    assetName: "台南市立棒球場",
    timeline: "2024年7月-2025年12月",
    status: "待核准",
    currentStatus: "棒球場設施老舊，周邊土地利用率不高",
    content:
      "整合棒球場及周邊土地，打造綜合性運動休閒園區。包含棒球場整修、增設其他運動設施、規劃商業區域、停車場改善等。預計總投資1500萬元，分兩年執行。",
    createdAt: "2024-03-20 10:30",
  },
  {
    id: "P005",
    title: "社區多功能中心計畫",
    assetId: "A004",
    assetName: "台南市立安平國中舊校舍",
    timeline: "2024年5月-2025年3月",
    status: "規劃中",
    currentStatus: "校舍閒置，建築結構良好但需要內部整修",
    content:
      "將舊校舍轉型為社區多功能中心，整合長照服務、親子活動、文化傳承、職業訓練等功能。保留部分教室作為社區大學使用，活化教育資源。預計投入800萬元進行改造。",
    createdAt: "2024-04-02 11:45",
  },
]);

const search = ref(""); // 新增篩選功能

// 詳細資訊對話框
const detailDialog = ref(false);
const selectedPlan = ref({});

function showDetail(plan) {
  selectedPlan.value = plan;
  detailDialog.value = true;
}

// 新增計畫對話框
const addDialog = ref(false);
const newPlan = ref({
  title: "",
  assetId: "",
  assetName: "",
  timeline: "",
  status: "規劃中",
  currentStatus: "",
  content: "",
});

function openAddDialog() {
  newPlan.value = {
    title: "",
    assetId: "",
    assetName: "",
    timeline: "",
    status: "規劃中",
    currentStatus: "",
    content: "",
  };
  addDialog.value = true;
}

function savePlan() {
  const plan = {
    id: `P${String(plans.value.length + 1).padStart(3, "0")}`,
    ...newPlan.value,
    createdAt: new Date().toLocaleString("zh-TW"),
  };
  plans.value.unshift(plan);
  addDialog.value = false;
  alert("計畫記錄已新增");
}

// 狀態顏色對應
function getStatusColor(status) {
  const colorMap = {
    規劃中: "info",
    執行中: "warning",
    已完成: "success",
    待核准: "grey",
    暫停: "error",
  };
  return colorMap[status] || "grey";
}

// 狀態選項
const statusOptions = ["規劃中", "執行中", "已完成", "待核准", "暫停"];

const assetFilter = ref(null);
const assetOptions = computed(() => {
  const uniqueAssets = new Set(plans.value.map((plan) => plan.assetName));
  return ["所有資產", ...Array.from(uniqueAssets)];
});
const statusFilter = ref(null);

const filteredPlans = computed(() => {
  let filtered = plans.value;

  // Keyword search
  if (search.value) {
    const searchTerm = String(search.value).toLowerCase();
    filtered = filtered.filter((plan) =>
      Object.values(plan).some((v) =>
        v != null && String(v).toLowerCase().includes(searchTerm)
      )
    );
  }

  // Asset Name Filter
  if (assetFilter.value && assetFilter.value !== "所有資產") {
    filtered = filtered.filter((plan) => plan.assetName === assetFilter.value);
  }

  // Status Filter
  if (statusFilter.value && statusFilter.value !== "所有狀態") {
    filtered = filtered.filter((plan) => plan.status === statusFilter.value);
  }

  return filtered;
});
</script>

<template>
  <v-card>
    <v-card-title class="text-h6 d-flex align-center justify-space-between">
      <span>計畫管理</span>
      <v-btn color="success" @click="openAddDialog">新增計畫記錄</v-btn>
    </v-card-title>
    <v-card-text>
      <v-row class="mb-5">
        <v-col cols="12" md="3">
          <v-text-field v-model="search" label="搜尋" prepend-inner-icon="mdi-magnify" single-line variant="outlined"
            hide-details></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select v-model="assetFilter" :items="assetOptions" label="相關資產" single-line variant="outlined"
            hide-details>
          </v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select v-model="statusFilter" :items="statusOptions" label="狀態" single-line variant="outlined"
            hide-details>
          </v-select>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="filteredPlans" class="elevation-1"
        @click:row="(event, { item }) => showDetail(item)">
        <template v-slot:[`item.assetInfo`]="{ item }">
          <div>
            <div class="font-weight-medium">{{ item.assetId }}</div>
            <div class="text-caption text-grey-darken-1">
              {{ item.assetName }}
            </div>
          </div>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="getStatusColor(item.status)" size="small">
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="info" size="small" @click.stop="showDetail(item)">
            查看詳情
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

  <!-- 計畫詳情對話框 -->
  <v-dialog v-model="detailDialog" max-width="700" scrollable>
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-clipboard-text</v-icon>
        計畫詳情
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <div class="text-subtitle-2 mb-1">計畫編號</div>
            <div class="mb-3">{{ selectedPlan.id }}</div>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="text-subtitle-2 mb-1">狀態</div>
            <div class="mb-3">
              <v-chip :color="getStatusColor(selectedPlan.status)" size="small">
                {{ selectedPlan.status }}
              </v-chip>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="text-subtitle-2 mb-1">計畫標題</div>
            <div class="mb-3 font-weight-medium">{{ selectedPlan.title }}</div>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="text-subtitle-2 mb-1">相關資產</div>
            <div class="mb-3">
              <v-chip color="primary" size="small">{{
                selectedPlan.assetId
                }}</v-chip>
              <div class="text-caption mt-1">{{ selectedPlan.assetName }}</div>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="text-subtitle-2 mb-1">計畫期程</div>
            <div class="mb-3">{{ selectedPlan.timeline }}</div>
          </v-col>
          <v-col cols="12">
            <div class="text-subtitle-2 mb-1">現況描述</div>
            <div class="mb-3 text-body-2">{{ selectedPlan.currentStatus }}</div>
          </v-col>
          <v-col cols="12">
            <div class="text-subtitle-2 mb-1">計畫內容</div>
            <div class="text-body-2">{{ selectedPlan.content }}</div>
          </v-col>
          <v-col cols="12">
            <div class="text-subtitle-2 mb-1">建立時間</div>
            <div class="text-caption">{{ selectedPlan.createdAt }}</div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="detailDialog = false">關閉</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- 新增計畫對話框 -->
  <v-dialog v-model="addDialog" max-width="700" scrollable>
    <v-card>
      <v-card-title>新增計畫記錄</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field label="計畫標題" v-model="newPlan.title" required />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="資產編號" v-model="newPlan.assetId" placeholder="例：A001" required />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="相關資產名稱" v-model="newPlan.assetName" required />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="計畫期程" v-model="newPlan.timeline" placeholder="例：2024年3月-2024年12月" required />
          </v-col>
          <v-col cols="12" sm="6">
            <v-select label="狀態" v-model="newPlan.status" :items="statusOptions" required />
          </v-col>
          <v-col cols="12">
            <v-textarea label="現況描述" v-model="newPlan.currentStatus" rows="3" placeholder="請描述資產目前的使用狀況、建築狀態等"
              required />
          </v-col>
          <v-col cols="12">
            <v-textarea label="計畫內容" v-model="newPlan.content" rows="5" placeholder="請詳細描述計畫內容、執行方式、預期效益等" required />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="addDialog = false">取消</v-btn>
        <v-btn color="success" @click="savePlan">儲存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
