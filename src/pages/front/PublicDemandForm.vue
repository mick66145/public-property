<template>
  <div>
    <!-- 頁面頂部區塊 -->
    <section class="page-header bg-grey-lighten-4 py-4">
      <v-container>
        <v-row>
          <v-col cols="12">
            <!-- 麵包屑導航 -->
            <v-breadcrumbs :items="breadcrumbs" class="pa-0 mb-2">
              <template #prepend>
                <v-icon size="small">mdi-home</v-icon>
              </template>
              <template #divider>
                <v-icon size="small">mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>

            <h1 class="text-h4 font-weight-bold text-primary mb-2">
              公有資產使用需求申請
            </h1>
            <p class="text-body-1 text-grey-darken-1">
              請詳細填寫以下資訊，我們將儘速處理您的申請
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 主要表單區域 -->
    <section class="form-section py-8">
      <v-container>
        <v-row>
          <!-- 表單區域 -->
          <v-col cols="12" lg="8">
            <v-form v-model="valid" @submit.prevent="submitForm">
              <!-- 1. 申請人基本資料 -->
              <v-card class="mb-6" elevation="4">
                <v-card-title class="bg-primary text-white">
                  <v-icon class="mr-2">mdi-account</v-icon>
                  申請人基本資料
                </v-card-title>
                <v-card-text class="pa-6">
                  <!-- 申請類型選擇 -->
                  <v-radio-group
                    v-model="formData.applicantType"
                    inline
                    class="mb-4"
                  >
                    <v-radio
                      label="個人申請"
                      value="individual"
                      color="primary"
                    ></v-radio>
                    <v-radio
                      label="機關申請"
                      value="organization"
                      color="primary"
                    ></v-radio>
                  </v-radio-group>

                  <!-- 個人申請資料 -->
                  <div v-if="formData.applicantType === 'individual'">
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.individual.name"
                          label="姓名"
                          :rules="[rules.required]"
                          variant="outlined"
                          density="compact"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.individual.idNumber"
                          label="身分證字號"
                          :rules="[rules.required, rules.idNumber]"
                          variant="outlined"
                          density="compact"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.individual.phone"
                          label="聯絡電話"
                          :rules="[rules.required, rules.phone]"
                          variant="outlined"
                          density="compact"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.individual.email"
                          label="電子信箱"
                          :rules="[rules.required, rules.email]"
                          variant="outlined"
                          density="compact"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="formData.individual.address"
                          label="通訊地址"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>

                  <!-- 機關申請資料 -->
                  <div v-else>
                    <v-row>
                      <v-col cols="12" md="8">
                        <v-text-field
                          v-model="formData.organization.name"
                          label="機關名稱"
                          :rules="[rules.required]"
                          variant="outlined"
                          density="compact"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="formData.organization.taxId"
                          label="統一編號"
                          :rules="[rules.required, rules.taxId]"
                          variant="outlined"
                          density="compact"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.organization.contactPerson"
                          label="聯絡人姓名"
                          :rules="[rules.required]"
                          variant="outlined"
                          density="compact"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.organization.contactTitle"
                          label="聯絡人職稱"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.organization.phone"
                          label="聯絡電話"
                          :rules="[rules.required, rules.phone]"
                          variant="outlined"
                          density="compact"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.organization.email"
                          label="電子信箱"
                          :rules="[rules.required, rules.email]"
                          variant="outlined"
                          density="compact"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="formData.organization.address"
                          label="機關地址"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-card>

              <!-- 2. 申請資產與需求說明 -->
              <v-card class="mb-6" elevation="4">
                <v-card-title class="bg-info text-white">
                  <v-icon class="mr-2">mdi-office-building</v-icon>
                  申請資產與需求說明
                </v-card-title>
                <v-card-text class="pa-6">
                  <!-- 資產選擇 -->
                  <v-row>
                    <v-col cols="12">
                      <v-select
                        v-model="formData.selectedAsset"
                        :items="availableAssets"
                        item-title="name"
                        item-value="id"
                        label="選擇申請資產"
                        :rules="[rules.required]"
                        variant="outlined"
                        density="compact"
                        @update:modelValue="onAssetChange"
                        required
                      >
                        <template #item="{ props, item }">
                          <v-list-item v-bind="props">
                            <v-list-item-title>{{
                              item.raw.name
                            }}</v-list-item-title>
                            <v-list-item-subtitle>{{
                              item.raw.location
                            }}</v-list-item-subtitle>
                          </v-list-item>
                        </template>
                      </v-select>
                    </v-col>
                  </v-row>

                  <!-- 選中資產資訊顯示 -->
                  <v-alert
                    v-if="formData.assetInfo"
                    type="info"
                    variant="tonal"
                    class="mt-4"
                  >
                    <div class="d-flex align-center">
                      <v-icon class="mr-3">mdi-information</v-icon>
                      <div>
                        <div class="font-weight-bold">
                          {{ formData.assetInfo.name }}
                        </div>
                        <div class="text-body-2">
                          {{ formData.assetInfo.location }}
                        </div>
                        <v-chip
                          size="small"
                          :color="
                            formData.assetInfo.status === '已活化'
                              ? 'success'
                              : 'warning'
                          "
                          class="mt-1"
                        >
                          {{ formData.assetInfo.status }}
                        </v-chip>
                      </div>
                    </div>
                  </v-alert>

                  <!-- 需求說明 -->
                  <v-row class="mt-4">
                    <v-col cols="12">
                      <v-select
                        v-model="formData.purpose"
                        :items="purposeOptions"
                        item-title="title"
                        item-value="value"
                        label="使用目的"
                        :rules="[rules.required]"
                        variant="outlined"
                        density="compact"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="formData.description"
                        label="詳細說明"
                        :rules="[rules.required]"
                        variant="outlined"
                        rows="4"
                        placeholder="請詳細說明您的使用需求、活動內容、預期效益等..."
                        required
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="formData.specialRequirements"
                        label="特殊需求"
                        variant="outlined"
                        rows="3"
                        placeholder="如需特殊設備、服務或其他協助，請在此說明..."
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <!-- 3. 相關文件上傳 -->
              <v-card class="mb-6" elevation="4">
                <v-card-title class="bg-warning text-white">
                  <v-icon class="mr-2">mdi-cloud-upload</v-icon>
                  相關文件上傳
                </v-card-title>
                <v-card-text class="pa-6">
                  <div class="mb-4">
                    <h4 class="text-h6 mb-3">必要文件：</h4>
                    <v-list density="compact">
                      <v-list-item>
                        <template #prepend>
                          <v-icon color="error">mdi-file-document</v-icon>
                        </template>
                        <v-list-item-title>申請計畫書</v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <template #prepend>
                          <v-icon color="error"
                            >mdi-card-account-details</v-icon
                          >
                        </template>
                        <v-list-item-title>身分證明文件</v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        v-if="formData.applicantType === 'organization'"
                      >
                        <template #prepend>
                          <v-icon color="error">mdi-domain</v-icon>
                        </template>
                        <v-list-item-title>機關證明文件</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </div>

                  <v-file-input
                    label="選擇檔案"
                    variant="outlined"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    @update:modelValue="handleFileUpload"
                    show-size
                  ></v-file-input>

                  <!-- 已上傳檔案清單 -->
                  <div v-if="uploadedFiles.length > 0" class="mt-4">
                    <h4 class="text-h6 mb-3">已上傳檔案：</h4>
                    <v-list>
                      <v-list-item
                        v-for="(file, index) in uploadedFiles"
                        :key="index"
                      >
                        <template #prepend>
                          <v-icon>mdi-file</v-icon>
                        </template>
                        <v-list-item-title>{{ file.name }}</v-list-item-title>
                        <v-list-item-subtitle
                          >{{
                            Math.round(file.size / 1024)
                          }}
                          KB</v-list-item-subtitle
                        >
                        <template #append>
                          <v-btn
                            @click="removeFile(index)"
                            icon="mdi-delete"
                            size="small"
                            color="error"
                            variant="text"
                          ></v-btn>
                        </template>
                      </v-list-item>
                    </v-list>
                  </div>
                </v-card-text>
              </v-card>

              <!-- 4. 確認與送出 -->
              <v-card elevation="4">
                <v-card-title class="bg-grey-darken-2 text-white">
                  <v-icon class="mr-2">mdi-check-circle</v-icon>
                  確認與送出
                </v-card-title>
                <v-card-text class="pa-6">
                  <v-checkbox
                    v-model="formData.agreeTerms"
                    color="primary"
                    :rules="[(v) => !!v || '請同意相關條款']"
                    required
                  >
                    <template #label>
                      <span>
                        我已詳閱並同意
                        <a href="#" class="text-primary">相關使用條款</a>
                        與
                        <a href="#" class="text-primary">隱私權政策</a>
                      </span>
                    </template>
                  </v-checkbox>

                  <div class="d-flex justify-end ga-4 mt-6">
                    <v-btn
                      @click="resetForm"
                      color="grey"
                      variant="outlined"
                      size="large"
                    >
                      <v-icon class="mr-2">mdi-refresh</v-icon>
                      重置表單
                    </v-btn>
                    <v-btn
                      @click="submitForm"
                      :disabled="!isFormComplete"
                      :loading="isSubmitting"
                      color="primary"
                      size="large"
                    >
                      <v-icon class="mr-2">mdi-send</v-icon>
                      提交申請
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-form>
          </v-col>

          <!-- 申請須知側邊欄 -->
          <v-col cols="12" lg="4">
            <v-card elevation="4" class="sticky-sidebar">
              <v-card-title class="bg-primary text-white">
                <v-icon class="mr-2">mdi-information</v-icon>
                申請須知
              </v-card-title>
              <v-card-text class="pa-4">
                <h4 class="text-h6 mb-3">申請流程：</h4>
                <v-timeline density="compact" side="end">
                  <v-timeline-item size="small" dot-color="primary">
                    <v-card density="compact" elevation="1">
                      <v-card-title class="text-body-1 py-2"
                        >提交申請</v-card-title
                      >
                      <v-card-text class="text-body-2 py-1"
                        >線上填寫申請表單</v-card-text
                      >
                    </v-card>
                  </v-timeline-item>
                  <v-timeline-item size="small" dot-color="grey">
                    <v-card density="compact" elevation="1">
                      <v-card-title class="text-body-1 py-2"
                        >文件審核</v-card-title
                      >
                      <v-card-text class="text-body-2 py-1"
                        >相關單位進行審查</v-card-text
                      >
                    </v-card>
                  </v-timeline-item>
                  <v-timeline-item size="small" dot-color="grey">
                    <v-card density="compact" elevation="1">
                      <v-card-title class="text-body-1 py-2"
                        >審議會議</v-card-title
                      >
                      <v-card-text class="text-body-2 py-1"
                        >召開會議討論</v-card-text
                      >
                    </v-card>
                  </v-timeline-item>
                  <v-timeline-item size="small" dot-color="grey">
                    <v-card density="compact" elevation="1">
                      <v-card-title class="text-body-1 py-2"
                        >核准通知</v-card-title
                      >
                      <v-card-text class="text-body-2 py-1"
                        >發送審核結果</v-card-text
                      >
                    </v-card>
                  </v-timeline-item>
                </v-timeline>

                <v-divider class="my-4"></v-divider>

                <h4 class="text-h6 mb-3">注意事項：</h4>
                <v-list density="compact">
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="warning" size="16"
                        >mdi-alert-circle</v-icon
                      >
                    </template>
                    <v-list-item-title class="text-body-2">
                      請至少提前30天提出申請
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="warning" size="16"
                        >mdi-alert-circle</v-icon
                      >
                    </template>
                    <v-list-item-title class="text-body-2">
                      請確保所有必要文件完整上傳
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="warning" size="16"
                        >mdi-alert-circle</v-icon
                      >
                    </template>
                    <v-list-item-title class="text-body-2">
                      商業用途需另行評估收費標準
                    </v-list-item-title>
                  </v-list-item>
                </v-list>

                <v-divider class="my-4"></v-divider>

                <h4 class="text-h6 mb-3">聯絡資訊：</h4>
                <v-list density="compact">
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="primary" size="16">mdi-phone</v-icon>
                    </template>
                    <v-list-item-title class="text-body-2"
                      >06-2991111</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="primary" size="16">mdi-email</v-icon>
                    </template>
                    <v-list-item-title class="text-body-2"
                      >apply@tainan.gov.tw</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="primary" size="16">mdi-clock</v-icon>
                    </template>
                    <v-list-item-title class="text-body-2"
                      >週一至週五 08:00-17:30</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 成功提交對話框 -->
    <v-dialog v-model="successDialog" max-width="500">
      <v-card>
        <v-card-title class="bg-success text-white text-center">
          <v-icon class="mr-2">mdi-check-circle</v-icon>
          申請提交成功
        </v-card-title>
        <v-card-text class="text-center pa-6">
          <v-icon color="success" size="80" class="mb-4"
            >mdi-check-circle-outline</v-icon
          >
          <h3 class="text-h5 mb-3">感謝您的申請！</h3>
          <p class="text-body-1 mb-4">
            您的申請已成功提交，申請編號為：<strong>APP-2024-0001</strong>
          </p>
          <p class="text-body-2 text-grey-darken-1">
            我們將在3-5個工作天內進行初步審核，並透過電子信箱通知您審核進度。
          </p>
        </v-card-text>
        <v-card-actions class="justify-center pa-4">
          <v-btn @click="goToHome" color="primary" variant="outlined">
            返回首頁
          </v-btn>
          <v-btn @click="checkApplicationStatus" color="primary">
            查看申請狀態
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 表單資料
const formData = ref({
  // 申請類型
  applicantType: "individual", // individual | organization

  // 個人資料
  individual: {
    name: "",
    idNumber: "",
    phone: "",
    email: "",
    address: "",
  },

  // 機關資料
  organization: {
    name: "",
    taxId: "",
    contactPerson: "",
    contactTitle: "",
    phone: "",
    email: "",
    address: "",
  },

  // 申請資產
  selectedAsset: "",
  assetInfo: null,

  // 使用期間
  startDate: "",
  endDate: "",

  // 需求說明
  purpose: "",
  description: "",
  specialRequirements: "",

  // 同意條款
  agreeTerms: false,
});

