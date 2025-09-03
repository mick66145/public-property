<template>
  <div>
    <!-- 1. 頁面頂部區塊 -->
    <section class="page-header bg-grey-lighten-4 py-4">
      <v-container>
        <v-row align="center">
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

            <!-- 返回按鈕與標題 -->
            <div class="d-flex align-center">
              <v-btn
                @click="goBack"
                variant="outlined"
                size="small"
                class="mr-4"
              >
                <v-icon class="mr-1">mdi-arrow-left</v-icon>
                返回
              </v-btn>
              <h1 class="text-h4 font-weight-bold text-primary">
                {{ assetData.name }}
              </h1>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 2. 資產基本資訊展示 -->
    <section class="asset-info-section py-8">
      <v-container>
        <v-row>
          <!-- 圖片輪播 -->
          <v-col cols="12" md="8">
            <v-card class="mb-6" elevation="4">
              <v-carousel
                v-model="currentImageIndex"
                height="400"
                show-arrows="hover"
                hide-delimiter-background
              >
                <v-carousel-item
                  v-for="(image, index) in assetData.images"
                  :key="index"
                  :src="image"
                  cover
                ></v-carousel-item>
              </v-carousel>
            </v-card>
          </v-col>

          <!-- 基本資料卡片 -->
          <v-col cols="12" md="4">
            <v-card class="mb-6" elevation="4">
              <v-card-title class="bg-primary text-white">
                <v-icon class="mr-2">mdi-information</v-icon>
                基本資訊
              </v-card-title>
              <v-card-text class="pa-4">
                <v-list density="compact">
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="primary" size="20">mdi-identifier</v-icon>
                    </template>
                    <v-list-item-title>資產編號</v-list-item-title>
                    <v-list-item-subtitle>{{
                      assetData.id
                    }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template #prepend>
                      <v-icon color="primary" size="20">mdi-map-marker</v-icon>
                    </template>
                    <v-list-item-title>地址</v-list-item-title>
                    <v-list-item-subtitle>{{
                      assetData.address
                    }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template #prepend>
                      <v-icon color="primary" size="20">mdi-map</v-icon>
                    </template>
                    <v-list-item-title>行政區</v-list-item-title>
                    <v-list-item-subtitle>{{
                      assetData.district
                    }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template #prepend>
                      <v-icon color="primary" size="20"
                        >mdi-ruler-square</v-icon
                      >
                    </template>
                    <v-list-item-title>面積</v-list-item-title>
                    <v-list-item-subtitle
                      >{{ assetData.area }} 坪</v-list-item-subtitle
                    >
                  </v-list-item>

                  <v-list-item>
                    <template #prepend>
                      <v-icon color="primary" size="20"
                        >mdi-home-variant</v-icon
                      >
                    </template>
                    <v-list-item-title>物件類別</v-list-item-title>
                    <v-list-item-subtitle>
                      <v-chip
                        :color="assetData.type === '建築物' ? 'brown' : 'teal'"
                        size="small"
                        variant="flat"
                      >
                        {{ assetData.type }}
                      </v-chip>
                    </v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template #prepend>
                      <v-icon color="primary" size="20">mdi-flag</v-icon>
                    </template>
                    <v-list-item-title>狀態</v-list-item-title>
                    <v-list-item-subtitle>
                      <v-chip
                        :color="assetData.statusColor"
                        size="small"
                        variant="flat"
                      >
                        {{ assetData.status }}
                      </v-chip>
                    </v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template #prepend>
                      <v-icon color="primary" size="20">mdi-domain</v-icon>
                    </template>
                    <v-list-item-title>管理單位</v-list-item-title>
                    <v-list-item-subtitle>{{
                      assetData.managementUnit
                    }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template #prepend>
                      <v-icon color="primary" size="20"
                        >mdi-currency-usd</v-icon
                      >
                    </template>
                    <v-list-item-title>土地公告現值</v-list-item-title>
                    <v-list-item-subtitle
                      class="font-weight-medium text-success"
                    >
                      {{ formatCurrency(assetData.landValue) }}
                    </v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template #prepend>
                      <v-icon color="primary" size="20"
                        >mdi-home-currency-usd</v-icon
                      >
                    </template>
                    <v-list-item-title>房屋課稅現值</v-list-item-title>
                    <v-list-item-subtitle class="font-weight-medium text-info">
                      {{ formatCurrency(assetData.buildingValue) }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>

            <!-- 快速申請按鈕 -->
            <v-card elevation="4">
              <v-card-text class="text-center pa-6">
                <h3 class="text-h6 mb-4">對此資產有興趣？</h3>
                <v-btn
                  @click="applyForAsset"
                  color="primary"
                  size="large"
                  block
                  class="mb-3"
                >
                  <v-icon class="mr-2">mdi-file-document-edit</v-icon>
                  申請使用此資產
                </v-btn>
                <p class="text-caption text-grey-darken-1">
                  點擊申請將跳轉至需求申請表單
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 4. 詳細描述 -->
    <section class="description-section bg-grey-lighten-5 py-8">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2 class="text-h4 font-weight-bold text-primary mb-6 text-center">
              詳細資訊
            </h2>
          </v-col>
        </v-row>

        <v-row>
          <!-- 資產特色 -->
          <v-col cols="12" md="6" class="mb-6">
            <v-card class="h-100" elevation="4">
              <v-card-title class="bg-primary text-white">
                <v-icon class="mr-2">mdi-star</v-icon>
                資產特色
              </v-card-title>
              <v-card-text class="pa-4">
                <p class="text-body-1 mb-4">{{ assetData.description }}</p>
                <h4 class="text-h6 mb-3">主要特色：</h4>
                <v-list density="compact">
                  <v-list-item
                    v-for="feature in assetData.features"
                    :key="feature"
                  >
                    <template #prepend>
                      <v-icon color="success" size="16"
                        >mdi-check-circle</v-icon
                      >
                    </template>
                    <v-list-item-title class="text-body-2">{{
                      feature
                    }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- 使用現況與設施 -->
          <v-col cols="12" md="6" class="mb-6">
            <v-card class="h-100" elevation="4">
              <v-card-title class="bg-info text-white">
                <v-icon class="mr-2">mdi-cog</v-icon>
                使用現況與設施
              </v-card-title>
              <v-card-text class="pa-4">
                <h4 class="text-h6 mb-3">目前使用狀況：</h4>
                <p class="text-body-2 mb-4">{{ assetData.currentUse }}</p>

                <h4 class="text-h6 mb-3">設施設備：</h4>
                <v-list density="compact">
                  <v-list-item
                    v-for="facility in assetData.facilities"
                    :key="facility.name"
                    class="px-0"
                  >
                    <v-list-item-title class="text-body-2">{{
                      facility.name
                    }}</v-list-item-title>
                    <template #append>
                      <v-chip size="small" variant="tonal" color="primary">
                        {{ facility.count }}
                      </v-chip>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- 限制條件 -->
          <v-col cols="12">
            <v-card elevation="4">
              <v-card-title class="bg-warning text-white">
                <v-icon class="mr-2">mdi-alert</v-icon>
                使用限制與注意事項
              </v-card-title>
              <v-card-text class="pa-4">
                <v-row>
                  <v-col
                    v-for="restriction in assetData.restrictions"
                    :key="restriction"
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <v-alert
                      type="warning"
                      variant="tonal"
                      density="compact"
                      class="text-body-2"
                    >
                      {{ restriction }}
                    </v-alert>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 5. 申請相關資訊 -->
    <section class="application-section py-8">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2 class="text-h4 font-weight-bold text-primary mb-6 text-center">
              申請相關資訊
            </h2>
          </v-col>
        </v-row>

        <v-row>
          <!-- 申請條件 -->
          <v-col cols="12" md="8" class="mb-6">
            <v-card class="h-100" elevation="4">
              <v-card-title class="bg-success text-white">
                <v-icon class="mr-2">mdi-check-decagram</v-icon>
                申請條件
              </v-card-title>
              <v-card-text class="pa-4">
                <v-list density="compact">
                  <v-list-item
                    v-for="condition in applicationInfo.conditions"
                    :key="condition"
                  >
                    <template #prepend>
                      <v-icon color="success" size="16">mdi-check</v-icon>
                    </template>
                    <v-list-item-title class="text-body-2">{{
                      condition
                    }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- 聯絡窗口 -->
          <v-col cols="12" md="4" class="mb-6">
            <v-card class="h-100" elevation="4">
              <v-card-title class="bg-primary text-white">
                <v-icon class="mr-2">mdi-account-circle</v-icon>
                聯絡窗口
              </v-card-title>
              <v-card-text class="pa-4">
                <v-list density="compact">
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="primary" size="18">mdi-domain</v-icon>
                    </template>
                    <v-list-item-title class="text-caption"
                      >承辦單位</v-list-item-title
                    >
                    <v-list-item-subtitle class="text-body-2">{{
                      applicationInfo.contact.unit
                    }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template #prepend>
                      <v-icon color="primary" size="18">mdi-account</v-icon>
                    </template>
                    <v-list-item-title class="text-caption"
                      >承辦人</v-list-item-title
                    >
                    <v-list-item-subtitle class="text-body-2">{{
                      applicationInfo.contact.person
                    }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template #prepend>
                      <v-icon color="primary" size="18">mdi-phone</v-icon>
                    </template>
                    <v-list-item-title class="text-caption"
                      >電話</v-list-item-title
                    >
                    <v-list-item-subtitle class="text-body-2">{{
                      applicationInfo.contact.phone
                    }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template #prepend>
                      <v-icon color="primary" size="18">mdi-email</v-icon>
                    </template>
                    <v-list-item-title class="text-caption"
                      >Email</v-list-item-title
                    >
                    <v-list-item-subtitle class="text-body-2">{{
                      applicationInfo.contact.email
                    }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 當前資產資料
const assetData = ref({
  id: "ASSET001",
  name: "台南市立圖書館新總館",
  address: "永康區康橋大道255號",
  district: "永康區",
  area: "2,850",
  type: "建築物",
  status: "已活化",
  statusColor: "success",
  managementUnit: "台南市政府文化局",
  landValue: "168,500,000",
  buildingValue: "285,000,000",
  description:
    "台南市立圖書館新總館為地上6層、地下2層之現代化圖書館建築，總樓地板面積約41,797平方公尺。建築設計融合台南在地文化特色，提供多元化的閱讀與學習空間，包含一般閱覽區、兒童區、青少年區、樂齡區、多功能展演廳等。",
  features: [
    "現代化智能建築設計",
    "無障礙友善空間",
    "多功能展演設施",
    "戶外廣場空間",
    "停車場設施完善",
  ],
  currentUse: "公共圖書館營運中，提供市民閱讀、學習、文化活動等服務",
  facilities: [
    { name: "閱覽席位", count: "1,200個" },
    { name: "藏書量", count: "60萬冊" },
    { name: "停車位", count: "150個" },
    { name: "展演廳", count: "200人座" },
    { name: "研習教室", count: "8間" },
  ],
  restrictions: [
    "須符合圖書館使用規範",
    "活動申請需提前30天",
    "商業使用需另行申請",
    "需配合開放時間",
  ],
  images: [
    "https://via.placeholder.com/800x600?text=圖書館外觀",
    "https://via.placeholder.com/800x600?text=閱讀空間",
    "https://via.placeholder.com/800x600?text=兒童區",
    "https://via.placeholder.com/800x600?text=展演廳",
    "https://via.placeholder.com/800x600?text=戶外廣場",
  ],
});

// 申請相關資訊
const applicationInfo = ref({
  conditions: [
    "政府機關、學校、非營利組織",
    "符合公益性質之活動",
    "具備完整活動企劃書",
    "有明確的使用目的與效益",
  ],

  contact: {
    unit: "台南市政府文化局",
    person: "王小明",
    phone: "06-2991111#8100",
    email: "culture@tainan.gov.tw",
    address: "台南市安平區永華路二段6號",
  },
});

// 目前顯示的圖片索引
const currentImageIndex = ref(0);

// 麵包屑導航
const breadcrumbs = ref([
  { title: "首頁", to: "/" },
  { title: "資產列表", to: "/PublicAssetList" },
  { title: "資產詳情", disabled: true },
]);

// 頁面載入時從路由參數獲取資產ID
onMounted(() => {
  const assetId = route.query.id;
  if (assetId) {
    // 這裡可以根據ID從API獲取資產詳細資料
    // 目前使用範例資料
    console.log("Loading asset:", assetId);
  }
});

// 返回上一頁
const goBack = () => {
  router.back();
};

// 申請使用此資產
const applyForAsset = () => {
  router.push(`/PublicDemandForm?assetId=${assetData.value.id}`);
};

// 格式化貨幣
const formatCurrency = (value) => {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0,
  }).format(value);
};
</script>

<style scoped>
.page-header {
  border-bottom: 3px solid #1976d2;
}

.asset-info-section .v-card {
  transition: all 0.3s ease;
}

.asset-info-section .v-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* 響應式調整 */
@media (max-width: 960px) {
  .asset-info-section .v-card:hover {
    transform: translateY(-1px);
  }
}
</style>
