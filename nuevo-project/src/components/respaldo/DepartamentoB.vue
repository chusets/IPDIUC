<template>
  <div class="about">
    <h1>Eepartamento B</h1>
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

        this.$router.push('/login');
      }
    }
  }
</script>