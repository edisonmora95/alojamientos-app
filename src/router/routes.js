const routes = [
  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Login.vue"),
        name: "login",
        meta: {
          public: true
        }
      }
    ]
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      requiresLogin: true
    },
    children: [
      { path: "", component: () => import("pages/Forms.vue") },
      {
        path: "formularios",
        component: () => import("pages/Forms.vue"),
        name: "formularios",
        meta: {
          title: "Formularios",
          requiresLogin: true
        }
      },
      {
        path: "localizacion",
        component: () => import("pages/form/Localizacion.vue"),
        name: "localizacion",
        meta: {
          title: "1. Localización",
          requiresLogin: true
        }
      },
      {
        path: "datos-generales",
        component: () => import("pages/form/DatosGenerales.vue"),
        name: "generales",
        meta: {
          title: "2. Datos Generales",
          requiresLogin: true
        }
      },
      {
        path: "datos-infraestructura",
        component: () => import("pages/form/DatosInfraestructura.vue"),
        name: "infraestructura",
        meta: {
          title: "2. Datos Generales",
          subtitle: "2.1 Datos Infraestructura",
          requiresLogin: true
        }
      },
      {
        path: "antecedentes",
        component: () =>
          import("pages/form/condiciones_esenciales/Antecedentes.vue"),
        name: "antecedentesEventos",
        meta: {
          title: "3. Condiciones Esenciales",
          subtitle: "3.1 Antecedentes de eventos",
          requiresLogin: true
        }
      },
      {
        path: "riesgo",
        component: () =>
          import("pages/form/condiciones_esenciales/AnalisisRiesgo.vue"),
        name: "riesgo",
        meta: {
          title: "3. Condiciones Esenciales",
          subtitle: "3.2 Analisis de riesgo de la infraestructura",
          requiresLogin: true
        }
      },
      {
        path: "vias-acceso",
        component: () =>
          import("pages/form/condiciones_esenciales/ViasAcceso.vue"),
        name: "viasAcceso",
        meta: {
          title: "3. Condiciones Esenciales",
          subtitle: "3.3 Vias de acceso a la infraestructura",
          requiresLogin: true
        }
      },
      {
        path: "servicios-basicos",
        component: () =>
          import("pages/form/condiciones_esenciales/ServiciosBasicos.vue"),
        name: "serviciosBasicos",
        meta: {
          title: "3. Condiciones Esenciales",
          subtitle: "3.4 Servicios Basicos",
          requiresLogin: true
        }
      },
      {
        path: "espacios-vitales-dormitorios",
        component: () =>
          import("pages/form/condiciones_esenciales/EspaciosVitalesDormitorios.vue"),
        name: "espaciosVitalesDormitorios",
        meta: {
          title: "3. Condiciones Esenciales",
          subtitle: "3.5.1 Espacios Vitales (Dormitorios)",
          requiresLogin: true
        }
      },
      {
        path: "espacios-vitales-banos",
        component: () =>
          import("pages/form/condiciones_esenciales/EspaciosVitalesBanos.vue"),
        name: "espaciosVitalesBanos",
        meta: {
          title: "3. Condiciones Esenciales",
          subtitle: "3.5.2 Espacios Vitales (Baños)",
          requiresLogin: true
        }
      },
      {
        path: "espacios-terreno",
        component: () =>
          import("pages/form/condiciones_esenciales/EspaciosVitalesTerrenos.vue"),
        name: "espaciosVitalesTerrenos",
        meta: {
          title: "3. Condiciones Esenciales",
          subtitle: "3.5 Espacios Vitales Terreno",
          requiresLogin: true
        }
      },
      {
        path: "caracteristicas-terreno",
        component: () => import("pages/form/CaracteristicasTerreno.vue"),
        name: "caracteristicasTerreno",
        meta: {
          title: "4. Características del Terreno",
          requiresLogin: true
        }
      },
      {
        path: "medidas-seguridad",
        component: () => import("pages/form/MedidasSeguridad.vue"),
        name: "medidasSeguridad",
        meta: {
          title: "4. Medidas de Seguridad",
          requiresLogin: true
        }
      },
      {
        path: "infrarestructura-paredes",
        component: () =>
          import("pages/form/infraestructura/InfraestructuraParedes.vue"),
        name: "infraestructuraParedes",
        meta: {
          title: "5. Infraestructura",
          subtitle: "5.1 Paredes",
          requiresLogin: true
        }
      },
      {
        path: "infrarestructura-pisos",
        component: () =>
          import("pages/form/infraestructura/InfraestructuraPisos.vue"),
        name: "infraestructuraPisos",
        meta: {
          title: "5. Infraestructura",
          subtitle: "5.2 Pisos",
          requiresLogin: true
        }
      },
      {
        path: "infrarestructura-techos",
        component: () =>
          import("pages/form/infraestructura/InfraestructuraTechos.vue"),
        name: "infraestructuraTechos",
        meta: {
          title: "5. Infraestructura",
          subtitle: "5.3 Techos",
          requiresLogin: true
        }
      },
      {
        path: "infrarestructura-ingresos-salidas",
        component: () =>
          import("pages/form/infraestructura/InfraestructuraIngresosSalidas.vue"),
        name: "infraestructuraIngresosSalidas",
        meta: {
          title: "5. Infraestructura",
          subtitle: "5.4 Ingresos/Salidas",
          requiresLogin: true
        }
      },
      {
        path: "infrarestructura-otros-espacios",
        component: () =>
          import("pages/form/infraestructura/InfraestructuraOtrosEspacios.vue"),
        name: "infraestructuraOtrosEspacios",
        meta: {
          title: "5. Infraestructura",
          subtitle: "5.5 Otros Espacios",
          requiresLogin: true
        }
      },
      {
        path: "accesibilidad",
        component: () => import("pages/form/Accesibilidad.vue"),
        name: "accesibilidad",
        meta: {
          title: "6. Accesibilidad",
          requiresLogin: true
        }
      },
      {
        path: "anexos",
        component: () => import("pages/form/Anexos.vue"),
        name: "anexos",
        meta: {
          title: "7. Anexos",
          requiresLogin: true
        }
      },
      {
        path: "recomendaciones",
        component: () => import("pages/form/Recomendaciones.vue"),
        name: "recomendaciones",
        meta: {
          title: "8. Recomendaciones",
          requiresLogin: true
        }
      },
      {
        path: "finalizar",
        component: () => import("pages/form/FinFormulario.vue"),
        name: "finFormulario",
        meta: {
          title: "9. Fin del formulario",
          requiresLogin: true
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
