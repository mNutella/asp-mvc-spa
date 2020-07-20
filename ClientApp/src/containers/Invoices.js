import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

import ApiContext from "../contexts/apiContext";
import { InvoicesTable } from "../components/Table";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(1),
  },
}));

export default function Invoices() {
  const api = useContext(ApiContext);
  const history = useHistory();
  const classes = useStyles();
  const [invoices, setInvoices] = useState();
  const [loading, setLoading] = useState(false);

  async function fetchInvoices() {
    try {
      setLoading(true);
      const { data } = await api.getInvoices();
      setInvoices(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleEditClick = (id, data) => {
    history.push({
      pathname: `/edit-invoice/${id}`,
      state: { data, update: true },
    });
  };

  const handleDeleteClick = async (id) => {
    try {
      setLoading(true);
      await api.deleteInvoice(id);
      await fetchInvoices();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <Typography className={classes.title} variant="h6">
        Invoices Table
      </Typography>
      <InvoicesTable
        rows={invoices}
        loading={loading}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() =>
          history.push({
            pathname: "/create-invoice",
            state: { update: false },
          })
        }
      >
        Add new 🚀
      </Button>
    </div>
  );
}
