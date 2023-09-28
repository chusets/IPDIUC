<template>
 <div class="col " id="example-2">
      <div   v-for="(PregRes, index) in PregResp">
        <v-card class="mx-auto"  outlined>
          
          
          <v-card-text>
              
                <div class=" mb-3 text-body-1 font-weight-black">

                 {{ PregRes.TituloP }}

                </div>
              <div class="text-body-1">
                
                <v-icon class="mr-10">mdi-comment-question</v-icon>

          
                {{ PregRes.Pregunt }}

                - {{ PregRes.Fecha_Pregunta }}
              </div>

              
        </v-card-text>
        <v-divider inset ></v-divider>
        <v-card-text>
             

              <div class="my-2 text-body-1">
                
                <v-icon class="mr-10">mdi-checkbox-multiple-marked</v-icon>
                {{ PregRes.Respuesta }}

                - {{ PregRes.Fecha_Respuesta }}
              </div>

              
        </v-card-text>
            
        
          
         
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
        PregResp:[],n:null,i:0,dialog: false, respuesta:null, indiceP:null, preguntp:null,idpregunta:null,ResponderPArray:null,respuestap:null,ID_User_resp:null,
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
      this.ID_User = sessionStorage.getItem('ID');
      axios.post("http://localhost/PC/nuevo-project/backend/getPregResp.php", 
      {
          
      })
      .then(response =>{           
            this.PregResp=response.data;
      })  
      
    },
    methods: {
      dialogFuncion () {
        this.dialog = false
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


