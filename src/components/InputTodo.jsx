import { Form, Button } from 'react-bootstrap';
import { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { addTodo, updateTodo } from '../redux/reducer/todoReducer';
import TextField from './TextField/TextField';
import PropTypes from 'prop-types';

//Sweet alert with react content
const MySwal = withReactContent(Swal)



function InputTodo({editFormVisibility, editTodo, cancelUpdate}) {

  const dispatch = useDispatch();
  const [ todoValue, setTodoValue ] = useState('');
  const [ editValue, setEditValue ] = useState('');

  useEffect( () => {
    //Catch edit todo from props and set to edit state
    setEditValue(editTodo.todo);
  }, [editTodo] )

  //Submit Todo
  const handleSubmit = (e) => {
    e.preventDefault();
    const todoObj = {
        id : +new Date(),
        todo : todoValue,
        isCompleted : false,
    }
        if(todoValue === ''){
          MySwal.fire(
            'Error!',
            'Please fill your todo.',
            'error'
          )
        }else {
          dispatch(addTodo(todoObj));
        MySwal.fire(
        'Success!',
        'Succesfully added some todo.',
        'success'
      )
        }
        setTodoValue('');
    }
    
    //Edit Todo
    const editSubmit = (e) => {
      e.preventDefault();
      const editObj = {
        id: editTodo.id,
        todo: editValue,
        isCompleted: editTodo.isCompleted,

      }
      //Dispatch and send object to action editTodoSubmit
      dispatch(updateTodo(editObj));
      MySwal.fire(
        'Success!',
        'Your todo has been updated.',
        'success'
      )
      e.target.reset();
      cancelUpdate();
      console.log(editObj)
    }

  return (
    <>
    { editFormVisibility===false?(
      <Form className="form-group col-md-6 col-12 col-sm-8 mx-auto" onSubmit={handleSubmit}>
        <Form.Group className="d-flex">
          {/* <input type="text" value={todoValue || " "} className="border border-2 form-control" onChange={ (e) => setTodoValue(e.target.value) } placeholder="Add your Todo List here" required /> */}
          <TextField
          value={todoValue || " "}
          handleChange={ (e) => setTodoValue(e.target.value) }
          text={"Add your Todo List here"}
          className={"border border-2 form-control"}
          name="todo"
          /> 
          <Button type="submit" className="submit ms-2">Add</Button>
        </Form.Group> 
      </Form>
      ):(
      <Form className="form-group col-md-6 col-12 col-sm-8 mx-auto" onSubmit={editSubmit} >
          <Form.Group className="d-flex mb-3">
            {/* <input type="text"  value={editValue || " " } className="border border-2 form-control" onChange={ (e) => setEditValue(e.target.value) } placeholder="Update your Todo Items" required /> */}
            <TextField 
            value={editValue || " "}
            handleChange={ (e) => setEditValue(e.target.value) }
            text="Update your Todo Items"
            className={"border border-2 form-control"}
            name="todo"
            />
            <Button type="submit" className="submit ms-2">Update</Button>
          </Form.Group> 
          <Form.Group className="text-center">
            <Button className="btn btn-secondary submit" onClick={ () => cancelUpdate() }>BACK</Button>
          </Form.Group>
      </Form>
        ) 
        }
    </>
  )
}


InputTodo.propTypes = {
  editFormVisibility: PropTypes.bool,
  cancelUpdate: PropTypes.func,
}

export default InputTodo;