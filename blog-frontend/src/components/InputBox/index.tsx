import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  forwardRef,
} from "react";
import "./style.css";

interface IProps {
  label: string;
  type: "text" | "password";
  placeholder: string;
  value: string;
  // setValue: Dispatch<SetStateAction<string>>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: boolean;

  icon?:
    | "visibility-off-icon"
    | "visibility-icon"
    | "logo-light-icon"
    | "search-icon";
  onButtonClick?: () => void;

  message?: string;

  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const InputBox = forwardRef<HTMLInputElement, IProps>((props: IProps, ref) => {
  const {
    label,
    type,
    placeholder,
    value,
    // setValue,
    onChange,
    error,

    icon,
    onButtonClick,

    message,

    onKeyDown,
  } = props;

  // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;
  //   setValue(value);
  // };

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!onKeyDown) return;

    onKeyDown(event);
  };

  return (
    <div className="inputbox">
      <div className="inputbox-label">{`${label}`}</div>
      <div
        className={error ? "inputbox-container-error" : "inputbox-container"}
      >
        <input
          ref={ref}
          type={type}
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDownHandler}
        />
        {onButtonClick !== undefined && (
          <div className="icon-button" onClick={onButtonClick}>
            {icon !== undefined && <div className={`icon ${icon}`}></div>}
          </div>
        )}
      </div>
      {message !== undefined && (
        <div className="inputbox-message">{message}</div>
      )}
    </div>
  );
});

export default InputBox;
