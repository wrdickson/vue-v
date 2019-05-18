<template>
  <div>
    <v-layout row>
      <h3>Search Customers</h3>    
    </v-layout>
    <v-layout row>
      <v-flex xs6>
        <v-text-field
          label="Last Name"
          v-model='searchCustomer.lastName'
        />
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="First Name"
          v-model='searchCustomer.firstName'
        />
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-btn color="primary" @click="searchCustomers">Search</v-btn>
    </v-layout>
  </div>
</template>

<script>
import api from './../api/api.js'
export default {
  computed: {
  
  },
  data: function(){
    return{
      searchCustomer: {
        lastName: '',
        firstName: ''
      }
    }
  },
  methods: {
    searchCustomers: function(){
      console.log("search");
    }
  }
}
</script>