<template>
  <main>
    <q-item>
      <q-item-section top>
        <q-item-label header class="q-mt-sm">{{
          form.infraestructura.nombre
        }}</q-item-label>
      </q-item-section>
      <q-item-section middle class="text-center">
        <q-item-label lines="1">
          <q-chip
            outline
            square
            :color="chipColor"
            text-color="white"
            :label="form.calificacion"
          />
        </q-item-label>
        <q-item-label caption lines="1">
          <label :class="estadoColor">{{ form.estado }}</label>
        </q-item-label>
      </q-item-section>
      <q-item-section middle class="gt-xs">
        <q-item-label lines="1">
          <span class="text-weight-medium">Puntaje:</span>
          <span class="text-grey-8"> {{ form.puntaje }}/100</span>
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn size="12px" flat dense round icon="more_vert">
            <q-menu>
              <q-list>
                <q-item clickable v-close-popup @click="revisar">
                  <q-item-section>Revisar</q-item-section>
                </q-item>
                <!-- <q-item clickable @click="editar">
                  <q-item-section>Editar</q-item-section>
                </q-item> -->
                <q-item
                  clickable
                  @click="enviar"
                  v-close-popup
                  v-if="form.estado === 'GUARDADO'"
                >
                  <q-item-section>Enviar</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-item-section>
    </q-item>
    <q-separator spaced />
  </main>
</template>
<script>
export default {
  props: {
    form: {
      required: true
    }
  },
  computed: {
    chipColor() {
      if (this.form.calificacion === "NO APTO") {
        return "negative";
      } else if (this.form.calificacion === "APTO") {
        return "primary";
      } else {
        return "orange";
      }
    },
    estadoColor() {
      if (this.form.estado === "ENVIADO") {
        return "text-positive";
      } else {
        return "";
      }
    }
  },
  methods: {
    revisar() {
      this.$store.commit("form/setActualForm", this.form);
      this.$router.push({ name: "localizacion" });
    },
    editar() {
      this.$store.commit("form/setActualForm", this.form);
      this.$router.push({ name: "localizacion" });
    },
    async enviar() {
      try {
        this.$q.loading.show({
          message: "Enviando formulario..."
        });
        await this.$store.dispatch("form/ingresarFormulario", this.form);
        this.$q.loading.hide();
        this.dialogContinuar();
      } catch (error) {
        this.$q.loading.hide();
        this.$q
          .dialog({
            title: "Error",
            message:
              "Parece que hubo un error al subir al servidor ¿Desea volver a intentar?",
            cancel: "Cancelar",
            ok: "Volver a intentar"
          })
          .onOk(() => {
            this.enviar();
          });
        console.error(error);
      }
    },
    dialogContinuar() {
      this.$q.dialog({
        title: "Formulario guardado",
        message: "El formulario fue enviado exitosamente",
        ok: "Ok"
      });
    }
  }
};
</script>
