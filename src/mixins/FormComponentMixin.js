/**
 * Mixin para todos los componentes de Eventos, Amenazas, etc usados en el formulario
 */

const FormComponentMixin = {
  props: {
    disable: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    showAddBtn: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  }
};

export default FormComponentMixin;
