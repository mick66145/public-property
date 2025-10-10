<script setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { Chart, registerables } from "chart.js";

// 註冊 Chart.js 組件
Chart.register(...registerables);

// 模擬資產統計資料
const assetStats = ref({
  total: 47,
  building: 32,
  land: 15,
  statusStats: {
    待整理: 8,
    待媒合: 12,
    媒合中: 9,
    已媒合: 11,
    已活化: 7,
  },
  districtStats: {
    中西區: 8,
    東區: 6,
    南區: 7,
    北區: 5,
    安平區: 6,
    安南區: 4,
    永康區: 5,
    新營區: 3,
    其他: 3,
  },
  usageTypeStats: {
    社福設施: 12,
    交通設施: 10,
    辦公廳舍: 8,
    文化觀光設施: 9,
    典藏及其他空間: 8,
  },
});

// 新增節省支出統計
const savedExpenditure = ref(12345678);

// 需求統計資料
const demandStats = ref({
  total: 23,
  public: 14,
  department: 9,
  statusStats: {
    待審核: 8,
    審核中: 9,
    已核准: 6,
  },
});

// 會議統計資料
const meetingStats = ref({
  total: 15,
  thisMonth: 4,
  monthlyData: [2, 3, 1, 4, 2, 3, 4, 2, 1, 3, 2, 4],
});

// 計畫統計資料
const planStats = ref({
  total: 12,
  statusStats: {
    規劃中: 4,
    執行中: 5,
    已完成: 2,
    待核准: 1,
  },
});

// 最近活動記錄
const recentActivities = ref([
  {
    id: 1,
    type: "asset",
    title: "新增資產：台南市立體育館",
    time: "2024-04-15 14:30",
    user: "財稅局-王小明",
  },
  {
    id: 2,
    type: "demand",
    title: "收到需求申請：觀光局申請使用A001資產",
    time: "2024-04-15 11:20",
    user: "觀光局-李小華",
  },
  {
    id: 3,
    type: "meeting",
    title: "會議記錄：美術館活化策略會議",
    time: "2024-04-14 16:45",
    user: "文化局-張小美",
  },
  {
    id: 4,
    type: "plan",
    title: "計畫更新：社區活動中心轉型計畫",
    time: "2024-04-14 09:15",
    user: "財稅局-陳小強",
  },
  {
    id: 5,
    type: "asset",
    title: "資產狀態更新：A003 已媒合",
    time: "2024-04-13 15:30",
    user: "體育局-林小芳",
  },
]);

// 高價值資產排行
const topValueAssets = ref([
  {
    id: "A002",
    name: "台南市美術館二館",
    district: "中西區",
    totalValue: 30200000,
    status: "已活化",
  },
  {
    id: "A001",
    name: "台南市立圖書館新總館",
    district: "永康區",
    totalValue: 21350000,
    status: "已活化",
  },
  {
    id: "A004",
    name: "台南市立安平國中舊校舍",
    district: "安平區",
    totalValue: 14300000,
    status: "已媒合",
  },
  {
    id: "A005",
    name: "台南市立新營文化中心",
    district: "新營區",
    totalValue: 12850000,
    status: "待媒合",
  },
  {
    id: "A003",
    name: "台南市立棒球場",
    district: "南區",
    totalValue: 8900000,
    status: "媒合中",
  },
]);

// 圖表實例
let statusChart = null;
let districtChart = null;
let usageTypeChart = null;

// 顏色對照表
const statusColors = {
  待整理: "#9E9E9E",
  待媒合: "#2196F3",
  媒合中: "#FF9800",
  已媒合: "#4CAF50",
  已活化: "#9C27B0",
};

const usageTypeColors = {
  社福設施: "#36A2EB",
  交通設施: "#FF6384",
  辦公廳舍: "#4BC0C0",
  文化觀光設施: "#FFCE56",
  典藏及其他空間: "#9966FF",
};

// 計算圓餅圖資料
const statusChartData = computed(() => {
  const data = assetStats.value.statusStats;
  const labels = Object.keys(data);
  return {
    labels: labels,
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: labels.map(label => statusColors[label] || '#CCCCCC'),
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };
});

// 計算長條圖資料
const districtChartData = computed(() => {
  const data = assetStats.value.districtStats;
  return {
    labels: Object.keys(data),
    datasets: [
      {
        label: "資產數量",
        data: Object.values(data),
        backgroundColor: "#1976D2",
        borderColor: "#1565C0",
        borderWidth: 1,
      },
    ],
  };
});

// 計算使用類型圓餅圖資料
const usageTypeChartData = computed(() => {
  const data = assetStats.value.usageTypeStats;
  const labels = Object.keys(data);
  return {
    labels: labels,
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: labels.map(label => usageTypeColors[label] || '#CCCCCC'),
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };
});

