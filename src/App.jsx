import { Routes, Route } from "react-router-dom"
import TodoPage from './pages/todoPage';


function App() {


  return (
    <>
    <main className="container">
      <Routes>
        <Route path="/" element={<TodoPage />} />
      </Routes>
    </main>
    </>
  )
}

export default App
