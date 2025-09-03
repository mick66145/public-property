<script setup>
import { ref } from "vue";

const drawer = ref(false);

const navItems = [
  {
    title: "公開資產列表",
    path: "/PublicAssetList",
    icon: "mdi-office-building",
  },
  {
    title: "需求申請",
    path: "/PublicDemandForm",
    icon: "mdi-file-document-edit",
  },
];
</script>

<template>
  <v-app>
    <!-- Top App Bar -->
    <v-app-bar app color="primary" dark elevation="4">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="d-md-none"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="d-flex align-center">
        <div>
          <div class="text-h6 font-weight-bold">台南市公有資產活化平台</div>
        </div>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Desktop Navigation -->
      <template v-for="item in navItems" :key="item.path">
        <v-btn :to="item.path" variant="text" class="d-none d-md-flex mx-1">
          <v-icon class="mr-2" size="20">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </template>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item class="py-4">
          <v-list-item-title class="text-h6 font-weight-bold text-primary">
            台南市公有資產活化平台
          </v-list-item-title>
          <v-list-item-subtitle class="text-caption">
            Tainan Public Asset Platform
          </v-list-item-subtitle>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          @click="drawer = false"
        >
          <template #prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-0">
        <router-view />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app color="grey-darken-2" class="text-white">
      <v-container>
        <v-row>
          <!-- 平台資訊 -->
          <v-col cols="12" md="4" class="mb-4">
            <div class="d-flex align-center mb-3">
              <v-icon class="mr-3" size="28">mdi-city-variant</v-icon>
              <div>
                <div class="text-h6 font-weight-bold">
                  台南市公有資產活化平台
                </div>
                <div class="text-caption opacity-75">
                  Tainan Public Asset Revitalization Platform
                </div>
              </div>
            </div>
            <p class="text-body-2 opacity-90">
              推動台南市公有資產活化利用，促進城市發展與社區共榮，歡迎各界申請使用。
            </p>
          </v-col>

          <!-- 快速連結 -->
          <v-col cols="12" md="4" class="mb-4">
            <h3 class="text-h6 font-weight-bold mb-3">快速連結</h3>
            <div class="d-flex flex-column ga-3">
              <router-link
                v-for="item in navItems"
                :key="item.path"
                :to="item.path"
                class="text-body-2 text-decoration-none text-white footer-link"
                style="opacity: 0.8; transition: opacity 0.2s"
              >
                {{ item.title }}
              </router-link>
            </div>
          </v-col>

          <!-- 聯絡資訊 -->
          <v-col cols="12" md="4" class="mb-4">
            <h3 class="text-h6 font-weight-bold mb-3">聯絡資訊</h3>
            <div class="d-flex align-center mb-3">
              <v-icon class="mr-3" size="20">mdi-domain</v-icon>
              <div>
                <div class="text-body-2 font-weight-medium">
                  台南市政府財稅局
                </div>
                <div class="text-caption opacity-75">
                  Tainan City Tax Bureau
                </div>
              </div>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon class="mr-3" size="18">mdi-map-marker</v-icon>
              <span class="text-body-2">台南市安平區永華路二段6號</span>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon class="mr-3" size="18">mdi-phone</v-icon>
              <span class="text-body-2">06-2991111</span>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon class="mr-3" size="18">mdi-email</v-icon>
              <span class="text-body-2">tax@tainan.gov.tw</span>
            </div>
            <div class="d-flex align-center">
              <v-icon class="mr-3" size="18">mdi-clock-outline</v-icon>
              <span class="text-body-2">週一至週五 08:00-17:30</span>
            </div>
          </v-col>
        </v-row>

        <v-divider class="my-4 opacity-50"></v-divider>

        <!-- 版權聲明 -->
        <v-row>
          <v-col cols="12" class="text-center">
            <div class="d-flex justify-center align-center flex-wrap">
              <span class="text-body-2 opacity-75 mr-4">
                © 2024 台南市政府財稅局
              </span>
              <span class="text-body-2 opacity-75 mr-4">
                公有資產活化管理平台
              </span>
              <span class="text-body-2 opacity-75"> 版權所有，翻印必究 </span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style scoped>
/* 確保導航按鈕在小螢幕時隱藏 */
@media (max-width: 959px) {
  .d-md-flex {
    display: none !important;
  }
}

/* 確保導航按鈕在大螢幕時顯示 */
@media (min-width: 960px) {
  .d-md-none {
    display: none !important;
  }
}

/* Footer 連結樣式 */
.footer-link:hover {
  opacity: 1 !important;
}
</style>
