import styled from 'styled-components';
import Select from 'react-select';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 45px;

  .asyncSelectInput {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    height: 45px;
    justify-content: center;
    input {
      height: 45px;
    }
  }
`;

export const SelectOptions = styled(Select)`
  width: 198px;
  height: 45px;
`;
