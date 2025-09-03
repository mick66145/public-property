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

// 新會勘表單資料
const newInspection = ref({
  date: new Date().toISOString().substr(0, 10),
  title: "",
  inspectionUnits: "",
  conclusion: "",
});

// 歷史會勘記錄
const inspectionHistory = ref([
  {
    id: 1,
    date: "2024-05-01",
    title: "台南市立圖書館新總館初步會勘",
    inspectionUnits: "財稅局、文化局、都發局",
    conclusion:
      "初步會勘結果良好，建議進行詳細規劃。需要進一步了解周邊環境和交通狀況。",
    createdAt: "2024-05-01 09:00",
  },
  {
    id: 2,
    date: "2024-05-10",
    title: "台南市美術館二館屋頂漏水會勘",
    inspectionUnits: "工務局、文化局",
    conclusion:
      "確認屋頂有漏水現象，需進行修繕工程，預計投入預算20萬元。預計於下月底前完成相關作業。",
    createdAt: "2024-05-10 14:00",
  },
]);

function saveInspection() {
  const inspection = {
    id: inspectionHistory.value.length + 1,
    ...newInspection.value,
    createdAt: new Date().toLocaleString("zh-TW"),
  };
  inspectionHistory.value.unshift(inspection);

  // 清空表單
  newInspection.value = {
    date: new Date().toISOString().substr(0, 10),
    title: "",
    inspectionUnits: "",
    conclusion: "",
  };

  alert("會勘記錄已儲存");
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="800" scrollable>
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-account-group</v-icon>
        會勘管理 - {{ props.asset.name }}
      </v-card-title>

      <v-card-text>
        <!-- 新增會勘記錄 -->
        <v-card class="mb-6" elevation="2">
          <v-card-title class="text-h6 bg-primary text-white">
            新增會勘記錄
          </v-card-title>
          <v-card-text class="pt-4">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="會勘日期"
                  v-model="newInspection.date"
                  type="date"
                  required
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="會勘標題"
                  v-model="newInspection.title"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="會勘單位"
                  v-model="newInspection.inspectionUnits"
                  placeholder="例：財稅局、文化局、都發局"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="會勘結論"
                  v-model="newInspection.conclusion"
                  rows="4"
                  required
                />
              </v-col>
            </v-row>
            <v-btn color="primary" @click="saveInspection" class="mt-2">
              儲存會勘記錄
            </v-btn>
          </v-card-text>
        </v-card>

        <!-- 歷史會勘記錄 -->
        <v-card elevation="2">
          <v-card-title class="text-h6 bg-grey-lighten-4">
            歷史會勘記錄
          </v-card-title>
          <v-card-text class="pa-0">
            <v-expansion-panels v-if="inspectionHistory.length > 0">
              <v-expansion-panel
                v-for="inspection in inspectionHistory"
                :key="inspection.id"
              >
                <v-expansion-panel-title>
                  <div class="d-flex align-center justify-space-between w-100">
                    <div>
                      <div class="font-weight-medium">{{ inspection.title }}</div>
                      <div class="text-caption text-grey-darken-1">
                        {{ inspection.date }} | {{ inspection.inspectionUnits }}
                      </div>
                    </div>
                    <v-chip size="small" color="info">
                      {{ inspection.createdAt }}
                    </v-chip>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <div class="text-subtitle-2 mb-1">會勘日期</div>
                      <div class="mb-3">{{ inspection.date }}</div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-subtitle-2 mb-1">會勘單位</div>
                      <div class="mb-3">{{ inspection.inspectionUnits }}</div>
                    </v-col>
                    <v-col cols="12">
                      <div class="text-subtitle-2 mb-1">會勘結論</div>
                      <div class="text-body-2">{{ inspection.conclusion }}</div>
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <div v-else class="pa-4 text-center text-grey-darken-1">
              尚無會勘記錄
            </div>
          </v-card-text>
        </v-card>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="dialog = false">關閉</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
