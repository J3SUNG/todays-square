import React from "react";
import { FormContainer, FormTitle } from "./Form.styles";

type FormChildElement = React.ReactElement<{
  id: string;
  onChange?: (value: string) => void;
}>;

type FormProps = {
  title: string;
  children: FormChildElement[]; // 명확히 정의된 children 타입
  onSubmit: (data: Record<string, string>) => void;
};

export const Form = ({ title, children, onSubmit }: FormProps) => {
  const [formData, setFormData] = React.useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>{title}</FormTitle>
      {React.Children.map(children, (child) =>
        React.isValidElement<FormChildElement>(child)
          ? React.cloneElement(child, {
              onChange: (value: string) => updateField(child.props.id, value),
            })
          : child
      )}
    </FormContainer>
  );
};
