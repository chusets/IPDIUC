


<template>
  <div>
    

    
    <div class="col " id="example-1">
      
        <v-card class="mx-auto"  outlined>
          
          
          <v-card-text>
            <div class="text-body-1 font-weight-black" style="color: #1565C0;">
              {{  pregunta.TituloP }}
              </div>
              <div class="my-2 text-body-1 ">
                {{  pregunta.Pregunt }}
              </div>
        </v-card-text>

        <v-card-actions>

          <v-dialog
                :retain-focus="false"
                v-model="dialog"
                persistent
                max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                      <v-btn
                      color="indigo  lighten-2"
                      text
                      v-bind="attrs"
                      v-on="on"
                      @click="(preguntp = pregunta.Pregunt, idpregunta = pregunta.Num_Pregunta,tituloPreg = pregunta.TituloP)"
                    >
                      Responder
                    </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <div class="my-2 text-body-1">
                      <b>Titulo {{ tituloPreg }}</b><br>
                
                      {{ preguntp }}
                    </div> 

                    

              
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        
                        
                        <v-col cols="12">
                          <v-textarea
                            v-model="respuestap"                           
                          >
                          </v-textarea>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                        >
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialogFuncion"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialogFuncion(),responderPregunta()"
                    >
                      Responder
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
              :retain-focus="false"
              v-model="dialogComentario"
              persistent
              max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }"></template>
                <v-card>
                  <v-card-title>
                    <div class="my-2 text-body-1" >
                      <b>Agregar Comentario</b>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-textarea v-model="nuevoComentario" />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogComentario = false">
                      Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="agregarComentarioARespuesta()">
                      Agregar Comentario
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>


            <v-spacer></v-spacer>
            <div class="my-2 text-body-1 ">
            Pregunta  #{{ pregunta.Num_Pregunta }}    -  Fecha:    {{ pregunta.Fecha_Pregunta }}
            </div> 
          </v-card-actions>


       
        </v-card>
        <br>
        
        <div   v-for="(respuesta, index)  in respuestas" :key="respuesta.Num_Respuesta">
          <v-card class="mx-auto"  outlined>
            <v-card-text>
              <div class="text-body-1 font-weight-black" style="color: black;">
                Respuesta de Usuario: {{ respuesta.nombreUsuario }}  #{{ respuesta.ID_User_Resp }}
            </div>
                <div class="my-2 text-body-1 ">
                  {{ respuesta.Respuesta }}
                </div>   
          </v-card-text>  
          <v-card-actions>
            <!-- ... (otros botones y elementos) ... -->
            <v-btn
              color="indigo lighten-2"
              text
              @click="agregarComentario(index)"
            >
              Agregar Comentario
            </v-btn>
              <v-spacer></v-spacer>
              <div class="my-2 text-body-1 ">
              Respuesta  #{{ index+1 }} a la Pregunta #{{pregunta.Num_Pregunta }}   -  Fecha:    {{ respuesta.Fecha_Respuesta }}
              </div> 
          </v-card-actions>
          
          
          </v-card>
          <ul>
          <div  v-for="(comentario, index2) in respuesta.comentarios" :key="comentario.ID_Comentario">
            <v-card class="mx-auto"  outlined>
            <v-card-text>
              <div class="text-body-1 font-weight-black">
                Comentario de: {{ comentario.Nombre_User}}   #{{ comentario.ID_User_Comentario }}
              </div>
                <div class="my-2 text-body-1 ">
                  {{ comentario.comentario }}
                </div>    
            </v-card-text>
            <v-card-actions>
            
                <v-spacer></v-spacer>
                <div class="my-2 text-body-1 ">
                Comentario  #{{ index2+1 }} a la Respuesta #{{comentario.Num_Respuesta }}   -  Fecha:    {{ comentario.Fecha_Comentario }}
                </div> 
            </v-card-actions>
            </v-card>
          </div>
          </ul>
          <br>
      </div>
    </div>

    

  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      dialogComentario: false,
      nuevoComentario: null,
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
      fecha_bd: '',
      pregunta: [],
      respuestas: [],
      comentarios: []
    };
  },
  methods: {
    dialogFuncion() {
      this.dialog = false;
    },
    agregarComentarioARespuesta() {
    const comentario = this.nuevoComentario.trim();

    if (!comentario) {
      return; // Si el comentario está vacío, no se agrega nada
    }

    const respuestaId = this.respuestaSeleccionada.Num_Respuesta;
    const userId = sessionStorage.getItem('ID');

    axios
      .post('http://localhost/PC/nuevo-project/backend/agregarcomentario.php', {
        datoscomentario: JSON.stringify({
          Num_Respuesta: respuestaId,
          ID_User_Comentario: userId,
          comentario: comentario,
        }),
      })
      .then((response) => {
        if (response.data.success) {
          // Comentario agregado exitosamente, actualizar lista de comentarios
          this.respuestaSeleccionada.comentarios.push({
            Num_Respuesta: respuestaId,
            ID_User_Comentario: userId,
            comentario: comentario,
            Fecha_Comentario: this.printDate(),
            // (Si tienes el nombre del usuario, también puedes agregarlo aquí)
          });

          // Limpiar el campo de texto del comentario
          this.nuevoComentario = '';

          // Cerrar el cuadro de diálogo
          this.dialogComentario = false;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
    agregarComentario(indexRespuesta) {
    // Guardar la respuesta seleccionada para agregar el comentario
    this.respuestaSeleccionada = this.respuestas[indexRespuesta];

    // Mostrar el cuadro de diálogo de agregar comentario
    this.dialogComentario = true;
     },
    responderPregunta() {
              
            this.Fecha_Resp = this.printDate(); 
            console.log(this.Fecha_Resp);
              axios.post("http://localhost/PC/nuevo-project/backend/responderpregunta.php", 
              {
                  
                  datosresponder:JSON.stringify({ID_p:this.idpregunta, respuesta_p:this.respuestap,Fecha_R:this.Fecha_Resp,ID_u_Resp:sessionStorage.getItem('ID')}) 
              })
              .then(response =>{ 
                 
                 if (response.data.success) {
                          //alert('Respuesta Registrada Exitosamente');
                        }
                  this.$router.go(0)
              }); 
      
            },
            printDate: function () {
                    this.fecha = new Date().toLocaleDateString();
                    if(this.fecha[2] == '/' && this.fecha[4] == '/')
                    {
                        this.fecha_a=this.fecha.slice(5)
                        this.fecha_m=this.fecha.slice(3,-5);
                        this.fecha_d=this.fecha.slice(0,-7);
                        
                    }else{
                     
                     if(this.fecha[1] == '/' && this.fecha[4] == '/' )
                      {
                        
                        this.fecha_a=this.fecha.slice(5)
                        this.fecha_m=this.fecha.slice(2,-5);
                        this.fecha_d=this.fecha.slice(0,-8);
                        
                      }else{
                        if(this.fecha[1] == '/' && this.fecha[3] == '/' )
                        {
                          
                          this.fecha_a=this.fecha.slice(4)
                          this.fecha_m=this.fecha.slice(2,-5);
                          this.fecha_d=this.fecha.slice(0,-7);
                        }else{}
                          
                          this.fecha_a=this.fecha.slice(6)
                          this.fecha_m=this.fecha.slice(3,-5);
                          this.fecha_d=this.fecha.slice(0,-8);
                      }      
                    }
                    this.fecha_bd=this.fecha_a+ '/' +this.fecha_m+ '/' +this.fecha_d;
                   
                    return  this.fecha_bd;
            },
  },
  beforeCreate() {
    if (sessionStorage.getItem('Nombre') == null) {
      sessionStorage.setItem('validadorlogin', true);
      this.$router.push('/login');
    }
  },
  mounted() {
    const preguntaId = this.$route.params.id; // Obtener el ID de la pregunta de la ruta
    
    // Realizar una solicitud al backend para obtener los detalles de la pregunta
    // y sus respuestas y comentarios relacionados utilizando el ID de la pregunta
    
    // Ejemplo de solicitud utilizando axios
    axios.get(`http://localhost/PC/nuevo-project/backend/detallesPregunta.php?id=${preguntaId}`)
      .then(response => {
        console.log(response.data);
        this.pregunta = response.data.pregunta;
        this.respuestas = response.data.respuestas;
      })
      .catch(error => {
        console.error(error);
      });
  },
};
</script>