import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Card, Form, Button, Stack } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { deleteTodo, handleCompletedTodo } from "../redux/reducer/todoReducer";
import { PropTypes } from "prop-types";

const MySwal = withReactContent(Swal);

function ListTodo({ handleEditClick, editFormVisibility }) {
  const [filter, setFilter] = useState();
  const state = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    MySwal.fire({
      title: "Are you sure want to delete this todo?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTodo(id));
        MySwal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <Stack
        className="justify-content-center mb-3"
        direction="horizontal"
        gap={3}
      >
        <Button
          className={filter === null ? "bg-secondary mx-1" : ""}
          variant="primary"
          onClick={() => setFilter(null)}
        >
          All
        </Button>
        <Button
          className={filter == false ? "bg-secondary mx-1" : ""}
          variant="primary"
          onClick={() => setFilter(false)}
        >
          ACTIVE
        </Button>
        <Button
          className={filter == true ? "bg-secondary mx-1" : ""}
          variant="primary"
          onClick={() => setFilter(true)}
        >
          COMPLETED
        </Button>
      </Stack>

      {state.map((item) => {
        if (filter === true || filter === false) {
          if (item.isCompleted === filter) {
            return (
              <Card
                key={item.id}
                className="p-3 border border-2 rounded-0 col-md-6 col-12 col-sm-8 mx-auto mb-3"
              >
                <Row className="d-flex justify-content-between">
                  <Form.Group className="col-6 d-flex">
                    {editFormVisibility === false && (
                      <Form.Check
                        className="fs-3 pe-3 rounded-0"
                        checked={item.isCompleted}
                        onChange={() => dispatch(handleCompletedTodo(item.id))}
                        type="checkbox"
                      />
                    )}
                    <Form.Label
                      style={
                        item.isCompleted
                          ? { textDecoration: "line-through" }
                          : { textDecoration: "none" }
                      }
                      className="fs-5"
                    >                      
                      {item.todo}
                    </Form.Label>
                  </Form.Group>
                  {!item.isCompleted && (
                    <Form.Group className="col-6 d-flex justify-content-end">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="btn btn-outline-secondary"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => dispatch(deleteTodo(item.id))}
                        className="mx-2 btn btn-outline-secondary"
                      >
                        <FaTrash />
                      </button>
                    </Form.Group>
                  )}
                </Row>
              </Card>
            );
          }
        } else {
          return (
            <Card
              key={item.id}
              className="p-3 border border-2 rounded-0 col-md-6 col-12 col-sm-8 mx-auto mb-3"
            >
              <Row className="d-flex justify-content-between">
                <Form.Group className="col-6 d-flex">
                  {editFormVisibility === false && (
                    <Form.Check
                      className="fs-3 pe-3 rounded-0"
                      checked={item.isCompleted}
                      onChange={() => dispatch(handleCompletedTodo(item.id))}
                      type="checkbox"
                      size="lg"
                    />
                  )}
                  <Form.Label
                    style={
                      item.isCompleted
                        ? { textDecoration: "line-through" }
                        : { textDecoration: "none" }
                    }
                    className="fs-5"
                  >
                    {item.todo}
                  </Form.Label>
                </Form.Group>
                {!item.isCompleted && (
                  <Form.Group className="col-6 d-flex justify-content-end">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="btn btn-outline-secondary"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="mx-2 btn btn-outline-secondary"
                    >
                      <FaTrash />
                    </button>
                  </Form.Group>
                )}
              </Row>
            </Card>
          );
        }
      })}
    </>
  );
}

ListTodo.propTypes = {
  handleEditClick: PropTypes.func,
  editFormVisibility: PropTypes.bool,
};

export default ListTodo;
