<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: Boolean,
  asset: Object,
});
const emit = defineEmits(["update:modelValue", "save"]);

const dialog = ref(props.modelValue);
const localAsset = ref({});

watch(
  () => props.modelValue,
  (v) => {
    dialog.value = v;
    if (v) {
      // 當 dialog 打開時，深度複製一份 asset prop 到 localAsset
      localAsset.value = JSON.parse(JSON.stringify(props.asset));
    }
  }
);

watch(dialog, (v) => {
  if (!v) {
    emit("update:modelValue", v);
  }
});

function onSave() {
  emit("save", localAsset.value);
  dialog.value = false;
}

function onCancel() {
  dialog.value = false;
}

// wireframe: 照片預覽與上傳
const photos = ref([
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
]);
function onUpload() {
  // wireframe: 不實作實際上傳
  alert("這裡會上傳照片（wireframe）");
}

// 選項
const statusOptions = ["待整理", "待媒合", "媒合中", "已媒合", "已活化"];
const typeOptions = ["建築物", "土地"];
const usageTypeOptions = ["社福設施", "交通設施", "辦公廳舍", "文化觀光設施", "典藏及其他空間"];
const currentStatusOptions = ["空置", "低度利用", "部分空置", "有占用情形", "其他"];
const zoningOptions = ["市場用地", "一般農業區(特定目的事業用地)", "特定農業區(特定目的事業用地)", "鄉村區", "住宅區", "商業區"];

</script>

<template>
  <v-dialog v-model="dialog" max-width="800">
    <v-card>
      <v-card-title>編輯資產</v-card-title>
      <v-card-text>
        <v-row>
          <!-- 基本資訊 -->
          <v-col cols="12" sm="4">
            <v-text-field label="資產編號" v-model="localAsset.id" disabled />
          </v-col>
          <v-col cols="12" sm="8">
            <v-text-field label="資產名稱" v-model="localAsset.name" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="地點" v-model="localAsset.location" />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field label="行政區" v-model="localAsset.district" />
          </v-col>
          <v-col cols="12" sm="4">
            <v-select label="物件類別" v-model="localAsset.status" :items="typeOptions" />
          </v-col>
          <v-col cols="12" sm="4">
            <v-select label="狀態" v-model="localAsset.matchStatus" :items="statusOptions" />
          </v-col>

          <!-- 地籍資訊 -->
          <v-col cols="12" sm="4">
            <v-select label="使用分區" v-model="localAsset.zoning" :items="zoningOptions" />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field label="地段" v-model="localAsset.landSection" />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field label="地號" v-model="localAsset.landLotNumber" />
          </v-col>

          <!-- 面積資訊 -->
          <v-col cols="12" sm="6">
            <v-text-field label="土地面積(m²)" v-model="localAsset.area" type="number" />
          </v-col>
          <v-col v-if="localAsset.status === '建築物'" cols="12" sm="6">
            <v-textarea label="樓地板面積(m²)" v-model="localAsset.floorArea" rows="3" placeholder="例如：&#10;1樓: 1500&#10;2樓: 1500" />
          </v-col>

          <!-- 使用與管理 -->
          <v-col cols="12" sm="6">
            <v-select label="使用類型" v-model="localAsset.usageType" :items="usageTypeOptions" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="管理單位" v-model="localAsset.owner" />
          </v-col>
          <v-col cols="12">
            <v-select label="現況" v-model="localAsset.currentStatus" :items="currentStatusOptions" />
          </v-col>

          <!-- 價值資訊 -->
          <v-col cols="12" sm="6">
            <v-text-field label="土地公告現值" v-model="localAsset.landValue" type="number" suffix="元" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="房屋課稅現值" v-model="localAsset.houseValue" type="number" suffix="元" />
          </v-col>

          <!-- 座標資訊 -->
          <v-col cols="12" sm="6">
            <v-text-field label="經度" v-model="localAsset.lng" type="number" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="緯度" v-model="localAsset.lat" type="number" />
          </v-col>

          <!-- 備註 -->
          <v-col cols="12">
            <v-textarea label="備註" v-model="localAsset.notes" rows="3" />
          </v-col>

          <!-- 照片 -->
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
        <v-btn @click="onCancel">取消</v-btn>
        <v-btn color="primary" @click="onSave">儲存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
