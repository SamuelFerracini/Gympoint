import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;
export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    a {
      font-weight: bold;
      color: #999999;
      margin-left: 30px;

      &:hover:not(:active) {
        color: red;
      }
    }
  }
  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    span {
      color: #666666;
      font-weight: bold;
      font-weight: 15px;
    }

    button {
      background: none;
      border: 0;
      color: #de3b3b;
    }
  }
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: row;
  border-right: 1px solid #dddddd;
  padding-right: 30px;

  img {
    width: 80px;
  }

  img:first-of-type {
    width: 55px;
    margin-right: 20px;
  }
`;
