import { useDispatch} from 'react-redux'
import { useState } from 'react'
import { Button, Container,  Row } from 'react-bootstrap'
import TodoLayout from '../layout/TodoLayout'
import { deleteAllTodo } from '../redux/reducer/todoReducer'
import InputTodo from '../components/InputTodo'
import ListTodo from '../components/ListTodo'

function TodoPage() {
    const dispatch = useDispatch();
    const [ editFormVisibility, setEditFormVisibility ] = useState(false);
    const [ editTodo, setEditTodo ] = useState('');
  
    
    const handleEditClick = (todo) => {
      setEditFormVisibility(true);
      setEditTodo(todo);
     console.log(todo)
    }
  
    const cancelUpdate = () => {
      setEditFormVisibility(false);
    }

  return (
    <>
          <TodoLayout text="What's the plan for today?" />
            <Container className="mb-5">
              <Row>
                <InputTodo editFormVisibility={editFormVisibility } editTodo={editTodo} cancelUpdate={cancelUpdate} />
              </Row>
            </Container>
            <Container>
              <Row className="d-flex justify-content-center flex-column">
                <ListTodo handleEditClick={handleEditClick}  editFormVisibility={editFormVisibility} />
              </Row>
             <Container className="d-flex justify-content-center">
              <Button className='' variant="danger" onClick={() => dispatch(deleteAllTodo())}>Delete All</Button>
             </Container>
            </Container>
    </>
  )
}

export default TodoPage