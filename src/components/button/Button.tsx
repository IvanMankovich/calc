import { ButtonTypes } from "../../types/types";

export interface IButton {
  content: string;
  type: ButtonTypes;
  handler: (content: string, type: ButtonTypes) => void;
}

export const Button = ({ content, type, handler }: IButton) => {
  return (
    <button
      aria-label={content.toString()}
      aria-controls={`${content.toString()} key`}
      aria-roledescription={`${content.toString()} key`}
      onClick={() => {
        console.log(content);
        handler(content, type);
      }}
    >
      {content}
    </button>
  );
};
