<template>
<div>
  <v-btn @click="returnToTimeline">Timeline</v-btn>
  <T1 v-on:reservationSelected="fireReservationView" v-if="showTimeline" :groups="groups" :items="reservations1" :options="options"/>
  <Reservation 
    transition="slide-x-transition"
    v-if="showReservation"
    v-bind:reservationid="selectedReservationId"
  />

</div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'
export default {
  components:{
    T1: () => import('./../components/timeline1.vue'),
    Reservation: () => import('./../views/Reservation.vue')
    
  },
  computed:{
    reservations1(){
      let dbItems = [];
      _.forEach( this.$store.getters.getReservations , function( value ){
        let iItem = {
          className: 'red',
          id: value.id,
          group: value.space_id,
          content: "cust-" + value.customer,
          start: moment(value.checkin).format('YYYY-MM-DD') + " 00:00:00",
          end: moment(value.checkout).format('YYYY-MM-DD')+ " 00:00:00"
        }
        dbItems.push(iItem);
      })
      return dbItems;
    }    
  },
  data(){
    return {
      groups: [
      {
        id: 9,
        content: 'Dorm 0',
        nestedGroups: [1,2,3,4,5,6,7,8],
        showNested: true,
        visible: true
      },
      {
        id: 1,
        content: 'Bed 1',
        visible: true
      },
      {
        id: 2,
        content: 'Bed 2',
        visible: true
      },
      {
        id: 3,
        content: 'Bed 3',
        visible: true
      },
      {
        id: 4,
        content: 'Bed 4',
        visible: true
      },
      {
        id: 5,
        content: 'Bed 5',
        visible: true
      },
      {
        id: 6,
        content: 'Bed 6',
        visible: true
      },
      {
        id: 7,
        content: 'Bed 7',
        visible: true
      },
      {
        id: 8,
        content: 'Bed 8',
        visible: true
      },
      {
        id: 180,
        content: 'La Casa',
        visible: true,

      },
      {
        id: 183,
        content: 'Room 18',
        visible: true
      },
      {
        id: 193,
        content: 'Room 19',
        visible: true
      },
      {
        id: 204,
        content: 'Room 20',
        nestedGroups: [200,201,202,203],
        showNested: false,
        visible: true
      },
      {
        id: 200, 
        content: 'Bed 1',
        visible: true
      },
      {
        id: 201, 
        content: 'Bed 2',
        visible: true
      },
      {
        id: 202, 
        content: 'Bed 3',
        visible: true
      },
      {
        id: 203, 
        content: 'Bed 4',
        visible: true
      },
      {
        id: 211,
        content: 'Room 21',
        visible: true
      },
      {
        id: 222,
        content: 'Room 22',
        visible: true
      },
      {
        id: 236,
        content: 'Room 23',
        nestedGroups: [230,231,232,233,234,235],
        showNested: false,
        visible: true
      },
      {
        id: 230,
        content: 'Bed 1'
      },
      {
        id: 231,
        content: 'Bed 2'
      },
      {
        id: 232,
        content: 'Bed 3'
      },
      {
        id: 233,
        content: 'Bed 4'
      },
      {
        id: 234,
        content: 'Bed 5'
      },
      {
        id: 235,
        content: 'Bed 6'
      },
      ],
      items: [],
      options: {
        
        editable: false,
        maxHeight: '500px',
        orientation: 'both',
        stack: false,
        start: "2018-11-15",
        end: "2018-11-28",
        timeAxis: {
          scale: 'day',
          step: 1
        },
        verticalScroll: true,
        horizontalScroll: true,
        moveable: true,
        zoomable: true,
        zoomKey: 'ctrlKey'
      },
      selectedReservationId: 0,
      showReservation: false,
      showTimeline: true
    }
  },  
  methods: {
    loadReservations: function(){
      this.$store.dispatch('getReservations');
    },
    returnToTimeline: function(){
      this.showTimeline = true;
      this.showReservation = false;
    },
    fireReservationView: function(resId){
      console.log("frie",resId);
      this.selectedReservationId = resId;
      this.showTimeline = false;
      this.showReservation = true;
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      this.$store.dispatch('getReservations');

    })
  }  

}

</script>