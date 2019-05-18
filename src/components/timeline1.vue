<template>
  <div class="tline grey lighten-5">
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
import moment from 'moment'
import 'vue2vis/dist/vue2vis.css'
import axios from 'axios'
export default{
  components: {
    Timeline
  },
  methods:{
    timelineClick: function( obj ){
      //test to see if the user clicked on a reservation (item)
      //or if they clicked on an empty date
      if(obj.item == null){
        //obj.group is the space_id of the selected item (room,house, whatever)
        //obj.time is the time string emitted by the timeline @ click
        //get space code from store
        let spaceObj = this.$store.getters.getSpaces[obj.group];
        //create a parms object
        var params = {
          space_id: obj.group.toString(),
          //store has space_code for each space_id from initial db load . . .
          space_code: spaceObj.space_code,
          space_type: spaceObj.space_type,
          checkin: moment(obj.time).format('YYYY-MM-DD'),
          checkout: moment(obj.time).add( 1,'days' ).format('YYYY-MM-DD'),
          customer: {
            id: '0',
            firstName: '',
            lastName: '',
            address1: '',
            address2: '',
            city: '',
            region: '',
            country: '',
            postalCode: '',
            email: '',
            phone: ''
          },
          beds: '1',
          people: '1',
          folio: '0',
          history: [],
          status: '0',
          notes: []
        }
        //commit this to store
        this.$store.commit('setCreateReservation', params);
        //fire the route
        this.$router.push('createReservation');          
      }

      
      
    },
    //this fires when the user clicks on an item ie. a reservation
    timelineSelect: function( obj ){
      console.log("select",obj);
      let self = this;
      this.$store.commit('showLoader');
      return axios.get('/api/reservations/' + obj.items[0])
        .then( function(response){
          self.$store.commit('hideLoader');
          self.$store.commit('setSelectedReservation', response.data);
          self.$store.commit('setSelectedOriginalReservation', response.data);
          //emit an event back to Reservations.vue which will handle it
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
  font-size: .85em;
}

</style>