<template>
  <div class="folioWrapper">
    <h3>Folio</h3>
        
        <span class="btnDiv">
            <v-menu 
              v-for="salesItem in salesItems" :key="salesItem.id" 
              offset-y >
              <template v-slot:activator="{ on }">
                <v-btn
                  class="tButton"
                  color="primary"
                  dark
                  v-on="on"
                >
                  {{ salesItem.sales_item_title}}
                </v-btn>
              </template>
              <v-list>
                <v-list-tile
                  v-for="item in salesItem.groups"
                  :key="item.id"
                >
                  <v-list-tile-title>{{ item.sales_item_title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
        </span>
        
        <div>reservation.id: {{reservation.id}}</div>
        <div>folio id: {{ reservation.folio }}</div>
        <v-btn @click="testSalesItems">testSalesItems</v-btn>
        <v-btn @click="postDemoSale">postDemoSale</v-btn>

        
        <table class="salesTable">
          <thead>
            <tr>
              <th>Date</th> 
              <th>Item</th>
              <th>Amount</th>
              <th>Tax</th>
              <th>Total</th>
              <th>By</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sale in reservation.folio_obj.sales" v-bind:key="sale.id">
              <td>{{ sale.sale_date }}</td>
              <td>{{ sale.sales_item_title }}</td>
              <td>{{ sale.net }}</td>
              <td>{{ sale.tax }}</td>
              <td>{{ sale.total }}</td>
              <td>{{ sale.username }}</td>

            </tr>
            <tr>
              <td>TOTAL CHARGES ==></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{{ salesTotal }}</td>
              <td></td>           
            </tr>
          </tbody>
        </table>

  </div>

</template>

<script>
  import api from './../api/api.js'
  import _ from 'lodash'
  export default{
    computed: {
      salesTotal:{
        get: function(){
          let salesTotal = 0;
          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
          });
          _.forEach(this.reservation.folio_obj.sales, function( sale ){
            salesTotal = salesTotal + parseFloat(sale.total);
          })
          return formatter.format(salesTotal);
        }
      }
    },
    created: function(){
      let self = this;
        api.getSalesItems().then(function( response ){
          self.salesItems = response.data.items_by_group;
        });
    },
    data: function(){
      return {
        salesItems: {}
      }

    },
    methods: {
      postDemoSale: function(){
        let self = this;
        const demoSale = {
          tax_type: "1",
          sales_item: "3",
          net: "24.00",
          tax: "3.26",
          total: "27.26",
          sold_by: this.user.userId,          
          shift: "1"
        };
        api.postSale( this.user, this.reservation.folio, demoSale ).then( function( response ){
          console.log("sale response", response);
          if(response.data.postSuccess == true){
            //reload the reservation
            self.$emit("reload-reservation");
          }
        });

      },
      testSalesItems: function(){
        api.getSalesItems().then( function (response){
          console.log("salesItems", response);
          
        });
      }
    },
    name: 'Folio',
    props: {
      reservation: Object,
      user: Object
    }
  }
</script>

<style>
.folioWrapper{
  border: 2px solid green;
  border-radius: 5px;
  padding: 4px;
  margin-bottom: 5px;
}
.tButton{
  margin-left: 1px;
  margin-right: 1px;
}
.btnDiv{
  display: -webkit-flex; /* Safari */
  -webkit-flex-wrap: wrap; /* Safari 6.1+ */
  display: flex;   
  flex-wrap: wrap;

}

.salesTable {
  border-collapse: collapse;
}
.salesTable th {
  border: 2px solid green;
  padding: 3px;
}
.salesTable td {
  border: 1px solid green;
  padding: 3px;
}

</style>