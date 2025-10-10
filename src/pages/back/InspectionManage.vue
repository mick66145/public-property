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
        hasUsagePermit: "有",
        activationStatus: "加強宣導",
        estimatedActivationTimeline: "2025 Q4",
        appliedForDelisting: "否",
        reasonForDelisting: "",
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
        hasUsagePermit: "無",
        activationStatus: "土地綠美化",
        estimatedActivationTimeline: "2025 Q3",
        appliedForDelisting: "是",
        reasonForDelisting: "已無使用需求",
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
        const lowerCaseSearch = String(search.value || '').toLowerCase();
        const lowerCaseAssetNameSearch = String(assetNameSearch.value || '').toLowerCase();

        const matchesSearch = Object.values(inspection).some(v =>
            v != null && String(v).toLowerCase().includes(lowerCaseSearch)
        );

        const inspectionDate = new Date(inspection.date);
        const matchesDate = (!startDate.value || inspectionDate >= new Date(startDate.value)) &&
            (!endDate.value || inspectionDate <= new Date(endDate.value));

        const inspectionUnits = inspection.inspectionUnits ? inspection.inspectionUnits.split('、').map(unit => unit.trim()) : [];
        const matchesUnits = selectedUnits.value.length === 0 ||
            selectedUnits.value.some(unit => inspectionUnits.includes(unit));

        const matchesAssetName = inspection.assetName && String(inspection.assetName).toLowerCase().includes(lowerCaseAssetNameSearch);

        return matchesSearch && matchesDate && matchesUnits && matchesAssetName;
    });
});

// 詳細資訊對話框
const detailDialog = ref(false);
const selectedInspection = ref({});

function showDetail(inspection) {
    // Dummy asset details for demonstration
    const dummyAssetDetails = {
        id: "A001", // Placeholder, will be replaced by actual assetId
        name: "台南市立圖書館新總館", // Placeholder
        location: "台南市永康區康橋大道255號", // Placeholder
        district: "永康區", // Placeholder
        area: 3966.94, // Placeholder
        status: "建築物", // Placeholder
        matchStatus: "已活化", // Placeholder
        usageType: "文化觀光設施", // Placeholder
        owner: "文化局", // Placeholder
        landValue: 850000, // Placeholder
        houseValue: 12500000, // Placeholder
        lng: 120.2532, // Placeholder
        lat: 23.0159, // Placeholder
        zoning: "文教區", // Placeholder
        landSection: "橋北段", // Placeholder
        landLotNumber: "123, 124", // Placeholder
        currentStatus: "已活化利用", // Placeholder
        notes: "與奇美博物館合作，定期舉辦藝文活動。", // Placeholder
        floorArea: "1樓: 1500\n2樓: 1500\n3樓: 500", // Placeholder
    };

    selectedInspection.value = {
        ...inspection,
        assetDetails: { ...dummyAssetDetails, id: inspection.assetId, name: inspection.assetName }, // Update dummy with actual assetId and name
    };
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
    hasUsagePermit: "",
    activationStatus: "",
    estimatedActivationTimeline: "",
    appliedForDelisting: "",
    reasonForDelisting: "",
});

// Dummy available assets for selection
const availableAssets = ref([
    { id: "A001", name: "台南市立圖書館新總館" },
    { id: "A002", name: "台南市美術館二館" },
    { id: "A003", name: "台南市立棒球場" },
    { id: "A004", name: "台南市立安平國中舊校舍" },
    { id: "A005", name: "台南市立新營文化中心" },
]);

const selectedAssetForNewInspection = ref(null); // To hold the selected asset object

function openAddDialog() {
    newInspection.value = {
        date: new Date().toISOString().substr(0, 10),
        title: "",
        assetId: "",
        assetName: "",
        inspectionUnits: "",
        conclusion: "",
        hasUsagePermit: "",
        activationStatus: "",
        estimatedActivationTimeline: "",
        appliedForDelisting: "",
        reasonForDelisting: "",
    };
    selectedAssetForNewInspection.value = null; // Reset selected asset
    addDialog.value = true;
}

