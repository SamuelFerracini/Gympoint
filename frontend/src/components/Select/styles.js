import styled from 'styled-components';
import Select from 'react-select';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  .asyncSelectInput {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    height: 45px;
    justify-content: center;
    input {
      height: 35px;
    }
  }
`;

export const SelectOptions = styled(Select)`
  width: 170px;
`;
