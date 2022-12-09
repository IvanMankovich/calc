import { memo } from "react";
import { Display } from "./components/display/Display";
import { Keyboard } from "./components/keyboard/Keyboard";
import { useCalculator } from "./hooks/useCalculator";

const App = () => {
  const { currentDisplayState, currentOperator, history, handleButtonPress } =
    useCalculator();

  const MemoizedKeyboard = memo(Keyboard, (prev, next) => {
    return prev === next;
  });

  return (
    <div className="App">
      <Display
        history={history}
        currentDisplayState={currentDisplayState}
        currentOperator={currentOperator?.toString?.()}
      />
      <MemoizedKeyboard handleButtonPress={handleButtonPress} />
    </div>
  );
};

export default App;
