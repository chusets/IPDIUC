<template>

  <div >
        <h3><center>Manuales Basicos</center></h3>
        <br>
        <v-card-text >
        <h3>Manual Basico 1</h3>
         <a href="#">
            Descargar
        </a>
        <br><br><h3>Manual Basico 2</h3>
        <a href="#">
            Descargar
        </a>
        <br><br><h3>Manual Basico 3</h3>
        <a href="#">
            Descargar
        </a>
        <br><br><h3>Manual Basico 4</h3>
        <a href="#">
            Descargar
        </a>
        <br><br><h3>Manual Basico 5</h3>
        <a href="#">
            Descargar
        </a>
        <br><br> <h3>Manual Basico 6</h3>
        <a href="#">
            Descargar
        </a>
        <br><br><h3>Manual Basico 7</h3>
        <a href="#">
            Descargar
        </a> 
        <br><br><h3>Manual Basico 8</h3>
        <a href="#">
            Descargar
        </a>
        <br><br><h3>Manual Basico 9</h3>
        <a href="#">
            Descargar
        </a>
        </v-card-text>
  </div>


</template>


<script>
  export default {
    data () {
      return {
      
      }
    },

    beforeCreate() {
      if(sessionStorage.getItem('Nombre') == null  ){
        sessionStorage.setItem('validadorlogin', true);
        this.$router.push('/login');
      }
    },
  }
</script>