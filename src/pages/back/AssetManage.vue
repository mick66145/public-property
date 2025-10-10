<script setup>
import { ref, computed } from "vue";
import AssetEdit from "@/components/back/AssetEdit.vue";
import AssetDemand from "@/components/back/AssetDemand.vue";
import AssetMeeting from "@/components/back/AssetMeeting.vue";
import AssetPlan from "@/components/back/AssetPlan.vue";

const headers = [
  { title: "資產編號", value: "id" },
  { title: "資產名稱/地點", value: "nameLocation" },
  { title: "面積(m²)", value: "area" },
  { title: "物件類別", value: "status" },
  { title: "狀態", value: "matchStatus" },
  { title: "使用類型", value: "usageType" },
  { title: "使用分區", value: "zoning" },
  { title: "", value: "actions", sortable: false },
];

const items = ref([
  {
    id: "A001",
    name: "台南市立圖書館新總館",
    location: "台南市永康區康橋大道255號",
    district: "永康區",
    area: 3966.94,
    status: "建築物",
    matchStatus: "已活化",
    usageType: "文化觀光設施",
    owner: "文化局",
    landValue: 850000,
    houseValue: 12500000,
    lng: 120.2532,
    lat: 23.0159,
    zoning: "文教區",
    landSection: "橋北段",
    landLotNumber: "123, 124",
    currentStatus: "已活化利用",
    notes: "與奇美博物館合作，定期舉辦藝文活動。",
    floorArea: "1樓: 1500\n2樓: 1500\n3樓: 500",
  },
  {
    id: "A002",
    name: "台南市美術館二館",
    location: "台南市中西區忠義路二段1號",
    district: "中西區",
    area: 2644.62,
    status: "建築物",
    matchStatus: "已活化",
    usageType: "文化觀光設施",
    owner: "文化局",
    landValue: 1200000,
    houseValue: 18000000,
    lng: 120.2047,
    lat: 22.9911,
    zoning: "公5公園用地",
    landSection: "萬壽段",
    landLotNumber: "55-1",
    currentStatus: "已活化利用",
    notes: "為台南市重要地標之一。",
    floorArea: "1-4樓: 2300",
  },
  {
    id: "A003",
    name: "台南市立棒球場",
    location: "台南市南區健康路一段257號",
    district: "南區",
    area: 9917.35,
    status: "土地",
    matchStatus: "媒合中",
    usageType: "交通設施",
    owner: "體育局",
    landValue: 2100000,
    houseValue: 6800000,
    lng: 120.1942,
    lat: 22.9716,
    zoning: "體育場用地",
    landSection: "健康段",
    landLotNumber: "20",
    currentStatus: "部分區域低度利用",
    notes: "非賽季期間，周邊停車場可供活動租用。",
    floorArea: null,
  },
  {
    id: "A004",
    name: "台南市立安平國中舊校舍",
    location: "台南市安平區安北路123號",
    district: "安平區",
    area: 1652.89,
    status: "建築物",
    matchStatus: "已媒合",
    usageType: "辦公廳舍",
    owner: "教育局",
    landValue: 750000,
    houseValue: 6800000,
    lng: 120.1645,
    lat: 23.0002,
    zoning: "文教區",
    landSection: "安北段",
    landLotNumber: "502",
    currentStatus: "已由社會局承租作為社福單位使用。",
    notes: "",
    floorArea: "辦公室A: 800\n辦公室B: 700",
  },
  {
    id: "A005",
    name: "台南市立新營文化中心",
    location: "台南市新營區中正路23號",
    district: "新營區",
    area: 4958.68,
    status: "建築物",
    matchStatus: "待媒合",
    usageType: "文化觀光設施",
    owner: "文化局",
    landValue: 650000,
    houseValue: 9200000,
    lng: 120.3119,
    lat: 23.3056,
    zoning: "文教區",
    landSection: "中正段",
    landLotNumber: "101-1, 101-2",
    currentStatus: "部分空間閒置",
    notes: "不定期公告徵求認養者",
    floorArea: "演藝廳: 3000\n展覽室: 1500",
  },
]);

const search = ref("");
const districtFilter = ref(null);
const statusFilter = ref(null);
const matchStatusFilter = ref(null);
const ownerFilter = ref(null);
const usageTypeFilter = ref(null);
const zoningFilter = ref(null);

const districts = computed(() => [
  "所有行政區",
  ...new Set(items.value.map((item) => item.district)),
]);
const statuses = computed(() => [
  "所有類別",
  ...new Set(items.value.map((item) => item.status)),
]);
const matchStatuses = computed(() => [
  "所有狀態",
  ...new Set(items.value.map((item) => item.matchStatus)),
]);
const owners = computed(() => [
  "所有單位",
  ...new Set(items.value.map((item) => item.owner)),
]);
const usageTypes = computed(() => [
  "所有類型",
  ...new Set(items.value.map((item) => item.usageType)),
]);
const zonings = computed(() => [
  "所有分區",
  ...new Set(items.value.map((item) => item.zoning)),
]);

