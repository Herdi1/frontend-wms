import Vue from 'vue'
import money from 'v-money'
import money2 from 'v-money'


Vue.use(money, {
  precision: 2,
  decimal: ',',
  thousands: '.',
})
