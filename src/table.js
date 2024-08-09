import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import formatDate from "./formatDate";
import calculateValue from "./calculateWithAmortissement";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import "./table.css";

function ShowTable() {
  const [patrimoine, setPatrimoine] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [patrimoineTotal, setPatrimoineTotal] = useState();

  function totalPatrimoine() {
    let total = 0;
    patrimoine.forEach((possession) => {
      const result = calculateValue(
        possession?.valeur,
        possession?.dateDebut,
        possession?.tauxAmortissement,
        possession?.valeurConstante,
        startDate
      );
      total += result;
    });
    setPatrimoineTotal(Math.floor(total) + " Ar");
  }

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          "https://raw.githubusercontent.com/Liantsoa1/patrimoine-economique/main/data/data.json"
        )
        .then(function (response) {
          const patrimoinesData = response.data.find(
            (item) => item.model === "Patrimoine"
          );
          setPatrimoine(patrimoinesData.data.possessions);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>libelle</th>
              <th>valeur initiale</th>
              <th>date de debut</th>
              <th>date de fin</th>
              <th>amortissement</th>
              <th>valeur actuelle</th>
            </tr>
          </thead>
          <tbody>
            {patrimoine.map((possession, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{possession?.libelle}</td>
                <td>{possession?.valeur}</td>
                <td>{formatDate(possession?.dateDebut)}</td>
                <td>{possession?.dateFin}</td>
                <td>{possession?.tauxAmortissement}</td>
                <td>
                  {calculateValue(
                    possession?.valeur,
                    possession?.dateDebut,
                    possession?.tauxAmortissement,
                    possession?.valeurConstante,
                    null
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="date-picker-container">
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            const newDate = new Date(date);
            setStartDate(newDate);
          }}
        />
        <Button variant="success" onClick={totalPatrimoine}>
          Valider
        </Button>
      </div>
      <div className="text-container">
        <p>Votre patrimoine est: {patrimoineTotal} </p>
      </div>
    </div>
  );
}

export default ShowTable;
