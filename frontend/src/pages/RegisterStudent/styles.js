import styled from 'styled-components';
import { darken } from 'polished';
import { Form as FormRocket, Input as InputRocket } from '@rocketseat/unform';

export const Container = styled.div`
  padding: 30px 120px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 20px;

  button {
    width: 148px;
    height: 36px;
    margin-left: 16px;
    background: #ee4d64;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: 0.2s;

    &:hover {
      background: ${darken(0.1, '#ee4d64')};
    }

    &:first-child {
      background: #ccc;
    }
  }

  input {
    height: 36px;
    border: 1px solid #ccc;
    padding: 0 15px;
    margin-left: 16px;
    background: #ffffff;
    border-radius: 4px;
  }
`;

export const FormSpace = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 30px;

  span {
    color: #444444;
    font-weight: bold;
    margin-bottom: 8px;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 1;

    div {
      display: flex;
      flex-direction: column;

      input {
        width: 270px;
      }
    }
  }
`;

export const Input = styled(InputRocket)`
  height: 36px;
  border: 1px solid #ccc;
  padding: 0 15px;
  background: #ffffff;
  border-radius: 4px;
  margin-bottom: 20px;
`;
