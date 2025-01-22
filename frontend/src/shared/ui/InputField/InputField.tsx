import { Input, InputWrapper, Label } from "./InputField.styles";

type InputFieldProps = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

export const InputField = ({ id, label, type, placeholder, value, onChange }: InputFieldProps) => (
  <InputWrapper>
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </InputWrapper>
);
