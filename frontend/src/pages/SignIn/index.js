import React from 'react';
// import { Link } from 'react-router-dom';
// import { Form, Input } from '@rocketseat/unform';
// import { useDispatch, useSelector } from 'react-redux';
import logo from '~/assets/logo.svg';
import gym from '~/assets/gympoint.svg';

export default function SignIn() {
  return (
    <>
      <form>
        <img src={logo} alt="Logo" />
        <img
          src={gym}
          alt="Gympoint"
          style={{ marginTop: 20, marginBottom: 30 }}
        />
        <p>SEU EMAIL</p>
        <input type="email" placeholder="exemplo@email.com" />
        <p>SUA SENHA</p>
        <input type="password" placeholder="**************" />
        <button type="submit">Entrar</button>
      </form>
    </>
  );
}
