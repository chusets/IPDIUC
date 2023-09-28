<template>
  <v-row justify="center">
    <v-col cols="12" sm="7">
      <br>
      <div v-if="busq === null || busq.length === 0" class="text-center">
        <div class="text-body-1 font-weight-black">
          No se encontraron resultados para la búsqueda.<br>
          <router-link to="/RealizarPregunta" class="ml-2">Redactar pregunta</router-link>
        </div>
      </div>
      <div v-else>
        <div v-for="TusResp in busq" :key="TusResp.Num_Pregunta" @click="verDetallePregunta(TusResp.Num_Pregunta)">
          <v-card class="mx-auto" outlined>
            <router-link :to="`/preguntas/${TusResp.Num_Pregunta}`">
              <v-card-text>
                <div class="mb-3 text-body-1 font-weight-black">
                  {{ TusResp.TituloP }}
                </div>
                <div class="text-body-1">
                  <v-icon class="mr-10">mdi-comment-question</v-icon>
                  {{ TusResp.Pregunt }} - {{ TusResp.Fecha_Pregunta }}
                </div>
              </v-card-text>
            </router-link>
            <v-divider inset></v-divider>
          </v-card>
          <br>
        </div>
      </div>
    </v-col>
  </v-row>
</template>


<script>
import axios from 'axios'

export default {
  name: "buscador",
  data() {
    return {
      busq: null,
      nivelu:null,
      terminoBusqueda: "",
      // ...otros datos
    };
  },
  methods: {
    verDetallePregunta(id) {
      // Obtener la ruta actual
      const currentRoute = this.$route.path;
      
      // Verificar si ya estamos en la ruta que intentamos navegar
      if (currentRoute !== `/preguntas/${id}`) {
        // Realizar la navegación solo si no estamos en la misma ruta
        this.$router.push(`/preguntas/${id}`);
      }
    },
    buscarPreguntas() {
      const terminoBusqueda = this.$route.params.termino;
      
      // Realizar una solicitud HTTP al backend PHP para buscar preguntas usando el término de búsqueda
      axios
        .post("http://localhost/PC/nuevo-project/backend/buscador.php", {
          terminoBusqueda,
        })
        .then((response) => {
          // Procesar la respuesta del backend, por ejemplo, mostrar los resultados en el frontend
          this.busq = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // ...otros métodos
  },
  beforeCreate() {
      this.nivelu =sessionStorage.getItem('Nivel');
      if(this.nivelu == null || this.nivelu == 0){
        console.log(this.nivelu);
        if(this.nivelu == 0)
        {
          alert('Su usuario se encuentra Deshabilitado');
        }
        
        sessionStorage.setItem('validadorlogin', true);
        this.$router.push('/login');
      }
    },
  created() {
    this.buscarPreguntas();
  },

     
  
};
</script>

<style scoped>
.text-body-1 {
  font-size: 14px;
  color: #333333;
  line-height: 1.5;
}

.font-weight-black {
  font-weight: 700;
}
</style>