function saveInspection() {
    if (selectedAssetForNewInspection.value) {
        newInspection.value.assetId = selectedAssetForNewInspection.value.id;
        newInspection.value.assetName = selectedAssetForNewInspection.value.name;
    }
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
                                  <template v-slot:[`item.assetInfo`]="{ item }">                    <div>
                        <div class="font-weight-medium">{{ item.assetId }}</div>
                        <div class="text-caption text-grey-darken-1">
                            {{ item.assetName }}
                        </div>
                    </div>
                </template>
                                  <template v-slot:[`item.inspectionUnits`]="{ item }">                    <v-chip-group column>
                        <v-chip v-for="unit in item.inspectionUnits.split('、')" :key="unit" size="small" color="primary"
                            variant="outlined">
                            {{ unit }}
                        </v-chip>
                    </v-chip-group>
                </template>
                                  <template v-slot:[`item.actions`]="{ item }">                    <v-btn color="info" size="small" @click.stop="showDetail(item)">
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
                    <!-- New Inspection-specific fields -->
                    <v-col cols="12" sm="6">
                        <div class="text-subtitle-2 mb-1">有無使照</div>
                        <div class="mb-3">{{ selectedInspection.hasUsagePermit }}</div>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <div class="text-subtitle-2 mb-1">活化辦理情況</div>
                        <div class="mb-3">{{ selectedInspection.activationStatus }}</div>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <div class="text-subtitle-2 mb-1">預估活化時程</div>
                        <div class="mb-3">{{ selectedInspection.estimatedActivationTimeline }}</div>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <div class="text-subtitle-2 mb-1">是否申請解除列管</div>
                        <div class="mb-3">{{ selectedInspection.appliedForDelisting }}</div>
                    </v-col>
                    <v-col cols="12">
                        <div class="text-subtitle-2 mb-1">解除列管原因</div>
                        <div class="mb-3">{{ selectedInspection.reasonForDelisting }}</div>
                    </v-col>

                    <!-- Asset-related fields from assetDetails -->
                    <v-col cols="12" class="text-h6 mt-4 mb-2">資產詳細資訊</v-col>
                    <v-col cols="12" sm="6">
                        <div class="text-subtitle-2 mb-1">會勘地點</div>
                        <div class="mb-3">{{ selectedInspection.assetDetails?.location }}</div>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <div class="text-subtitle-2 mb-1">行政區</div>
                        <div class="mb-3">{{ selectedInspection.assetDetails?.district }}</div>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <div class="text-subtitle-2 mb-1">基地座落及權屬</div>
                        <div class="mb-3">
                            <template v-if="selectedInspection.assetDetails?.landSection || selectedInspection.assetDetails?.landLotNumber">
                                {{ selectedInspection.assetDetails?.landSection }}段
                                {{ selectedInspection.assetDetails?.landLotNumber }}地號
                            </template>
                            <template v-if="selectedInspection.assetDetails?.owner">
                                (所有權人: {{ selectedInspection.assetDetails?.owner }})
                            </template>
                        </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <div class="text-subtitle-2 mb-1">使用分區或使用編訂</div>
                        <div class="mb-3">{{ selectedInspection.assetDetails?.zoning }}</div>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <div class="text-subtitle-2 mb-1">土地面積(m²)</div>
                        <div class="mb-3">{{ selectedInspection.assetDetails?.area }}</div>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <div class="text-subtitle-2 mb-1">建物面積(m²)</div>
                        <div class="mb-3">{{ selectedInspection.assetDetails?.floorArea }}</div>
                    </v-col>
                    <v-col cols="12">
                        <div class="text-subtitle-2 mb-1">使用現況</div>
                        <div class="mb-3">{{ selectedInspection.assetDetails?.currentStatus }}</div>
                    </v-col>
                    <v-col cols="12">
                        <div class="text-subtitle-2 mb-1">資產備註</div>
                        <div class="mb-3">{{ selectedInspection.assetDetails?.notes }}</div>
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
                        <v-autocomplete
                            label="選擇相關資產"
                            :items="availableAssets"
                            item-title="name"
                            item-value="id"
                            v-model="selectedAssetForNewInspection"
                            return-object
                            clearable
                            required
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="會勘標題" v-model="newInspection.title" required />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="會勘單位" v-model="newInspection.inspectionUnits" placeholder="例：財稅局、文化局、都發局"
                            required />
                    </v-col>
                    <v-col cols="12">
                        <v-textarea label="會勘結論" v-model="newInspection.conclusion" rows="4" required />
                    </v-col>
                    <!-- New Inspection-specific input fields -->
                    <v-col cols="12" sm="6">
                        <v-select
                            label="有無使照"
                            v-model="newInspection.hasUsagePermit"
                            :items="['有', '無']"
                            required
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            label="活化辦理情況"
                            v-model="newInspection.activationStatus"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            label="預估活化時程"
                            v-model="newInspection.estimatedActivationTimeline"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                            label="是否申請解除列管"
                            v-model="newInspection.appliedForDelisting"
                            :items="['是', '否']"
                            required
                        ></v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                            label="解除列管原因"
                            v-model="newInspection.reasonForDelisting"
                            rows="2"
                        ></v-textarea>
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