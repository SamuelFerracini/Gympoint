import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import { AsyncSelectReact } from './styles';

export default function InputAsyncSelect({ name, loadOptions }) {
  const { fieldName, registerField, defaultValue } = useField(name);
  const [value, setValue] = useState(defaultValue && defaultValue);
  const ref = useRef();

  useEffect(() => setValue(defaultValue), [defaultValue]);

  function parseSelectValue(selectRef) {
    return selectRef.select.state.value;
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function handleChange(e) {
    setValue(e);
  }

  return (
    <>
      <AsyncSelectReact
        name={fieldName}
        defaultValue
        value={value}
        ref={ref}
        loadOptions={loadOptions}
        defaultOptions
        onChange={handleChange}
        placeholder="Buscar aluno"
        className="asyncSelectInput"
      />
    </>
  );
}
InputAsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  loadOptions: PropTypes.func.isRequired,
};
