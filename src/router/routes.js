const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      {
        path: "/localizacion",
        component: () => import("pages/form/Localizacion.vue"),
        name: "localizacion",
        meta: {
          title: "1. Localización"
        }
      },
      {
        path: "/datos-generales",
        component: () => import("pages/form/DatosGenerales.vue"),
        name: "generales",
        meta: {
          title: "2. Datos Generales"
        }
      },
      {
        path: "/datos-infraestructura",
        component: () => import("pages/form/DatosInfraestructura.vue"),
        name: "infraestructura",
        meta: {
          title: "2. Datos Generales",
          subtitle: "2.1 Datos Infraestructura"
        }
      },
      {
        path: "/antecedentes",
        component: () => import("pages/form/condiciones_esenciales/Antecedentes.vue"),
        name: "antecedentesEventos",
        meta: {
          title: "3. Condiciones Esenciales",
          subtitle: "3.1 Antecedentes de eventos"
        }
      },
      {
        path: "/recomendaciones",
        component: () => import("pages/form/Recomendaciones.vue"),
        name: "recomendaciones",
        meta: {
          title: "7. Recomendaciones"
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
