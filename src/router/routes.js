const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      {
        path: "/localizacion",
        component: () => import("pages/form/Localizacion.vue"),
        meta: {
          title: "1. Localización"
        }
      },
      {
        path: "/generales",
        component: () => import("pages/form/DatosGenerales.vue"),
        meta: {
          title: "2. Datos Generales"
        }
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
