<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md">
      <section class="col-xs-12">
        <q-input v-model="form.identity" label="Cédula" outlined />
      </section>
      <section class="col-xs-12">
        <q-input
          v-model="form.password"
          label="Contraseña"
          :type="isPwd ? 'password' : 'text'"
          outlined
        >
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </q-input>
      </section>
      <footer class="col-xs-12">
        <q-btn
          color="primary"
          class="full-width q-mt-md"
          label="Login"
          :loading="loading"
          @click="login"
        />
      </footer>
    </q-form>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      form: {
        identity: "",
        password: ""
      },
      isPwd: true,
      loading: false
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$store
        .dispatch("app/login", this.form)
        .then(() => {
          this.loading = false;
          this.$router.push({ name: "formularios" });
        })
        .catch(error => {
          this.loading = false;
          this.$q.dialog({
            title: "Error",
            message: error
          });
        });
    }
  }
};
</script>
