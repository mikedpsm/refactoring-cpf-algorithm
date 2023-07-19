import { validate } from "../src/main"
test("Should test a valid CPF", function() {
  // given
  const cpf = "987.654.321-00";
  // when
  const isValid = validate(cpf);
  // then
  expect(isValid).toBeTruthy();
});