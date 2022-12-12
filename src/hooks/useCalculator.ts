import { useState } from "react";
import {
  BinaryOperators,
  MiscOperations,
  ButtonTypes,
  UnaryOperators,
} from "../types/types";
import { handleOperation } from "../utils/utils";

export const useCalculator = () => {
  const [currentDisplayState, setCurrentDisplayState] = useState<string>("0");
  const [currentOperator, setCurrentOperator] =
    useState<BinaryOperators | null>(null);
  const [prevOperator, setPrevOperator] = useState<BinaryOperators | null>(
    null
  );
  const [prevOperand, setPrevOperand] = useState<string | null>(null);
  const [history, setHistory] = useState<string>("");
  const [isAvailableToOp, setAvailableToOp] = useState<boolean>(true);

  const handleButtonPress = (content: string, type: ButtonTypes): void => {
    switch (type) {
      case ButtonTypes.digit:
        if (isAvailableToOp) {
          if (
            Number(currentDisplayState) ||
            currentDisplayState.endsWith(".") ||
            currentOperator
          ) {
            setCurrentDisplayState(`${currentDisplayState}${content}`);
          } else {
            setCurrentDisplayState(`${content}`);
          }
        } else {
          setCurrentDisplayState(`${content}`);
        }
        setAvailableToOp(true);
        break;
      case ButtonTypes.binaryOperator:
        if (isAvailableToOp) {
          if (prevOperand === null) {
            setPrevOperand(currentDisplayState);
            setHistory(`${history}${currentDisplayState}`);
          } else {
            setPrevOperand(
              handleOperation(
                prevOperator as BinaryOperators,
                prevOperand !== null ? +prevOperand : 0,
                +currentDisplayState
              )
            );
            setHistory(`${history}${prevOperator}${currentDisplayState}`);
          }
          setPrevOperator(content as BinaryOperators);
          setAvailableToOp(false);
        } else {
          setPrevOperator(content as BinaryOperators);
        }
        setCurrentOperator(content as BinaryOperators);
        break;
      case ButtonTypes.assignOperator:
        setHistory("");
        const result = handleOperation(
          currentOperator as BinaryOperators,
          prevOperand !== null ? +prevOperand : 0,
          +currentDisplayState
        );
        setPrevOperand(null);
        setPrevOperator(null);
        setCurrentOperator(null);
        setCurrentDisplayState(result);
        break;
      case ButtonTypes.miscOperation:
        if (content === MiscOperations.del) {
          const cuttedString: string = currentDisplayState.slice(
            0,
            currentDisplayState.length - 1
          );
          if (Number(currentDisplayState)) {
            if (!cuttedString) {
              setCurrentDisplayState("0");
            } else {
              setCurrentDisplayState(cuttedString);
            }
          }
        } else {
          setPrevOperand(null);
          setCurrentOperator(null);
          setCurrentDisplayState("0");
        }
        break;
      case ButtonTypes.unaryOperator:
        if (content === UnaryOperators.dot) {
          setCurrentDisplayState(`${currentDisplayState}${content}`);
        } else {
          setCurrentDisplayState(`${-Number(currentDisplayState)}`);
        }
        setAvailableToOp(true);
        break;
      default:
        break;
    }
  };

  return {
    currentDisplayState,
    currentOperator,
    history,
    handleButtonPress,
  };
};
