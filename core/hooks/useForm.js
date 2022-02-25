const { useState } = require("react")

const useForm = ({values: data, validate, onSuccess, errors: formErrors}) => {
  const [values, setValues] = useState(data || {});
  const [errors, setErrors] = useState(formErrors || {});

  const setValue = (key, value) => {
    setValues({...values, [key]: value});
    isValid();
  };
  const setError = (key, error) => setErrors({...values, [key]: error});

  function submit(event) {
    event?.preventDefault && event.preventDefault();
    if(isValid()) {
      onSuccess(values);
    }
  }

  function isValid() {
    const e = validate(values);
    if(e && Object.keys(e).some(k => Boolean(e[k]))) {
      setErrors(e);
      return false;
    } else {
      setErrors({});
      return true;
    }
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    setValue,
    setError,
    onSuccess,
    submit
  }
}

export default useForm;