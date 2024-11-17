const app = Vue.createApp({
  data() {
    return {
      order: {
        establishmentCode: null,
        code: null,
        status: '',
        createdAt: '',
        portions: []
      },

      customer: {
        name: '',
        cpf: '',
        phoneNumber: '',
        email: ''
      }
    };
  },

  async mounted() {
    await this.fetchOrderDetails();
  },

  methods: {
    async fetchOrderDetails() {
      // Captura o ID do pedido da URL
      const params = new URLSearchParams(window.location.search);
      const orderId = params.get('id');

      // Busca o pedido pelo id na API
      try {
        let response = await fetch(`http://localhost:3000/api/v1/orders/${orderId}`);
        let data = await response.json();
        var order = new Object();
        var customer = new Object();
        if (data) {
          // Order
          order.establishmentCode = data.establishment_code;
          order.code = data.order.code;
          order.status = data.order.status;
          order.createdAt = data.order.created_at;
          order.portions = data.portions;
          // Customer
          customer.name = data.order.name;
          customer.cpf = data.order.cpf;
          customer.email = data.order.email;
          customer.phoneNumber = data.order.phone_number;

          this.order = order;
          this.customer = customer;
        }
      } catch (error) {
        alert('Pedido não encontrado.');
      }
    },

    async setCooking() {
      // Captura o ID do pedido da URL
      const params = new URLSearchParams(window.location.search);
      const orderId = params.get('id');

      let response = await fetch(`http://localhost:3000/api/v1/orders/${orderId}/set_status_cooking`, { method: 'PATCH' });

      if (response.ok) {
        let data = await response.json();
        location.reload();
        alert('Pedido atualizado:');
      } else {
        alert('Erro ao atualizar o pedido:');
      }
    },

    setReady() {

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

    goBack() {
      // Retorna à página principal
      window.location.href = 'index.html';
    },
  },
});

app.mount('#app');