// eslint-disable-next-line max-lines-per-function
function createInvoice(services = {}) {
  let phoneCharge = services.phone || 3000;
  let internetCharge = services.internet || 5500;

  return {
    phone: phoneCharge,
    internet: internetCharge,
    payments: [],

    total() {
      return this.phone + this.internet;
    },

    addPayment(payment) {
      this.payments.push(payment);
    },

    addPayments(paymentsArr) {
      paymentsArr.forEach(payment => this.payments.push(payment));
    },

    paymentTotal() {
      return this.payments
        .reduce((total, currPayment) => total + currPayment.total(), 0);
    },

    amountDue() {
      return this.total() - this.paymentTotal();
    },
  };
}
/*
function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices)); // 31000
*/

function createPayment(payment = {}) {
  ['phone', 'internet'].forEach(srvc => {
    if (!Object.keys(payment).includes(srvc)) {
      payment[srvc] = 0;
    }
  });

  payment.total = function() {
    return this.amount || (this.phone + this.internet);
  };
  return payment;
}
/*
function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000
*/

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);

console.log(invoice.amountDue());       // this should return 0
