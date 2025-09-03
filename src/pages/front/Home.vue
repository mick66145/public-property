<script setup>
import { ref } from "vue";

// 數據統計
const statistics = ref([
  {
    title: "總資產數",
    value: "147",
    icon: "mdi-office-building",
    color: "primary",
  },
  {
    title: "已活化資產",
    value: "89",
    icon: "mdi-check-circle",
    color: "success",
  },
  { title: "申請案件", value: "234", icon: "mdi-file-document", color: "info" },
  {
    title: "合作單位",
    value: "45",
    icon: "mdi-account-group",
    color: "warning",
  },
]);

// 平台特色
const features = ref([
  {
    title: "資產透明化",
    description: "完整公開台南市公有資產資訊，提供詳細的位置、規格與使用狀況",
    icon: "mdi-eye",
    color: "primary",
  },
  {
    title: "線上申請",
    description: "簡化申請流程，民眾與機關可透過線上平台提交使用需求",
    icon: "mdi-file-document-edit",
    color: "success",
  },
  {
    title: "活化成果",
    description: "追蹤資產活化進度，展示成功案例與社會效益",
    icon: "mdi-chart-line",
    color: "info",
  },
  {
    title: "多方協作",
    description: "促進政府機關、民間團體與市民之間的合作交流",
    icon: "mdi-handshake",
    color: "warning",
  },
]);

// 精選資產
const featuredAssets = ref([
  {
    id: "ASSET001",
    name: "台南市立圖書館新總館",
    location: "永康區康橋大道255號",
    image: "https://via.placeholder.com/300x200?text=圖書館新總館",
    description: "現代化圖書館建築，提供多元學習空間",
    status: "已活化",
    statusColor: "success",
  },
  {
    id: "ASSET002",
    name: "台南市美術館二館",
    location: "中西區忠義路二段1號",
    image: "https://via.placeholder.com/300x200?text=美術館二館",
    description: "當代藝術展覽空間，推廣在地文化",
    status: "已活化",
    statusColor: "success",
  },
  {
    id: "ASSET003",
    name: "安平港國家歷史風景區",
    location: "安平區安平路790號",
    image: "https://via.placeholder.com/300x200?text=安平港風景區",
    description: "結合歷史文化與觀光休閒的複合空間",
    status: "媒合中",
    statusColor: "warning",
  },
  {
    id: "ASSET004",
    name: "台南文化創意產業園區",
    location: "東區北門路二段16號",
    image: "https://via.placeholder.com/300x200?text=文創園區",
    description: "扶植文創產業，打造創意聚落",
    status: "待媒合",
    statusColor: "info",
  },
]);

// 最新消息
const news = ref([
  {
    title: "台南市立圖書館新總館正式啟用",
    date: "2024-01-15",
    category: "活化成果",
    summary:
      "經過兩年的規劃與建設，台南市立圖書館新總館正式對外開放，成為市民學習新地標。",
  },
  {
    title: "安平港區域開發計畫公開說明會",
    date: "2024-01-10",
    category: "重要公告",
    summary: "針對安平港國家歷史風景區的開發計畫，將於本月底舉辦公開說明會。",
  },
  {
    title: "文創園區招商說明會圓滿結束",
    date: "2024-01-05",
    category: "活動資訊",
    summary:
      "台南文化創意產業園區招商說明會吸引眾多業者參與，預計下月開始受理申請。",
  },
]);

// 服務流程
const serviceSteps = ref([
  {
    step: 1,
    title: "瀏覽資產",
    description: "查看可用的公有資產資訊",
    icon: "mdi-magnify",
  },
  {
    step: 2,
    title: "提交申請",
    description: "線上填寫使用需求申請表",
    icon: "mdi-file-document-edit",
  },
  {
    step: 3,
    title: "審核評估",
    description: "相關單位進行申請案件審核",
    icon: "mdi-clipboard-check",
  },
  {
    step: 4,
    title: "媒合協調",
    description: "安排會議討論合作細節",
    icon: "mdi-account-group",
  },
  {
    step: 5,
    title: "簽約執行",
    description: "簽署合作協議並開始執行",
    icon: "mdi-handshake",
  },
  {
    step: 6,
    title: "成果追蹤",
    description: "監督執行進度與成效評估",
    icon: "mdi-chart-line",
  },
]);
</script>

