import { memo, useState } from "react";
import { Display } from "./components/display/Display";
import { Keyboard } from "./components/keyboard/Keyboard";
import {
  BinaryOperators,
  MiscOperations,
  ButtonTypes,
  UnaryOperators,
} from "./types/types";

function App() {
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
            setPrevOperator(content as BinaryOperators);
            setCurrentOperator(content as BinaryOperators);
            setHistory(`${history}${currentDisplayState}`);
          } else {
            setPrevOperand(
              handleOperation(
                prevOperator as BinaryOperators,
                prevOperand !== null ? +prevOperand : 0,
                +currentDisplayState
              )
            );
            setCurrentOperator(content as BinaryOperators);
            setPrevOperator(content as BinaryOperators);
            setHistory(`${history}${prevOperator}${currentDisplayState}`);
          }
          setAvailableToOp(false);
        } else {
          setCurrentOperator(content as BinaryOperators);
        }
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
          if (Number(currentDisplayState)) {
            if (!currentDisplayState.slice(0, currentDisplayState.length - 1)) {
              setCurrentDisplayState("0");
            } else {
              setCurrentDisplayState(
                currentDisplayState.slice(0, currentDisplayState.length - 1)
              );
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
          setAvailableToOp(true);
        } else {
          setCurrentDisplayState(`${-Number(currentDisplayState)}`);
          setAvailableToOp(true);
        }
        break;
      default:
        break;
    }
  };

  const handleOperation = (
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

  const getDecimal = (num: number): null | number => {
    return num.toString().includes(".")
      ? num.toString().split(".")?.[1]?.length
      : null;
  };

  const getFloatParam = (
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

  const MemoizedKeyboard = memo(Keyboard, (prev, next) => {
    return prev === next;
  });

  return (
    <div className="App">
      <Display
        history={history}
        currentDisplayState={currentDisplayState}
        prevOperand={prevOperand?.toString?.()}
        currentOperator={currentOperator?.toString?.()}
      />
      <MemoizedKeyboard handleButtonPress={handleButtonPress} />
    </div>
  );
}

export default App;
