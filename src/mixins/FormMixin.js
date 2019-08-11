/**
 * Mixin para todas las páginas y componentes del formulario de infraestructura
 */

const FormMixin = {
  methods: {
    /**
     * Inicializa los campos del componente con lo que esté guardado en el store
     */
    copyFormValues() {
      for (let key in this.localForm) {
        this.localForm[key] = this.form[key];
      }
    },
    /**
     * Avanza al siguiente componente
     * El siguiente componente se encuentra registrado en la propiedad nextPage del componente
     */
    async nextStep() {
      const isFormValid = await this.beforeSubmit();
      if (isFormValid) {
        this.updateForm();
        this.$router.push(this.nextPage);
      }
    },
    /**
     * Avanza al componente anterior.
     * El componente anterior se encuentra registrado en la propiedad prevPage del componente actual
     */
    prevStep() {
      this.updateForm();
      this.$router.push(this.prevPage);
    },
    /**
     * Si el formulario del componente actual no es válido, levanta una notificación en forma de snackbar
     */
    async beforeSubmit() {
      const isFormValid = await this.validateForm(this.refForm);
      if (!isFormValid) {
        this.$q.notify({
          color: "negative",
          message: "Debe completar los campos obligatorios",
          actions: [{ icon: "close", color: "white" }],
          timeout: "2000"
        });
      }
      return isFormValid;
    },
    /**
     * Verifica que todos los campos del formulario actual cumplan con las reglas que tienen impuestas
     */
    validateForm(refName) {
      return this.$refs[refName].validate();
    },
    /**
     * Actualiza el formulario del store con los campos del formulario actual del componente
     */
    updateForm() {
      const payload = this.localForm;
      this.$store.commit("form/updateForm", payload);
    },
    /**
     * Limpia los valores del formulario indicado
     */
    clearForm(form) {
      for (const key in form) {
        if (typeof form[key] === "boolean") {
          form[key] = false;
        } else if (typeof form[key] === "number") {
          form[key] = 0;
        } else {
          form[key] = "";
        }
      }
    },
    /**
     * Setea el puntaje final de la sección actual
     */
    setPuntajeSeccion(seccion, puntaje) {
      const payload = { seccion, puntaje };
      this.$store.commit("form/setPuntajeSeccion", payload);
    }
  }
};

export default FormMixin;
