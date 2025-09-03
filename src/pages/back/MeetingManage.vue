<script setup>
import { ref, computed } from "vue";

const headers = [
  { title: "會議編號", value: "id" },
  { title: "會議日期", value: "date" },
  { title: "會議標題", value: "title" },
  { title: "相關資產", value: "assetInfo" },
  { title: "與會單位", value: "attendees" },
  { title: "建立時間", value: "createdAt" },
  { title: "動作", value: "actions", sortable: false },
];

const meetings = ref([
  {
    id: "M001",
    date: "2024-01-15",
    title: "資產活化初步評估會議",
    assetId: "A001",
    assetName: "台南市立圖書館新總館",
    attendees: "財稅局、文化局、都發局",
    conclusion:
      "初步評估該資產具有活化潛力，建議進行詳細規劃。需要進一步了解周邊環境和交通狀況。",
    createdAt: "2024-01-15 14:30",
  },
  {
    id: "M002",
    date: "2024-02-20",
    title: "資產使用規劃討論會議",
    assetId: "A001",
    assetName: "台南市立圖書館新總館",
    attendees: "財稅局、文化局、觀光局",
    conclusion:
      "確認將該資產規劃為文化展示空間，預計投入預算500萬元進行整修。預計於年底前完成相關作業。",
    createdAt: "2024-02-20 10:00",
  },
  {
    id: "M003",
    date: "2024-03-10",
    title: "美術館二館活化策略會議",
    assetId: "A002",
    assetName: "台南市美術館二館",
    attendees: "財稅局、文化局、觀光局、教育局",
    conclusion:
      "討論美術館二館的多元化利用方案，包含藝術教育推廣、文創產業育成等功能整合。預計下月提出具體實施計畫。",
    createdAt: "2024-03-10 15:20",
  },
  {
    id: "M004",
    date: "2024-03-25",
    title: "棒球場土地使用協調會議",
    assetId: "A003",
    assetName: "台南市立棒球場",
    attendees: "財稅局、體育局、都發局、民政局",
    conclusion:
      "針對棒球場周邊土地進行整體規劃討論，考量結合運動休閒與商業發展，創造多元收益模式。",
    createdAt: "2024-03-25 09:45",
  },
  {
    id: "M005",
    date: "2024-04-08",
    title: "安平國中舊校舍轉型會議",
    assetId: "A004",
    assetName: "台南市立安平國中舊校舍",
    attendees: "財稅局、教育局、文化局、社會局",
    conclusion:
      "評估將舊校舍轉型為社區多功能中心，結合長照服務、親子活動、文化傳承等功能。需進行建築安全評估。",
    createdAt: "2024-04-08 11:15",
  },
]);

const search = ref("");
const startDate = ref(null); // 會議日期開始
const endDate = ref(null);   // 會議日期結束
const startDateMenu = ref(false);
const endDateMenu = ref(false);
const filterTitle = ref(""); // 此處保留，但實際使用會被 search 涵蓋
const assetNameSearch = ref(""); // 相關資產名稱搜尋
const filterAttendees = ref([]);

const uniqueAttendees = computed(() => {
  const attendeesSet = new Set();
  meetings.value.forEach((meeting) => {
    meeting.attendees.split("、").forEach((attendee) => {
      attendeesSet.add(attendee.trim());
    });
  });
  return Array.from(attendeesSet);
});

const filteredMeetings = computed(() => {
  return meetings.value.filter((meeting) => {
    const lowerCaseSearch = String(search.value || "").toLowerCase();
    const lowerCaseTitle = String(filterTitle.value || "").toLowerCase();
    const lowerCaseAssetName = String(assetNameSearch.value || "").toLowerCase();
    const meetingDate = meeting.date;

    const matchesSearch = Object.values(meeting).some(
      (v) => v != null && String(v).toLowerCase().includes(lowerCaseSearch)
    );

    const matchesDate = startDate.value && endDate.value
      ? meetingDate >= startDate.value && meetingDate <= endDate.value
      : true;

    const matchesTitle = filterTitle.value
      ? String(meeting.title).toLowerCase().includes(lowerCaseTitle)
      : true;

    const matchesAssetName = assetNameSearch.value
      ? String(meeting.assetName).toLowerCase().includes(lowerCaseAssetName)
      : true;

    const matchesAttendees =
      filterAttendees.value.length === 0
        ? true
        : filterAttendees.value.some((selectedAttendee) =>
          meeting.attendees.includes(selectedAttendee)
        );

    return (
      matchesSearch &&
      matchesDate &&
      matchesTitle &&
      matchesAssetName &&
      matchesAttendees
    );
  });
});

// 詳細資訊對話框
const detailDialog = ref(false);
const selectedMeeting = ref({});

function showDetail(meeting) {
  selectedMeeting.value = meeting;
  detailDialog.value = true;
}

// 新增會議對話框
const addDialog = ref(false);
const newMeeting = ref({
  date: new Date().toISOString().substr(0, 10),
  title: "",
  assetId: "",
  assetName: "",
  attendees: "",
  conclusion: "",
});

