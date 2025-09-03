<script setup>
import { ref } from "vue";
const rail = ref(false);

function toggleDrawer() {
  if (drawer.value) {
    // 從展開變為收合
    rail.value = true;
  } else {
    // 從收合變為展開
    drawer.value = true;
    rail.value = false;
  }
}
</script>

<template>
  <v-app>
    <v-navigation-drawer app :rail="rail" permanent>
      <v-list>
        <v-list-item v-if="!rail" title="後台選單" class="text-h6"></v-list-item>
        <v-list-item v-if="rail" @click="rail = false">
          <v-icon>mdi-menu</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link title="儀表板" to="/dashboard" :active="$route.path === '/dashboard'">
          <template #prepend>
            <v-icon>mdi-view-dashboard</v-icon>
          </template>
        </v-list-item>
        <v-list-item link title="資產管理" to="/dashboard/AssetManage" :active="$route.path === '/dashboard/AssetManage'">
          <template #prepend>
            <v-icon>mdi-office-building</v-icon>
          </template>
        </v-list-item>
        <v-list-item link title="需求管理" to="/dashboard/DemandManage" :active="$route.path === '/dashboard/DemandManage'">
          <template #prepend>
            <v-icon>mdi-handshake</v-icon>
          </template>
        </v-list-item>
        <v-list-item link title="會議管理" to="/dashboard/MeetingManage"
          :active="$route.path === '/dashboard/MeetingManage'">
          <template #prepend>
            <v-icon>mdi-account-group</v-icon>
          </template>
        </v-list-item>
        <v-list-item link title="會勘管理" to="/dashboard/InspectionManage"
          :active="$route.path === '/dashboard/InspectionManage'">
          <template #prepend>
            <v-icon>mdi-map-marker-radius-outline</v-icon>
          </template>
        </v-list-item>
        <v-list-item link title="計畫管理" to="/dashboard/PlanManage" :active="$route.path === '/dashboard/PlanManage'">
          <template #prepend>
            <v-icon>mdi-clipboard-text</v-icon>
          </template>
        </v-list-item>
        <v-list-item link title="登出" to="/dashboard/Login" :active="$route.path === '/dashboard/Login'">
          <template #prepend>
            <v-icon>mdi-logout</v-icon>
          </template>
        </v-list-item>
      </v-list>
      <template #append v-if="!rail">
        <v-divider></v-divider>
        <v-btn block variant="text" @click="rail = true">
          <v-icon class="mr-1">mdi-chevron-left</v-icon>
          收合選單
        </v-btn>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