<template>
  <div>
    <!-- 1. 英雄區塊 -->
    <section class="hero-section pa-12">
      <v-container>
        <v-row align="center" class="min-h-screen">
          <v-col cols="12" md="6">
            <div class="hero-content">
              <h1 class="text-h5 text-md-h3 font-weight-bold mb-4 text-primary">
                台南市公有資產活化平台
              </h1>
              <h2 class="text-h6 text-md-h5 mb-6 text-grey-darken-2">
                促進城市發展 • 創造社會價值
              </h2>
              <p class="text-h6 text-md-h6 mb-8 text-grey-darken-1">
                透過透明化的資產資訊與便民的線上服務，讓台南市的每一處公有資產都能發揮最大效益，為市民創造更美好的生活環境。
              </p>
              <div class="d-flex flex-column flex-sm-row ga-4">
                <v-btn
                  to="/PublicAssetList"
                  color="primary"
                  size="x-large"
                  class="px-8"
                >
                  <v-icon class="mr-2">mdi-office-building</v-icon>
                  瀏覽資產
                </v-btn>
                <v-btn
                  to="/PublicDemandForm"
                  variant="outlined"
                  color="primary"
                  size="x-large"
                  class="px-8"
                >
                  <v-icon class="mr-2">mdi-file-document-edit</v-icon>
                  提交需求
                </v-btn>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="text-center">
            <v-img
              src="https://placehold.co/600x400?text=Smaple"
              alt="台南市政府"
              class="rounded-lg elevation-8"
              cover
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 2. 數據統計展示 -->
    <section class="statistics-section py-16">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-12">
            <h2 class="text-h4 font-weight-bold text-white mb-4 stats-title">
              平台成果統計
            </h2>
            <p class="text-h6 text-grey-darken-1 mb-8">
              即時更新的資產活化數據
            </p>
            <div class="decorative-line mx-auto"></div>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="(stat, index) in statistics"
            :key="stat.title"
            cols="6"
            md="3"
            class="mb-6"
          >
            <div
              class="stat-card-wrapper"
              :style="{ 'animation-delay': `${index * 0.2}s` }"
            >
              <v-card
                class="stat-card text-center pa-8 h-100 position-relative overflow-hidden"
                elevation="8"
                :class="`stat-card-${stat.color}`"
              >
                <!-- 背景裝飾圓圈 -->
                <div class="background-circles">
                  <div
                    class="circle circle-1"
                    :class="`bg-${stat.color}`"
                  ></div>
                  <div
                    class="circle circle-2"
                    :class="`bg-${stat.color}`"
                  ></div>
                  <div
                    class="circle circle-3"
                    :class="`bg-${stat.color}`"
                  ></div>
                </div>

                <!-- 主要內容 -->
                <div class="stat-content position-relative">
                  <div class="icon-wrapper mb-4">
                    <v-avatar
                      :color="`${stat.color}-lighten-1`"
                      size="80"
                      class="icon-avatar elevation-4"
                    >
                      <v-icon size="40" class="stat-icon">
                        {{ stat.icon }}
                      </v-icon>
                    </v-avatar>
                  </div>

                  <div class="number-display mb-3">
                    <div
                      class="text-h2 font-weight-bold stat-number"
                      :class="`text-${stat.color}-darken-2`"
                    >
                      {{ stat.value }}
                    </div>
                    <div class="number-suffix">+</div>
                  </div>

                  <div
                    class="text-h6 font-weight-medium text-grey-darken-2 stat-title"
                  >
                    {{ stat.title }}
                  </div>

                  <!-- 進度條裝飾 -->
                  <div class="progress-bar mt-4">
                    <div
                      class="progress-fill"
                      :class="`bg-${stat.color}`"
                      :style="{ 'animation-delay': `${index * 0.3 + 0.5}s` }"
                    ></div>
                  </div>
                </div>

                <!-- 光效 -->
                <div class="shine-effect"></div>
              </v-card>
            </div>
          </v-col>
        </v-row>

        <!-- 底部裝飾 -->
      </v-container>
    </section>

    <!-- 3. 平台特色介紹 -->
    <section class="features-section py-16">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-8">
            <h2 class="text-h4 font-weight-bold text-primary mb-4">平台特色</h2>
            <p class="text-h6 text-grey-darken-1">
              打造透明、便民、高效的資產管理平台
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="feature in features"
            :key="feature.title"
            cols="12"
            md="6"
            class="mb-6"
          >
            <v-card class="pa-6 h-100" elevation="2">
              <div class="d-flex align-center mb-4">
                <v-avatar :color="feature.color" size="56" class="mr-4">
                  <v-icon color="white" size="28">{{ feature.icon }}</v-icon>
                </v-avatar>
                <h3 class="text-h5 font-weight-bold">{{ feature.title }}</h3>
              </div>
              <p class="text-body-1 text-grey-darken-1">
                {{ feature.description }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 4. 精選資產展示 -->
    <section class="featured-assets-section bg-grey-lighten-5 py-16">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-8">
            <h2 class="text-h4 font-weight-bold text-primary mb-4">精選資產</h2>
            <p class="text-h6 text-grey-darken-1">成功活化的代表性案例</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="asset in featuredAssets"
            :key="asset.id"
            cols="12"
            md="6"
            lg="3"
            class="mb-6"
          >
            <v-card class="h-100" elevation="4">
              <v-img
                :src="asset.image"
                :alt="asset.name"
                height="200"
                cover
              ></v-img>
              <v-card-text>
                <div class="d-flex justify-space-between align-center mb-2">
                  <h3 class="text-h6 font-weight-bold">{{ asset.name }}</h3>
                  <v-chip
                    :color="asset.statusColor"
                    size="small"
                    variant="flat"
                  >
                    {{ asset.status }}
                  </v-chip>
                </div>
                <div class="d-flex align-center mb-2 text-grey-darken-1">
                  <v-icon size="16" class="mr-1">mdi-map-marker</v-icon>
                  <span class="text-body-2">{{ asset.location }}</span>
                </div>
                <p class="text-body-2 text-grey-darken-1">
                  {{ asset.description }}
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  :to="`/PublicAssetDetail?id=${asset.id}`"
                  color="primary"
                  variant="text"
                  block
                >
                  查看詳情
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-center mt-4">
            <v-btn
              to="/PublicAssetList"
              color="primary"
              variant="outlined"
              size="large"
            >
              查看更多資產
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 5. 最新消息/活動 -->
    <section class="news-section py-16">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-8">
            <h2 class="text-h4 font-weight-bold text-primary mb-4">最新消息</h2>
            <p class="text-h6 text-grey-darken-1">
              掌握最新的活化成果與重要資訊
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="item in news"
            :key="item.title"
            cols="12"
            md="4"
            class="mb-6"
          >
            <v-card class="h-100" elevation="2">
              <v-card-text>
                <div class="d-flex justify-space-between align-center mb-3">
                  <v-chip color="primary" size="small" variant="tonal">
                    {{ item.category }}
                  </v-chip>
                  <span class="text-caption text-grey-darken-1">{{
                    item.date
                  }}</span>
                </div>
                <h3 class="text-h6 font-weight-bold mb-3">{{ item.title }}</h3>
                <p class="text-body-2 text-grey-darken-1">{{ item.summary }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" variant="text" size="small">
                  閱讀更多
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 6. 服務流程說明 -->
    <section class="service-flow-section bg-primary py-16">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-8">
            <h2 class="text-h4 font-weight-bold text-white mb-4">服務流程</h2>
            <p class="text-h6 text-grey-lighten-2">
              簡單六步驟，輕鬆申請資產使用
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="(step, index) in serviceSteps"
            :key="step.step"
            cols="12"
            md="4"
            lg="2"
            class="mb-6"
          >
            <div class="text-center">
              <v-avatar
                color="white"
                size="80"
                class="mb-4 mx-auto elevation-4"
              >
                <v-icon color="primary" size="40">{{ step.icon }}</v-icon>
              </v-avatar>
              <div class="text-h4 font-weight-bold text-white mb-2">
                {{ step.step }}
              </div>
              <h3 class="text-h6 font-weight-bold text-white mb-2">
                {{ step.title }}
              </h3>
              <p class="text-body-2 text-grey-lighten-2">
                {{ step.description }}
              </p>
            </div>
            <!-- 連接線 (除了最後一個) -->
            <div
              v-if="index < serviceSteps.length - 1"
              class="d-none d-lg-block position-absolute"
              style="
                right: -50px;
                top: 50%;
                transform: translateY(-50%);
                z-index: 1;
              "
            >
              <v-icon color="white" size="24">mdi-arrow-right</v-icon>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-center mt-8">
            <v-btn
              to="/PublicDemandForm"
              color="white"
              size="x-large"
              class="px-8"
            >
              <v-icon class="mr-2">mdi-rocket-launch</v-icon>
              立即開始申請
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  /* min-height: 50vh; */
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.hero-content {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 數據統計區塊樣式 */
.statistics-section {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
}

.statistics-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(59,130,246,0.05)"/><circle cx="75" cy="75" r="1" fill="rgba(99,102,241,0.05)"/><circle cx="50" cy="10" r="0.5" fill="rgba(139,92,246,0.08)"/><circle cx="20" cy="80" r="0.5" fill="rgba(59,130,246,0.08)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.6;
}

.stats-title {
  color: #1e293b !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  animation: titleGlow 3s ease-in-out infinite alternate;
}

@keyframes titleGlow {
  from {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }
  to {
    text-shadow: 1px 1px 8px rgba(59, 130, 246, 0.3);
  }
}

.decorative-line {
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  border-radius: 2px;
  animation: lineShine 4s ease-in-out infinite;
}

@keyframes lineShine {
  0%,
  100% {
    opacity: 0.6;
    transform: scaleX(1);
  }
  50% {
    opacity: 1;
    transform: scaleX(1.3);
  }
}

.stat-card-wrapper {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(59, 130, 246, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px !important;
}

.stat-card:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow: 0 12px 25px rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.2);
}

/* 手機版本優化 */
@media (max-width: 960px) {
  .stat-card {
    padding: 1.5rem !important;
  }

  .stat-card:hover {
    transform: translateY(-2px) scale(1.005);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.12);
  }
}

