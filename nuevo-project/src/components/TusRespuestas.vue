<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div style="text-align: center; font-weight: bold;">
          <h3>Mis Respuestas</h3>
        </div>
        <div v-if="TusRespuestas.length > 0">
          <router-link v-for="(pregunta, index) in TusRespuestas" :key="index" :to="`/preguntas/${pregunta.Num_Pregunta}`" style="text-decoration: none;">
            <v-card outlined class="card-margin">
              <v-container>
                <v-card-text>
                  <div class="text-body-1 font-weight-black">
                    {{ pregunta.TituloP }}
                  </div>
                  <div class="my-2 text-body-1">
                    Pregunta: {{ pregunta.Pregunt }}
                  </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                  <div v-for="(respuesta, i) in pregunta.Respuestas" :key="i">
                    <v-card-text>
                      <div class="my-2 text-body-1">
                        Tu Respuesta #{{ i + 1 }}: {{ respuesta.Respuesta }}
                      </div>
                      <div class="my-2 text-body-1">
                        Fecha de Respuesta: {{ respuesta.Fecha_Respuesta }}
                      </div>
                    </v-card-text>
                  </div>
                </v-card-text>
              </v-container>
            </v-card>
          </router-link>
        </div>
        <div v-else>
          <div style="text-align: center;">
            <br> No tienes respuestas a preguntas aún.
            <br>
            ¿Quieres realizar una? <router-link to="/PreguntasRecientes">Revisa las Preguntas Recientes</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      TusRespuestas: [],
      ID_User_resp: null,
    };
  },
  mounted() {
    this.ID_User_resp = sessionStorage.getItem('ID'); // Obtener el ID del usuario desde la sesión, o de donde lo tengas almacenado.
    this.fetchTusRespuestas();
  },
  methods: {
    fetchTusRespuestas() {
      axios
        .post('http://localhost/PC/nuevo-project/backend/getTusRespuestas.php', {
          datosTusRespuestas: JSON.stringify({ ID_u: this.ID_User_resp }),
        })
        .then((response) => {
          this.TusRespuestas = response.data;

          // Agregar propiedad "Respuestas" a cada pregunta para organizar las respuestas
          this.TusRespuestas.forEach((pregunta) => {
            pregunta.Respuestas = pregunta.Respuestas.map((respuesta, index) => {
              return {
                ...respuesta,
                Num_Respuesta: index + 1,
              };
            });
          });
        })
        .catch((error) => {
          console.error('Error al obtener tus respuestas:', error);
        });
    },
  },
};
</script>

<style>
.card-margin {
  margin-bottom: 2rem; /* Ajusta el valor para obtener el espacio deseado entre las tarjetas */
}
</style>
