import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;
export const Content = styled.div`
  height: 64px;
  max-width: 1000px;
  padding: 30px 20px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      color: #999999;
      margin-right: 20px;
    }

    a:hover:not(:active) {
      color: red;
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    align-items: center;

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

  img {
    width: 120px;
    margin-right: 20px;
  }
`;
