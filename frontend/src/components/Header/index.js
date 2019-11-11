import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Content, Logo } from './styles';
import logo from '~/assets/logo.svg';
import gympoint from '~/assets/gympoint.svg';

export default function Header() {
  // const profile = useSelector(state => state.user.profile);
  return (
    <Container>
      <Content>
        <Logo>
          <img src={logo} alt="" style={{ width: 70 }} />
          <img src={gympoint} alt="" />
        </Logo>
        <nav>
          <Link style={{ color: 'black' }} to="/">
            ALUNOS
          </Link>
          <Link to="/">PLANOS</Link>
          <Link to="/">MATRÍCULAS</Link>
          <Link to="/">PEDIDOS DE AUXÍLIO</Link>
        </nav>
        <aside>
          <span>Diego Fernandes</span>
          <button type="button">Sair</button>
        </aside>
      </Content>
    </Container>
  );
}
