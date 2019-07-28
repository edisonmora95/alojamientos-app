/**
 * Formatea la fecha ingresada para obtener la hora actual en formato HH:mm
 * @param {Data} date Fecha a formatear
 */
function getTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${hours}:${minutes}`;
}

export default {
  getTime
};
