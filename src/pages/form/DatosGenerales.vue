<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" ref="localizacion-form">
      <section class="col-xs-12">
        <q-input
          outlined
          v-model="localForm.nombreInfraestructura"
          label="Nombre de la infraestructura"
        />
      </section>
      <section class="col-xs-12 col-md-6">
        <q-input outlined v-model="localForm.fechaInspeccion" mask="date">
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
          outlined
          v-model="localForm.horaInspeccion"
          mask="time"
          :rules="['time']"
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
export default {
  mounted() {
    const now = new Date();
    this.localForm.fechaInspeccion = now.toISOString();
    this.localForm.horaInspeccion = DateTimeUtils.getTime(now);
    this.copyFormValues();
  },
  data() {
    return {
      nextPage: {
        name: "infraestructura"
      },
      prevPage: {
        name: "localizacion"
      },
      localForm: {
        nombreInfraestructura: "",
        fechaInspeccion: "",
        horaInspeccion: ""
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    }
  },
  methods: {
    copyFormValues() {
      for (let key in this.localForm) {
        this.localForm[key] = this.form[key];
      }
    },
    updateForm() {
      const payload = this.localForm;
      this.$store.commit("form/updateForm", payload);
    },
    nextStep() {
      this.updateForm();
      this.$router.push(this.nextPage);
    },
    prevStep() {
      this.updateForm();
      this.$router.push(this.prevPage);
    }
  }
};
</script>
