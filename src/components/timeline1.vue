<template>
  <div class="tline">
    <Timeline ref="timeline"
      :items="items"
      :groups="groups"
      :options="options"
      :events="['click', 'select']"
      @click="timelineClick" 
      @select="timelineSelect"
    >
    </Timeline>
  </div>
</template>

<script>
import { Timeline } from 'vue2vis'
import 'vue2vis/dist/vue2vis.css'
import axios from 'axios'
export default{
  components: {
    Timeline
  },
  methods:{
    timelineClick: function( obj ){
      console.log("clickw",obj);
    },
    timelineSelect: function( obj ){
      console.log("select",obj);
      let self = this;
      return axios.get('/api/reservations/' + obj.items[0])
        .then( function(response){
          
          self.$store.commit('setSelectedReservation', response.data);
          self.$store.commit('setSelectedOriginalReservation', response.data);
          //self.reservation = response.data;
       
          //this.$router.push({ name: 'reservation', params: { reservationid: obj.items[0] }   });
          self.$emit('reservationSelected', obj.items[0]);         
          
        });      
      

    }
  },
  props: {
    items: Array,
    groups: Array,
    options: Object
  }
}
</script>

<style>
.red{
  background-color: limegreen !important;
  border-color: #000 !important;
}
.vis-item {
  border-color: orange;
  background-color: yellow;
}
.tline{
  font-size: .75em;
}


</style>