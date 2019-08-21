<template>
  <main class="q-pa-md" style="box-shadow: 0px 3px 2px -2px grey;">
    <header class="row">
      <label class="text-h6 text-center" style="width: 100%;">Calificación de sección</label>
    </header>
    <main class="q-mt-sm">
      <section class="row">
        <article class="col-xs-6">
          <p class="q-my-none text-subtitle-2">Puntaje</p>
        </article>
        <article class="col-xs-6">
          <p class="q-my-none text-right">{{ puntaje }}/{{ puntajeMax }}</p>
        </article>
      </section>
      <section class="row">
        <article class="col-xs-6">
          <p class="q-my-none text-subtitle-2">Calificación</p>
        </article>
        <article class="col-xs-6">
          <p class="text-right q-my-none text-bold" :class="calificacionClass">{{ calificacion }}</p>
        </article>
      </section>
    </main>
  </main>
</template>

<script>
export default {
  props: {
    puntaje: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      description: "Puntaje de la seccion o del formulario completo"
    },
    puntajeMax: {
      type: Number,
      default: 10,
      min: 0,
      max: 100,
      description:
        "Puntaje maximo que puede tener la seccion o el formulario completo"
    }
  },
  computed: {
    calificacion() {
      return this.puntaje == 0 ? "NO APTO" : "APTO";
    },
    calificacionClass() {
      return this.puntaje == 0 ? "text-negative" : "text-positive";
    }
  }
};
</script>
