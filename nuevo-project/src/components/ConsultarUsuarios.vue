<template>
    <v-card>
      <v-card-title>
        Usuarios
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="Usuarios"
        :search="search"
      ></v-data-table>
      <center>
        <h3>Deshabilitar Usuario</h3>
        <v-container>
        <v-col cols="5">
            <v-text-field
              inset
              label="Ingrese Correo de Usuario a Deshabilitar / Habilitar"
              solo
              :required="isRequiredField"
              v-model="nivelDeshabilitar"
            ></v-text-field>
            <v-btn color="indigo" class="mr-2" @click.prevent="deshabilitarUser">
              <span class="white--text">Deshabilitar</span>
            </v-btn>
            <v-btn color="indigo" @click.prevent="habilitarUser">
              <span class="white--text">Habilitar</span>
            </v-btn>
        </v-col>
        </v-container>
      </center>
    </v-card>
  </template>
  
  
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        isRequiredField: true,
        nivelDeshabilitar:null,
        Usuarios: [],
        search: '',
        headers: [
          { text: 'ID', value: 'ID_User' },
          { text: 'Nombre', align: 'start', sortable: false, value: 'Nombre_User' },
          { text: 'Nivel', value: 'Nivel_User' },
          { text: 'Correo', value: 'Correo_User' },
          { text: 'Numero de Respuestas', value: 'Num_Resp' },
          { text: 'Departamento de Usuario', value: 'Nombre_Departamento' },
          { text: 'Habilitado', value: 'Habilitado' },
        ],
        rules: {
          required: value => !!value || 'Requerido',
          min: v => v.length >= 8 || 'Minimo 8 caracteres',
          counter: value => value.length <= 30 || 'Maximo 20 caracteres',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Email Invalido.'
          }
         },
      };
    },
    methods: {


        async getUsuarios() {
        try {
        const response = await axios.post("http://localhost/PC/nuevo-project/backend/getUsuarios.php", {
            datosUsuarios: JSON.stringify({}),
        });
        this.Usuarios = response.data;
        } catch (error) {
        console.error(error);
        // Aquí puedes manejar errores si ocurre algún problema durante la solicitud
        }
    },

        async deshabilitarUser() {
            
            if ( this.nivelDeshabilitar == null) {
                alert('Indique el correo del Usuario a Deshabilitar'); // Puedes mostrar un mensaje de error al usuario
            return;
            }    



            try {
            const response = await axios.post("http://localhost/PC/nuevo-project/backend/deshabilitarUser.php", 
                    {datosUsuario:JSON.stringify({Nivel_deshabilitar:this.nivelDeshabilitar}) 
                    }
                    )
                    .then(response =>{   
                    if (response.data.success) {
                        this.nivelDeshabilitar= null;
                        
                        alert('Deshabilitado Usuario de Manera Exitosa');
                        this.getUsuarios();
                    }
                    });  
            } catch (error) {
            console.error(error);
            // Aquí puedes manejar errores si ocurre algún problema durante la solicitud
            }
        },
        async habilitarUser() {
            
            if ( this.nivelDeshabilitar == null) {
                alert('Indique el correo del Usuario Habilitar'); // Puedes mostrar un mensaje de error al usuario
            return;
            }    



            try {
            const response = await axios.post("http://localhost/PC/nuevo-project/backend/habilitarUser.php", 
                    {datosUsuario:JSON.stringify({Nivel_deshabilitar:this.nivelDeshabilitar}) 
                    }
                    )
                    .then(response =>{   
                    if (response.data.success) {
                        this.nivelDeshabilitar= null;
                       
                        alert('Habilitado Usuario de Manera Exitosa');
                        this.getUsuarios();
                    }
                    });  
                    

            } catch (error) {
            console.error(error);
            // Aquí puedes manejar errores si ocurre algún problema durante la solicitud
            }
            
        },
    },
    mounted() {
      axios.post('http://localhost/PC/nuevo-project/backend/getUsuarios.php', {
          datosUsuarios: JSON.stringify({}),
        })
        .then((response) => {
          this.Usuarios = response.data;
          
        });
    },
  };
  </script>
  