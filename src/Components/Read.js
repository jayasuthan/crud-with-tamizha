import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { API_URL } from "../Constants/URL";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Read() {
  const [apiData, setApiData] = useState([]);
  const navi = useNavigate();

  useEffect(() => {
    callGetApi();
  }, []);

  const createPage = () => {
    navi("/");
  };

  console.log(apiData.length);

  if (apiData.length == 0) {
       navi('/')
  }

  const updateUser = ({ firstName, LastName, checked, id }) => {
    localStorage.setItem("id", id);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("LastName", LastName);
    localStorage.setItem("checked", checked);
    navi("/update");
  };

  const deleteUser = async (id) => {
    await axios.delete(API_URL + `/${id}`);
    callGetApi();
  };

  const callGetApi = async () => {
    const resp = await axios.get(API_URL);
    setApiData(resp.data);
  };

  return (
    <Table singleLine>
      <Table.Header>
        <Table.Row className="table"> 
          <Table.HeaderCell>First Name</Table.HeaderCell>
          <Table.HeaderCell>Last Name</Table.HeaderCell>
          <Table.HeaderCell>Checked</Table.HeaderCell>
          <Table.HeaderCell>Delete</Table.HeaderCell>
          <Table.HeaderCell>Update</Table.HeaderCell>
          <Table.HeaderCell>
            <Button onClick={createPage}>Go to Create Page </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {apiData.map((data) => (
          <Table.Row key={data.id}>
            <Table.Cell>{data.firstName}</Table.Cell>
            <Table.Cell>{data.LastName} </Table.Cell>
            <Table.Cell>{data.checked ? "true" : "false"} </Table.Cell>
            <Table.Cell>
              {" "}
              <Button
                onClick={() => {
                  deleteUser(data.id);
                }}
              >
                DELETE
              </Button>{" "}
            </Table.Cell>
            <Table.Cell>
              <Button onClick={() => updateUser(data)}>UPDATE</Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default Read;
