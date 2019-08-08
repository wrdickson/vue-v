<template>
  <div class="folioWrapper">
    <h2>Folio</h2>
        <!--
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
        -->
        
        <!--
        <div>reservation.id: {{reservation.id}}</div>
        <div>folio id: {{ reservation.folio }}</div>
        <v-btn @click="testSalesItems">testSalesItems</v-btn>
        <v-btn @click="postDemoSale">postDemoSale</v-btn>
        -->

        <h3>Charges: </h3>
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
        <v-layout row wrap class="postSale">
          <v-flex xs12 sm12 md12 lg12 xl12>
            <h3>Post Charge:</h3>
          </v-flex>

          <!--sale type -->
          <v-flex xs6>
            <v-select
              label="Item"
              :items="salesItems"
              item-value="id"
              item-text="sales_item_title"
              v-model="newSale.sales_item"
              @change="salesItemSelect"              
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="quantityItems"
              v-model="newSale.quantity"
              label="Quantity"
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              label="Price"
              v-model="newSale.price"
              :readonly="priceIsReadOnly"
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              label="Net"
              v-model="netPrice"
              :readonly='true'
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              label="Tax"
              v-model="totalTax"
              :readonly="true"
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              label="Total"
              v-model="totalSale"
              :readonly="true"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12 lg12 xl12>
            <v-btn
              @click="resetSale"
              color="info"
            >Reset</v-btn>
            <v-btn
              @click="postSale"
              color="warning"
            >Post Sale</v-btn>
          </v-flex>
        </v-layout>

  </div>

</template>

<script>
  import api from './../api/api.js'
  import _ from 'lodash'
  export default{
    computed: {
      currentSaleTypes: {
        get: function(){
          let currentSaleTypes = [];
          _.forEach(this.saleTypes, function( saleType ){
            if(saleType.is_current == "1"){
              currentSaleTypes.push( saleType );
            }
          });
          return currentSaleTypes;
        }
      },
      formattedPrice: {
         get: function(){
           return parseFloat(this.newSale.price).toFixed(2)
         },
         set: function( val ){
           this.newSale.price = val
         }
      },
      netPrice: function(){
        return parseFloat(this.newSale.price) * parseFloat(this.newSale.quantity)
      },
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
      },
      totalSale: function(){
        return parseFloat( this.netPrice + this.totalTax )
      },
      totalTax: function(){
        let rawTax = parseFloat(this.netPrice) * parseFloat(this.selectedSaleItem.tax_rate )
        let roundedTax = this.round(rawTax, 2);
        console.log("roundedtax", roundedTax);
        if( isNaN(roundedTax) ){ roundedTax = 0 }
        return roundedTax
      }
    },
    created: function(){
      let self = this;
      api.getSalesItems().then(function( response ){
        self.salesItems = response.data.sales_items;
      });

    },
    data: function(){
      return {
        newSale: {
          folio: this.reservation.folio,
          quantity: 1,
          sales_item: '0',
          price: '0',
          tax_rate: '0'
        },
        priceIsReadOnly: false,
        quantityItems: [1,2,3,4,5,6,7,8,9,10],
        salesItems: [],
        saleTypes: [],
        selectedSaleItem: {}
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
      postSale(){
        this.newSale.net = this.netPrice.toString()
        this.newSale.tax = this.totalTax.toString()
        this.newSale.total = this.totalSale.toString()
        this.newSale.quantity = this.newSale.quantity.toString()
        this.newSale.sold_by = this.user.userId


        //TEMP DEBUG
        this.newSale.notes = []
        this.newSale.shift = '1';


        console.log("newSale", this.newSale) 
        let self = this;
        api.postSale( this.user, this.reservation.folio, this.newSale ).then( function( response ){
          console.log("sale response", response);
          if(response.data.postSuccess == true){
            //reload the reservation
            self.$emit("reload-reservation");
          }
        });          

      },
      resetSale: function(){
        this.newSale = {
          folio: this.reservation.folio,
          quantity: 1,
          sales_item: '0',
          price: '0',
          tax_rate: '0'
        }
        this.selectedSaleItem = {}
      },
      // see http://www.jacklmoore.com/notes/rounding-in-javascript/
      round: function(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
      },
      salesItemSelect: function(){
        console.log("newSale:", this.newSale);
        console.log("items", this.salesItems );
        let self = this;
        this.selectedSaleItem = _.find( this.salesItems, function( o ){
          return o.id == self.newSale.sales_item
        })
        
        console.log("ssi", this.selectedSaleItem);
        if(this.selectedSaleItem.is_fixed_price == true){
          this.newSale.price = this.selectedSaleItem.price
          this.newSale.tax_type = this.selectedSaleItem.tax_type
          this.newSale.tax_rate = this.selectedSaleItem.tax_rate
          this.priceIsReadOnly = true
          
        } else { 
          this.newSale.price = "0" 
          this.newSale.price = this.selectedSaleItem.price
          this.newSale.tax_type = this.selectedSaleItem.tax_type
          this.newSale.tax_rate = this.selectedSaleItem.tax_rate 
          this.priceIsReadOnly = false;       
        }
        
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
.postSale{
  border: 2px solid rgb(109, 2, 2);
  border-radius: 13px;
  padding: 5px;
  background-color:rgb(148, 64, 4);
  margin: 4px;
}
.salesTable {
  border-collapse: collapse;
  width: 100%;
  background-color: rgb(18, 39, 2);
}

.salesTableInner {
  max-height: 120px;
  
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