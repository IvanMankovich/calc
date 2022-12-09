import { useEffect } from "react";
import { schema } from "../../schema/Schema";
import {
  ButtonSchema,
  UnaryOperators,
  ButtonTypes,
  Digits,
  BinaryOperators,
  AssignOperators,
  MiscOperations,
} from "../../types/types";
import { Button } from "../button/Button";
import "./Keyboard.scss";

export interface IKeyboard {
  handleButtonPress: (content: string, type: ButtonTypes) => void;
}

export const Keyboard = ({ handleButtonPress }: IKeyboard) => {
  const getButtonType = (content: string): ButtonTypes | null => {
    if ((Object.values(Digits) as string[]).includes(content)) {
      return ButtonTypes.digit;
    } else if ((Object.values(BinaryOperators) as string[]).includes(content)) {
      return ButtonTypes.binaryOperator;
    } else if ((Object.values(UnaryOperators) as string[]).includes(content)) {
      return ButtonTypes.unaryOperator;
    } else if (
      (Object.values(AssignOperators) as string[]).includes(content) ||
      content === "Enter"
    ) {
      return ButtonTypes.assignOperator;
    } else if ((Object.values(MiscOperations) as string[]).includes(content)) {
      return ButtonTypes.miscOperation;
    } else {
      return null;
    }
  };

  const handlePress = (event: KeyboardEvent): void => {
    debugger;
    const type = getButtonType(event.key);
    if (type) {
      handleButtonPress(event.key, type);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handlePress);

    return () => {
      window.removeEventListener("keydown", handlePress);
    };
  }, []);

  return (
    <div className="keyboard">
      {schema.map((btn: ButtonSchema) => (
        <Button
          type={btn.type}
          key={btn.content}
          content={btn.content}
          handler={handleButtonPress}
        />
      ))}
    </div>
  );
};
