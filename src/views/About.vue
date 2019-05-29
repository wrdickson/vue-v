<template>
  <div>
    <h3>About</h3>
    <v-text-field
      v-model="testVal.a"
      label="testVal"
    >
    </v-text-field>
    <div>testVal (data): {{ testVal }}</div>
    <div>testComputed (computed):{{ testComputed.a }}</div>
    <hr/>
    <v-btn color="success" @click="checkA">CheckA</v-btn>

  </div>    
</template>

<script>
  import api from './../api/api.js'
  export default{
    computed: {
      testComputed:{
        get: function(){
          return this.$store.getters.getTestVal
        }     
      }
    },
    data: function(){
      return {
        testVal: this.$store.getters.getTestVal
      }
    },
    methods: {
      checkA: function(){
        let start = '2018-11-24';
        let end = '2018-11-29';
        api.checkAvailabilityByDates( start,end ).then( 
          function(response){
            console.log("response",response);
        })
      }
    }
  }
</script>
