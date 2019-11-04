<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" :ref="refForm" :no-error-focus="true">
      <section class="col-xs-12">
        <q-select
          :disable="disableInputs"
          v-model="localForm.tipo"
          :options="tipos"
          :rules="[validaciones.required]"
          label="Tipo de ubicación a calificar"
          outlined
          map-options
          emit-value
        ></q-select>
      </section>
      <section class="col-xs-12 col-md-6">
        <q-input
          :disable="disableInputs"
          v-model="localForm.fechaInspeccion"
          :rules="[validaciones.required]"
          mask="date"
          outlined
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="localForm.fechaInspeccion"
                  @input="() => $refs.qDateProxy.hide()"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </section>
      <section class="col-xs-12 col-md-6">
        <q-input
          :disable="disableInputs"
          outlined
          v-model="localForm.horaInspeccion"
          mask="time"
          :rules="['time', validaciones.required]"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="localForm.horaInspeccion" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </section>
      <footer class="col-xs-12">
        <q-btn
          flat
          class="btnRegresar"
          color="blue-grey"
          icon="keyboard_arrow_left"
          label="Regresar"
          @click="prevStep"
        />
        <q-btn
          flat
          class="btnContinuar"
          color="secondary"
          icon-right="keyboard_arrow_right"
          label="Continuar"
          @click="nextStep"
        />
      </footer>
    </q-form>
  </q-page>
</template>

<script>
import DateTimeUtils from "../../utils/date.js";
import FormMixin from "../../mixins/FormMixin";
export default {
  mounted() {
    this.copyFormValues();
    if (
      this.localForm.fechaInspeccion === "" &&
      this.localForm.horaInspeccion === ""
    ) {
      const now = new Date();
      this.localForm.fechaInspeccion = now.toISOString();
      this.localForm.horaInspeccion = DateTimeUtils.getTime(now);
    }
  },
  data() {
    return {
      refForm: "datos-generales-form",
      nextPage: {
        name: "infraestructura"
      },
      prevPage: {
        name: "localizacion"
      },
      localForm: {
        fechaInspeccion: "",
        horaInspeccion: "",
        tipo: 0
      }
    };
  },
  computed: {
    tipos() {
      return [
        { label: "Infraestructura", value: 1 },
        { label: "Terreno", value: 2 }
      ];
    },
    form() {
      return this.$store.getters["form/form"];
    },
    validaciones() {
      return this.$store.getters["app/validaciones"];
    }
  },
  mixins: [FormMixin]
};
</script>
