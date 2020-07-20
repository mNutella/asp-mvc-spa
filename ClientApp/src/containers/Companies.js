import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

import ApiContext from "../contexts/apiContext";
import { CompaniesTable } from "../components/Table";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(1),
  },
}));

export default function Home() {
  const api = useContext(ApiContext);
  const history = useHistory();
  const classes = useStyles();
  const [companies, setCompanies] = useState();
  const [loading, setLoading] = useState(false);

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
    fetchCompanies();
  }, []);

  const handleEditClick = (id, data) => {
    history.push({
      pathname: `/edit-company/${id}`,
      state: { data, update: true },
    });
  };

  const handleDeleteClick = async (id) => {
    try {
      setLoading(true);
      await api.deleteCompany(id);
      await fetchCompanies();
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
      <CompaniesTable
        rows={companies}
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
            pathname: "/create-company",
            state: { update: false },
          })
        }
      >
        Add new 🚀
      </Button>
    </div>
  );
}
