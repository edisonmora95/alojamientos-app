/** Directorio principal de los archivos en el dispositivo */
const DIRECTORY_PATH = "AlojamientosApp/";

/**
 * Busca en el file system del dispositivo el archivo especificado y devuelve su referencia
 *
 * @param {string} fileName Nombre del archivo a buscar. Ej.: test.json
 * @param {object} options Opciones a pasar
 * @param {boolean} options.create Si es true, si no encuentra el archivo lo crea
 * @param {boolean} options.exclusive Si es true, si encuentra el archivo y se manda la opción de crear, lanza un error de que el archivo ya existe
 *
 * @return {Promise<object>} fileEntry Referencia del archivo en el fileSystem
 */
const createFile = (fileName, options) => {
  return new Promise((resolve, reject) => {
    window.requestFileSystem(window.PERSISTENT, 0, (fs) => {
      fs.root.getDirectory(DIRECTORY_PATH, { create: true }, (dirEntry) => {
        dirEntry.getFile(fileName, options, (fileEntry) => {
          resolve(fileEntry);
        }, error => reject(error));
      });
    }, error => reject(error));
  });
};

/**
 *Escribe los datos especificados en el archivo seleccionado
 *
 * @param {object} fileEntry Referencia del archivo a escribir
 * @param {any} dataObj Datos a escribir
 */
const writeFile = (fileEntry, dataObj) => {
  return new Promise((resolve, reject) => {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(fileWriter => {

      fileWriter.onwriteend = () => {
        console.log("Successful file write...");
        resolve(true);
      };

      fileWriter.onerror = error => {
        console.log("Failed file write: " + error.toString());
        reject(error);
      };

      // If data object is not passed in,
      // create a new Blob instead.
      if (!dataObj) {
        dataObj = new Blob([dataObj], { type: 'text/plain' });
      }

      fileWriter.write(dataObj);
    });
  });
};

/**
 * Lee el archivo especificado
 *
 * @param {object} fileEntry Referencia del archivo a escribir
 *
 * @return {Promise<object>} fileEntry Datos del archivo leído
 */
const readFile = (fileEntry) => {
  return new Promise((resolve, reject) => {
    fileEntry.file(function (file) {
      const reader = new FileReader();
      reader.onloadend = function() {
        console.log("Successful file read...");
        resolve(this.result);
      };
      reader.readAsText(file);
    }, error => reject(error));
  });
};

export default {
  createFile,
  writeFile,
  readFile
};
