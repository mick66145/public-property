<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  modelValue: Boolean,
  asset: Object,
});
const emit = defineEmits(["update:modelValue"]);
const dialog = ref(props.modelValue);
watch(
  () => props.modelValue,
  (v) => (dialog.value = v)
);
watch(dialog, (v) => emit("update:modelValue", v));

// wireframe: 照片預覽與上傳
const photos = ref([
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
]);
function onUpload() {
  // wireframe: 不實作實際上傳
  alert("這裡會上傳照片（wireframe）");
}

// 狀態選項
const statusOptions = ["待整理", "待媒合", "媒合中", "已媒合", "已活化"];
// 物件類別選項
const typeOptions = ["建築物", "土地"];
// 使用類型選項
const usageTypeOptions = ["交通", "社福", "教育", "行政"];
</script>

<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title>編輯資產</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="資產編號" v-model="props.asset.id" disabled />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="資產名稱" v-model="props.asset.name" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="地點" v-model="props.asset.location" />
          </v-col>
          <v-col cols="6">
            <v-text-field label="行政區" v-model="props.asset.district" />
          </v-col>
          <v-col cols="6">
            <v-text-field label="面積(坪)" v-model="props.asset.area" type="number" />
          </v-col>
          <v-col cols="6">
            <v-select label="物件類別" v-model="props.asset.status" :items="typeOptions" />
          </v-col>
          <v-col cols="6">
            <v-select label="狀態" v-model="props.asset.matchStatus" :items="statusOptions" />
          </v-col>
          <v-col cols="6">
            <v-select label="使用類型" v-model="props.asset.usageType" :items="usageTypeOptions" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="管理單位" v-model="props.asset.owner" />
          </v-col>
          <v-col cols="6">
            <v-text-field label="土地公告現值" v-model="props.asset.landValue" type="number" suffix="元" />
          </v-col>
          <v-col cols="6">
            <v-text-field label="房屋課稅現值" v-model="props.asset.houseValue" type="number" suffix="元" />
          </v-col>
          <v-col cols="6">
            <v-text-field label="經度" v-model="props.asset.lng" type="number" />
          </v-col>
          <v-col cols="6">
            <v-text-field label="緯度" v-model="props.asset.lat" type="number" />
          </v-col>
          <v-col cols="12">
            <div class="mb-2 text-subtitle-2">資產照片（可多張）</div>
            <v-row>
              <v-col v-for="(photo, i) in photos" :key="i" cols="6">
                <v-img :src="photo" aspect-ratio="1" class="mb-2" />
              </v-col>
            </v-row>
            <v-btn color="primary" variant="outlined" block @click="onUpload">上傳照片</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="dialog = false">取消</v-btn>
        <v-btn color="primary" @click="dialog = false">儲存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
