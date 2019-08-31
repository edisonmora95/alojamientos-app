const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Forms.vue") },
      {
        path: "formularios",
        component: () => import("pages/Forms.vue"),
        name: "formularios",
        meta: {
          title: "Formularios"
        }
      },
      {
        path: "localizacion",
        component: () => import("pages/form/Localizacion.vue"),
        name: "localizacion",
        meta: {
          title: "1. Localización"
        }
      },
      {
        path: "datos-generales",
        component: () => import("pages/form/DatosGenerales.vue"),
        name: "generales",
        meta: {
          title: "2. Datos Generales"
        }
      },
      {
        path: "datos-infraestructura",
        component: () => import("pages/form/DatosInfraestructura.vue"),
        name: "infraestructura",
        meta: {
          title: "2. Datos Generales",
          subtitle: "2.1 Datos Infraestructura"
        }
      },
      {
        path: "antecedentes",
        component: () =>
          import("pages/form/condiciones_esenciales/Antecedentes.vue"),
        name: "antecedentesEventos",
        meta: {
          title: "3. Condiciones Esenciales",
          subtitle: "3.1 Antecedentes de eventos"
        }
      },
      {
        path: "riesgo",
        component: () =>
          import("pages/form/condiciones_esenciales/AnalisisRiesgo.vue"),
        name: "riesgo",
        meta: {
          title: "3. Condiciones Esenciales",
          subtitle: "3.2 Analisis de riesgo de la infraestructura"
        }
      },
      {
        path: "vias-acceso",
        component: () =>
          import("pages/form/condiciones_esenciales/ViasAcceso.vue"),
        name: "viasAcceso",
        meta: {
          title: "3. Condiciones Esenciales",
          subtitle: "3.3 Vias de acceso a la infraestructura"
        }
      },
      {
        path: "servicios-basicos",
        component: () =>
          import("pages/form/condiciones_esenciales/ServiciosBasicos.vue"),
        name: "serviciosBasicos",
        meta: {
          title: "3. Condiciones Esenciales",
          subtitle: "3.4 Servicios Basicos"
        }
      },
      {
        path: "espacios-vitales-dormitorios",
        component: () =>
          import("pages/form/condiciones_esenciales/EspaciosVitalesDormitorios.vue"),
        name: "espaciosVitalesDormitorios",
        meta: {
          title: "3. Condiciones Esenciales",
          subtitle: "3.5.1 Espacios Vitales (Dormitorios)"
        }
      },
      {
        path: "espacios-vitales-banos",
        component: () =>
          import("pages/form/condiciones_esenciales/EspaciosVitalesBanos.vue"),
        name: "espaciosVitalesBanos",
        meta: {
          title: "3. Condiciones Esenciales",
          subtitle: "3.5.2 Espacios Vitales (Banos)"
        }
      },
      {
        path: "medidas-seguridad",
        component: () => import("pages/form/MedidasSeguridad.vue"),
        name: "medidasSeguridad",
        meta: {
          title: "4. Medidas de Seguridad"
        }
      },
      {
        path: "infrarestructura-paredes",
        component: () =>
          import("pages/form/infraestructura/InfraestructuraParedes.vue"),
        name: "infraestructuraParedes",
        meta: {
          title: "5. Infraestructura",
          subtitle: "5.1 Paredes"
        }
      },
      {
        path: "infrarestructura-pisos",
        component: () =>
          import("pages/form/infraestructura/InfraestructuraPisos.vue"),
        name: "infraestructuraPisos",
        meta: {
          title: "5. Infraestructura",
          subtitle: "5.2 Pisos"
        }
      },
      {
        path: "infrarestructura-techos",
        component: () =>
          import("pages/form/infraestructura/InfraestructuraTechos.vue"),
        name: "infraestructuraTechos",
        meta: {
          title: "5. Infraestructura",
          subtitle: "5.3 Techos"
        }
      },
      {
        path: "infrarestructura-ingresos-salidas",
        component: () =>
          import("pages/form/infraestructura/InfraestructuraIngresosSalidas.vue"),
        name: "infraestructuraIngresosSalidas",
        meta: {
          title: "5. Infraestructura",
          subtitle: "5.4 Ingresos/Salidas"
        }
      },
      {
        path: "infrarestructura-otros-espacios",
        component: () =>
          import("pages/form/infraestructura/InfraestructuraOtrosEspacios.vue"),
        name: "infraestructuraOtrosEspacios",
        meta: {
          title: "5. Infraestructura",
          subtitle: "5.5 Otros Espacios"
        }
      },
      {
        path: "accesibilidad",
        component: () => import("pages/form/Accesibilidad.vue"),
        name: "accesibilidad",
        meta: {
          title: "6. Accesibilidad"
        }
      },
      {
        path: "recomendaciones",
        component: () => import("pages/form/Recomendaciones.vue"),
        name: "recomendaciones",
        meta: {
          title: "7. Recomendaciones"
        }
      },
      {
        path: "finalizar",
        component: () => import("pages/form/FinFormulario.vue"),
        name: "finFormulario",
        meta: {
          title: "8. Fin del formulario"
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
