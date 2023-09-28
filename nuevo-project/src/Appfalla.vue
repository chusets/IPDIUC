<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<template>
  <v-app>
    <v-app-bar
      app
      color="blue darken-3"
      flat
    >
      
     <v-container fluid class="py-0 fill-height">
               
        
            <v-btn  v-show="Nivel_u != null " icon class="py-0 fill-height">
              <v-avatar color="white">
                <v-icon dark>
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </v-btn>
            
          
          
              
           
         

    

       

        <v-spacer></v-spacer>
        
        

            
      
        <v-btn v-show="Nivel_u != null "
         color="indigo" to="/login" > 
         <span class="AccederNav white--text" >Acceder</span>
        </v-btn>


        <v-btn v-show="Nivel_u != null " icon  @click.prevent="cerrarSesion">
          <v-icon x-large color="white" link >
                fas fa-sign-out-alt
          </v-icon>
        </v-btn>
        
      </v-container>

         
      
       

        <v-spacer></v-spacer>

    </v-app-bar>
    
    <v-main class="grey lighten-3">
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
            
            <v-list-item v-show="Nivel_u>0"  class="margenMenuNav" to="/PerfilNivel1" @click="Bcondition()">
              <v-list-item-icon>
                 
                  <v-icon> mdi-account</v-icon>
                 
              </v-list-item-icon>
                <div class="menunav">
                  Perfil    
                </div> 
            </v-list-item>

            <v-list-item v-show="Nivel_u==2"  to="/Registro" class="margenMenuNav" @click="Bcondition()">
                  <v-list-item-icon>
                     <v-icon> mdi-folder-open</v-icon>
                  </v-list-item-icon>
                  <div class="menunav">
                    Registro
                  </div> 
              </v-list-item>
              <v-list-item  v-show="Nivel_u==1" to="/PreguntasAbiertas" class="margenMenuNav" @click="Bcondition()">
                  <v-list-item-icon>
                     <v-icon> mdi-folder-open</v-icon>
                  </v-list-item-icon>
                  <div class="menunav">
                    Preguntas Abiertas
                  </div> 
              </v-list-item>
               <v-list-item v-show="Nivel_u==1" to="/PreguntasRealizadas" class="margenMenuNav" @click="Bcondition()" >
                    <v-list-item-icon>
                     <v-icon> mdi-folder</v-icon>
                    </v-list-item-icon>
                    <div class="menunav">
                      Preguntas Realizadas
                    </div> 
                </v-list-item>
                <v-list-item v-show="Nivel_u==1" to="/PreguntasRespuestasExistentes" class="margenMenuNav" @click="Bcondition()" >
                  <v-list-item-icon>
                     <v-icon> mdi-folder-multiple</v-icon>
                   </v-list-item-icon>
                   <div class="menunav">
                      Preguntas/Respuestas Existentes
                  </div> 
                </v-list-item>

                 <v-list-group
                    v-show="Nivel_u==1"
                    v-for="item in itemsDepartamento"
                    :key="item.title"
                    class="margenMenuNav"
                    >
                    <template v-slot:activator>
                      <v-list-item-content>
                         <v-list-item-icon >
                     <v-icon class="margenIconoDepartamentosSuperior"> mdi-domain</v-icon>
                       </v-list-item-icon>
                        <div class="menuDepartamentosSuperior">
                          <v-list-item-title v-text="item.title" ></v-list-item-title>
                        </div> 
                        
                      </v-list-item-content>
                    </template>

                    <v-list-item
                      v-for="child in item.items"
                      :key="child.title"
                      :to="child.ruta"
                      @click="Bcondition()"
                    >
                      <v-list-item-content>
                        <div class="margenIconoDepartamentosInferior">
                          <v-list-item-title v-text="child.title"></v-list-item-title>
                        </div> 
                      </v-list-item-content>
                    </v-list-item>
                </v-list-group>

              <v-list-group
                    v-show="Nivel_u==1"
                    v-for="item in itemsManualesGuias"
                    :key="item.title"
                    class="margenMenuNav"
                    >
                    <template v-slot:activator>
                      <v-list-item-content>
                         <v-list-item-icon >
                     <v-icon class="margenIconoDepartamentosSuperior"> mdi-book-open-variant</v-icon>
                       </v-list-item-icon>
                        <div class="menuDepartamentosSuperior">
                          <v-list-item-title v-text="item.title" ></v-list-item-title>
                        </div> 
                        
                      </v-list-item-content>
                    </template>

                    <v-list-item
                      v-for="child in item.items"
                      :key="child.title"
                      :to="child.ruta"
                      @click="Bcondition()"
                    >
                      <v-list-item-content>
                        <div class="margenIconoDepartamentosInferior">
                          <v-list-item-title v-text="child.title"></v-list-item-title>
                        </div> 
                      </v-list-item-content>
                    </v-list-item>
                </v-list-group>

                <v-list-item  v-show="Nivel_u==2" to="/TusRespuestas" class="margenMenuNav" @click="Bcondition()" >
                  <v-list-item-icon>
                     <v-icon> mdi-checkbox-multiple-marked-outline </v-icon>
                  </v-list-item-icon>
                  <div class="menunav">
                      Tus Respuestas
                  </div>   
                </v-list-item>

                <v-list-item  v-show="Nivel_u==2" to="/PreguntasDisponibles" class="margenMenuNav" @click="Bcondition()" >
                  <v-list-item-icon>
                     <v-icon> mdi-chat-processing </v-icon>
                  </v-list-item-icon>
                  <div class="menunav">
                      Preguntas Disponibles
                  </div>   
                </v-list-item>

                <v-list-item  v-show="Nivel_u==2" to="/RankingdeAporteMensual" class="margenMenuNav" @click="Bcondition()" >
                  <v-list-item-icon>
                     <v-icon> mdi-chart-areaspline-variant </v-icon>
                  </v-list-item-icon>
                  <div class="menunav">
                      Ranking de Aporte Mensual
                  </div>   
                </v-list-item>

                <v-list-item  v-show="Nivel_u==2" to="/Emblemas" class="margenMenuNav" @click="Bcondition()" >
                  <v-list-item-icon>
                     <v-icon> mdi-shield </v-icon>
                  </v-list-item-icon>
                  <div class="menunav">
                      Emblemas
                  </div>   
                </v-list-item>

                 <v-list-item v-show="Nivel_u != null " to="/NormasdeLaInstitucion" class="margenMenuNav" @click="Bcondition()" >
                  <v-list-item-icon>
                     <v-icon> mdi-clipboard-text</v-icon>
                  </v-list-item-icon>
                  <div class="menunav">
                      Normas de La Institución
                  </div>   
                </v-list-item>
               

               
    

                
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="8"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
                        

          
           
          
         <v-row>
              <v-col cols="3" inset>
                
            
            <router-view/>
          
        <login v-show="Nivel_u == null "></login>
          
      
       
         
       
   


















            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
            <v-responsive >
               <v-layout v-show="condition">
                  
                  <v-text-field 
                    dense
                    flat
                    hide-details
                    rounded
                    solo
                    prepend-inner-icon="mdi-magnify"
                    clearable
                  ></v-text-field>
                  <v-btn icon>
                    <v-icon medium color="#8E8E8E" link >
                      mdi-send
                    </v-icon>
                  </v-btn>
                </v-layout>
                <div>
                     
                     
                     <v-row v-show="Nivel_u != null "
                        justify="center"
                        align="center">
                          <br>
                          <v-subheader ><h3 >Preguntas Frecuentes</h3></v-subheader>
                        
                        </v-row>
                        <v-sheet
                          rounded="lg"
                          min-height="270"
                        >
                        <v-container
                          id="scroll-target"
                          style="max-height: 400px"
                          class="overflow-y-auto"
                        >
                        
                          <v-row
                            v-scroll:#scroll-target="onScroll"
                            align="center"
                            justify="center"
                            style="height: 1000px"
                          >
                          </v-row>
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
import PerfilNivel1 from "@/components/PerfilNivel1.vue";
import PreguntasAbiertas from "@/components/PreguntasAbiertas.vue";
import Departamentos from "@/components/PreguntasAbiertas.vue";
import ManualesyGuias from "@/components/ManualesyGuias.vue";
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
import Buscador from "@/components/buscador.vue";

