import React from "react";
import { FormContainer, FormTitle } from "./Form.styles";

type FormChildElement = React.ReactElement<{
  id: string;
  onChange?: (value: string) => void;
}>;

type FormProps = {
  title: string;
  children: FormChildElement[];
  onSubmit: () => void;
};

export const Form = ({ title, children, onSubmit }: FormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>{title}</FormTitle>
      {children}
    </FormContainer>
  );
};
