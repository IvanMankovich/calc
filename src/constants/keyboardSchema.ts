import {
  ButtonSchema,
  BinaryOperators,
  UnaryOperators,
  AssignOperators,
  Digits,
  MiscOperations,
  ButtonTypes,
} from "../types/types";

export const keyboardSchema: ButtonSchema[] = [
  {
    content: BinaryOperators.add,
    type: ButtonTypes.binaryOperator,
  },
  {
    content: BinaryOperators.sub,
    type: ButtonTypes.binaryOperator,
  },
  {
    content: BinaryOperators.mul,
    type: ButtonTypes.binaryOperator,
  },
  {
    content: BinaryOperators.div,
    type: ButtonTypes.binaryOperator,
  },
  {
    content: Digits.seven,
    type: ButtonTypes.digit,
  },
  {
    content: Digits.eight,
    type: ButtonTypes.digit,
  },
  {
    content: Digits.nine,
    type: ButtonTypes.digit,
  },
  {
    content: MiscOperations.del,
    type: ButtonTypes.miscOperation,
  },
  {
    content: Digits.four,
    type: ButtonTypes.digit,
  },
  {
    content: Digits.five,
    type: ButtonTypes.digit,
  },
  {
    content: Digits.six,
    type: ButtonTypes.digit,
  },
  {
    content: MiscOperations.clear,
    type: ButtonTypes.miscOperation,
  },
  {
    content: Digits.one,
    type: ButtonTypes.digit,
  },
  {
    content: Digits.two,
    type: ButtonTypes.digit,
  },
  {
    content: Digits.three,
    type: ButtonTypes.digit,
  },
  {
    content: AssignOperators.result,
    type: ButtonTypes.assignOperator,
  },
  {
    content: UnaryOperators.negative,
    type: ButtonTypes.unaryOperator,
  },
  {
    content: Digits.zero,
    type: ButtonTypes.digit,
  },
  {
    content: UnaryOperators.dot,
    type: ButtonTypes.unaryOperator,
  },
];
