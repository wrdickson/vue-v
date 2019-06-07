<template>
  <div>
    <v-form class="compactForm">
      <v-layout row wrap >
        <v-flex xs6 sm4 md3>
        
          <!-- Checkin datepicker -->
          <v-menu
            ref="ciMenu"
            v-model="checkinMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="reservation.checkin"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="checkinFormatted"
                label="Checkin"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker 
              v-model="reservation.checkin" 
              @input="ciInput"
            />
          </v-menu>
        </v-flex>
        
        <!-- Checkout datepicker -->
        <v-flex xs6 sm4 md3>
          <v-menu
            ref="coMenu"
            v-model="checkoutMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="reservation.checkout"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="checkoutFormatted"
                label="Checkout"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker 
              v-model="reservation.checkout" 
              @input="coInput"
              />
          </v-menu>
        </v-flex>
        
        <!-- Space picker dialog -->
        <v-flex xs6 sm4 md3>
          <v-text-field
            label="Space"
            required
            v-model="spaceName"
            @click="spaceModal"
          ></v-text-field>
          <v-dialog
            v-model="spaceDialog"
            max-width="290"
          >
            <v-card>
              <v-card-text>
                <ul class="spaceList">
                  <li v-for="item in selectGroupsFilterByDateAvailability"
                    v-bind:key="item.title"
                  >
                    <v-select
                      :items="item.groups"
                      :label="item.title"
                      @change="spaceSelect"
                      
                    >
                    </v-select>
                  </li>
                </ul>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  @click="spaceDialog = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>        
        </v-flex>
        
        <!-- People select -->  
        <v-flex xs3 sm3 md1>
          <v-select
            :items="peopleOptions"
            v-model="peopleSelect"
            label="People"
            item-text="text"
            item-value="value"
          ></v-select>        
        </v-flex> 

        <!-- Beds select -->  
        <v-flex xs3 sm3 md1>
          <v-select
            :items="bedOptions"
            v-model="bedsSelect"
            label="Beds"
            item-text="text"
            item-value="value"
          ></v-select>        
        </v-flex>     
   
      </v-layout>
    </v-form>

  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import api from './../api/api.js'
