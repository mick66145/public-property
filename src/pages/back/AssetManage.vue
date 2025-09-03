<script setup>
import { ref, computed } from "vue";
import AssetEdit from "@/components/back/AssetEdit.vue";
import AssetDemand from "@/components/back/AssetDemand.vue";
import AssetMeeting from "@/components/back/AssetMeeting.vue";
import AssetPlan from "@/components/back/AssetPlan.vue";

const headers = [
  { title: "資產編號", value: "id" },
  { title: "行政區", value: "district" },
  { title: "資產名稱/地點", value: "nameLocation" },
  { title: "面積(坪)", value: "area" },
  { title: "物件類別", value: "status" },
  { title: "狀態", value: "matchStatus" },
  { title: "使用類型", value: "usageType" },
  { title: "管理單位", value: "owner" },
  { title: "土地公告現值", value: "landValue" },
  { title: "房屋課稅現值", value: "houseValue" },
  // { title: "經緯度", value: "latlng" },
  { title: "", value: "actions", sortable: false },
];

const items = ref([
  {
    id: "A001",
    name: "台南市立圖書館新總館",
    location: "台南市永康區康橋大道255號",
    district: "永康區",
    area: 1200,
    status: "建築物",
    matchStatus: "已活化",
    usageType: "交通",
    owner: "文化局",
    landValue: 850000,
    houseValue: 12500000,
    lng: 120.2532,
    lat: 23.0159,
  },
  {
    id: "A002",
    name: "台南市美術館二館",
    location: "台南市中西區忠義路二段1號",
    district: "中西區",
    area: 800,
    status: "建築物",
    matchStatus: "已活化",
    usageType: "社福",
    owner: "文化局",
    landValue: 1200000,
    houseValue: 18000000,
    lng: 120.2047,
    lat: 22.9911,
  },
  {
    id: "A003",
    name: "台南市立棒球場",
    location: "台南市南區健康路一段257號",
    district: "南區",
    area: 3000,
    status: "土地",
    matchStatus: "媒合中",
    usageType: "行政",
    owner: "體育局",
    landValue: 2100000,
    houseValue: 6800000,
    lng: 120.1942,
    lat: 22.9716,
  },
  {
    id: "A004",
    name: "台南市立安平國中舊校舍",
    location: "台南市安平區安北路123號",
    district: "安平區",
    area: 500,
    status: "建築物",
    matchStatus: "已媒合",
    usageType: "教育",
    owner: "教育局",
    landValue: 750000,
    houseValue: 6800000,
    lng: 120.1645,
    lat: 23.0002,
  },
  {
    id: "A005",
    name: "台南市立新營文化中心",
    location: "台南市新營區中正路23號",
    district: "新營區",
    area: 1500,
    status: "建築物",
    matchStatus: "待媒合",
    usageType: "交通",
    owner: "文化局",
    landValue: 650000,
    houseValue: 9200000,
    lng: 120.3119,
    lat: 23.3056,
  },
]);

const search = ref(""); // 新增篩選功能
const districtFilter = ref(null); // 新增行政區篩選
const districts = computed(() => {
  const uniqueDistricts = new Set(items.value.map((item) => item.district));
  return ["所有行政區", ...Array.from(uniqueDistricts)];
});

const statusFilter = ref(null); // 新增物件類別篩選
const statuses = computed(() => {
  const uniqueStatuses = new Set(items.value.map((item) => item.status));
  return ["所有類別", ...Array.from(uniqueStatuses)];
});

const matchStatusFilter = ref(null); // 新增狀態篩選
const matchStatuses = computed(() => {
  const uniqueMatchStatuses = new Set(items.value.map((item) => item.matchStatus));
  return ["所有狀態", ...Array.from(uniqueMatchStatuses)];
});

const ownerFilter = ref(null); // 新增管理單位篩選
const owners = computed(() => {
  const uniqueOwners = new Set(items.value.map((item) => item.owner));
  return ["所有單位", ...Array.from(uniqueOwners)];
});

