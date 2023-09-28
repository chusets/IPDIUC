<template>
  <div>
              <div class="container">
                    <div style="text-align: center; font-weight: bold;">
                            <h3> Mis Preguntas</h3>
                    </div>
                    <div v-if="TusPregRecientes.length > 0" class="col" id="example-1">
                      <div v-for="(TusPregReciente, index) in TusPregRecientes" :key="index">
                        <router-link :to="`/preguntas/${TusPregReciente.Num_Pregunta}`" style="text-decoration: none;"> 
                          <v-card class="mx-auto" outlined>
                            <v-card-text>
                              <div class="text-body-1 font-weight-black">
                                {{ TusPregReciente.TituloP }}
                              </div>
                              <div class="my-2 text-body-1">
                                {{ TusPregReciente.Pregunt }}
                              </div>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <div class="my-2 text-body-1">
                                Pregunta #{{ TusPregReciente.Num_Pregunta }} - Fecha: {{ TusPregReciente.Fecha_Pregunta }}
                              </div>
                            </v-card-actions>
                          </v-card>
                        </router-link>
                        <br>
                      </div>
                    </div>

                    <!-- Mostrar mensaje si el usuario no ha realizado preguntas -->
                    <div v-else>
                      <div style="text-align: center;">
                        <br> No has realizado preguntas.<br>
                            ¿Quieres realizar una? <router-link to="/RealizarPregunta">Haz clic aquí</router-link>
                      </div>

                        
                      
                    </div>
                </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      TusPregRecientes:[],
      n: null,
      i: 0,
      dialog: false,
      respuesta: null,
      indiceP: null,
      preguntp: null,
      idpregunta: null,
      ResponderPArray: null,
      respuestap: null,
      ID_User_resp: null,
      tituloPreg: null,
      Fecha_Resp: null,
      fecha_aux: [],
      fecha: null,
      fecha_a: '',
      fecha_m: '',
      fecha_d: '',
      fecha_bd: ''
    }
  },

  beforeCreate() {
    if (sessionStorage.getItem('Nombre') == null) {
      sessionStorage.setItem('validadorlogin', true)
      this.$router.push('/login')
    }
  },
  mounted() {
    this.Fecha_Resp = this.printDate()
    this.ID_User = sessionStorage.getItem('ID')
    axios.post("http://localhost/PC/nuevo-project/backend/getTusPreg.php", {
      datosTusPreg: JSON.stringify({ ID_u: this.ID_User })
    })
    .then(response => {           
      this.TusPregRecientes = response.data
      this.TusPregRecientes.reverse()
    })  
  },
  
  methods: {
    dialogFuncion () {
      this.dialog = false
    },
    printDate: function () {
      this.fecha = new Date().toLocaleDateString()
      if (this.fecha[2] == '/' && this.fecha[4] == '/') {
        this.fecha_a = this.fecha.slice(5)
        this.fecha_m = this.fecha.slice(3, -5)
        this.fecha_d = this.fecha.slice(0, -7)
      } else {
        if (this.fecha[1] == '/' && this.fecha[4] == '/') {
          this.fecha_a = this.fecha.slice(5)
          this.fecha_m = this.fecha.slice(2, -5)
          this.fecha_d = this.fecha.slice(0, -8)
        } else {
          if (this.fecha[1] == '/' && this.fecha[3] == '/') {
            this.fecha_a = this.fecha.slice(4)
            this.fecha_m = this.fecha.slice(2, -5)
            this.fecha_d = this.fecha.slice(0, -7)
          } else {
            this.fecha_a = this.fecha.slice(6)
            this.fecha_m = this.fecha.slice(3, -5)
            this.fecha_d = this.fecha.slice(0, -8)
          }
        }
      }
      this.fecha_bd = this.fecha_a + '/' + this.fecha_m + '/' + this.fecha_d
      return this.fecha_bd
    },
  },
}
</script>
