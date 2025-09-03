<script setup>
import { ref, onMounted, nextTick } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 修復 Leaflet 預設圖標問題
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// 地圖實例
let map = null;
let markers = [];

// 選中的資產
const selectedAsset = ref(null);

// 麵包屑導航
const breadcrumbs = ref([
  { title: "首頁", to: "/Home" },
  { title: "資產列表", disabled: true },
]);

// 搜尋和篩選
const searchText = ref("");
const selectedDistrict = ref("");
const selectedType = ref("");
const selectedStatus = ref("");

// 公開資產列表
const publicAssets = ref([
  {
    id: "A001",
    name: "台南市立圖書館新總館",
    location: "台南市永康區康橋大道255號",
    district: "永康區",
    area: 1200,
    type: "建築物",
    status: "已活化",
    description:
      "現代化的圖書館建築，提供豐富的閱讀空間和數位資源，是市民學習和文化交流的重要場所。",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    lng: 120.2532,
    lat: 23.0159,
    openTime: "週一至週日 08:30-21:00",
    contact: "06-3035855",
  },
  {
    id: "A002",
    name: "台南市美術館二館",
    location: "台南市中西區忠義路二段1號",
    district: "中西區",
    area: 800,
    type: "建築物",
    status: "已活化",
    description:
      "當代藝術展示空間，結合傳統與現代元素，定期舉辦各類藝術展覽和文化活動。",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80",
    lng: 120.2047,
    lat: 22.9911,
    openTime: "週二至週日 09:00-17:00",
    contact: "06-2218881",
  },
  {
    id: "A003",
    name: "台南市立棒球場",
    location: "台南市南區健康路一段257號",
    district: "南區",
    area: 3000,
    type: "土地",
    status: "媒合中",
    description:
      "專業棒球場地，可舉辦各級棒球比賽，周邊設施完善，歡迎體育團體申請使用。",
    image:
      "https://images.unsplash.com/photo-1566578703048-2bbbfef0feaf?auto=format&fit=crop&w=400&q=80",
    lng: 120.1942,
    lat: 22.9716,
    openTime: "依預約時間開放",
    contact: "06-2157691",
  },
  {
    id: "A004",
    name: "台南市立安平國中舊校舍",
    location: "台南市安平區安北路123號",
    district: "安平區",
    area: 500,
    type: "建築物",
    status: "已媒合",
    description:
      "歷史悠久的校舍建築，正在規劃轉型為社區活動中心，未來將提供多元化的社區服務。",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80",
    lng: 120.1645,
    lat: 23.0002,
    openTime: "規劃中",
    contact: "06-2991111",
  },
  {
    id: "A005",
    name: "台南市立新營文化中心",
    location: "台南市新營區中正路23號",
    district: "新營區",
    area: 1500,
    type: "建築物",
    status: "待媒合",
    description:
      "結合展演、教育功能的文化設施，適合藝文團體進駐或舉辦各類文化活動。",
    image:
      "https://images.unsplash.com/photo-1595433562696-617b48bd2f3f?auto=format&fit=crop&w=400&q=80",
    lng: 120.3119,
    lat: 23.3056,
    openTime: "週一至週五 09:00-17:00",
    contact: "06-6321047",
  },
  {
    id: "A006",
    name: "台南市立體育場",
    location: "台南市南區體育路10號",
    district: "南區",
    area: 2500,
    type: "土地",
    status: "待媒合",
    description:
      "多功能體育場地，包含田徑場、足球場等設施，歡迎體育相關活動申請使用。",
    image:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=400&q=80",
    lng: 120.1901,
    lat: 22.9701,
    openTime: "週一至週日 06:00-22:00",
    contact: "06-2157691",
  },
]);

// 篩選選項
const districts = [
  "永康區",
  "中西區",
  "南區",
  "安平區",
  "新營區",
  "東區",
  "北區",
  "安南區",
];
const types = ["建築物", "土地"];
const statuses = ["已活化", "媒合中", "已媒合", "待媒合"];

// 計算篩選後的資產列表
const filteredAssets = ref([]);

function updateFilteredAssets() {
  filteredAssets.value = publicAssets.value.filter((asset) => {
    const matchSearch =
      !searchText.value ||
      asset.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchText.value.toLowerCase());

    const matchDistrict =
      !selectedDistrict.value || asset.district === selectedDistrict.value;
    const matchType = !selectedType.value || asset.type === selectedType.value;
    const matchStatus =
      !selectedStatus.value || asset.status === selectedStatus.value;

    return matchSearch && matchDistrict && matchType && matchStatus;
  });

  // 更新地圖標記
  updateMapMarkers();
}

