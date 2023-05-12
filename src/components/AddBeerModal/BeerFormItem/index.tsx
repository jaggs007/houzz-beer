import React from "react";
import { Form } from "react-bootstrap";

interface BeerFormItemI {
  label: string;
  placeholder: string;
  value: string;
  fieldErrors: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const BeerFormItem: React.FC<BeerFormItemI> = ({
  label,
  placeholder,
  onChange,
  value,
  fieldErrors,
}) => {
  return (
    <Form.Group className='mb-3' controlId='genre'>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      {fieldErrors && <Form.Text className='text-danger'>{fieldErrors}</Form.Text>}
    </Form.Group>
  );
};
export default BeerFormItem;
