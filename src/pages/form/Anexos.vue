<template>
  <q-page class="q-pt-lg q-px-md">
    <section class="row">
      <article class="col-xs-6 col-sm-3 text-center">
        <q-btn flat id="btnAdd" @click="captureImage">
          <q-icon name="camera_alt" style="font-size: 2.5em;" />
        </q-btn>
      </article>
      <article
        class="col-xs-6 col-sm-3 text-center q-pa-xs"
        v-for="image in localForm.anexos"
        :key="image"
      >
        <!-- <img :src="image"/> -->
        <q-img class="imagen" :src="image" spinner-color="primary"></q-img>
      </article>
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
  </q-page>
</template>

<script>
import ImagesService from "../../services/images.service";
import FormMixin from "../../mixins/FormMixin";
export default {
  data() {
    return {
      nextPage: {
        name: "recomendaciones"
      },
      prevPage: {
        name: "accesibilidad"
      },
      localForm: {
        anexos: [
          "https://i.imgur.com/rV19FXa.jpg",
          "https://i.imgur.com/b7JQceE.jpg",
          "https://i.imgur.com/R9D4KjX.jpg"
        ]
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    }
  },
  methods: {
    async captureImage() {
      const options = {
        destinationType: 0
      };
      navigator.camera.getPicture(
        async data => {
          // on success
          const result = await ImagesService.subirImagen(data);
          this.localForm.anexos.push(result.data.data.link);
        },
        () => {
          // on fail
          this.$q.notify("Could not access device camera.");
        },
        options
      );
    },
    nextStep() {
      this.updateForm();
      this.$router.push(this.nextPage);
    }
  },
  mixins: [FormMixin]
};
</script>

<style scoped>
.imagen {
  height: 150px;
  max-width: 100%;
}
#btnAdd {
  height: 150px;
  width: 100%;
  margin: auto;
  position: relative;
}
</style>