// 表單驗證規則
const rules = {
  required: (value) => !!value || "此欄位為必填",
  email: (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value) || "請輸入有效的電子信箱";
  },
  phone: (value) => {
    const pattern = /^[\d-+()#\s]+$/;
    return pattern.test(value) || "請輸入有效的電話號碼";
  },
  idNumber: (value) => {
    const pattern = /^[A-Z]\d{9}$/;
    return pattern.test(value) || "請輸入有效的身分證字號";
  },
  taxId: (value) => {
    const pattern = /^\d{8}$/;
    return pattern.test(value) || "請輸入有效的統一編號";
  },
};

// 可選擇的資產列表
const availableAssets = ref([
  {
    id: "ASSET001",
    name: "台南市立圖書館新總館",
    location: "永康區康橋大道255號",
    type: "建築物",
    status: "已活化",
  },
  {
    id: "ASSET002",
    name: "台南市美術館二館",
    location: "中西區忠義路二段1號",
    type: "建築物",
    status: "已活化",
  },
  {
    id: "ASSET003",
    name: "安平港國家歷史風景區",
    location: "安平區安平路790號",
    type: "建築物",
    status: "媒合中",
  },
  {
    id: "ASSET004",
    name: "台南文化創意產業園區",
    location: "東區北門路二段16號",
    type: "建築物",
    status: "待媒合",
  },
]);

