import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Content, Logo } from './styles';
import logo from '~/assets/logo.svg';
import gympoint from '~/assets/gympoint.svg';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  const user = useSelector(state => state.user.admin);
  return (
    <Container>
      <Content>
        <nav>
          <Logo>
            <img src={logo} alt="" />
            <img src={gympoint} alt="" />
          </Logo>
          <Link current to="/students">
            ALUNOS
          </Link>
          <Link to="/">PLANOS</Link>
          <Link to="/">MATRÍCULAS</Link>
          <Link to="/">PEDIDOS DE AUXÍLIO</Link>
        </nav>
        <aside>
          <span>{user.name}</span>
          <button type="button" onClick={handleSignOut}>
            Sair
          </button>
        </aside>
      </Content>
    </Container>
  );
}
