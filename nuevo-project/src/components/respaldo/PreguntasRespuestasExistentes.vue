<template>
  <div class="about">
    <h1>This is an about page</h1>
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