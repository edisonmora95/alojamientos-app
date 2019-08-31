<template>
  <q-list>
    <q-item clickable :to="localizacion">
      <q-item-section>
        <q-item-label>Ingresar calificación</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable :to="formularios">
      <q-item-section>
        <q-item-label>Formularios guardados</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label>Cerrar sesión</q-item-label>
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
