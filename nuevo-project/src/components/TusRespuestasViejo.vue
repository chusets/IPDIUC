<template>
  <div v-if="TusRespu!=null">
    <div class="col " id="example-2">
        
          <div v-if="TusRespu.length === 0">
            <div style="display: flex; justify-content: center">
              No has respondido ninguna pregunta
            </div>
          </div>
        
        
        <div v-for="TusResp in TusRespu">
          <v-card class="mx-auto"  outlined>
            <v-card-text>
                
                  <div class=" mb-3 text-body-1 font-weight-black">

                    {{ TusResp.TituloP }}

                  </div>
                <div class="text-body-1">
                  
                  <v-icon class="mr-10">mdi-comment-question</v-icon>

            
                  {{ TusResp.Pregunt }}

                  - {{ TusResp.Fecha_Pregunta }}
                </div>

                
          </v-card-text>
          <v-divider inset ></v-divider>
          <v-card-text>
              

                <div class="my-2 text-body-1">
                  
                  <v-icon class="mr-10">mdi-checkbox-multiple-marked</v-icon>
                  {{ TusResp.Respuesta }}

                  - {{ TusResp.Fecha_Respuesta }}
                </div>

                
          </v-card-text>
              
          
            
          
          </v-card>
          <br>
        </div>
    </div>
  </div>
</template>


<script>
  import axios from 'axios';
  export default {
    data () {
      return {
        TusRespu:null,
        
      
      }
    },

    beforeCreate() {
      if(sessionStorage.getItem('Nombre') == null  ){
        sessionStorage.setItem('validadorlogin', true);
        this.$router.push('/login');
      }
    },
    mounted(){
      axios.post("http://localhost/PC/nuevo-project/backend/getTusResp.php", 
      {
          datosPregResp:JSON.stringify({ID_u_Resp:sessionStorage.getItem('ID')}) 
      })
      .then(response =>{           
            this.TusRespu=response.data;
      })  
      
    },
  }
</script>