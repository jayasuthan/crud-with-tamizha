import React, { useState, useEffect } from "react";
import { Form, Button, Checkbox } from "semantic-ui-react";
import axios from "axios";
import { API_URL } from "../Constants/URL";
import { useNavigate } from "react-router-dom";


function Update() {
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [checked, setChecked] = useState();
  const [id, setId] = useState();

  const navigate = useNavigate()

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setFirstName(localStorage.getItem("firstName"));
    setLastName(localStorage.getItem("LastName"));
    setChecked(localStorage.getItem("checked"));
  },[]);

  const updateUser = async () => {
    await axios.put(API_URL + `/${id}`, {
      firstName,
      LastName,
      checked
 })
   navigate('/read')
  }

  return (
    <div>
      <h3>Update operation</h3>

      <Form className="form">
        <Form.Field>
          <label>First Name</label>
          <input onChange={event => setFirstName(event.target.value)} value={firstName} placeholder="Enter FirstName " />
        </Form.Field>{" "}
        <br />
        <Form.Field>
          <label>Last Name</label>
          <input onChange={event => setLastName(event.target.value)} value={LastName} placeholder="Enter LastName  " />
        </Form.Field>
        <br/> 
        <Form.Field>
          <Checkbox onChange={ () => setChecked(!checked)} checked={checked} label=" Agree the Terms & Conditions " />
        </Form.Field> <br/> 
        <Button onClick={updateUser} > UPDATE </Button>
      </Form>
    </div>
  );
}

export default Update;