.background-circles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 80px;
  height: 80px;
  top: -20px;
  right: -20px;
  animation-delay: 0s;
}

.circle-2 {
  width: 60px;
  height: 60px;
  bottom: -15px;
  left: -15px;
  animation-delay: 2s;
}

.circle-3 {
  width: 40px;
  height: 40px;
  top: 50%;
  left: -10px;
  animation-delay: 4s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(10px, -10px) rotate(120deg);
  }
  66% {
    transform: translate(-5px, 5px) rotate(240deg);
  }
}

.icon-avatar {
  transition: all 0.3s ease;
}

.stat-card:hover .icon-avatar {
  transform: scale(1.05) rotate(3deg);
}

.stat-icon {
  animation: iconPulse 3s ease-in-out infinite;
}

@keyframes iconPulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* 手機版本圖示調整 */
@media (max-width: 960px) {
  .icon-avatar {
    width: 60px !important;
    height: 60px !important;
  }

  .stat-icon {
    font-size: 28px !important;
  }

  .stat-card:hover .icon-avatar {
    transform: scale(1.02) rotate(1deg);
  }
}

.number-display {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.stat-number {
  animation: countUp 2s ease-out;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.08);
}

.number-suffix {
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.3);
  animation: bounce 3s ease-in-out infinite;
}

