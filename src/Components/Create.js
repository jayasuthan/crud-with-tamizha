import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Checkbox } from "semantic-ui-react";
import { API_URL } from "../Constants/URL";
import { useNavigate } from "react-router-dom";

function Create() {
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const postData = async () => {
    await axios.post(API_URL, {
      firstName,
      LastName,
      checked,
    });

    setFirstName("");
    setLastName("");
    setChecked(false);

    navigate("/read");
  };

  return (
    <div>
      <Form className="form">
        <Form.Field>
          <label>First Name</label>
          <input
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
            value={firstName}
            placeholder="Enter FirstName "
          />
        </Form.Field>{" "}
        <br />
        
         


        <Form.Field>
          <label>Last Name</label>
          <input
            onChange={(event) => setLastName(event.target.value)}
            value={LastName}
            placeholder="Enter LastName  "
          />
        </Form.Field>
        <br />
        <Form.Field>
          <Checkbox
            onChange={() => setChecked(!checked)}
            checked={checked}
            label=" Agree the Terms & Conditions "
          />
        </Form.Field>{" "}
        <br />
        <Button onClick={postData}> SUBMIT </Button>
      </Form>
    </div>
  );
}

export default Create;
