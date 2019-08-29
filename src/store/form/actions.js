import FormService from "../../services/form.service";
import FileService from "../../services/file.service";

export function ingresarFormulario({ commit }, payload) {
  // Formateando el formulario a enviar al servidor
  const form = Object.assign({}, payload);
  form["antecedentes"] = {
    puntaje: payload.puntajeAntecedentes,
    eventos: payload.eventos
  };
  form["amenazas"] = {
    puntaje: payload.puntajeRiesgos,
    amenazas: payload.amenazas
  };
  form["acceso"] = {
    puntaje: payload.puntajeViasAcceso,
    viasAcceso: payload.vias
  };
  form["servicios"] = {
    puntaje: payload.puntajeServicios,
    servicios: payload.servicios
  };
  form["espacios"] = {
    puntaje: payload.puntajeEspacios,
    totalEspacios: 2,
    totalM2: 50,
    banos: payload.banos,
    dormitorios: payload.dormitorios
  };
  form["medidas"] = {
    puntaje: payload.puntajeMedidasSeguridad,
    recursosInternos: payload.recursos,
    institucionesEmergencia: payload.instituciones
  };
  form["datosInfraestructura"] = {
    puntaje: payload.puntajeInfraestructura,
    pared: payload.paredes[0],
    techo: payload.techos[0],
    piso: payload.pisos[0],
    ingresosSalidas: payload.ingresosSalidas,
    otrosEspacios: payload.otrosEspacios
  };
  form["accesibilidad"] = {
    zonaArriboVehicular: payload.zonaArriboVehicular,
    areaCirculacion: payload.areaCirculacion,
    comunicacion: payload.comunicacion,
    puntaje: payload.puntajeAccesibilidad
  };
  delete form.eventos;
  delete form.vias;
  return FormService.ingresarFormulario(form).then(() => {
    commit("clearForm");
  });
}

export async function guardarFormulario({ commit }, payload) {
  const options = {
    create: true
  };
  const fileEntry = await FileService.createFile("formulario.json", options);
  await FileService.writeFile(fileEntry, payload);
  commit("addForm", payload);
  return true;
}