/* 手機版本數字調整 */
@media (max-width: 960px) {
  .stat-number {
    font-size: 2rem !important;
  }

  .number-suffix {
    font-size: 1rem;
  }
}

@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.progress-bar {
  width: 80%;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  margin: 0 auto;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  width: 100%;
  border-radius: 2px;
  animation: progressFill 2s ease-out forwards;
  transform: translateX(-100%);
}

@keyframes progressFill {
  to {
    transform: translateX(0);
  }
}

.shine-effect {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: rotate(45deg);
  animation: shine 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes shine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  50% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
  100% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
}

.floating-particles {
  position: relative;
  height: 40px;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #3b82f6;
  border-radius: 50%;
  opacity: 0.4;
  animation: particleFloat 5s ease-in-out infinite;
}

.particle:nth-child(1) {
  left: 15%;
}
.particle:nth-child(2) {
  left: 30%;
}
.particle:nth-child(3) {
  left: 45%;
}
.particle:nth-child(4) {
  left: 60%;
}
.particle:nth-child(5) {
  left: 75%;
}
.particle:nth-child(6) {
  left: 90%;
}

@keyframes particleFloat {
  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-15px) scale(1.1);
    opacity: 0.7;
  }
}

/* 手機版本隱藏粒子效果 */
@media (max-width: 600px) {
  .floating-particles {
    display: none;
  }
}

.features-section .v-card:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}

.featured-assets-section .v-card:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}

.news-section .v-card:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}

.service-flow-section {
  position: relative;
}

.service-flow-section .v-avatar:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}
</style>