export default{

  computed:{
    bedsSelect: {
      get: function(){
        return this.reservation.beds;
      },
      set: function(val){
        this.reservation.beds = val;
      }
    },
    checkinFormatted: {
      get: function(){
        return moment(this.reservation.checkin).format('MMM DD YYYY');
      }
    },
    checkoutFormatted: {
      get: function(){
        return moment(this.reservation.checkout).format('MMM DD YYYY');
      }
    },
    createReservationAvailableSpaces: {
      get: function(){
        return this.$store.getters.getCreateReservationAvailableSpaces;
        }
    },
    peopleSelect: {
      get: function(){
        return {
          text: this.reservation.people,
          value: this.reservation.people
          }
      },
      set: function(val){
        console.log("val",val);
        this.reservation.people = val;
      }
    }, 
    spaceName: function(){
      if(this.reservation.space_id > 0){
        return this.$store.getters.getSpaces[this.reservation.space_id].description;
      } else  { return '';}
    },
    selectGroups: function(){
      return this.$store.getters.getSelectGroups;
    },
    selectGroupsFilterByDateAvailability: function(){
      let self = this;
      let filtered = [];
      let selG = JSON.parse(JSON.stringify(this.selectGroups));
      _.forEach(selG, function (itGroup){
        let group = {};
        group.id = itGroup.id
        group.order = itGroup.order;
        group.title = itGroup.title;
        group.groups = [];
        _.forEach( itGroup.groups, function(subGroup){
          if( _.includes( self.createReservationAvailableSpaces, subGroup.space_id)){
            group.groups.push(subGroup);
          }
        });
        filtered.push(group);
      });
      return filtered;
    },
    spacesByType: function(){
      let self = this;
      let arr = [];
      _.each(this.spaceTypes, function(type){
          console.log("type @ it",type);
          arr[type.id] = _.filter(self.spaces, function(space){
            return space.space_type == type.id;
          });
      });
      return arr;
    }
  },
  created: function(){
    let self = this;
    this.$store.commit('showLoader');
    api.checkAvailabilityByDates( self.reservation.checkin, self.reservation.checkout ).then( 
      function( response ){
        self.$store.commit('hideLoader');
        self.$store.commit( 'setCreateReservationAvailableSpaces', Object.values(response.data.available_space_ids) );
        //self.checkinMenu = false;
      });    
  },
  data: function(){
    return{
      //note that value is a string . . . problems until I figured
      //this out
      bedOptions: [
        { text: "1", value: '1' },
        { text: "2", value: '2' },
        { text: "3", value: '3' },
        { text: "4", value: '4' },
        { text: "5", value: '5' },
        { text: "6", value: '6' },
        { text: "7", value: '7' },
        { text: "8", value: '8' },
        { text: "9", value: '9' },
        { text: "10", value: '10' },
        { text: "11", value: '11' },
        { text: "12", value: '12' }       
      ],
      //note that value is a string . . . problems until I figured
      //this out
      peopleOptions: [
        { text: "1", value: '1' },
        { text: "2", value: '2' },
        { text: "3", value: '3' },
        { text: "4", value: '4' },
        { text: "5", value: '5' },
        { text: "6", value: '6' },
        { text: "7", value: '7' },
        { text: "8", value: '8' },
        { text: "9", value: '9' },
        { text: "10", value: '10' },
        { text: "11", value: '11' },
        { text: "12", value: '12' }       
      ],
      //these control the visibility of the datepickers
      checkinMenu: false,
      checkoutMenu: false,
      spaceDialog: false,
      spaces: this.$store.getters.getSpaces,
      spaceTypes: this.$store.getters.getSpaceTypes
    }
  },
  methods: {
    ciInput: function(){
        let self = this;
        this.$store.commit('showLoader');
        api.checkAvailability( this.reservation.checkin, this.reservation.checkout, this.reservation.space_code, this.reservation.people, this.reservation.beds).then( function(response){
          if( response.data.query.available == true){
            //commit the new data
            self.$refs.ciMenu.save(self.reservation.checkin); 
            //update available spaces
            api.checkAvailabilityByDates( self.reservation.checkin, self.reservation.checkout ).then( 
              function( response ){
                self.$store.commit('hideLoader');
                self.$store.commit( 'setCreateReservationAvailableSpaces', Object.values(response.data.available_space_ids) );
                self.checkinMenu = false;
              });  
          } else {
            self.$store.commit('hideLoader');
            self.checkinMenu = false;
            alert("not available");
          }
        });
    },
    coInput: function(){
        let self = this;
        this.$store.commit('showLoader');
        api.checkAvailability( this.reservation.checkin, this.reservation.checkout, this.reservation.space_code, this.reservation.people, this.reservation.beds).then( function(response){
          if( response.data.query.available == true){
            //commit the new data
            self.$refs.coMenu.save(self.reservation.checkout);          
            //update available spaces
            api.checkAvailabilityByDates( self.reservation.checkin, self.reservation.checkout ).then( 
              function( response ){
                self.$store.commit('hideLoader');
                self.$store.commit( 'setCreateReservationAvailableSpaces', Object.values(response.data.available_space_ids) );
                self.checkoutMenu = false;
              });  
          } else {
            self.$store.commit('hideLoader');
            self.checkoutMenu = false;
            alert("not available");
          }
        });
    },
    spaceModal: function(){
      //check to see if spaces are loaded
      this.spaceDialog = true;
    },
    spaceSelect: function(evt){
      //evt is the value from the the select
      //which is the space_id
      //set space_id
      this.reservation.space_id = evt;
      //set space_code
      this.reservation.space_code = this.$store.getters.getSpaces[evt].space_code;
      this.reservation.space_name = this.$store.getters.getSpaces[evt].description;
      //close the modal
      this.spaceDialog = false;
    }
  },

  props: {
    reservationid: String,
    reservation: Object,
    customer: Object
  },
  watch: {
    'reservation.space_id': function(val, oldVal){
      console.log("space_id change",val, oldVal);
    },
    'reservation.beds': function(val, oldVal){
      console.log("beds change",val, oldVal);      
    }
  }
}
</script>

<style scoped>
.compactForm{

}
.spaceList ul{
  list-style: none;
}
.spaceList li{
  display: inline;
}


</style>