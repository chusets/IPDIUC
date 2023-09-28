<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div style="text-align: center; font-weight: bold;">
            <h3> Mis Respuestas<br></h3>
          </div>
        <div v-if="TusRespuestas.length > 0">
          
          <div v-for="(pregunta, index) in TusRespuestas" :key="index">
            <v-card outlined>
              <v-container>
              <v-card-text>
                <div class="text-body-1 font-weight-black">
                  {{ pregunta.TituloP }}
                </div>
                <div class="my-2 text-body-1">
                  Pregunta: {{ pregunta.Pregunt }}
                </div>
                <div v-for="(respuesta, i) in pregunta.Respuestas" :key="i">
                  <div class="my-2 text-body-1">
                    Respuesta {{ i + 1 }}: {{ respuesta.Respuesta }}
                  </div>
                  <div class="my-2 text-body-1">
                    Fecha de Respuesta: {{ respuesta.Fecha_Respuesta }}
                  </div>
                </div>
              </v-card-text>
              <br><br>
              </v-container>
            </v-card>
          </div>
          
        </div>
        <div v-else>
          <div style="text-align: center;">
            <br> No tienes respuestas a preguntas aún.
            <br>
              ¿Quieres realizar una? <router-link to="/RealizarPregunta">Revisa las Preguntas Recientes</router-link>
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
        })
        .catch((error) => {
          console.error('Error al obtener tus respuestas:', error);
        });
    },
  },
};
</script>
