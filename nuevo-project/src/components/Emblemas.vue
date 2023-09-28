<template>
  <div class="col " id="example-2">
      

      <div class=" mx-1
       text-body-1 font-weight-black">

                  Emblemas Recibidos

      </div>
        <v-card class="my-2 text-body-1"  outlined>
          
          
          <v-card-text>
              
               
              <div class="text-body-1">
                <span   v-for="Embl in Emble">
                    
                  
                    <span v-if="Embl.ID_Emb_User === 1 && NombreEmble.length > 0  ">
                      
                      <v-icon class="mx-2 my-2 ">mdi-clock-fast</v-icon>
                      {{NombreEmble[Embl.ID_Emb_User-1].Nombre_Emblema}}
                     
                    </span>


                    <span v-else-if="Embl.ID_Emb_User === 2 && NombreEmble.length > 0">
                      <v-icon class="mx-2 my-2 ">mdi-medal</v-icon>
                       {{NombreEmble[Embl.ID_Emb_User-1].Nombre_Emblema}}
                        
                    </span>
                    <span v-else-if="Embl.ID_Emb_User === 3 && NombreEmble.length > 0">
                      <v-icon class="mx-2 my-2 ">mdi-podium</v-icon>
                      {{NombreEmble[Embl.ID_Emb_User-1].Nombre_Emblema}}
                        
                    </span>
                    
                </span>
                    
              </div>

              
        </v-card-text>
        
        
            
        
          
         
        </v-card>
        <br>
      
    </div>
</template>


<script>
  import axios from 'axios';
  export default {
    data () {
      return {
        //Emble:["Emblema 1", "Emblema 2"],
        Emble:[],
        NombreEmble:[],
      }
    },

    beforeCreate() {
      if(sessionStorage.getItem('Nombre') == null  ){
        sessionStorage.setItem('validadorlogin', true);
        this.$router.push('/login');
      }
    },
    
    created(){
      axios.post("http://localhost/PC/nuevo-project/backend/gettieneEmblemas.php", 
      {
          datosEmblemas:JSON.stringify({ID_u_Embl:sessionStorage.getItem('ID')}) 
      })
      .then(response =>{           
           this.Emble=response.data;
             
           
      }),
      
      axios.post("http://localhost/PC/nuevo-project/backend/getEmblemas.php", 
      {
          datosNombreEmblemas:JSON.stringify() 
      })
      .then(response =>{           
           this.NombreEmble=response.data;
        
           
      })  
      
      
    }
  }
</script>