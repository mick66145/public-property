<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

function loginAsTax() {
  router.push("/dsahboard");
}
function loginAsOther() {
  router.push("/dsahboard/AssetManage");
}
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-6" elevation="4">
          <v-card-title class="text-h5 text-center mb-1">後台登入</v-card-title>
          <v-card-subtitle class="text-subtitle-1 text-center mb-1">
            或使用台南市政府 Single Sign On 登入
          </v-card-subtitle>
          <v-card-text>
            <v-text-field
              label="帳號"
              variant="outlined"
              density="comfortable"
              model-value="sample_user"
              disabled
            ></v-text-field>
            <v-text-field
              label="密碼"
              type="password"
              variant="outlined"
              density="comfortable"
              model-value="sample_password"
              disabled
            ></v-text-field>
            <v-btn color="primary" block class="mt-4" @click="loginAsTax"
              >財稅局登入</v-btn
            >
            <v-btn color="secondary" block class="mt-2" @click="loginAsOther"
              >其他局處登入</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
