import React, { useEffect, useState } from 'react';
import {
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  CardBody,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


const initialForm = {
  email: '',
  password: '',
  terms: false,
};
const errorMessages = {
  email: 'Geçerli eposta adresi giriniz',
  password: 'En az 8 karakter,en az 1 büyük harf,küçük harf,en az 1 sembol ve en az 1 rakam içermelidir.',
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    terms: false,
  });

  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/;
  useEffect(() => {
    if (
      validateEmail(form.email) &&
      regex.test(form.password) &&
      form.terms
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [form]);
  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;
    setForm({ ...form, [name]: value });

    if (name == 'email') {
      if (validateEmail(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name == 'password') {
      if (regex.test(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name == 'terms') {
      if (value) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
     navigate('/success');
      
    if (isValid) return;
      
  };

  return (
    <Card>
      <CardBody>
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={errors.email}
          data-cy= "email-input"
        />
        {errors.email && <FormFeedback data-cy= "error-message">{errorMessages.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={errors.password}
          data-cy= "password-input"
        />
        {errors.password && (
          <FormFeedback data-cy= "error-message">{errorMessages.password}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup check>
        <Label check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
          invalid={errors.terms}
          data-cy= "terms-input"
        />
         I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isValid} data-cy= "submit-button"> 
          Sign In
        </Button>
      </FormGroup>
    </Form>
    </CardBody>
    </Card>
  );
}