function openAddDialog() {
  newMeeting.value = {
    date: new Date().toISOString().substr(0, 10),
    title: "",
    assetId: "",
    assetName: "",
    attendees: "",
    conclusion: "",
  };
  addDialog.value = true;
}

function saveMeeting() {
  const meeting = {
    id: `M${String(meetings.value.length + 1).padStart(3, "0")}`,
    ...newMeeting.value,
    createdAt: new Date().toLocaleString("zh-TW"),
  };
  meetings.value.unshift(meeting);
  addDialog.value = false;
  alert("會議記錄已新增");
}
</script>

<template>
  <v-card>
    <v-card-title class="text-h6 d-flex align-center justify-space-between">
      <span>會議管理</span>
      <v-btn color="primary" @click="openAddDialog">新增會議記錄</v-btn>
    </v-card-title>
    <v-card-text>
      <v-row class="mb-5">
        <v-col cols="12" sm="6" md="3">
          <v-text-field v-model="search" label="關鍵字搜尋" prepend-inner-icon="mdi-magnify" single-line variant="outlined"
            hide-details class="mb-5"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <v-menu v-model="startDateMenu" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-text-field v-bind="props" v-model="startDate" label="開始日期" prepend-inner-icon="mdi-calendar"
                variant="outlined" hide-details></v-text-field>
            </template>
            <v-date-picker v-model="startDate" @update:model-value="startDateMenu = false"
              color="primary"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-menu v-model="endDateMenu" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-text-field v-bind="props" v-model="endDate" label="結束日期" prepend-inner-icon="mdi-calendar"
                variant="outlined" hide-details></v-text-field>
            </template>
            <v-date-picker v-model="endDate" @update:model-value="endDateMenu = false" color="primary"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select v-model="filterAttendees" :items="uniqueAttendees" label="與會單位" multiple chips single-line
            variant="outlined" hide-details></v-select>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="filteredMeetings" class="elevation-1"
        @click:row="(event, { item }) => showDetail(item)">
        <template v-slot:[`item.assetInfo`]="{ item }">
          <div>
            <div class="font-weight-medium">{{ item.assetId }}</div>
            <div class="text-caption text-grey-darken-1">
              {{ item.assetName }}
            </div>
          </div>
        </template>
        <template v-slot:[`item.attendees`]="{ item }">
          <v-chip-group column>
            <v-chip v-for="unit in item.attendees.split('、')" :key="unit" size="small" color="primary"
              variant="outlined">
              {{ unit }}
            </v-chip>
          </v-chip-group>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="info" size="small" @click.stop="showDetail(item)">
            查看詳情
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

  <!-- 會議詳情對話框 -->
  <v-dialog v-model="detailDialog" max-width="600">
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-account-group</v-icon>
        會議詳情
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <div class="text-subtitle-2 mb-1">會議編號</div>
            <div class="mb-3">{{ selectedMeeting.id }}</div>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="text-subtitle-2 mb-1">會議日期</div>
            <div class="mb-3">{{ selectedMeeting.date }}</div>
          </v-col>
          <v-col cols="12">
            <div class="text-subtitle-2 mb-1">會議標題</div>
            <div class="mb-3 font-weight-medium">
              {{ selectedMeeting.title }}
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="text-subtitle-2 mb-1">相關資產</div>
            <div class="mb-3">
              <v-chip color="primary" size="small">{{
                selectedMeeting.assetId
              }}</v-chip>
              <div class="text-caption mt-1">
                {{ selectedMeeting.assetName }}
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="text-subtitle-2 mb-1">建立時間</div>
            <div class="mb-3">{{ selectedMeeting.createdAt }}</div>
          </v-col>
          <v-col cols="12">
            <div class="text-subtitle-2 mb-1">與會單位</div>
            <div class="mb-3">
              <v-chip-group>
                <v-chip v-for="unit in selectedMeeting.attendees?.split('、') || []" :key="unit" size="small"
                  color="primary">
                  {{ unit }}
                </v-chip>
              </v-chip-group>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="text-subtitle-2 mb-1">會議結論</div>
            <div class="text-body-2">{{ selectedMeeting.conclusion }}</div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="detailDialog = false">關閉</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- 新增會議對話框 -->
  <v-dialog v-model="addDialog" max-width="600">
    <v-card>
      <v-card-title>新增會議記錄</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="會議日期" v-model="newMeeting.date" type="date" required />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="資產編號" v-model="newMeeting.assetId" placeholder="例：A001" required />
          </v-col>
          <v-col cols="12">
            <v-text-field label="會議標題" v-model="newMeeting.title" required />
          </v-col>
          <v-col cols="12">
            <v-text-field label="相關資產名稱" v-model="newMeeting.assetName" required />
          </v-col>
          <v-col cols="12">
            <v-text-field label="與會單位" v-model="newMeeting.attendees" placeholder="例：財稅局、文化局、都發局" required />
          </v-col>
          <v-col cols="12">
            <v-textarea label="會議結論" v-model="newMeeting.conclusion" rows="4" required />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="addDialog = false">取消</v-btn>
        <v-btn color="primary" @click="saveMeeting">儲存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