const filteredItems = computed(() => {
  let filtered = items.value;

  if (search.value) {
    const searchTerm = String(search.value).toLowerCase();
    filtered = filtered.filter((item) =>
      Object.values(item).some((v) =>
        v != null && String(v).toLowerCase().includes(searchTerm)
      )
    );
  }

  if (districtFilter.value && districtFilter.value !== "所有行政區") {
    filtered = filtered.filter((item) => item.district === districtFilter.value);
  }
  if (statusFilter.value && statusFilter.value !== "所有類別") {
    filtered = filtered.filter((item) => item.status === statusFilter.value);
  }
  if (matchStatusFilter.value && matchStatusFilter.value !== "所有狀態") {
    filtered = filtered.filter((item) => item.matchStatus === matchStatusFilter.value);
  }
  if (ownerFilter.value && ownerFilter.value !== "所有單位") {
    filtered = filtered.filter((item) => item.owner === ownerFilter.value);
  }
  if (usageTypeFilter.value && usageTypeFilter.value !== "所有類型") {
    filtered = filtered.filter((item) => item.usageType === usageTypeFilter.value);
  }
  if (zoningFilter.value && zoningFilter.value !== "所有分區") {
    filtered = filtered.filter((item) => item.zoning === zoningFilter.value);
  }

  return filtered;
});

const editDialog = ref(false);
const editAsset = ref({});

function openEdit(event, { item }) {
  editAsset.value = item; // 直接使用 item 物件
  editDialog.value = true;
}

function createAsset() {
  editAsset.value = {
    id: "",
    name: "",
    location: "",
    district: "",
    area: "",
    status: "土地",
    matchStatus: "待整理",
    owner: "",
    landValue: "",
    houseValue: "",
    lng: "",
    lat: "",
    usageType: "辦公廳舍",
    zoning: "",
    landSection: "",
    landLotNumber: "",
    currentStatus: "空置",
    notes: "",
    floorArea: null,
  };
  editDialog.value = true;
}

function handleAssetSave(updatedAsset) {
  const index = items.value.findIndex(item => item.id === updatedAsset.id);
  if (index !== -1) {
    items.value[index] = updatedAsset;
  }
}

// 匯入功能
const importDialog = ref(false);
const importPreview = ref([]);
function openImport() {
  // wireframe: 模擬匯入假資料
  importPreview.value = [];
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
  const colorMap = {
    待整理: "grey",
    待媒合: "blue",
    媒合中: "orange",
    已媒合: "green",
    已活化: "purple",
  };
  return colorMap[status] || "grey";
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
        <v-col cols="12" md="3">
          <v-select v-model="zoningFilter" :items="zonings" label="使用分區" single-line variant="outlined" hide-details
            class="mb-5"></v-select>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="filteredItems" class="elevation-1" @click:row="openEdit">
        <template v-slot:[`item.status`]='{ item }'>
          <v-chip :color="getTypeColor(item.status)" size="small">
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:[`item.usageType`]='{ item }'>
          <v-chip size="small">
            {{ item.usageType }}
          </v-chip>
        </template>
        <template v-slot:[`item.nameLocation`]='{ item }'>
          <div>
            <div class="font-weight-medium">{{ item.name }}</div>
            <div class="text-caption text-grey-darken-1">
              {{ item.location }}
            </div>
          </div>
        </template>
        <template v-slot:[`item.area`]='{ item }'>
          {{ item.area.toLocaleString() }} m²
        </template>
        <template v-slot:[`item.matchStatus`]='{ item }'>
          <v-chip v-if="item && item.matchStatus" :color="getStatusColor(item.matchStatus)" size="small">
            {{ item.matchStatus }}
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]='{ item }'>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn color="primary" size="small" v-bind="props"> 動作 </v-btn>
            </template>
            <v-list>
              <v-list-item @click.stop="openDemand(item)">
                <v-list-item-title>發送需求</v-list-item-title>
              </v-list-item>
              <v-list-item @click.stop="openMeeting(item)">
                <v-list-item-title>查看會議</v-list-item-title>
              </v-list-item>
              <v-list-item @click.stop="openPlan(item)">
                <v-list-item-title>設定目標</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>

      </v-data-table>
    </v-card-text>
  </v-card>
  <AssetEdit v-model="editDialog" :asset="editAsset" @save="handleAssetSave" />
  <AssetDemand v-model="demandDialog" :asset="demandAsset" />
  <AssetMeeting v-model="meetingDialog" :asset="meetingAsset" />
  <AssetPlan v-model="planDialog" :asset="planAsset" />

  <!-- 匯入預覽 modal -->
  <v-dialog v-model="importDialog" max-width="1000">
    <v-card>
      <v-card-title>匯入資產預覽</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="importPreview.map((item) => ({...item}))"
          class="elevation-1" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="importDialog = false">取消</v-btn>
        <v-btn color="primary" @click="confirmImport">確認匯入</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