export default {
  name: 'App',

  components: {
    PerfilNivel1,
    Registro,
    PreguntasAbiertas,
    Departamentos,
    ManualesyGuias,
    NormasdeLaInstitucion,
    PreguntasAbiertas,
    PreguntasRespuestasExistentes,
    PreguntasRealizadas,
    Menu,
    login,
    Emblemas,
    TusRespuestas,
    PreguntasDisponibles,
    RankingdeAporteMensual
  },

  data: () => ({
      scrollInvoked: 0,
      Nivel_u:null,
      condition:false,
      itemsDepartamento: [
        {
          items: [
            { title: 'Departamento A', ruta: "/DepartamentoA"  },
            { title: 'Departamento B',  ruta: "/DepartamentoB" },
            { title: 'Departamento C', ruta: "/DepartamentoC"  },
          ],
            title: 'Departamentos',
        }
        
      ], itemsManualesGuias: [
        {
          items: [
            { title: 'Basicos', ruta: "/DepartamentoA"  },
            { title: 'Departamento A',  ruta: "/DepartamentoB" },
            { title: 'Departamento B',  ruta: "/DepartamentoB" },
            { title: 'Departamento C', ruta: "/DepartamentoC"  },
          ],
            title: 'Manuales',
        }
        
      ],
    }),
    created(){
      this.Nivel_u=sessionStorage.getItem('Nivel');
      
    },
    updated(){
      this.Nivel_u=sessionStorage.getItem('Nivel');
      
    },
    methods: {
      onScroll () {
        this.scrollInvoked++
      },
      Bcondition(){
        this.condition=true
      },
      cerrarSesion() {
        sessionStorage.removeItem('Nombre');
        sessionStorage.removeItem('ID');
        sessionStorage.removeItem('Nivel');
        this.$router.push('/');
         
      }

      
    },
};
</script>
<style>

.menunav {
  margin: 0em 0em 0em -1em
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

.margenMenuNav
{
  margin: 0em 10px 0em -10px;
}

.AccederNav
{
  margin: 0em 0em 0em 0m;
  
}
</style>