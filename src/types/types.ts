export enum ButtonTypes {
  digit = "digit",
  binaryOperator = "binaryOperator",
  unaryOperator = "unaryOperator",
  assignOperator = "assignOperator",
  miscOperation = "miscOperation",
}

export enum BinaryOperators {
  add = "+",
  sub = "-",
  mul = "*",
  div = "/",
}

export enum UnaryOperators {
  negative = "+/-",
  dot = ".",
}

export enum AssignOperators {
  result = "=",
}

export enum Digits {
  one = "1",
  two = "2",
  three = "3",
  four = "4",
  five = "5",
  six = "6",
  seven = "7",
  eight = "8",
  nine = "9",
  zero = "0",
}

export enum MiscOperations {
  clear = "C",
  del = "←",
}

export type ButtonContent = Digits &
  BinaryOperators &
  UnaryOperators &
  AssignOperators &
  MiscOperations;

export type ButtonType = ButtonTypes.digit &
  ButtonTypes.binaryOperator &
  ButtonTypes.unaryOperator &
  ButtonTypes.assignOperator &
  ButtonTypes.miscOperation;

export interface ButtonSchema {
  content: string;
  type: ButtonTypes;
}
