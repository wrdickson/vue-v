<template>
  <div>
    <SearchCustomer
      @customer-selected="customerSelect"
    />
    <Customer
      :customer="customer"
      @reset-customer="resetCustomer"
      @update-customer="updateCustomer"
      @create-customer="createCustomer"
    />
    <Reservation
      :reservation="reservation"
      :customer="customer"
    />
    <v-btn
      :disabled="createButtonDisabled"
      @click="createReservation"
    >Create Reservation</v-btn>
    
  </div>

</template>

<script>

  import Customer from './../components/customer.vue'
  import Reservation from './../components/reservation.vue'
  import SearchCustomer from './../components/customerSearch.vue'
  import moment from 'moment'
  import api from './../api/api.js'
  export default {
    components: {
      Customer,
      Reservation,
      SearchCustomer
    },
    computed: {
        createButtonDisabled: {
          get: function(){
            
            let disabled = true;
            if( this.customer.id > 0 &&
                this.reservation.people > 0 &&
                this.reservation.beds > 0 &&
                this.reservation.space_id > 0 ){
              disabled  = false;  
            }
            return disabled            
          }
          
        },
        user: {
          get: function(){
            return this.$store.getters.getUser;
          }
        }
    },
    data: function(){
      return {
        customer: {
          id: '0',
          lastName: '',
          firstName: '',
          address1: '',
          address2: '',
          city: '',
          region: '',
          postalCode: '',
          country: '',
          phone: '',
          email: '' 
        },
         reservation: {
          checkin: moment().format('YYYY-MM-DD'),
          checkout: moment().add(1,'day').format('YYYY-MM-DD'),
          space_code: '',
          space_id: '',
          people: '0',
          beds: '0',
          space_name: '',
          customer: '0'
        }
      }       
    },
    methods: {
      createCustomer: function(){
        const self = this;
        api.createCustomer( this.user, this.customer).then( function(response){
          console.log("res", response);
          if(response.data.execute == true){
            self.customer = response.data.newCustomer
          }
        });        
      },
      createReservation: function(){
        
      },
      customerSelect: function( customer ){
        console.log("cust", customer);
        this.customer = customer;
      },
      resetCustomer: function(){
        console.log("resetCustomer fires");
        this.customer = {
          id: '0',
          lastName: '',
          firstName: '',
          address1: '',
          address2: '',
          city: '',
          region: '',
          postalCode: '',
          country: '',
          phone: '',
          email: '' 
        };
      },
      updateCustomer: function(){
        const self = this;
        this.$store.commit('showLoader');
        api.updateCustomer( this.customer ).then( function( response ){
          self.$store.commit('hideLoader');
          self.customer = response.data.updatedCustomer;
          console.log("resp", response);
        });
      }
    },
    name: "ReservationView"
  }
</script>