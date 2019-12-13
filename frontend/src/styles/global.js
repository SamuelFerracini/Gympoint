import styled, { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { darken } from 'polished';
import { Input as InputRocket } from '@rocketseat/unform';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700&display=swap');

 *{
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

*:focus{
  outline: 0;
}

html, body, #root{
  height: 100%;
}

body{
  -webkit-font-smoothing: antialiased;
}

body, input, button{
  font: 14px 'Lato', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

a{
  text-decoration: none;
}

ul{
  list-style: none;
}

button{
  cursor: pointer;
}
`;

export const Container = styled.div`
  padding: 30px 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    overflow-x: auto;
    align-items: flex-start;
    &::-webkit-scrollbar {
      height: 8px;
    }
    &::-webkit-scrollbar * {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 15px;
      background: rgba(0, 0, 0, 0.09) !important;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || '900px'};
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 20px;
  font-size: 16px;

  input {
    height: 36px;
    width: 237px;
    border: 1px solid #ccc;
    padding: 0 15px;
    margin-left: 16px;
    background: #ffffff;
    border-radius: 4px;
  }
`;

export const Formcontent = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 30px;
  justify-content: space-around;
  width: 100%;
  border-radius: 4px;

  span {
    display: flex;
    flex-direction: column;

    p {
      color: #444444;
      font-weight: bold;
      margin-bottom: 8px;
    }

    > span {
      color: red;
      font-weight: normal;
      margin-top: -20px;
      margin-bottom: 8px;
    }
  }

  > div {
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
  }
`;

export const Input = styled(InputRocket)`
  height: 45px;
  border: 1px solid #ccc;
  padding: 0 15px;
  width: ${props => props.width};
  background: ${props => (props.readOnly ? '#f5f5f5' : '#ffffff')};
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const Table = styled.div`
  background: #fff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;

  table {
    width: 100%;
    table-layout: fixed;
    height: 100%;
    border-collapse: collapse;

    th {
      text-align: left;
      font-size: 16px;
    }

    td {
      color: #666666;
      margin: 10px 0;
      padding: 8px 0;
      font-size: 16px;
      text-align: left;
      max-width: 500px;
      overflow: hidden;
    }

    tr:not(:last-of-type) {
      border-bottom: 1px solid #eee;
    }

    td:last-child {
      display: flex;
      justify-content: flex-end;

      button {
        background: none;
        border: 0;
        margin-left: 23px;
      }

      button:first-child {
        color: #4d85ee;

        &:hover {
          color: ${darken(0.1, '#4d85ee')};
        }
      }

      button:last-child {
        color: #de3b3b;

        &:hover {
          color: ${darken(0.1, '#de3b3b')};
        }
      }
    }
  }
`;

export const Button = styled.button`
  width: 148px;
  height: 36px;
  margin-left: 16px;
  background: ${props => props.color};
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: 0.2s;

  &:hover {
    background: ${props => darken(0.1, props.color)};
  }
`;

export const Center = styled.div`
  text-align: center;
`;
