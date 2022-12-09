export interface IDisplay {
  history: string;
  currentDisplayState?: string;
  prevOperand?: string;
  currentOperator?: string;
}

export const Display = ({
  history,
  currentDisplayState,
  prevOperand,
  currentOperator,
}: IDisplay) => {
  return (
    <div>
      <div>
        <span>{history}</span>
        {/* <span>{prevOperand}</span> */}
        <span>{currentOperator}</span>
      </div>
      <span>{currentDisplayState}</span>
    </div>
  );
};
