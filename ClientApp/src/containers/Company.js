import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useHistory, useParams, useLocation } from "react-router-dom";

import ApiContext from "../contexts/apiContext";
import Form from "../components/Form";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: theme.spacing(50),
    margin: theme.spacing(1),
  },
}));

const PREFIX = "company";

export default function Company() {
  const api = useContext(ApiContext);
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const { update } = location.state;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [textFields, setTextFields] = useState({
    [`${PREFIX}-name`]: {
      value: "",
      name: `${PREFIX}-name`,
      label: "Name",
      required: true,
      error: false,
    },
    [`${PREFIX}-address`]: {
      value: "",
      name: `${PREFIX}-address`,
      label: "Address",
      required: true,
      error: false,
    },
    [`${PREFIX}-phone`]: {
      value: "",
      name: `${PREFIX}-phone`,
      label: "Phone",
      required: true,
      error: false,
    },
  });

  useEffect(() => {
    if (params.id && location.state.data) {
      const copiedTextFields = { ...textFields };
      const { data } = location.state;

      for (const field in copiedTextFields) {
        const nameWithoutPrefix = field.split("-")[1];
        if (nameWithoutPrefix) {
          copiedTextFields[field].value = data[nameWithoutPrefix];
        }
      }

      setTextFields(copiedTextFields);
    }
  }, []);

  const handleSubmit = async (data) => {
    setLoading(true);
    if (update) {
      await api.updateCompany({ id: parseInt(params.id), ...data });
    } else {
      await api.createCompany(data);
    }
    setLoading(false);
    history.push("/companies");
  };

  return (
    <Paper className={classes.paper} elevation={3}>
      <Form
        fields={textFields}
        submitBtnText={update ? "Update 🚀" : "Create 🚀"}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </Paper>
  );
}
