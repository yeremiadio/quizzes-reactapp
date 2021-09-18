import {
  Avatar,
  Button,
  CardHeader,
  Container,
  Paper,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link, useLocation } from "react-router-dom";
import apiQuiz from "../../../actions/quiz/quiz";
import Layout from "../../../components/Layout";
import { saveAs } from "file-saver";

const EssayResultsPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [result, setResult] = useState([]);
  const slug = location.state.slug;
  const [isLoading, setLoading] = useState(true);
  const saveFile = (doc) => {
    saveAs(`http://192.168.0.8:8000/assets/files/quiz/${doc}`, doc);
  };
  const columns = [
    {
      title: "ID",
      field: "id",
      editable: false,
      width: "1%",
    },
    {
      title: "Email",
      field: "email",
      editable: false,
    },
    {
      field: "name",
      title: "Name",
      editable: false,
      render: (rowData) => {
        return (
          <CardHeader
            style={{ padding: 0 }}
            avatar={
              rowData.avatar !== null ? (
                <Avatar
                  src={`http://192.168.0.8:8000/assets/images/avatar/${rowData.avatar}`}
                />
              ) : (
                <AccountCircle />
              )
            }
            title={rowData.name}
          />
        );
      },
    },
    {
      title: "Score",
      width: "1%",
      field: "results[0].score",
    },
    {
      title: "Komentar",
      field: "results[0].result_essays[0].comment",
      editable: false,
    },
    {
      title: "File",
      width: "1%",
      field: "results[0].result_essays[0].file",
      editable: false,
      render: (rowData) => {
        return (
          <Button
            onClick={() => saveFile(rowData.results[0].result_essays[0].file)}
            color="primary"
          >
            {rowData.results[0].result_essays[0].file}
          </Button>
        );
      },
    },
  ];

  const handleRowUpdate = (newData, oldData, resolve) => {
    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("score", newData.results[0].score);
    apiQuiz
      .guruScoreEssay(formData, newData.results[0].result_essays[0].result_id)
      .then((response) => {
        const updateScore = [...result];
        const index = oldData.tableData.id;
        updateScore[index] = newData;
        setResult([...updateScore]);
        console.log(response);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        resolve();
      });
  };

  useEffect(() => {
    if (!location.state) history.push("/quiz");
    apiQuiz
      .resultQuiz(slug, "essay")
      .then((response) => {
        const res = response.data.data;
        console.log(res);
        setLoading(false);
        setResult(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [history, location, slug]);

  return !location.state ? (
    <h1>Forbidden</h1>
  ) : (
    <Paper>
      <MaterialTable
        style={{ padding: "0 15px" }}
        title="Hasil Esai"
        isLoading={isLoading}
        columns={columns}
        data={result}
        options={{
          search: true,
          sorting: true,
          tableLayout: "auto",
          actionsColumnIndex: -1,
          addRowPosition: "first",
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
        }}
      />
    </Paper>
  );
};

export default Layout(EssayResultsPage, "Esai");