// 初始化地圖
function initMap() {
  if (map) return;

  map = L.map("map").setView([23.0, 120.2], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  updateMapMarkers();
}

// 更新地圖標記
function updateMapMarkers() {
  if (!map) return;

  // 清除現有標記
  markers.forEach((marker) => map.removeLayer(marker));
  markers = [];

  // 添加新標記
  filteredAssets.value.forEach((asset) => {
    const marker = L.marker([asset.lat, asset.lng])
      .bindPopup(
        `
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px;">${asset.name}</h3>
          <p style="margin: 4px 0; color: #666;">${asset.location}</p>
          <p style="margin: 4px 0;"><strong>類型：</strong>${asset.type}</p>
          <p style="margin: 4px 0;"><strong>狀態：</strong>${asset.status}</p>
          <p style="margin: 4px 0;"><strong>面積：</strong>${asset.area} 坪</p>
        </div>
      `
      )
      .on("click", () => selectAsset(asset));

    marker.addTo(map);
    markers.push(marker);
  });
}

// 選擇資產
function selectAsset(asset) {
  selectedAsset.value = asset;

  // 地圖置中到選中的資產
  if (map) {
    map.setView([asset.lat, asset.lng], 15);

    // 找到對應的標記並打開彈窗
    const marker = markers.find(
      (m) => m.getLatLng().lat === asset.lat && m.getLatLng().lng === asset.lng
    );
    if (marker) {
      marker.openPopup();
    }
  }
}

// 清除選擇
function clearSelection() {
  selectedAsset.value = null;
  if (map) {
    map.closePopup();
  }
}

// 重置篩選
function resetFilters() {
  searchText.value = "";
  selectedDistrict.value = "";
  selectedType.value = "";
  selectedStatus.value = "";
  updateFilteredAssets();
}

// 取得狀態顏色
function getStatusColor(status) {
  const colorMap = {
    已活化: "purple",
    媒合中: "orange",
    已媒合: "green",
    待媒合: "blue",
  };
  return colorMap[status] || "grey";
}

// 組件掛載時初始化
onMounted(async () => {
  updateFilteredAssets();
  await nextTick();
  setTimeout(() => {
    initMap();
  }, 100);
});

// 監聽篩選條件變化
function onFilterChange() {
  updateFilteredAssets();
}
</script>

<template>
  <div>
    <!-- 頁面頂部區塊 -->
    <section class="page-header bg-grey-lighten-4 py-4">
      <v-container>
        <v-row>
          <v-col cols="12">
            <!-- 麵包屑導航 -->
            <v-breadcrumbs :items="breadcrumbs" class="pa-0 mb-2">
              <template #prepend>
                <v-icon size="small">mdi-home</v-icon>
              </template>
              <template #divider>
                <v-icon size="small">mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>

            <h1 class="text-h4 font-weight-bold text-primary mb-2">
              公開資產列表
            </h1>
            <p class="text-body-1 text-grey-darken-1">
              探索台南市公有資產活化機會，歡迎各界申請使用
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <div class="public-asset-list pa-5">
      <!-- 搜尋和篩選區域 -->
      <v-card class="mb-4">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="searchText"
                label="搜尋資產名稱或地址"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="compact"
                @input="onFilterChange"
                clearable
              />
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                v-model="selectedDistrict"
                label="行政區"
                :items="districts"
                variant="outlined"
                density="compact"
                @update:model-value="onFilterChange"
                clearable
              />
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                v-model="selectedType"
                label="物件類別"
                :items="types"
                variant="outlined"
                density="compact"
                @update:model-value="onFilterChange"
                clearable
              />
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                v-model="selectedStatus"
                label="狀態"
                :items="statuses"
                variant="outlined"
                density="compact"
                @update:model-value="onFilterChange"
                clearable
              />
            </v-col>
            <v-col cols="12" md="3" class="d-flex align-center">
              <v-btn @click="resetFilters" variant="outlined" class="mr-2">
                重置篩選
              </v-btn>
              <v-chip color="primary" variant="outlined">
                共 {{ filteredAssets.length }} 筆資產
              </v-chip>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- 主要內容區域 -->
      <v-row>
        <!-- 左側：資產列表 -->
        <v-col cols="12" md="5">
          <v-card height="600" class="overflow-auto">
            <v-card-title class="d-flex align-center justify-space-between">
              <span>資產列表</span>
              <v-btn
                v-if="selectedAsset"
                @click="clearSelection"
                size="small"
                variant="outlined"
              >
                清除選擇
              </v-btn>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-list>
                <v-list-item
                  v-for="asset in filteredAssets"
                  :key="asset.id"
                  @click="selectAsset(asset)"
                  :class="{
                    'bg-blue-lighten-5': selectedAsset?.id === asset.id,
                  }"
                  class="border-b"
                >
                  <template #prepend>
                    <v-avatar size="60" rounded="lg">
                      <v-img :src="asset.image" cover />
                    </v-avatar>
                  </template>

                  <v-list-item-title class="font-weight-medium mb-1">
                    {{ asset.name }}
                  </v-list-item-title>

                  <v-list-item-subtitle class="mb-2">
                    <div class="d-flex align-center mb-1">
                      <v-icon size="16" class="mr-1">mdi-map-marker</v-icon>
                      {{ asset.location }}
                    </div>
                    <div class="d-flex align-center gap-2">
                      <v-chip
                        :color="asset.type === '建築物' ? 'brown' : 'teal'"
                        size="x-small"
                        variant="outlined"
                      >
                        {{ asset.type }}
                      </v-chip>
                      <v-chip
                        :color="getStatusColor(asset.status)"
                        size="x-small"
                      >
                        {{ asset.status }}
                      </v-chip>
                      <span class="text-caption">{{ asset.area }} 坪</span>
                    </div>
                  </v-list-item-subtitle>

                  <template #append>
                    <v-btn
                      icon="mdi-chevron-right"
                      variant="text"
                      size="small"
                    />
                  </template>
                </v-list-item>
              </v-list>

              <div v-if="filteredAssets.length === 0" class="text-center pa-8">
                <v-icon size="48" color="grey-lighten-1"
                  >mdi-database-search</v-icon
                >
                <div class="text-h6 mt-4 text-grey-darken-1">
                  沒有找到符合條件的資產
                </div>
                <div class="text-body-2 text-grey-darken-1">
                  請嘗試調整搜尋條件
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- 右側：地圖 -->
        <v-col cols="12" md="7">
          <v-card height="600">
            <v-card-title>
              互動地圖
              <v-spacer />
              <v-chip
                v-if="selectedAsset"
                :color="getStatusColor(selectedAsset.status)"
                size="small"
              >
                已選擇：{{ selectedAsset.name }}
              </v-chip>
            </v-card-title>
            <v-card-text class="pa-0">
              <div id="map" style="height: 520px; width: 100%"></div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 選中資產詳細資訊 -->
      <v-expand-transition>
        <v-card v-if="selectedAsset" class="mt-4">
          <v-card-title class="bg-primary text-white">
            <v-icon class="mr-2">mdi-information</v-icon>
            資產詳細資訊
          </v-card-title>
          <v-card-text class="pt-6">
            <v-row>
              <v-col cols="12" md="3">
                <v-img
                  :src="selectedAsset.image"
                  aspect-ratio="1.5"
                  cover
                  class="rounded-lg"
                />
              </v-col>
              <v-col cols="12" md="9">
                <h2 class="text-h5 mb-2">{{ selectedAsset.name }}</h2>
                <p class="text-body-1 mb-3">{{ selectedAsset.description }}</p>

                <v-row>
                  <v-col cols="12" sm="6">
                    <div class="d-flex align-center mb-2">
                      <v-icon class="mr-2">mdi-map-marker</v-icon>
                      <span>{{ selectedAsset.location }}</span>
                    </div>
                    <div class="d-flex align-center mb-2">
                      <v-icon class="mr-2">mdi-clock-outline</v-icon>
                      <span>{{ selectedAsset.openTime }}</span>
                    </div>
                    <div class="d-flex align-center mb-2">
                      <v-icon class="mr-2">mdi-phone</v-icon>
                      <span>{{ selectedAsset.contact }}</span>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="d-flex align-center mb-2">
                      <v-icon class="mr-2">mdi-ruler-square</v-icon>
                      <span>{{ selectedAsset.area }} 坪</span>
                    </div>
                    <div class="d-flex align-center mb-2">
                      <v-icon class="mr-2">mdi-shape</v-icon>
                      <v-chip
                        :color="
                          selectedAsset.type === '建築物' ? 'brown' : 'teal'
                        "
                        size="small"
                      >
                        {{ selectedAsset.type }}
                      </v-chip>
                    </div>
                    <div class="d-flex align-center mb-2">
                      <v-icon class="mr-2">mdi-flag</v-icon>
                      <v-chip
                        :color="getStatusColor(selectedAsset.status)"
                        size="small"
                      >
                        {{ selectedAsset.status }}
                      </v-chip>
                    </div>
                  </v-col>
                </v-row>

                <v-divider class="my-4" />

                <div class="text-right">
                  <v-btn
                    color="success"
                    to="/PublicDemandForm"
                    :append-icon="'mdi-arrow-right'"
                  >
                    申請使用此資產
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-expand-transition>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  border-bottom: 3px solid #1976d2;
}

.public-asset-list {
  padding: 0;
}

.border-b {
  border-bottom: 1px solid #e0e0e0;
}

/* Leaflet 地圖樣式調整 */
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 8px;
}

:deep(.leaflet-popup-content) {
  margin: 8px 12px;
}
</style>
