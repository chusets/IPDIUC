<template>
  <v-app>
    <v-app-bar
      app
      color="blue darken-3"
      flat
    >
      <v-container fluid class="py-0 fill-height" v-show="Nivel_u != null">
        <v-btn v-show="Nivel_u != null" icon class="py-0 fill-height" to="/Perfil">
          <!-- Utilizamos directamente el atributo "to" para la redirección -->
          <v-avatar color="white">
            <v-icon dark>
              mdi-account-circle
            </v-icon>
          </v-avatar>
        </v-btn>
        <router-link to="/Perfil" class="datosUser let" style="color: white; text-decoration: none; cursor: pointer;">
          {{ Nombre_u }}
          <br>
          <div v-show="Nivel_u == 2" class="datosUser let">
            Nivel {{ Nivel_u }}
          </div>
        </router-link>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="terminoBusqueda"
          background-color="#EEEEEE"
          dense
          hide-details
          rounded
          solo
          prepend-inner-icon="mdi-magnify"
          clearable
          single-line
          outline
          label="Pregunta Tus Inquietudes"
          @keydown.enter.prevent="searchInBuscador"
        ></v-text-field>
        <v-btn type="submit" icon @click.prevent="searchInBuscador">
          <v-icon medium color="white" link>
            mdi-send
          </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-show="Nivel_u != null" icon @click.prevent="cerrarSesion">
          <v-icon x-large color="white" link>
            fas fa-sign-out-alt
          </v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>
    
     <!--<dialogflow-messenger v-if="Nivel_u != null"></dialogflow-messenger> -->
    <v-main class="grey lighten-3">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="2">
            <v-sheet v-show="Nivel_u != null" rounded="lg" min-height="268">
              <v-list-item v-show="Nivel_u != null" class="margenMenuNav" to="/Perfil" @click="Bcondition()">
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <div class="menunav">
                  Perfil
                </div>
              </v-list-item>
              <v-list-item v-show="Nivel_u != null" class="margenMenuNav" to="/RealizarPregunta" @click="Bcondition()">
                <v-list-item-icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-list-item-icon>
                <div class="menunav">
                  Realizar Pregunta
                </div>
              </v-list-item>
              <v-list-item v-show="Nivel_u == 2" to="/ConsultarUsuarios" class="margenMenuNav" @click="Bcondition()">
                <v-list-item-icon>
                  <v-icon>mdi-account-search</v-icon>
                </v-list-item-icon>
                <div class="menunav">
                  Consultar Usuarios
                </div>
              </v-list-item>
              <v-list-item v-show="Nivel_u == 2" to="/Registro" class="margenMenuNav" @click="Bcondition()">
                <v-list-item-icon>
                  <v-icon>mdi-account-plus</v-icon>
                </v-list-item-icon>
                <div class="menunav">
                  Registro
                </div>
              </v-list-item>
              <v-list-item v-show="Nivel_u != null" to="/PreguntasRecientes" class="margenMenuNav" @click="Bcondition()">
                <v-list-item-icon>
                  <v-icon>mdi-calendar-clock</v-icon>
                </v-list-item-icon>
                <div class="menunav">
                  Preguntas Recientes
                </div>
              </v-list-item>
              <v-list-item v-show="Nivel_u != null" to="/TusPreguntas" class="margenMenuNav" @click="Bcondition()">
                <v-list-item-icon>
                  <v-icon>mdi-message-question</v-icon>
                </v-list-item-icon>
                <div class="menunav">
                  Tus Preguntas
                </div>
              </v-list-item>
              <v-list-item v-show="Nivel_u != null" to="/TusRespuestas" class="margenMenuNav" @click="Bcondition()">
                <v-list-item-icon>
                  <v-icon>mdi-forum</v-icon>
                </v-list-item-icon>
                <div class="menunav">
                  Tus Respuestas
                </div>
              </v-list-item>
              <v-list-group v-show="Nivel_u != null" v-for="item in itemsDepartamento" :key="item.title" class="margenMenuNav">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-icon>
                      <v-icon class="margenIconoDepartamentosSuperior">mdi-domain</v-icon>
                    </v-list-item-icon>
                    <div class="menuDepartamentosSuperior">
                      <v-list-item-title v-text="item.title"></v-list-item-title>
                    </div>
                  </v-list-item-content>
                </template>
                <v-list-item v-for="child in item.items" :key="child.title" :to="child.ruta" @click="Bcondition()">
                  <v-list-item-content>
                    <div class="margenIconoDepartamentosInferior">
                      <v-list-item-title v-text="child.title"></v-list-item-title>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
              <v-list-group v-show="Nivel_u != null" v-for="item in itemsManualesGuias" :key="item.title" class="margenMenuNav">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-icon>
                      <v-icon class="margenIconoDepartamentosSuperior">mdi-book-open-variant</v-icon>
                    </v-list-item-icon>
                    <div class="menuDepartamentosSuperior">
                      <v-list-item-title v-text="item.title"></v-list-item-title>
                    </div>
                  </v-list-item-content>
                </template>
                <v-list-item v-for="child in item.items" :key="child.title" :to="child.ruta" @click="Bcondition()">
                  <v-list-item-content>
                    <div class="margenIconoDepartamentosInferior">
                      <v-list-item-title v-text="child.title"></v-list-item-title>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
              <v-list-item v-show="Nivel_u != null" to="/RankingdeAporteMensual" class="margenMenuNav" @click="Bcondition()">
                <v-list-item-icon>
                  <v-icon>mdi-chart-areaspline-variant</v-icon>
                </v-list-item-icon>
                <div class="menunav">
                  Ranking de Aporte Mensual
                </div>
              </v-list-item>
              <v-list-item v-show="Nivel_u != null" to="/Emblemas" class="margenMenuNav" @click="Bcondition()">
                <v-list-item-icon>
                  <v-icon>mdi-shield</v-icon>
                </v-list-item-icon>
                <div class="menunav">
                  Emblemas
                </div>
              </v-list-item>
              <v-list-item v-show="Nivel_u != null" to="/NormasdeLaInstitucion" class="margenMenuNav" @click="Bcondition()">
                <v-list-item-icon>
                  <v-icon>mdi-clipboard-text</v-icon>
                </v-list-item-icon>
                <div class="menunav">
                  Normas de La Institución
                </div>
              </v-list-item>
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="8">
            <v-sheet min-height="70vh" rounded="lg">
              <router-view :key="$route.fullPath" />
              <login v-if="Nivel_u == null"></login>
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="2">
            <v-responsive>
              <div>
                <v-sheet v-show="Nivel_u != null" rounded="lg" min-height="270">
                  <v-container id="scroll-target" style="max-height: 500px" class="overflow-y-auto">
                    <v-list-item v-show="Nivel_u != null" class="text-center">
                    <v-list-item-content>
                      <v-list-item-title  class="text-body-1 font-weight-black" style="color: black">Preguntas Recientes</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                    <div class="divider-container">
                      <hr class="custom-divider">
                    </div>
                   
                    <div v-for="(PregRes, index) in PregResp">
                      
                      <v-card-text>
                        <div class="text-body-1 font-weight-black">
                          {{ PregRes.TituloP }}
                        </div>
                        <div class="text-body-1" v-show="Nivel_u != null">
                          <router-link :to="`/preguntas/${PregRes.Num_Pregunta}`">
                          Ver Pregunta
                        </router-link>
                        </div>
                      </v-card-text>
                    </div>
                    <v-row v-scroll:#scroll-target="onScroll" justify="center" style="height: 1000px"></v-row>
                  </v-container>
                </v-sheet>
              </div>
            </v-responsive>

          </v-col>
          
        </v-row>
        
      </v-container>
      
    
    </v-main>
    
    
  </v-app>
