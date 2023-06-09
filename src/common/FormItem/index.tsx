import { RenderIfTrue } from "common/RenderIfTrue";
import React from "react";
import { Form } from "react-bootstrap";

interface FormItemI {
  label: string;
  placeholder: string;
  value: string;
  fieldErrors: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FormItem: React.FC<FormItemI> = ({ label, placeholder, onChange, value, fieldErrors }) => {
  return (
    <Form.Group className='mb-3' controlId={label}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        isInvalid={!!fieldErrors}
      />
      <RenderIfTrue condition={!!fieldErrors}>
        <Form.Text className='text-danger'>{fieldErrors}</Form.Text>
      </RenderIfTrue>
    </Form.Group>
  );
};
export default FormItem;
