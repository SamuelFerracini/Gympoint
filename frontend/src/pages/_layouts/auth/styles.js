import styled from 'styled-components';
import { darken } from 'polished';

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #ee4d64;

  form {
    width: 360px;
    height: 450px;
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 30px;
    border-radius: 4px;

    img {
      margin-top: 30px;
    }

    p {
      margin-bottom: 5px;
    }

    > input {
      margin-top: 30px;
    }

    input {
      border: 1px solid #ccc;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 25px;
    }
  }
`;
