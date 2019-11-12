import styled from 'styled-components';
import { darken } from 'polished';

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
    background: #ee4d64;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: 0.2s;

    &:hover {
      background: ${darken(0.03, '#ee4d64')};
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

export const Table = styled.div`
  background: #fff;
  padding: 30px;

  table {
    width: 100%;
    table-layout: fixed;

    th {
      text-align: left;
    }

    td {
      color: #666666;
      margin: 16px 0;
      padding: 0;
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
      }

      button:last-child {
        color: #de3b3b;
      }
    }
  }
`;
