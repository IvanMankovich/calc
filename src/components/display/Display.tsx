import "./Display.scss";

export interface IDisplay {
  history: string;
  currentDisplayState?: string;
  currentOperator?: string;
}

export const Display = ({
  history,
  currentDisplayState,
  currentOperator,
}: IDisplay): JSX.Element => {
  return (
    <div className="display">
      <div className="operand">
        <span>{history}</span>
        <span>{currentOperator}</span>
      </div>
      <div className="currentOperand">
        <span>{currentDisplayState}</span>
      </div>
    </div>
  );
};