const usageTypeFilter = ref(null); // 新增使用類型篩選
const usageTypes = computed(() => {
  const uniqueUsageTypes = new Set(items.value.map((item) => item.usageType));
  return ["所有類型", ...Array.from(uniqueUsageTypes)];
});

const filteredItems = computed(() => {
  let filtered = items.value;

  // 關鍵字搜尋
  if (search.value) {
    const searchTerm = String(search.value).toLowerCase();
    filtered = filtered.filter((item) =>
      Object.values(item).some((v) =>
        v != null && String(v).toLowerCase().includes(searchTerm)
      )
    );
  }

  // 行政區篩選
  if (districtFilter.value && districtFilter.value !== "所有行政區") {
    filtered = filtered.filter((item) => item.district === districtFilter.value);
  }

  // 物件類別篩選
  if (statusFilter.value && statusFilter.value !== "所有類別") {
    filtered = filtered.filter((item) => item.status === statusFilter.value);
  }

  // 狀態篩選
  if (matchStatusFilter.value && matchStatusFilter.value !== "所有狀態") {
    filtered = filtered.filter((item) => item.matchStatus === matchStatusFilter.value);
  }

  // 管理單位篩選
  if (ownerFilter.value && ownerFilter.value !== "所有單位") {
    filtered = filtered.filter((item) => item.owner === ownerFilter.value);
  }

  // 使用類型篩選
  if (usageTypeFilter.value && usageTypeFilter.value !== "所有類型") {
    filtered = filtered.filter((item) => item.usageType === usageTypeFilter.value);
  }

  return filtered;
});

const editDialog = ref(false);
const editAsset = ref({});

function openEdit(event, { item }) {
  editAsset.value = { ...item };
  editDialog.value = true;
}

function createAsset() {
  editAsset.value = {
    id: "",
    name: "",
    location: "",
    district: "",
    area: "",
    status: "",
    matchStatus: "",
    owner: "",
    landValue: "",
    houseValue: "",
    lng: "",
    lat: "",
    usageType: "交通", // 設定預設使用類型
  };
  editDialog.value = true;
}

// 匯入功能
const importDialog = ref(false);
const importPreview = ref([]);
function openImport() {
  // wireframe: 模擬匯入假資料
  importPreview.value = [
    {
      id: "A006",
      name: "台南市立文化中心",
      location: "台南市東區中華東路三段332號",
      district: "東區",
      area: 2000,
      status: "建築物",
      matchStatus: "待整理",
      usageType: "社福",
      owner: "文化局",
      landValue: 900000,
      houseValue: 15000000,
      lng: 120.2255,
      lat: 22.9833,
    },
    {
      id: "A007",
      name: "台南市立體育場",
      location: "台南市南區體育路10號",
      district: "南區",
      area: 2500,
      status: "土地",
      matchStatus: "待媒合",
      usageType: "行政",
      owner: "體育局",
      landValue: 1800000,
      houseValue: 0,
      lng: 120.1901,
      lat: 22.9701,
    },
  ];
  importDialog.value = true;
}
function confirmImport() {
  items.value = [...items.value, ...importPreview.value];
  importDialog.value = false;
}

// 需求功能
const demandDialog = ref(false);
const demandAsset = ref({});
function openDemand(item) {
  demandAsset.value = { ...item };
  demandDialog.value = true;
}

// 會議功能
const meetingDialog = ref(false);
const meetingAsset = ref({});
function openMeeting(item) {
  meetingAsset.value = { ...item };
  meetingDialog.value = true;
}

// 目標功能
const planDialog = ref(false);
const planAsset = ref({});
function openPlan(item) {
  planAsset.value = { ...item };
  planDialog.value = true;
}

// 狀態顏色對應
function getStatusColor(status) {
  // Ensure status is not null or undefined before attempting to access .value
  const actualStatus = status && typeof status === 'object' && 'value' in status ? status.value : status;
  if (!actualStatus) return "grey";
  const colorMap = {
    待整理: "grey",
    待媒合: "blue",
    媒合中: "orange",
    已媒合: "green",
    已活化: "purple",
  };
  return colorMap[actualStatus] || "grey";
}

