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

// 需求表單資料
const demandUnit = ref("台南市政府觀光旅遊局");
const demandPurpose = ref("規劃為觀光景點使用");
</script>

<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title>資產需求申請</v-card-title>
      <v-card-text>
        <v-row>
          <!-- 資產資訊（唯讀） -->
          <v-col cols="12">
            <div class="text-h6 mb-3">資產資訊</div>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="資產編號"
              :model-value="props.asset?.id"
              readonly
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="資產名稱"
              :model-value="props.asset?.name"
              readonly
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="地點"
              :model-value="props.asset?.location"
              readonly
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="行政區"
              :model-value="props.asset?.district"
              readonly
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="面積(坪)"
              :model-value="props.asset?.area"
              readonly
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="現況"
              :model-value="props.asset?.status"
              readonly
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="管理單位"
              :model-value="props.asset?.owner"
              readonly
            />
          </v-col>

          <!-- 需求資訊（可編輯） -->
          <v-col cols="12">
            <v-divider class="my-4"></v-divider>
            <div class="text-h6 mb-3">需求資訊</div>
          </v-col>
          <v-col cols="12">
            <v-text-field label="需求單位" v-model="demandUnit" />
          </v-col>
          <v-col cols="12">
            <v-textarea label="需求用途" v-model="demandPurpose" rows="3" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="dialog = false">取消</v-btn>
        <v-btn color="primary" @click="dialog = false">提交需求</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
