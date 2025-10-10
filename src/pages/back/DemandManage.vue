<script setup>
import { ref, computed } from "vue";
import html2pdf from 'html2pdf.js';

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
    description: "因應安平區觀光人潮，計畫將此閒置校舍改造為文化展示中心，急需此空間。經費已編列。",
    assetType: "建物",
    desiredFloor: null,
    desiredArea: null,
    desiredLocation: null,
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
    description: "希望申請棒球場場地，於三月份舉辦年度社區運動會，經費來自社區發展協會補助。",
    assetType: "土地",
    desiredFloor: null,
    desiredArea: null,
    desiredLocation: null,
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
    assetType: "建物",
    desiredFloor: null,
    desiredArea: null,
    desiredLocation: null,
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
    assetType: "建物",
    desiredFloor: null,
    desiredArea: null,
    desiredLocation: null,
  },
  {
    id: "D005",
    type: "其他局處",
    applicant: "台南市政府社會局",
    assetId: null,
    assetName: null,
    purpose: "成立社區長照關懷據點",
    applyDate: "2024-02-05",
    status: "待媒合",
    contact: "林心怡",
    phone: "06-2991111",
    email: "lin@tainan.gov.tw",
    department: "社會局老人福利科",
    description: "為配合長照2.0政策，急需在東區尋找一樓或有電梯之空間成立長照據點，服務周邊民眾。",
    assetType: "建物",
    desiredFloor: "1樓或有電梯之樓層",
    desiredArea: 200,
    desiredLocation: "台南市東區",
  },
]);

const search = ref("");
const typeFilter = ref(null);
const types = computed(() => {
  const uniqueTypes = new Set(items.value.map((item) => item.type));
  return ["所有類型", ...Array.from(uniqueTypes)];
});

const statusFilter = ref(null);
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
function formatCurrency(value) {
  if (!value || value === 0) return "0";
  return new Intl.NumberFormat("zh-TW").format(value);
}



</script>

<template>
  <v-card>
    <v-card-title class="text-h6 d-flex align-center justify-space-between">
      <span>需求管理</span>
      <div>
        <v-btn color="info" prepend-icon="mdi-export">匯出檔案</v-btn>
      </div>
    </v-card-title>
    <v-card-text>
      <div id="demand-pdf-content">
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
                <div id="pdf-export-area">
                  <v-data-table :headers="headers" :items="filteredItems" class="elevation-1" @click:row="openDetail">
                    <template v-slot:[`item.demandTarget`]= "{ item }">
                      <div v-if="item.assetName" class="font-weight-medium">{{ item.assetName }}</div>
                      <div v-else class="text-grey-darken-1">{{ item.desiredLocation }} (一般需求)</div>
                    </template>
                    <template v-slot:[`item.type`]= "{ item }">
                      <v-chip :color="item.type === '民眾' ? 'blue' : 'green'" size="small">
                        {{ item.type }}
                      </v-chip>
                    </template>
                    <template v-slot:[`item.status`]= "{ item }">
                      <v-chip :color="item.status === '已核准'
                        ? 'success'
                        : item.status === '審核中'
                          ? 'warning'
                          : item.status === '待媒合'
                            ? 'purple'
                            : 'info'
                        " size="small">
                        {{ item.status }}
                      </v-chip>
                    </template>
                  </v-data-table>
        

                </div>
      </div>
    </v-card-text>
  </v-card>

  <!-- 需求詳情 modal -->
  <v-dialog v-model="detailDialog" max-width="800">
    <v-card>
      <v-card-title>需求詳情</v-card-title>
      <v-card-text>
        <v-row>
          <!-- 申請單位資訊 -->
          <v-col cols="12">
            <div class="text-h6 mb-2">申請單位資訊</div>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="需求編號" :model-value="selectedDemand.id" readonly />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="需求類型" :model-value="selectedDemand.type" readonly />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="申請單位/民眾" :model-value="selectedDemand.applicant" readonly />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="所屬單位" :model-value="selectedDemand.department" readonly />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="申請日期" :model-value="selectedDemand.applyDate" readonly />
          </v-col>

          <v-col cols="12"><v-divider class="my-3"></v-divider></v-col>

          <!-- 需求內容 -->
          <v-col cols="12">
            <div class="text-h6 mb-2">需求內容</div>
          </v-col>
          <template v-if="selectedDemand.assetId">
            <v-col cols="12" sm="6">
              <v-text-field label="資產編號" :model-value="selectedDemand.assetId" readonly />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="資產名稱" :model-value="selectedDemand.assetName" readonly />
            </v-col>
          </template>
          <template v-else>
            <v-col cols="12" sm="6">
              <v-text-field label="希望地點" :model-value="selectedDemand.desiredLocation" readonly />
            </v-col>
          </template>
          <v-col cols="12" sm="6">
            <v-text-field label="需求用途" :model-value="selectedDemand.purpose" readonly />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="土地或建物" :model-value="selectedDemand.assetType" readonly />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="希望樓層" :model-value="selectedDemand.desiredFloor" readonly />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="面積(㎡)" :model-value="selectedDemand.desiredArea" readonly suffix="㎡" />
          </v-col>
          <v-col cols="12">
            <v-textarea label="備註(敘明必要性、急迫性及經費來源)" :model-value="selectedDemand.description" readonly rows="4" />
          </v-col>

          <v-col cols="12"><v-divider class="my-3"></v-divider></v-col>

          <!-- 聯絡資訊 -->
          <v-col cols="12">
            <div class="text-h6 mb-2">聯絡資訊</div>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="聯絡人" :model-value="selectedDemand.contact" readonly />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="聯絡電話" :model-value="selectedDemand.phone" readonly />
          </v-col>
          <v-col cols="12">
            <v-text-field label="電子信箱" :model-value="selectedDemand.email" readonly />
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
