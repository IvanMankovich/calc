import { useState } from "react";
import { backspace, del } from "../constants/variables";
import {
  BinaryOperators,
  MiscOperations,
  ButtonTypes,
  UnaryOperators,
} from "../types/types";
import { handleOperation } from "../utils/utils";

export const useCalculator = () => {
  const DEFAULT_DISPLAY_STATE: string = "0";
  const DEFAULT_HISTORY_STATE: string = "";
  const [currentDisplayState, setCurrentDisplayState] = useState<string>(
    DEFAULT_DISPLAY_STATE
  );
  const [currentOperator, setCurrentOperator] =
    useState<BinaryOperators | null>(null);
  const [prevOperator, setPrevOperator] = useState<BinaryOperators | null>(
    null
  );
  const [prevOperand, setPrevOperand] = useState<string | null>(null);
  const [history, setHistory] = useState<string>(DEFAULT_HISTORY_STATE);
  const [isAvailableToOp, setAvailableToOp] = useState<boolean>(true);

  const handleButtonPress = (content: string, type: ButtonTypes): void => {
    switch (type) {
      case ButtonTypes.digit:
        if (
          isAvailableToOp &&
          (Number(currentDisplayState) ||
            currentDisplayState.includes(".") ||
            currentOperator)
        ) {
          setCurrentDisplayState(`${currentDisplayState}${content}`);
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
          setAvailableToOp(false);
        }
        setPrevOperator(content as BinaryOperators);
        setCurrentOperator(content as BinaryOperators);
        break;
      case ButtonTypes.assignOperator:
        setHistory(DEFAULT_HISTORY_STATE);
        const result = handleOperation(
          currentOperator as BinaryOperators,
          prevOperand !== null ? +prevOperand : 0,
          +currentDisplayState
        );
        setPrevOperand(null);
        setPrevOperator(null);
        setCurrentOperator(null);
        setCurrentDisplayState(result);
        setAvailableToOp(false);
        break;
      case ButtonTypes.miscOperation:
        if (content === MiscOperations.del || content === backspace) {
          const cuttedString: string = currentDisplayState.slice(
            0,
            currentDisplayState.length - 1
          );
          if (Number(currentDisplayState)) {
            if (!cuttedString) {
              setCurrentDisplayState(DEFAULT_DISPLAY_STATE);
            } else {
              setCurrentDisplayState(cuttedString);
            }
          }
        } else if (content === MiscOperations.clear || content === del) {
          setPrevOperand(null);
          setCurrentOperator(null);
          setCurrentDisplayState(DEFAULT_DISPLAY_STATE);
        }
        break;
      case ButtonTypes.unaryOperator:
        if (content === UnaryOperators.dot) {
          if (!currentDisplayState.includes(content)) {
            setCurrentDisplayState(`${currentDisplayState}${content}`);
          }
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
