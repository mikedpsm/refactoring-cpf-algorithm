import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
}

test("Shouldn't do a checkout with an invalid CPF", async function () {
  const input = {
    cpf: "987.654.321-01",
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output.message).toBe("Invalid CPF");
});

test("Should do a checkout with 3 products", async function () {
  const input = {
    cpf: "987.654.321-00",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 }
    ]
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(6090);
});

test("Shouldn't do a request with an invalid product", async function () {
  const input = {
    cpf: "987.654.321-00",
    items: [
      { idProduct: 4, quantity: 1 }
    ]
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output.message).toBe("Product not found");
});

test("Should do a request with 3 products and a discount coupon", async function () {
  const input = {
    cpf: "987.654.321-00",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 }
    ],
    coupon: "MINUS20"
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(4872);
});