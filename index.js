const app = Vue.createApp({
  data() {
    return {
      searchCodeText: '',
      listOrder: []
    }
  },

  computed: {
    // Lista todos os pedidos de acordo com o código
    listResultOrders() {
      if (this.searchCodeText) {
        return this.listOrder.filter(order => {
          return order.code.includes(this.searchCodeText.toUpperCase());
        });

      } else {
        return this.listOrder;
      }
    }
  },

  async mounted() {
    this.listResultOrders = await this.getData();
  },

  methods: {
    // Recebe todos os pedidos
    async getData() {
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
    },

    // Melhora visualização do status
    getStatusDescription(status) {
      const statusDescriptions = {
        waiting_cook_confirmation: 'Esperando confirmação da cozinha',
        cooking: 'Pedido em preparo',
        canceled: 'Pedido cancelado',
        ready: 'Pedido pronto',
        delivered: 'Pedido entregue',
      };
      return statusDescriptions[status]
    },

    // Formata a data
    formatDate(isoString) {
      var d = new Date(isoString);
      return d.toLocaleDateString() + ' às ' + d.toTimeString().substring(0, d.toTimeString().indexOf("GMT"));
    },

    redirectToDetails(id) {
      // Redireciona para a página details.html com o ID do pedido na URL
      window.location.href = `details.html?id=${id}`;
    },
  }

})

app.mount('#app')