// 初始化圓餅圖
function initStatusChart() {
  const ctx = document.getElementById("statusChart");
  if (ctx && !statusChart) {
    statusChart = new Chart(ctx, {
      type: "doughnut",
      data: statusChartData.value,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // 隱藏預設圖例，使用自定義圖例
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.parsed;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
        cutout: "50%",
      },
    });
  }
}

// 初始化長條圖
function initDistrictChart() {
  const ctx = document.getElementById("districtChart");
  if (ctx && !districtChart) {
    districtChart = new Chart(ctx, {
      type: "bar",
      data: districtChartData.value,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.parsed.y} 個資產`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
            title: {
              display: true,
              text: "資產數量",
            },
          },
          x: {
            title: {
              display: true,
              text: "行政區",
            },
          },
        },
      },
    });
  }
}

// 初始化使用類型圓餅圖
function initUsageTypeChart() {
  const ctx = document.getElementById("usageTypeChart");
  if (ctx && !usageTypeChart) {
    usageTypeChart = new Chart(ctx, {
      type: "doughnut",
      data: usageTypeChartData.value,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.parsed;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
        cutout: "50%",
      },
    });
  }
}

watch(statusChartData, (newData) => {
  if (statusChart) {
    statusChart.data = newData;
    statusChart.update();
  }
});

watch(usageTypeChartData, (newData) => {
  if (usageTypeChart) {
    usageTypeChart.data = newData;
    usageTypeChart.update();
  }
});

// 組件掛載後初始化圖表
onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    initStatusChart();
    initDistrictChart();
    initUsageTypeChart();
  }, 100);
});

// 格式化金額
function formatCurrency(value) {
  return new Intl.NumberFormat("zh-TW").format(value);
}

// 取得活動類型圖示
function getActivityIcon(type) {
  const icons = {
    asset: "mdi-office-building",
    demand: "mdi-handshake",
    meeting: "mdi-account-group",
    plan: "mdi-clipboard-text",
  };
  return icons[type] || "mdi-information";
}

// 取得活動類型顏色
function getActivityColor(type) {
  const colors = {
    asset: "primary",
    demand: "success",
    meeting: "info",
    plan: "warning",
  };
  return colors[type] || "grey";
}
</script>

<template>
  <div>
    <v-row class="mb-4">
      <v-col>
        <h1 class="text-h4 font-weight-bold">儀表板</h1>
        <p class="text-subtitle-1 text-grey-darken-1">
          公有資產活化管理平台總覽
        </p>
      </v-col>
    </v-row>

    <!-- 統計卡片 -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md>
        <v-card color="deep-purple" dark>
          <v-card-text>
            <div class="d-flex align-center">
              <v-icon size="40" class="mr-3">mdi-cash-multiple</v-icon>
              <div>
                <div class="text-h5 font-weight-bold">
                  ${{ formatCurrency(savedExpenditure) }}
                </div>
                <div class="text-subtitle-2">節省支出</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md>
        <v-card color="primary" dark>
          <v-card-text>
            <div class="d-flex align-center">
              <v-icon size="40" class="mr-3">mdi-office-building</v-icon>
              <div>
                <div class="text-h5 font-weight-bold">
                  {{ assetStats.total }}
                </div>
                <div class="text-subtitle-2">總資產數</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md>
        <v-card color="success" dark>
          <v-card-text>
            <div class="d-flex align-center">
              <v-icon size="40" class="mr-3">mdi-handshake</v-icon>
              <div>
                <div class="text-h5 font-weight-bold">
                  {{ demandStats.total }}
                </div>
                <div class="text-subtitle-2">需求申請</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md>
        <v-card color="info" dark>
          <v-card-text>
            <div class="d-flex align-center">
              <v-icon size="40" class="mr-3">mdi-account-group</v-icon>
              <div>
                <div class="text-h5 font-weight-bold">
                  {{ meetingStats.total }}
                </div>
                <div class="text-subtitle-2">會議記錄</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md>
        <v-card color="warning" dark>
          <v-card-text>
            <div class="d-flex align-center">
              <v-icon size="40" class="mr-3">mdi-clipboard-text</v-icon>
              <div>
                <div class="text-h5 font-weight-bold">
                  {{ planStats.total }}
                </div>
                <div class="text-subtitle-2">活化計畫</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 資料表格區域 -->
    <v-row class="mb-6">
      <!-- 物件類別統計 -->
      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-card-title>物件類別統計</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" class="text-center">
                <div class="text-h3 font-weight-bold text-brown">
                  {{ assetStats.building }}
                </div>
                <div class="text-subtitle-1">建築物</div>
                <v-progress-linear :model-value="(assetStats.building / assetStats.total) * 100" color="brown"
                  height="8" rounded class="mt-2"></v-progress-linear>
              </v-col>
              <v-col cols="6" class="text-center">
                <div class="text-h3 font-weight-bold text-teal">
                  {{ assetStats.land }}
                </div>
                <div class="text-subtitle-1">土地</div>
                <v-progress-linear :model-value="(assetStats.land / assetStats.total) * 100" color="teal" height="8"
                  rounded class="mt-2"></v-progress-linear>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <!-- 需求狀態統計 -->
        <v-card>
          <v-card-title>需求狀態統計</v-card-title>
          <v-card-text>
            <div v-for="(value, status) in demandStats.statusStats" :key="status"
              class="d-flex align-center justify-space-between mb-2">
              <span>{{ status }}</span>
              <v-chip :color="status === '待審核'
                ? 'info'
                : status === '審核中'
                  ? 'warning'
                  : 'success'
                " size="small">
                {{ value }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 圖表區域 -->
    <v-row class="mb-6">
      <!-- 資產狀態分布圓餅圖 -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>資產狀態分布</v-card-title>
          <v-card-text>
            <div class="chart-container" style="position: relative; height: 300px">
              <canvas id="statusChart"></canvas>
            </div>
            <v-row class="mt-4">
              <v-col v-for="(value, status) in assetStats.statusStats" :key="status" cols="6" sm="4">
                <div class="text-center">
                  <v-chip :color="statusColors[status]" size="small" class="mb-1">
                    {{ status }}
                  </v-chip>
                  <div class="text-h6 font-weight-bold">{{ value }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 使用類型分布圓餅圖 -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>資產使用類型分布</v-card-title>
          <v-card-text>
            <div class="chart-container" style="position: relative; height: 300px">
              <canvas id="usageTypeChart"></canvas>
            </div>
            <v-row class="mt-4">
              <v-col v-for="(value, usageType) in assetStats.usageTypeStats" :key="usageType" cols="6" sm="4">
                <div class="text-center">
                  <v-chip :color="usageTypeColors[usageType]" size="small" class="mb-1">
                    {{ usageType }}
                  </v-chip>
                  <div class="text-h6 font-weight-bold">{{ value }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 行政區分布長條圖 -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>行政區資產分布</v-card-title>
          <v-card-text>
            <div class="chart-container" style="position: relative; height: 300px">
              <canvas id="districtChart"></canvas>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 高價值資產排行 -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>高價值資產排行</v-card-title>
          <v-card-text>
            <v-data-table :headers="[
              { title: '排名', value: 'rank' },
              { title: '資產編號', value: 'id' },
              { title: '資產名稱', value: 'name' },
              { title: '行政區', value: 'district' },
              { title: '總價值', value: 'totalValue' },
              { title: '狀態', value: 'status' },
            ]" :items="topValueAssets.map((item, index) => ({
              ...item,
              rank: index + 1,
            }))
              " hide-default-footer :items-per-page="-1">
              <template v-slot:[`item.rank`]="{ item }">
                <v-chip :color="item.rank === 1
                  ? 'gold'
                  : item.rank === 2
                    ? 'silver'
                    : item.rank === 3
                      ? 'bronze'
                      : 'grey'
                  " size="small">
                  {{ item.rank }}
                </v-chip>
              </template>
              <template v-slot:[`item.totalValue`]="{ item }">
                {{ formatCurrency(item.totalValue) }} 元
              </template>
              <template v-slot:[`item.status`]="{ item }">
                <v-chip :color="item.status === '已活化'
                  ? 'purple'
                  : item.status === '已媒合'
                    ? 'green'
                    : item.status === '媒合中'
                      ? 'orange'
                      : 'blue'
                  " size="small">
                  {{ item.status }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 最近活動 -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>最近活動</v-card-title>
          <v-card-text>
            <v-timeline density="compact">
              <v-timeline-item v-for="activity in recentActivities" :key="activity.id"
                :dot-color="getActivityColor(activity.type)" size="small">
                <template v-slot:icon>
                  <v-icon size="16">{{
                    getActivityIcon(activity.type)
                  }}</v-icon>
                </template>
                <div class="d-flex align-center justify-space-between">
                  <div>
                    <div class="font-weight-medium">{{ activity.title }}</div>
                    <div class="text-caption text-grey-darken-1">
                      {{ activity.user }}
                    </div>
                  </div>
                  <div class="text-caption text-grey-darken-1">
                    {{ activity.time }}
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.text-brown {
  color: #795548 !important;
}

.text-teal {
  color: #009688 !important;
}
</style>
