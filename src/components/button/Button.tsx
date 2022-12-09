import { ButtonTypes } from "../../types/types";
import "./Button.scss";

export interface IButton {
  content: string;
  type: ButtonTypes;
  handler: (content: string, type: ButtonTypes) => void;
}

export const Button = ({ content, type, handler }: IButton): JSX.Element => {
  const stringContent: string = content.toString();
  const ariaDesc: string = `${stringContent} key`;
  const onClickHandler = (): void => {
    handler(content, type);
  };

  return (
    <button
      className="button"
      aria-label={stringContent}
      aria-controls={ariaDesc}
      aria-roledescription={ariaDesc}
      onClick={onClickHandler}
    >
      {content}
    </button>
  );
};