// 使用目的選項
const purposeOptions = ref([
  { value: "culture", title: "文化活動" },
  { value: "education", title: "教育訓練" },
  { value: "exhibition", title: "展覽展示" },
  { value: "meeting", title: "會議研習" },
  { value: "community", title: "社區活動" },
  { value: "commercial", title: "商業用途" },
  { value: "other", title: "其他用途" },
]);

// 上傳檔案
const uploadedFiles = ref([]);

// 表單驗證狀態
const valid = ref(false);

// 提交狀態
const isSubmitting = ref(false);

// 麵包屑導航
const breadcrumbs = ref([
  { title: "首頁", to: "/" },
  { title: "需求申請", disabled: true },
]);

// 計算屬性：當前申請人資料
const currentApplicantData = computed(() => {
  return formData.value.applicantType === "individual"
    ? formData.value.individual
    : formData.value.organization;
});

// 計算屬性：表單是否完整
const isFormComplete = computed(() => {
  const basic =
    formData.value.applicantType === "individual"
      ? formData.value.individual.name &&
        formData.value.individual.phone &&
        formData.value.individual.email
      : formData.value.organization.name &&
        formData.value.organization.contactPerson &&
        formData.value.organization.phone &&
        formData.value.organization.email;

  return (
    basic &&
    formData.value.selectedAsset &&
    formData.value.startDate &&
    formData.value.endDate &&
    formData.value.purpose &&
    formData.value.description &&
    formData.value.agreeTerms
  );
});

