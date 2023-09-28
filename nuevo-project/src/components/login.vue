<template>
  <v-container>
    <p class="Titulologin"> Plataforma Colectiva</p>

    <v-row>
      <v-col cols="5" inset>
        <v-card-text><p class="text-lg-right"> Nombre de Usuario</p></v-card-text>
      </v-col>
      <v-col cols="4">
        <v-text-field
          inset
          label="Nombre de Usuario"
          solo
          v-model="Nomb_User"
          v-on:keyup.enter="submitLoginForm"
        ></v-text-field>
        {{ Nomb_User }}
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="5" inset>
        <v-card-text><p class="text-lg-right"> Password</p></v-card-text>
      </v-col>
      <v-col cols="4">
        <v-text-field
          label="Password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          counter
          @click:append="show1 = !show1"
          solo
          v-model="Pass_User"
          v-on:keyup.enter="submitLoginForm"
          ref="passwordField"
        ></v-text-field>
        {{ Pass_User }}
        <v-col class="text-center">
          <v-alert :value="Incorrecta" type="error">
            Usuario y/o Clave Incorrecta
          </v-alert>
        </v-col>
      </v-col>
    </v-row>

    <div class="text-center">
      <loading
        :active.sync="isLoading"
        color="Indigo"
        :can-cancel="true"
        :on-cancel="onCancel"
        :is-full-page="fullPage"
      ></loading>

      <v-btn color="indigo" @click.prevent="submitLoginForm">
        <span class="white--text">Acceder</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';

// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'PerfilNivel1',
  data() {
    return {
      items_nivel: ['1', '2', '3'],
      items_departamento: ['A', 'B', 'C'],
      arreglo: [],
      show1: false,
      Pass_User: null,
      Nomb_User: null,
      ID_User: null,
      isLoading: false,
      Incorrecta: false,
      selected: '',
      fullPage: true,
      rules: {
        required: value => !!value || 'Requerido',
        min: v => v.length >= 8 || 'Minimo 8 caracteres',
        counter: value => value.length <= 30 || 'Maximo 20 caracteres',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Email Invalido.';
        },
      },
    };
  },

  components: {
    Loading,
  },
  methods: {
    doAjax() {
      this.isLoading = true;
      // simulate AJAX
      setTimeout(() => {
        this.isLoading = false;
      }, 5000);
    },
    onCancel() {
      console.log('User cancelled the loader.');
    },
    submitLoginForm() {
      axios
        .post('http://localhost/PC/nuevo-project/backend/login.php', {
          datoslogin: JSON.stringify({ Nomb_u: this.Nomb_User, Pass_u: this.Pass_User }),
        })
        .then((response) => {
          this.arreglo = response.data;

          if (this.arreglo.length > 0) {
            sessionStorage.setItem('Nombre', this.Nomb_User);
            sessionStorage.setItem('ID', this.arreglo[0].ID_User);
            sessionStorage.setItem('Nivel', this.arreglo[0].Nivel_User);
            this.$router.push('/buscador');
          } else {
            console.log('Usuario y/o Clave Incorrecta  ');
            this.Incorrecta = true;
          }
        });

      // Desenfocar el campo de contraseña para ocultar el teclado virtual
      this.$refs.passwordField.blur();
    },
  },
};
</script>

<style>
.Titulologin {
  font-size: xx-large;
  text-align: center;
}
</style>