// 物件類別顏色對應
function getTypeColor(type) {
  return type === "建築物" ? "brown" : "teal";
}

// 格式化金額顯示
function formatCurrency(value) {
  if (!value || value === 0) return "0";
  return new Intl.NumberFormat("zh-TW").format(value);
}
</script>

<template>
  <v-card>
    <v-card-title class="text-h6 d-flex align-center justify-space-between">
      <span>資產管理</span>
      <div>
        <v-btn color="primary" class="mr-2" @click="openImport">匯入資產</v-btn>
        <v-btn color="primary" @click="createAsset">建立新資產</v-btn>
      </div>
    </v-card-title>
    <v-card-text>
      <v-row class="mb-5">
        <v-col cols="12" md="3">
          <v-text-field v-model="search" label="搜尋" prepend-inner-icon="mdi-magnify" single-line variant="outlined"
            hide-details class="mb-5"></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select v-model="districtFilter" :items="districts" label="行政區" single-line variant="outlined" hide-details
            class="mb-5"></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select v-model="statusFilter" :items="statuses" label="物件類別" single-line variant="outlined" hide-details
            class="mb-5"></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select v-model="matchStatusFilter" :items="matchStatuses" label="狀態" single-line variant="outlined"
            hide-details class="mb-5"></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select v-model="usageTypeFilter" :items="usageTypes" label="使用類型" single-line variant="outlined"
            hide-details class="mb-5"></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select v-model="ownerFilter" :items="owners" label="管理單位" single-line variant="outlined" hide-details
            class="mb-5"></v-select>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="filteredItems" class="elevation-1" @click:row="openEdit">
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="getTypeColor(item.status)" size="small">
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:[`item.usageType`]="{ item }">
          <v-chip size="small">
            {{ item.usageType }}
          </v-chip>
        </template>
        <template v-slot:[`item.nameLocation`]="{ item }">
          <div>
            <div class="font-weight-medium">{{ item.name }}</div>
            <div class="text-caption text-grey-darken-1">
              {{ item.location }}
            </div>
          </div>
        </template>
        <template v-slot:[`item.latlng`]="{ item }">
          <div>
            <div>{{ item.lat }}</div>
            <div>{{ item.lng }}</div>
          </div>
        </template>
        <template v-slot:[`item.matchStatus`]="{ item }">
          <v-chip v-if="item && item.matchStatus" :color="getStatusColor(item.matchStatus)" size="small">
            {{ item.matchStatus }}
          </v-chip>
        </template>
        <template v-slot:[`item.landValue`]="{ item }">
          {{ formatCurrency(item.landValue) }}
        </template>
        <template v-slot:[`item.houseValue`]="{ item }">
          {{ formatCurrency(item.houseValue) }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn color="primary" size="small" v-bind="props"> 動作 </v-btn>
            </template>
            <v-list>
              <v-list-item @click="openDemand(item)">
                <v-list-item-title>發送需求</v-list-item-title>
              </v-list-item>
              <v-list-item @click="openMeeting(item)">
                <v-list-item-title>查看會議</v-list-item-title>
              </v-list-item>
              <v-list-item @click="openPlan(item)">
                <v-list-item-title>設定目標</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
  <AssetEdit v-model="editDialog" :asset="editAsset" />
  <AssetDemand v-model="demandDialog" :asset="demandAsset" />
  <AssetMeeting v-model="meetingDialog" :asset="meetingAsset" />
  <AssetPlan v-model="planDialog" :asset="planAsset" />

  <!-- 匯入預覽 modal -->
  <v-dialog v-model="importDialog" max-width="1000">
    <v-card>
      <v-card-title>匯入資產預覽</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="importPreview.map((item) => ({
          ...item,
          latlng: `${item.lng}, ${item.lat}`,
        }))
          " class="elevation-1" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="importDialog = false">取消</v-btn>
        <v-btn color="primary" @click="confirmImport">確認匯入</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
