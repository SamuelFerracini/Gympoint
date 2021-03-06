import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';
import Header from '../../../components/Header';
import { Container } from '../../../styles/global';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Container>{children}</Container>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