// 頁面載入時處理
onMounted(() => {
  // 從 URL 參數獲取資產 ID
  const assetId = route.query.assetId;
  if (assetId) {
    formData.value.selectedAsset = assetId;
    updateSelectedAssetInfo();
  }
});

// 更新選中資產資訊
const updateSelectedAssetInfo = () => {
  const asset = availableAssets.value.find(
    (a) => a.id === formData.value.selectedAsset
  );
  formData.value.assetInfo = asset || null;
};

// 處理資產選擇變更
const onAssetChange = () => {
  updateSelectedAssetInfo();
};

// 處理檔案上傳
const handleFileUpload = (files) => {
  uploadedFiles.value = [...uploadedFiles.value, ...files];
};

// 移除上傳檔案
const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1);
};

// 重置表單
const resetForm = () => {
  Object.assign(formData.value, {
    applicantType: "individual",
    individual: {
      name: "",
      idNumber: "",
      phone: "",
      email: "",
      address: "",
    },
    organization: {
      name: "",
      taxId: "",
      contactPerson: "",
      contactTitle: "",
      phone: "",
      email: "",
      address: "",
    },
    selectedAsset: "",
    assetInfo: null,
    startDate: "",
    endDate: "",
    purpose: "",
    description: "",
    specialRequirements: "",
    agreeTerms: false,
  });
  uploadedFiles.value = [];
};

