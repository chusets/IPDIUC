<template>
 
 


 



    <div class="col " id="example-1">
      <div   v-for="(PregDis, index) in PregDisp">
        <v-card class="mx-auto"  outlined>
          
          
          <v-card-text>
             <div class="text-body-1 font-weight-black">
                Titulo {{ PregDis.TituloP }}
              </div>

              <div class="my-2 text-body-1 ">
                {{ PregDis.Pregunt }}
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
                      @click="(preguntp = PregDis.Pregunt, idpregunta = PregDis.Num_Pregunta,tituloPreg = PregDis.TituloP)"
                    >
                      Responder
                    </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <div class="my-2 text-body-1">
                      <b>Titulo {{ tituloPreg }}</b>
                
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


            <v-spacer></v-spacer>
            <div class="my-2 text-body-1 ">
             Pregunta  #{{ PregDis.Num_Pregunta }}    -  Fecha:    {{ PregDis.Fecha_Pregunta }}
            </div> 
        </v-card-actions>
          
         
        </v-card>
        <br>
      </div>
      
    </div>















    



</template>


<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        PregDisp:[],n:null,i:0,dialog: false, respuesta:null, indiceP:null, preguntp:null,idpregunta:null,ResponderPArray:null,respuestap:null,ID_User_resp:null,
        tituloPreg:null, Fecha_Resp:null, fecha_aux:[], fecha:null, fecha_a:'', fecha_m:'',fecha_d:'',fecha_bd:''
       
      
      }
    },

    beforeCreate() {
      if(sessionStorage.getItem('Nombre') == null  ){
        sessionStorage.setItem('validadorlogin', true);
        this.$router.push('/login');
      }
    },
    mounted(){
      this.Fecha_Resp = this.printDate();
      
      axios.post("http://localhost/PC/nuevo-project/backend/getPregDisp.php", 
      {
          //datosPregDisp:JSON.stringify({}) 
      })
      .then(response =>{           
            this.PregDisp=response.data;
  
           
      })  
      
    },
    methods: {
      dialogFuncion () {
        this.dialog = false
      },
      responderPregunta() {
              
        
        axios.post("http://localhost/PC/nuevo-project/backend/responderpregunta.php", 
        {
            
            datosresponder:JSON.stringify({ID_p:this.idpregunta, respuesta_p:this.respuestap,Fecha_R:this.Fecha_Resp,ID_u_Resp:sessionStorage.getItem('ID')}) 
        })
        .then(response =>{ 
           //this.ResponderPArray=response.data;
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
    
  }

</script>


<style>
.cards_PreguntasDisponibles
{
  padding: 10em 10em 10em 10m;
  
}
</style>