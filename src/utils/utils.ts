import {
  UnaryOperators,
  ButtonTypes,
  Digits,
  BinaryOperators,
  AssignOperators,
  MiscOperations,
} from "./../types/types";
import { enter, backspace, del } from "../constants/variables";

export const getButtonType = (content: string): ButtonTypes | null => {
  if ((Object.values(Digits) as string[]).includes(content)) {
    return ButtonTypes.digit;
  } else if ((Object.values(BinaryOperators) as string[]).includes(content)) {
    return ButtonTypes.binaryOperator;
  } else if ((Object.values(UnaryOperators) as string[]).includes(content)) {
    return ButtonTypes.unaryOperator;
  } else if (
    (Object.values(AssignOperators) as string[]).includes(content) ||
    content === enter
  ) {
    return ButtonTypes.assignOperator;
  } else if (
    (Object.values(MiscOperations) as string[]).includes(content) ||
    content === backspace ||
    content === del
  ) {
    return ButtonTypes.miscOperation;
  } else {
    return null;
  }
};

export const handleOperation = (
  operator: BinaryOperators,
  prevOperand: number,
  currentDisplayState: number
): string => {
  let result: number = prevOperand;
  const prevOpDecimalsLen: number | null = getDecimal(prevOperand);
  const currOpDecimalsLen: number | null = getDecimal(currentDisplayState);
  const fixedParam: number | null = getFloatParam(
    prevOpDecimalsLen,
    currOpDecimalsLen
  );
  switch (operator) {
    case BinaryOperators.add:
      result = prevOperand + currentDisplayState;
      break;
    case BinaryOperators.sub:
      result = prevOperand - currentDisplayState;
      break;
    case BinaryOperators.mul:
      result = prevOperand * currentDisplayState;
      break;
    case BinaryOperators.div:
      result = prevOperand / currentDisplayState;
      break;
  }
  return fixedParam !== null
    ? Number(result.toFixed(fixedParam)) - result
      ? result.toFixed(fixedParam)
      : result.toString()
    : result.toString();
};

export const getDecimal = (num: number): null | number => {
  return num.toString().includes(".")
    ? num.toString().split(".")?.[1]?.length
    : null;
};

export const getFloatParam = (
  param1: null | number,
  param2: null | number
): null | number => {
  if (param1 && param2) {
    return param1 > param2 ? param1 : param2;
  } else {
    if (param1) {
      return param1;
    } else {
      return param2;
    }
  }
};
