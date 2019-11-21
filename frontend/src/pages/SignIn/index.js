import React from 'react';
// import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import logo from '~/assets/logo.svg';
import gym from '~/assets/gympoint.svg';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" />
        <img
          src={gym}
          alt="Gympoint"
          style={{ marginTop: 20, marginBottom: 30 }}
        />
        <p>SEU E-MAIL</p>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <p>SUA SENHA</p>
        <Input name="password" type="password" placeholder="**************" />
        <button type="submit">Entrar</button>
      </Form>
    </>
  );
}
