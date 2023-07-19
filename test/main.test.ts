import { validate } from "../src/main"

const validCpfs = [
  "987.654.321-00",
  "714.602.380-01",
  "313.030.210-72",
  "144.796.170-60"
]

test.each(validCpfs)("Should test a valid CPF: %s", function(cpf: string) {
  const isValid = validate(cpf);
  expect(isValid).toBeTruthy();
});

const invalidCpfs = [
  "111.111.111-11",
  "222.222.222-22",
  "333.333.333-33",
  "444.444.444-44",
  "555.555.555-55",
  "666.666.666-66",
  "777.777.777-77",
  "888.888.888-88",
  "999.999.999-99"
];

test.each(invalidCpfs)("Should test an invalid CPF: %s", function(cpf: string) {
  const isValid = validate(cpf);
  expect(isValid).toBeFalsy();
});

test("Should test an undefined CPF", function() {
  const isValid = validate(undefined);
  expect(isValid).toBeFalsy();
});

test("Should test a null CPF", function() {
  const isValid = validate(null);
  expect(isValid).toBeFalsy();
});


test("Should test an oversized CPF", function() {
  const isValid = validate("");
  expect(isValid).toBeFalsy();
});