<script setup>
import { ref, computed } from "vue";

const headers = [
    { title: "會勘編號", value: "id" },
    { title: "會勘日期", value: "date" },
    { title: "會勘標題", value: "title" },
    { title: "相關資產", value: "assetInfo" },
    { title: "會勘單位", value: "inspectionUnits" },
    { title: "建立時間", value: "createdAt" },
    { title: "動作", value: "actions", sortable: false },
];

const inspections = ref([
    {
        id: "I001",
        date: "2024-05-01",
        title: "台南市立圖書館新總館初步會勘",
        assetId: "A001",
        assetName: "台南市立圖書館新總館",
        inspectionUnits: "財稅局、文化局、都發局",
        conclusion:
            "初步會勘結果良好，建議進行詳細規劃。需要進一步了解周邊環境和交通狀況。",
        createdAt: "2024-05-01 09:00",
    },
    {
        id: "I002",
        date: "2024-05-10",
        title: "台南市美術館二館屋頂漏水會勘",
        assetId: "A002",
        assetName: "台南市美術館二館",
        inspectionUnits: "工務局、文化局",
        conclusion:
            "確認屋頂有漏水現象，需進行修繕工程，預計投入預算20萬元。預計於下月底前完成相關作業。",
        createdAt: "2024-05-10 14:00",
    },
]);

const search = ref(""); // 新增篩選功能

const startDate = ref(null); // 會勘日期開始
const endDate = ref(null);   // 會勘日期結束
const startDateMenu = ref(false);
const endDateMenu = ref(false);
const selectedUnits = ref([]); // 選中的會勘單位
const assetNameSearch = ref(""); // 相關資產名稱搜尋

// 從現有數據中提取唯一的會勘單位
const allInspectionUnits = computed(() => {
    const units = new Set();
    inspections.value.forEach(inspection => {
        inspection.inspectionUnits.split('、').forEach(unit => {
            if (unit.trim() !== "") {
                units.add(unit.trim());
            }
        });
    });
    return Array.from(units);
});

// 過濾後的會勘記錄
const filteredInspections = computed(() => {
    return inspections.value.filter(inspection => {
        const matchesSearch = Object.values(inspection).some(v =>
            v != null && String(v).toLowerCase().includes(String(search.value || '').toLowerCase())
        );

        const matchesDate = (!startDate.value || new Date(inspection.date) >= new Date(startDate.value)) &&
            (!endDate.value || new Date(inspection.date) <= new Date(endDate.value));

        const matchesUnits = selectedUnits.value.length === 0 ||
            selectedUnits.value.some(unit => inspection.inspectionUnits.includes(unit));

        const matchesAssetName = inspection.assetName.toLowerCase().includes(assetNameSearch.value.toLowerCase());

        return matchesSearch && matchesDate && matchesUnits && matchesAssetName;
    });
});

// 詳細資訊對話框
const detailDialog = ref(false);
const selectedInspection = ref({});

function showDetail(inspection) {
    selectedInspection.value = inspection;
    detailDialog.value = true;
}

// 新增會勘對話框
const addDialog = ref(false);
const newInspection = ref({
    date: new Date().toISOString().substr(0, 10),
    title: "",
    assetId: "",
    assetName: "",
    inspectionUnits: "",
    conclusion: "",
});

function openAddDialog() {
    newInspection.value = {
        date: new Date().toISOString().substr(0, 10),
        title: "",
        assetId: "",
        assetName: "",
        inspectionUnits: "",
        conclusion: "",
    };
    addDialog.value = true;
}

function saveInspection() {
    const inspection = {
        id: `I${String(inspections.value.length + 1).padStart(3, "0")}`,
        ...newInspection.value,
        createdAt: new Date().toLocaleString("zh-TW"),
    };
    inspections.value.unshift(inspection);
    addDialog.value = false;
    alert("會勘記錄已新增");
}
</script>

