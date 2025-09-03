<script setup>
import { ref, computed } from "vue";

const headers = [
  { title: "需求編號", value: "id" },
  { title: "需求類型", value: "type" },
  { title: "申請單位/民眾", value: "applicant" },
  { title: "資產編號", value: "assetId" },
  { title: "資產名稱", value: "assetName" },
  { title: "需求用途", value: "purpose" },
  { title: "申請日期", value: "applyDate" },
  { title: "狀態", value: "status" },
];

const items = ref([
  {
    id: "D001",
    type: "其他局處",
    applicant: "台南市政府觀光旅遊局",
    assetId: "A004",
    assetName: "台南市立安平國中舊校舍",
    purpose: "規劃為觀光景點使用",
    applyDate: "2024-01-15",
    status: "審核中",
    contact: "王小明",
    phone: "06-2991111",
    email: "wang@tainan.gov.tw",
    department: "觀光旅遊局企劃科",
    description:
      "希望將閒置校舍改造為安平區觀光文化展示中心，提供遊客了解安平歷史文化的場所。",
  },
  {
    id: "D002",
    type: "民眾",
    applicant: "李大華",
    assetId: "A003",
    assetName: "台南市立棒球場",
    purpose: "舉辦社區運動會",
    applyDate: "2024-01-20",
    status: "已核准",
    contact: "李大華",
    phone: "0912-345678",
    email: "lee@example.com",
    department: "安南區體育協會",
    description:
      "申請於3月份使用棒球場舉辦安南區社區運動會，預計參與人數約500人。",
  },
  {
    id: "D003",
    type: "其他局處",
    applicant: "台南市政府教育局",
    assetId: "A005",
    assetName: "台南市立新營文化中心",
    purpose: "辦理教師研習活動",
    applyDate: "2024-01-25",
    status: "審核中",
    contact: "陳美玲",
    phone: "06-6322231",
    email: "chen@tn.edu.tw",
    department: "教育局終身學習科",
    description: "申請使用文化中心會議室辦理新營區國中小教師專業成長研習活動。",
  },
  {
    id: "D004",
    type: "民眾",
    applicant: "張志明",
    assetId: "A001",
    assetName: "台南市立圖書館新總館",
    purpose: "舉辦讀書會活動",
    applyDate: "2024-02-01",
    status: "待審核",
    contact: "張志明",
    phone: "0987-654321",
    email: "chang@example.com",
    department: "永康區讀書會",
    description: "申請使用圖書館會議室定期舉辦讀書會活動，每月第二個週六進行。",
  },
]);

const search = ref(""); // 新增篩選功能
const typeFilter = ref(null); // 新增需求類型篩選
const types = computed(() => {
  const uniqueTypes = new Set(items.value.map((item) => item.type));
  return ["所有類型", ...Array.from(uniqueTypes)];
});

const statusFilter = ref(null); // 新增狀態篩選
const statuses = computed(() => {
  const uniqueStatuses = new Set(items.value.map((item) => item.status));
  return ["所有狀態", ...Array.from(uniqueStatuses)];
});

const detailDialog = ref(false);
const selectedDemand = ref({});

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

  if (typeFilter.value && typeFilter.value !== "所有類型") {
    filtered = filtered.filter((item) => item.type === typeFilter.value);
  }

  if (statusFilter.value && statusFilter.value !== "所有狀態") {
    filtered = filtered.filter((item) => item.status === statusFilter.value);
  }

  return filtered;
});

function openDetail(event, { item }) {
  selectedDemand.value = { ...item };
  detailDialog.value = true;
}
</script>

<template>
  <v-card>
    <v-card-title class="text-h6">需求管理</v-card-title>
    <v-card-text>
      <v-row class="mb-5">
        <v-col cols="12" md="3">
          <v-text-field v-model="search" label="搜尋" prepend-inner-icon="mdi-magnify" single-line variant="outlined"
            hide-details class="mb-5"></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select v-model="typeFilter" :items="types" label="需求類型" single-line variant="outlined" hide-details
            class="mb-5"></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select v-model="statusFilter" :items="statuses" label="狀態" single-line variant="outlined" hide-details
            class="mb-5"></v-select>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="filteredItems" class="elevation-1" @click:row="openDetail">
        <template v-slot:[`item.type`]="{ item }">
          <v-chip :color="item.type === '民眾' ? 'blue' : 'green'" size="small">
            {{ item.type }}
          </v-chip>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="item.status === '已核准'
            ? 'success'
            : item.status === '審核中'
              ? 'warning'
              : 'info'
            " size="small">
            {{ item.status }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

  <!-- 需求詳情 modal -->
  <v-dialog v-model="detailDialog" max-width="600">
    <v-card>
      <v-card-title>需求詳情</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="需求編號" :model-value="selectedDemand.id" readonly />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="需求類型" :model-value="selectedDemand.type" readonly />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="申請單位/民眾" :model-value="selectedDemand.applicant" readonly />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="申請日期" :model-value="selectedDemand.applyDate" readonly />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="資產編號" :model-value="selectedDemand.assetId" readonly />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="資產名稱" :model-value="selectedDemand.assetName" readonly />
          </v-col>
          <v-col cols="12">
            <v-text-field label="需求用途" :model-value="selectedDemand.purpose" readonly />
          </v-col>
          <v-col cols="12">
            <v-divider class="my-2"></v-divider>
            <div class="text-h6 mb-3">聯絡資訊</div>
          </v-col> <v-col cols="12" sm="6">
            <v-text-field label="聯絡人" :model-value="selectedDemand.contact" readonly />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="聯絡電話" :model-value="selectedDemand.phone" readonly />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="電子信箱" :model-value="selectedDemand.email" readonly />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="所屬單位" :model-value="selectedDemand.department" readonly />
          </v-col>
          <v-col cols="12">
            <v-textarea label="詳細說明" :model-value="selectedDemand.description" readonly rows="3" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="detailDialog = false">關閉</v-btn>
        <v-btn color="success">核准</v-btn>
        <v-btn color="error">駁回</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
