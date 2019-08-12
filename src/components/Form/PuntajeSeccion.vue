<template>
  <main>
    <header class="row q-my-md">
      <label class="text-h6">Calificacion de seccion</label>
    </header>
    <section class="row">
      <article class="col-xs-6">
        <label>Puntaje</label>
      </article>
      <article class="col-xs-6">
        <p class="text-right">{{ puntaje }}/{{ puntajeMax }}</p>
      </article>
    </section>
    <section class="row">
      <article class="col-xs-6">
        <label>Calificación</label>
      </article>
      <article class="col-xs-6">
        <p class="text-right" :class="calificacionClass">{{ calificacion }}</p>
      </article>
    </section>
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