<template>
    <v-card>
        <v-card-title class="text-h6 d-flex align-center justify-space-between">
            <span>會勘管理</span>
            <v-btn color="primary" @click="openAddDialog">新增會勘記錄</v-btn>
        </v-card-title>
        <v-card-text>
            <v-row class="mb-5">
                <v-col cols="12" sm="6" md="3">
                    <v-text-field v-model="search" label="關鍵字搜尋" prepend-inner-icon="mdi-magnify" single-line
                        variant="outlined" hide-details class="mb-5"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                    <v-menu v-model="startDateMenu" :close-on-content-click="false">
                        <template v-slot:activator="{ props }">
                            <v-text-field v-bind="props" v-model="startDate" label="開始日期"
                                prepend-inner-icon="mdi-calendar" variant="outlined" hide-details></v-text-field>
                        </template>
                        <v-date-picker v-model="startDate" @update:model-value="startDateMenu = false"
                            color="primary"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <v-menu v-model="endDateMenu" :close-on-content-click="false">
                        <template v-slot:activator="{ props }">
                            <v-text-field v-bind="props" v-model="endDate" label="結束日期"
                                prepend-inner-icon="mdi-calendar" variant="outlined" hide-details></v-text-field>
                        </template>
                        <v-date-picker v-model="endDate" @update:model-value="endDateMenu = false"
                            color="primary"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <v-select v-model="selectedUnits" :items="allInspectionUnits" label="會勘單位" multiple chips
                        variant="outlined" hide-details></v-select>
                </v-col>
            </v-row>
            <v-data-table :headers="headers" :items="filteredInspections" class="elevation-1"
                @click:row="(event, { item }) => showDetail(item)">
                <template v-slot:[`item.assetInfo`]="{ item }">
                    <div>
                        <div class="font-weight-medium">{{ item.assetId }}</div>
                        <div class="text-caption text-grey-darken-1">
                            {{ item.assetName }}
                        </div>
                    </div>
                </template>
                <template v-slot:[`item.inspectionUnits`]="{ item }">
                    <v-chip-group column>
                        <v-chip v-for="unit in item.inspectionUnits.split('、')" :key="unit" size="small" color="primary"
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

    <!-- 會勘詳情對話框 -->
    <v-dialog v-model="detailDialog" max-width="600">
        <v-card>
            <v-card-title class="d-flex align-center">
                <v-icon class="mr-2">mdi-account-group</v-icon>
                會勘詳情
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6">
                        <div class="text-subtitle-2 mb-1">會勘編號</div>
                        <div class="mb-3">{{ selectedInspection.id }}</div>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <div class="text-subtitle-2 mb-1">會勘日期</div>
                        <div class="mb-3">{{ selectedInspection.date }}</div>
                    </v-col>
                    <v-col cols="12">
                        <div class="text-subtitle-2 mb-1">會勘標題</div>
                        <div class="mb-3 font-weight-medium">
                            {{ selectedInspection.title }}
                        </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <div class="text-subtitle-2 mb-1">相關資產</div>
                        <div class="mb-3">
                            <v-chip color="primary" size="small">{{
                                selectedInspection.assetId
                            }}</v-chip>
                            <div class="text-caption mt-1">
                                {{ selectedInspection.assetName }}
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <div class="text-subtitle-2 mb-1">建立時間</div>
                        <div class="mb-3">{{ selectedInspection.createdAt }}</div>
                    </v-col>
                    <v-col cols="12">
                        <div class="text-subtitle-2 mb-1">會勘單位</div>
                        <div class="mb-3">
                            <v-chip-group>
                                <v-chip v-for="unit in selectedInspection.inspectionUnits?.split('、') || []" :key="unit"
                                    size="small" color="primary">
                                    {{ unit }}
                                </v-chip>
                            </v-chip-group>
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <div class="text-subtitle-2 mb-1">會勘結論</div>
                        <div class="text-body-2">{{ selectedInspection.conclusion }}</div>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn @click="detailDialog = false">關閉</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- 新增會勘對話框 -->
    <v-dialog v-model="addDialog" max-width="600">
        <v-card>
            <v-card-title>新增會勘記錄</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field label="會勘日期" v-model="newInspection.date" type="date" required />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field label="資產編號" v-model="newInspection.assetId" placeholder="例：A001" required />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="會勘標題" v-model="newInspection.title" required />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="相關資產名稱" v-model="newInspection.assetName" required />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="會勘單位" v-model="newInspection.inspectionUnits" placeholder="例：財稅局、文化局、都發局"
                            required />
                    </v-col>
                    <v-col cols="12">
                        <v-textarea label="會勘結論" v-model="newInspection.conclusion" rows="4" required />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn @click="addDialog = false">取消</v-btn>
                <v-btn color="primary" @click="saveInspection">儲存</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
