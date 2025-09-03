/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // 首頁導向
  // 前台 Template 作為父層
  {
    path: "/",
    component: () => import("../pages/front/Template.vue"),
    children: [
      { path: "", component: () => import("../pages/front/Home.vue") },
      {
        path: "PublicAssetList",
        component: () => import("../pages/front/PublicAssetList.vue"),
      },
      {
        path: "PublicAssetDetail",
        component: () => import("../pages/front/PublicAssetDetail.vue"),
      },
      {
        path: "PublicDemandForm",
        component: () => import("../pages/front/PublicDemandForm.vue"),
      },
    ],
  },
  // 後台登入頁（不套用 Template）
  {
    path: "/dashboard/Login",
    component: () => import("../pages/back/Login.vue"),
  },
  // 後台 Template 作為父層（不含 Login）
  {
    path: "/dashboard",
    component: () => import("../pages/back/Template.vue"),
    children: [
      {
        path: "",
        component: () => import("../pages/back/Dashboard.vue"),
      },
      {
        path: "AssetManage",
        component: () => import("../pages/back/AssetManage.vue"),
      },
      {
        path: "DemandManage",
        component: () => import("../pages/back/DemandManage.vue"),
      },
      {
        path: "MeetingManage",
        component: () => import("../pages/back/MeetingManage.vue"),
      },
      {
        path: "InspectionManage",
        component: () => import("../pages/back/InspectionManage.vue"),
      },
      {
        path: "PlanManage",
        component: () => import("../pages/back/PlanManage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (localStorage.getItem("vuetify:dynamic-reload")) {
      console.error("Dynamic import error, reloading page did not fix it", err);
    } else {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
