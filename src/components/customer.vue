<template>
  <v-layout row>
    <v-form v-model="valid" ref="customerForm">
        <v-layout row>
          <v-flex xs6>
            <v-text-field
              v-model="customer.firstName"
              :rules="nameRules"
              :counter="20"
              label="First Name"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs6 class="margin5">
            <v-text-field
              v-model="customer.lastName"
              :rules="nameRules"
              :counter="20"
              label="Last Name"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
    <v-btn
      color="error"
      @click="reset"
    >
      Reset Form
    </v-btn>
    <v-btn
      v-if="valid"
      color="success"
      @click="submit"
    >
      Submit
    </v-btn>
    </v-form>
  </v-layout>
</template>

<script>
export default {
  data: function(){
    return{
      valid: false,
      customer: JSON.parse(JSON.stringify(this.$store.getters.getSelectedReservation.customer)),
      originalCustomer: {},
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 20 || 'FirstName must be less than 20 characters'
      ],    
    }
  },
  methods: {
    reset: function(){
      this.customer = JSON.parse(JSON.stringify(this.$store.getters.getSelectedReservation.customer));
    },
    submit: function(){
      console.log(this.customer);
    }
  }

}
</script>
<style>
.margin5{
  margin-left: 5px;
}

</style>