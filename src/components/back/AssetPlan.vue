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

// 新計畫表單資料
const newPlan = ref({
  currentStatus: "",
  timeline: "",
  title: "",
  content: "",
});

// 歷史計畫記錄
const planHistory = ref([
  {
    id: 1,
    currentStatus: "資產閒置中，建築物結構良好但需要整修",
    timeline: "2024年3月-2024年12月",
    title: "文化展示空間活化計畫",
    content:
      "將該資產改造為地方文化展示空間，包含展覽區、互動體驗區及文創商品販售區。預計投入經費500萬元，分三階段進行：第一階段進行建築物安全檢測及基礎整修，第二階段進行內部空間規劃設計，第三階段進行展示設備安裝及試營運。",
    createdAt: "2024-01-20 09:30",
  },
  {
    id: 2,
    currentStatus: "已完成初步評估，等待預算核定",
    timeline: "2024年6月-2025年6月",
    title: "社區活動中心轉型計畫",
    content:
      "考量周邊社區需求，規劃將部分空間轉為社區活動中心，提供長者關懷、親子活動、社區會議等服務。結合文化展示功能，打造多元化的社區文化空間。預計需要300萬元進行空間改造及設備採購。",
    createdAt: "2024-02-15 16:45",
  },
]);

function savePlan() {
  // wireframe: 儲存新計畫記錄
  const plan = {
    id: planHistory.value.length + 1,
    ...newPlan.value,
    createdAt: new Date().toLocaleString("zh-TW"),
  };
  planHistory.value.unshift(plan);

  // 清空表單
  newPlan.value = {
    currentStatus: "",
    timeline: "",
    title: "",
    content: "",
  };

  alert("計畫記錄已儲存");
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="800" scrollable>
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-clipboard-text</v-icon>
        計畫管理 - {{ props.asset.name }}
      </v-card-title>

      <v-card-text>
        <!-- 新增計畫記錄 -->
        <v-card class="mb-6" elevation="2">
          <v-card-title class="text-h6 bg-success text-white">
            新增計畫記錄
          </v-card-title>
          <v-card-text class="pt-4">
            <v-row>
              <v-col cols="12">
                <v-textarea
                  label="現況描述"
                  v-model="newPlan.currentStatus"
                  rows="3"
                  placeholder="請描述資產目前的使用狀況、建築狀態等"
                  required
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="計畫期程"
                  v-model="newPlan.timeline"
                  placeholder="例：2024年3月-2024年12月"
                  required
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="計畫標題"
                  v-model="newPlan.title"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="計畫內容"
                  v-model="newPlan.content"
                  rows="5"
                  placeholder="請詳細描述計畫內容、執行方式、預期效益等"
                  required
                />
              </v-col>
            </v-row>
            <v-btn color="success" @click="savePlan" class="mt-2">
              儲存計畫記錄
            </v-btn>
          </v-card-text>
        </v-card>

        <!-- 歷史計畫記錄 -->
        <v-card elevation="2">
          <v-card-title class="text-h6 bg-grey-lighten-4">
            歷史計畫記錄
          </v-card-title>
          <v-card-text class="pa-0">
            <v-expansion-panels v-if="planHistory.length > 0">
              <v-expansion-panel v-for="plan in planHistory" :key="plan.id">
                <v-expansion-panel-title>
                  <div class="d-flex align-center justify-space-between w-100">
                    <div>
                      <div class="font-weight-medium">{{ plan.title }}</div>
                      <div class="text-caption text-grey-darken-1">
                        {{ plan.timeline }}
                      </div>
                    </div>
                    <v-chip size="small" color="success">
                      {{ plan.createdAt }}
                    </v-chip>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-row>
                    <v-col cols="12">
                      <div class="text-subtitle-2 mb-1">現況描述</div>
                      <div class="mb-3 text-body-2">
                        {{ plan.currentStatus }}
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-subtitle-2 mb-1">計畫期程</div>
                      <div class="mb-3">{{ plan.timeline }}</div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-subtitle-2 mb-1">建立時間</div>
                      <div class="mb-3">{{ plan.createdAt }}</div>
                    </v-col>
                    <v-col cols="12">
                      <div class="text-subtitle-2 mb-1">計畫內容</div>
                      <div class="text-body-2">{{ plan.content }}</div>
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <div v-else class="pa-4 text-center text-grey-darken-1">
              尚無計畫記錄
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
