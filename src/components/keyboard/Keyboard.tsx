import { useEffect } from "react";
import { schema } from "../../schema/Schema";
import { ButtonSchema, ButtonTypes } from "../../types/types";
import { Button } from "../button/Button";
import "./Keyboard.scss";
import { getButtonType } from "../../utils/utils";

export interface IKeyboard {
  handleButtonPress: (content: string, type: ButtonTypes) => void;
}

export const Keyboard = ({ handleButtonPress }: IKeyboard) => {
  const handlePress = (event: KeyboardEvent): void => {
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
  });

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
