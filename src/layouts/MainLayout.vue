<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round @click="drawer = !drawer" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          {{ routeName }}
          <br />
          <span class="text-caption">{{ routeSubtitle }}</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="drawer" bordered content-class="bg-grey-2">
      <sidenav></sidenav>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";
import Sidenav from "../components/Sidenav.vue";

export default {
  name: "MyLayout",
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    routeName() {
      return this.$route.meta.title;
    },
    routeSubtitle() {
      return this.$route.meta.subtitle;
    }
  },
  methods: {
    openURL
  },
  components: {
    Sidenav
  }
};
</script>

<style></style>
