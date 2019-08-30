<template>
  <main>
    <q-item>
      <q-item-section top>
        <q-item-label header class="q-mt-sm">{{ form.infraestructura.nombre }}</q-item-label>
      </q-item-section>
      <q-item-section middle>
        <q-item-label lines="1">
          <q-chip outline square :color="chipColor" text-color="white" :label="form.calificacion" />
        </q-item-label>
      </q-item-section>
      <q-item-section middle class="gt-xs">
        <q-item-label lines="1">
          <span class="text-weight-medium">Puntaje:</span>
          <span class="text-grey-8"> {{ form.puntaje }}/100</span>
        </q-item-label>
      </q-item-section>
      <q-item-section  side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn size="12px" flat dense round icon="more_vert" />
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
    }
  }
};
</script>
