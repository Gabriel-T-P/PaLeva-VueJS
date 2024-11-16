
const app = Vue.createApp({
  data() {
    return {
      searchCodeText: '',
      listOrder: []
    }
  },

  computed: {
    listPendentOrders() {
      if (this.searchCodeText) {
        return this.listOrder.filter(order => {
          return order.code.includes(this.searchCodeText.toUpperCase());
        });
      }
    }
  },

  methods: {
    async get_data() {
      let response = await fetch('http://localhost:3000/api/v1/orders/');
      let data = await response.json();
      this.listOrder = []

      data.forEach(item => {
        var order = new Object();

        order.id = item.id
        order.customerName = item.name;
        order.customerCPF = item.cpf;
        order.customerEmail = item.email;
        order.customerPhoneNumber = item.phone_number;
        order.code = item.code;
        order.status = item.status;
        order.createdAt = item.created_at;

        this.listOrder.push(order)
      })
    }
  }

})

app.mount('#app')