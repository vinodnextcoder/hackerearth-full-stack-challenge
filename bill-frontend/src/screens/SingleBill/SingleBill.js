import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../actions/billsActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
// import ReactMarkdown from "react-markdown";

function SingleNote({ match, history }) {
  
  const [date, setDate] = useState("");
  const [unitConsume, setunitConsume] = useState("");
  const [billStatus, setbillStatus] = useState("");
  const [amount, setAmount] = useState("");

  const dispatch = useDispatch();

  const billUpdate = useSelector((state) => state.billUpdate);
  const { loading, error } = billUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
    history.push("/mynotes");
  };

  useEffect(() => {
    const fetching = async () => {
      const userInfo = localStorage.getItem('userInfo')

      let tokenData = JSON.parse(userInfo);
      // console.log(tokenData.data.accessToken)

      const config = {
        headers: {
          Authorization: `Bearer ${tokenData.data.accessToken}`,
        },
      };
      const { data } = await axios.get(`/api/v1/bill/${match.params.id}`, config);
    

      setunitConsume(data.data.unitConsume || "");
      setAmount(data.data.amount || "");
      setbillStatus(data.data.billStatus|| "");
      setDate(data.data.updatedAt || "");
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setunitConsume("");
    setAmount("");
    setbillStatus("");

  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(match.params.id, amount, billStatus, unitConsume));
    if (!amount || !billStatus || !unitConsume) return;

    resetHandler();
    history.push("/mynotes");
  };

  return (
    <MainScreen title="Edit Bill">
      <Card>
        <Card.Header>Bill your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="unitConsume">
              <Form.Label>Unit</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the Unit"
                value={unitConsume}
                onChange={(e) => setunitConsume(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="amount">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="billStatus">
              <Form.Label>setbillStatus</Form.Label>
              <Form.Control 
                type="select"
                value={billStatus}
            
                onChange={(e) => setbillStatus(e.target.value)} as="select">
                <option>Pending</option>
                <option>Paid</option>
              </Form.Control>
            </Form.Group>


            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Bill
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleNote;
