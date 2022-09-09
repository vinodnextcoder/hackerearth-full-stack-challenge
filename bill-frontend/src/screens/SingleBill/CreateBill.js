import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/billsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateNote({ history }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [unitConsume, setunitConsume] = useState("");
  const [billStatus, setbillStatus] = useState("");
  // billStatus
  // unitConsume

  const dispatch = useDispatch();

  const createBill = useSelector((state) => state.createBill);
  const { loading, error, bill } = createBill;

  console.log(bill);

  const resetHandler = () => {
    setTitle("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(unitConsume, billStatus));
    if (!title || !billStatus)  return;


    history.push("/mynotes");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create a Bill">
      <Card>
        <Card.Header>Create a new Bill</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
         

            <Form.Group controlId="unitConsume">
              <Form.Label>unitConsume</Form.Label>
              <Form.Control
                type="text"
                value={unitConsume}
                placeholder="Enter the unitConsume"
                onChange={(e) => setunitConsume(e.target.value)}
              />

            </Form.Group>

            <Form.Group controlId="setbillStatus">
              <Form.Label>setbillStatus</Form.Label>
              <Form.Control  type="select"
                value={billStatus}
                placeholder="Enter the unitConsume"
                
                onChange={(e) => setbillStatus(e.target.value)} as="select">
      <option>Pending</option>
      <option>Paid</option>
    </Form.Control>
              
            </Form.Group>
            
      
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

           
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
