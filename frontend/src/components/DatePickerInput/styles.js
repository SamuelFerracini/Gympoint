import styled from 'styled-components';
import ReactDatePicker from 'react-datepicker';

export const DatePicker = styled(ReactDatePicker)`
  height: 36px;
  border: 1px solid #ccc;
  padding: 0 15px;
  width: 198px;
  height: 45px;
  background: ${props => (props.readOnly ? '#f5f5f5' : '#ffffff')};
  border-radius: 4px;
  margin-bottom: 20px;
`;
