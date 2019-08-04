<template>
  <div>
    <main class="row ">
      <section class="col-xs-12 q-my-sm q-px-sm">
        <q-select
          label="Tipo de evento"
          v-model="tipoEvento"
          :options="tiposEventos"
          :disable="!showAddBtn"
          outlined
        ></q-select>
      </section>
      <section v-if="tipoEvento != 'Ninguno'" class="col-xs-12">
        <main class="row">
          <section class="col-xs-12 q-my-sm q-px-sm">
            <q-select
              label="Infraestructura expuesta a danos"
              v-model="danos"
              :options="trueFalseOptions"
              :disable="!showAddBtn"
              outlined
              emit-value
              map-options
            ></q-select>
          </section>
          <section v-if="danos == true" class="col-xs-12 q-my-sm q-px-sm">
            <q-select
              label="Tipo de dano"
              v-model="tipoDano"
              :options="tiposDano"
              :disable="!showAddBtn"
              outlined
            ></q-select>
          </section>
        </main>
      </section>
      <footer class="col-xs-4 offset-xs-4 text-center" v-if="showAddBtn">
        <q-btn
          color="primary"
          :disable="btnDisabled"
          @click="addEvent"
        >Aceptar</q-btn>
      </footer>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    showAddBtn: {
      type: Boolean,
      default: false
    },
    evento: {
      required: false,
      default: function() {
        return {
          tipoEvento: "",
          danos: false,
          tipoDano: ""
        };
      }
    }
  },
  mounted() {
    this.copyPropValues();
  },
  data() {
    return {
      tipoEvento: "",
      danos: false,
      tipoDano: "",

      tiposEventos: [
        "Ninguno",
        "Movimiento en masa",
        "Inundacion",
        "Terremoto"
      ],
      tiposDano: [
        "Humano",
        "Infraestructura",
        "Economico"
      ]
    };
  },
  computed: {
    trueFalseOptions() {
      return [
        { value: true, label: "Si" },
        { value: false, label: "No" },
      ]
    },
    btnDisabled() {
      return (
        this.tipoEvento == "" ||
        (this.danos == true && this.tipoDano == "")
      );
    }
  },
  methods: {
    addEvent() {
      const payload = {
        tipoEvento: this.tipoEvento,
        danos: this.danos,
        tipoDano: this.tipoDano
      };
      this.$emit("addEvent", payload);
      this.clearEvent();
    },
    clearEvent() {
      this.tipoEvento = "";
      this.danos = false;
      this.tipoDano = ""
    },
    copyPropValues() {
      this.tipoEvento = this.evento.tipoEvento;
      this.danos = this.evento.danos;
      this.tipoDano = this.evento.tipoDano;
    }
  }
};
</script>