</template>

<script>
import Perfil from "@/components/Perfil.vue";
import PreguntasRecientes from "@/components/PreguntasRecientes.vue";
import NormasdeLaInstitucion from "@/components/NormasdeLaInstitucion.vue";
import PreguntasRespuestasExistentes from "@/components/PreguntasRespuestasExistentes.vue";
import PreguntasRealizadas from "@/components/PreguntasRealizadas.vue";
import Menu from "@/components/Menu.vue";
import Registro from "@/components/Registro.vue";
import login from "@/components/login.vue";
import Emblemas from "@/components/login.vue";
import PreguntasDisponibles from "@/components/PreguntasDisponibles.vue";
import RankingdeAporteMensual from "@/components/RankingdeAporteMensual.vue";
import TusRespuestas from "@/components/TusRespuestas.vue";
import TusPreguntas from "@/components/TusPreguntas.vue";
import buscador from "@/components/buscador.vue";
import RealizarPregunta from "@/components/RealizarPregunta.vue";
import axios from 'axios';
import chatbot from "@/components/chatbot.vue";
export default {
  name: 'App',

  components: {
    chatbot,
    Perfil,
    Registro,
    PreguntasRecientes,
    NormasdeLaInstitucion,
    PreguntasRespuestasExistentes,
    PreguntasRealizadas,
    Menu,
    login,
    Emblemas,
    TusRespuestas,
    PreguntasDisponibles,
    RankingdeAporteMensual,
    RealizarPregunta,
    buscador,
    TusPreguntas,
  },

  data: () => ({
    terminoBusqueda: '',
    condition: false,
    scrollInvoked: 0,
    Nivel_u: null,
    Fecha_Hoy: null,
    Nombre_u: null,
    PregResp: null,
    validador: null, 
    itemsDepartamento: [
      {
        items: [
          { title: 'Biología', ruta: "/PregDepartamentoBiologia" },
          { title: 'Computación', ruta: "/PregDepartamentoComputacion" },
          { title: 'Física', ruta: "/PregDepartamentoFisica" },
          { title: 'Matemática', ruta: "/PregDepartamentoMatematica" },
          { title: 'Química', ruta: "/PregDepartamentoQuimica" },
        ],
        title: 'Departamentos',
      }

    ],
    itemsManualesGuias: [
      {
        items: [
          { title: 'Basicos', ruta: "/ManualesBasicos" },
          { title: 'Departamento Biología', ruta: "/MDepartamentoBiologia" },
          { title: 'Departamento Computación', ruta: "/MDepartamentoComputacion" },
          { title: 'Departamento Física', ruta: "/MDepartamentoFisica" },
          { title: 'Departamento Matemática', ruta: "/MDepartamentoMatematica" },
          { title: 'Departamento Química', ruta: "/MDepartamentoQuimica" },
        ],
        title: 'Manuales',
      }

    ],
    
  }),

  created() {
    this.Nivel_u = sessionStorage.getItem('Nivel');
    this.Nombre_u = sessionStorage.getItem('Nombre');
  },

  mounted() {



    const script = document.createElement('script');
    script.src = 'https://widget.flowxo.com/embed.js';
    script.setAttribute('data-fxo-widget', 'eyJ0aGVtZSI6IiMwMDY5Y2MiLCJ3ZWIiOnsiYm90SWQiOiI2NTAyMjhjZjg0ZTZmNDAwMjdmZGIyNDIiLCJ0aGVtZSI6IiMwMDY5Y2MifSwicG9wdXBIZWlnaHQiOiI0MCUifQ==');
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // El chatbot se ha cargado correctamente, puedes realizar cualquier acción adicional aquí si es necesario
    };
    
    document.head.appendChild(script);






    this.ID_User = sessionStorage.getItem('ID');
      axios.post("http://localhost/PC/nuevo-project/backend/getPregRecientes.php", 
      {
          datosPregRecientes:JSON.stringify({ID_u:this.ID_User}) 
      })
      .then(response =>{           
          this.PregResp=response.data;
          this.PregResp.reverse();
      })  
  },

  updated() {
    this.Nivel_u = sessionStorage.getItem('Nivel');
    this.Nombre_u = sessionStorage.getItem('Nombre');
    this.validador=sessionStorage.getItem('validadorlogin');
  },

  methods: {
    onScroll() {
      this.scrollInvoked++
    },

    Bcondition() {
      this.condition = true
    },

    cerrarSesion() {
      sessionStorage.removeItem('Nombre');
      sessionStorage.removeItem('ID');
      sessionStorage.removeItem('Nivel');
      sessionStorage.setItem('validadorlogin', true);
      this.$router.push('/');
    },

    searchInBuscador() {
      if (this.terminoBusqueda.trim() !== '') {
        this.$router.push({ name: 'buscador', params: { termino: this.terminoBusqueda } });
        this.condition = false; // Ocultar el campo de búsqueda local al redirigir al componente de buscador
      }
    },
  },
};
</script>

<style>
.menunav {
  margin: 0em 0em 0em -1em;
}

.menuDepartamentosSuperior {
  margin: -2em 0em 0em 40px;
}

.margenIconoDepartamentosSuperior {
  margin: -10px 0em 0em 0em;
}

.margenIconoDepartamentosInferior {
  margin: 0em 0em 0em 3em;
}

.margenMenuNav {
  margin: 0em 10px 0em -10px;
}

.AccederNav {
  margin: 0em 0em 0em 0m;
}

.datosUser {
  text-transform: capitalize !important;
  color: white;
  text-indent: 1em;
  font-weight: bold;
  font-size: large;
}
.divider-container {
  display: flex;
  align-items: center; /* Centra verticalmente */
  justify-content: center; /* Centra horizontalmente */
}
.custom-divider {
  width: 80%; /* Ajusta el valor según tus necesidades */
}


</style>
