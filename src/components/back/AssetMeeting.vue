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

// 新會議表單資料
const newMeeting = ref({
  date: new Date().toISOString().substr(0, 10),
  title: "",
  attendees: "",
  conclusion: "",
});

// 歷史會議記錄
const meetingHistory = ref([
  {
    id: 1,
    date: "2024-01-15",
    title: "資產活化初步評估會議",
    attendees: "財稅局、文化局、都發局",
    conclusion:
      "初步評估該資產具有活化潛力，建議進行詳細規劃。需要進一步了解周邊環境和交通狀況。",
    createdAt: "2024-01-15 14:30",
  },
  {
    id: 2,
    date: "2024-02-20",
    title: "資產使用規劃討論會議",
    attendees: "財稅局、文化局、觀光局",
    conclusion:
      "確認將該資產規劃為文化展示空間，預計投入預算500萬元進行整修。預計於年底前完成相關作業。",
    createdAt: "2024-02-20 10:00",
  },
]);

function saveMeeting() {
  // wireframe: 儲存新會議記錄
  const meeting = {
    id: meetingHistory.value.length + 1,
    ...newMeeting.value,
    createdAt: new Date().toLocaleString("zh-TW"),
  };
  meetingHistory.value.unshift(meeting);

  // 清空表單
  newMeeting.value = {
    date: new Date().toISOString().substr(0, 10),
    title: "",
    attendees: "",
    conclusion: "",
  };

  alert("會議記錄已儲存");
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="800" scrollable>
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-account-group</v-icon>
        會議管理 - {{ props.asset.name }}
      </v-card-title>

      <v-card-text>
        <!-- 新增會議記錄 -->
        <v-card class="mb-6" elevation="2">
          <v-card-title class="text-h6 bg-primary text-white">
            新增會議記錄
          </v-card-title>
          <v-card-text class="pt-4">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="會議日期"
                  v-model="newMeeting.date"
                  type="date"
                  required
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="會議標題"
                  v-model="newMeeting.title"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="與會單位"
                  v-model="newMeeting.attendees"
                  placeholder="例：財稅局、文化局、都發局"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="會議結論"
                  v-model="newMeeting.conclusion"
                  rows="4"
                  required
                />
              </v-col>
            </v-row>
            <v-btn color="primary" @click="saveMeeting" class="mt-2">
              儲存會議記錄
            </v-btn>
          </v-card-text>
        </v-card>

        <!-- 歷史會議記錄 -->
        <v-card elevation="2">
          <v-card-title class="text-h6 bg-grey-lighten-4">
            歷史會議記錄
          </v-card-title>
          <v-card-text class="pa-0">
            <v-expansion-panels v-if="meetingHistory.length > 0">
              <v-expansion-panel
                v-for="meeting in meetingHistory"
                :key="meeting.id"
              >
                <v-expansion-panel-title>
                  <div class="d-flex align-center justify-space-between w-100">
                    <div>
                      <div class="font-weight-medium">{{ meeting.title }}</div>
                      <div class="text-caption text-grey-darken-1">
                        {{ meeting.date }} | {{ meeting.attendees }}
                      </div>
                    </div>
                    <v-chip size="small" color="info">
                      {{ meeting.createdAt }}
                    </v-chip>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <div class="text-subtitle-2 mb-1">會議日期</div>
                      <div class="mb-3">{{ meeting.date }}</div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-subtitle-2 mb-1">與會單位</div>
                      <div class="mb-3">{{ meeting.attendees }}</div>
                    </v-col>
                    <v-col cols="12">
                      <div class="text-subtitle-2 mb-1">會議結論</div>
                      <div class="text-body-2">{{ meeting.conclusion }}</div>
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <div v-else class="pa-4 text-center text-grey-darken-1">
              尚無會議記錄
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
