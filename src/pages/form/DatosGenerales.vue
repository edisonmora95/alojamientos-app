<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" ref="localizacion-form">
      <section class="col-xs-12">
        <q-input
          outlined
          v-model="nombreInfraestructura"
          label="Nombre de la infraestructura"
        />
      </section>
      <section class="col-xs-12 col-md-6">
        <q-input outlined v-model="fechaInspeccion" mask="date">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="fechaInspeccion"
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
          v-model="horaInspeccion"
          mask="time"
          :rules="['time']"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="horaInspeccion" />
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
          :to="prevPage"
        />
        <q-btn
          flat
          class="btnContinuar"
          color="secondary"
          icon-right="keyboard_arrow_right"
          label="Continuar"
          :to="nextPage"
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
    this.fechaInspeccion = now.toISOString();
    this.horaInspeccion = DateTimeUtils.getTime(now);
  },
  data() {
    return {
      nombreInfraestructura: "",
      fechaInspeccion: "",
      horaInspeccion: "",
      nextPage: {
        name: "infraestructura"
      },
      prevPage: {
        name: "localizacion"
      }
    };
  }
};
</script>