// 提交表單
const submitForm = async () => {
  if (!isFormComplete.value) {
    return;
  }

  isSubmitting.value = true;

  try {
    // 這裡實作實際的提交邏輯
    console.log("提交申請資料:", {
      ...formData.value,
      files: uploadedFiles.value,
    });

    // 模擬 API 呼叫
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 提交成功，跳轉到成功頁面或顯示成功訊息
    successDialog.value = true;
  } catch (error) {
    console.error("提交失敗:", error);
    // 顯示錯誤訊息
  } finally {
    isSubmitting.value = false;
  }
};

// 成功對話框
const successDialog = ref(false);

// 前往首頁
const goToHome = () => {
  router.push("/");
};

// 查看申請狀態
const checkApplicationStatus = () => {
  // 這裡可以實作查看申請狀態的邏輯
  router.push("/");
};
</script>

<style scoped>
.page-header {
  border-bottom: 3px solid #1976d2;
}

.sticky-sidebar {
  position: sticky;
  top: 20px;
}

.form-section .v-card {
  transition: all 0.3s ease;
}

.form-section .v-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* 響應式調整 */
@media (max-width: 1280px) {
  .sticky-sidebar {
    position: static;
  }
}

@media (max-width: 960px) {
  .form-section .v-card:hover {
    transform: none;
  }
}
</style>
