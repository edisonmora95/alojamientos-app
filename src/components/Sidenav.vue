<template>
  <q-list>
    <q-item clickable :to="localizacion">
      <q-item-section>
        <q-item-label>Ingresar calificacion</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label>Formularios guardados</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label>Cerrar sesion</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  data() {
    return {
      localizacion: { name: "localizacion" },
      formularios: { name: "formularios" }
    };
  }
};
</script>
