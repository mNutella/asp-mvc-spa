import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Form({ fields, submitBtnText, onSubmit, loading }) {
  const classes = useStyles();
  const [textFields, setTextFields] = useState(fields);

  const handleTextFieldChange = ({ target }) => {
    const copiedTextFields = { ...textFields };
    if (target.hasOwnProperty("name")) {
      copiedTextFields[target.name].value = target.value;
    } else {
      copiedTextFields[target.id].value = target.value;
    }
    setTextFields(copiedTextFields);
  };

  const getFormValues = () => {
    return Object.values(textFields).reduce((acc, curr) => {
      const name = curr.name.split("-")[1];
      return {
        [name]: curr.value,
        ...acc,
      };
    }, {});
  };

  const updateFormErrors = (names = []) => {
    const copiedTextFields = { ...textFields };
    for (const field in copiedTextFields) {
      if (names.includes(field)) {
        copiedTextFields[field].error = true;
      } else {
        copiedTextFields[field].error = false;
      }
    }
    setTextFields(copiedTextFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyFieldNames = Object.values(textFields)
      .filter((field) => !field.value)
      .map((field) => field.name);
    if (emptyFieldNames.length) {
      updateFormErrors(emptyFieldNames);
    } else {
      updateFormErrors(emptyFieldNames);
      const values = getFormValues();
      onSubmit && onSubmit(values);
    }
  };

  const renderFields = (fields, onChange) => {
    return fields.map((field) =>
      field.hasOwnProperty("items")
        ? renderSelectField(field, onChange)
        : renderTextField(field, onChange)
    );
  };

  const renderSelectField = (field, onChange) => {
    return (
      <Select
        required={field.required}
        key={field.name}
        id={field.name}
        name={field.name}
        label={field.label}
        value={field.value}
        error={field.error}
        onChange={onChange}
        variant="outlined"
      >
        {field.items.map((item, i) => (
          <MenuItem key={item.label + i} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    );
  };

  const renderTextField = (field, onChange) => {
    return (
      <TextField
        required={field.required}
        key={field.name}
        id={field.name}
        label={field.label}
        value={field.value}
        type={field.type}
        error={field.error}
        helperText={field.error && "Must be filled"}
        onChange={onChange}
        variant="outlined"
      />
    );
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {renderFields(Object.values(textFields), handleTextFieldChange)}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading}
        onClick={handleSubmit}
      >
        {submitBtnText}
      </Button>
    </form>
  );
}
