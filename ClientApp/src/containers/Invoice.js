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

const PREFIX = "invoice";

export default function Company() {
  const api = useContext(ApiContext);
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const { update } = location.state;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState();
  const [textFields, setTextFields] = useState({
    [`${PREFIX}-name`]: {
      value: "",
      name: `${PREFIX}-name`,
      label: "Name",
      type: "text",
      required: true,
      error: false,
    },
    [`${PREFIX}-type`]: {
      value: 1,
      name: `${PREFIX}-type`,
      label: "Type",
      items: [
        {
          label: "Credit",
          value: 1,
        },
        {
          label: "Debit",
          value: 2,
        },
        {
          label: "Mixed",
          value: 3,
        },
        {
          label: "Commercial",
          value: 4,
        },
      ],
      required: true,
      error: false,
    },
    [`${PREFIX}-amount`]: {
      value: 0,
      name: `${PREFIX}-amount`,
      label: "Amount",
      type: "number",
      required: true,
      error: false,
    },
    [`${PREFIX}-company`]: {
      value: 0,
      name: `${PREFIX}-company`,
      label: "Company",
      required: true,
      error: false,
      items: [],
    },
  });

  async function fetchCompanies() {
    try {
      setLoading(true);
      const { data } = await api.getCompanies();
      setCompanies(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

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

      copiedTextFields[`${PREFIX}-company`].value = data.company.id;
      setTextFields(copiedTextFields);
    }
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (companies) {
      const copiedTextFields = { ...textFields };
      const formattedCompanies = companies.map((company) => ({
        value: company.id,
        label: company.name,
      }));
      copiedTextFields[`${PREFIX}-company`].items = formattedCompanies;
      if (!update) {
        copiedTextFields[`${PREFIX}-company`].value = companies[0].id;
      }
    }
  }, [companies]);

  const handleSubmit = async (data) => {
    setLoading(true);
    if (update) {
      await api.updateInvoice({
        id: parseInt(params.id),
        company: { id: data.company },
        name: data.name,
        type: data.type,
        amount: parseInt(data.amount),
      });
    } else {
      await api.createInvoice({
        company: { id: data.company },
        name: data.name,
        type: data.type,
        amount: parseInt(data.amount),
      });
    }
    setLoading(false);
    history.push("/invoices");
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
