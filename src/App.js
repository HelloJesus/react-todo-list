import './App.css';
import { useEffect, useState } from 'react';
import * as axios from "axios"
import Tasks from './components/Tasks/Tasks';
import Lists from './components/Lists/Lists';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import PageNotFound from './components/PageNotFound/PageNotFound';


function App() {
  let [lists, setLists] = useState(null)
  let [colors, setColors] = useState(null)
  let [tasks, setTasks] = useState(null)
  let [activeList, setActiveList] = useState('')

  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    axios.get("https://react-todolist-heroku.herokuapp.com/lists?_expand=color&_embed=tasks").then((res) => {
      setLists(res.data)
    })
    axios.get("https://react-todolist-heroku.herokuapp.com/colors").then((res) => {
      setColors(res.data)
    })
    axios.get("https://react-todolist-heroku.herokuapp.com/tasks").then((res) => {
      setTasks(res.data)
    })
  }, [])

  const setNavigate = (item) => {
    setActiveList(item)
    navigate('/list/' + item.id)
  }

  useEffect(() => {
    const listId = (location.pathname).split('list/')[1]
    if (lists) {
      setActiveList(lists[listId - 1])
    }
  }, [lists, location])

  const setAddList = (obj) => {
    const newList = [...lists, obj]
    setLists(newList)
  }

  const setUpdateLists = (title, id) => {
    const newList = lists.filter(list => {
      if (list.id === id) { list.title = title }
      return list
    })
    setLists(newList)
  }

  const setRemoveList = (id) => {
    const newList = lists.filter(list => list.id !== id)
    const newTasks = tasks.filter(task => task.listId !== id)
    setLists(newList)
    setTasks(newTasks)
  }

  const setAddTask = (obj) => {
    const newTask = lists.map(list => {
      if (list.id === obj.listId) {
        list.tasks = [...list.tasks, obj]
      }
      return list
    }
    )
    setTasks([...tasks, obj])
    setLists(newTask)
  }

  const setUpdateTask = (idTask, text, isCompleted) => {
    const newList = lists.map(list => {
      list.tasks.map(task => {
        if (task.id === idTask) {
          task.text = text
          task.isCompleted = isCompleted
        }
        return task
      })
      return list
    })

    const newTasks = tasks.map(task => {
      if (task.id === idTask) {
        task.text = text
        task.isCompleted = isCompleted
      }
      return task
    })
    setTasks(newTasks)
    setLists(newList)
  }

  const setRemoveTask = (idTask, obj) => {
    const newList = lists.filter(list => {
      list.tasks = list.tasks.filter(task => task.id !== idTask)
      return list
    })
    const newTasks = tasks.filter((task) => task.id !== idTask)

    setTasks(newTasks)
    setLists(newList)
  }

  return (
    <div className="todo">
      <div className="todo__header">
        <h1>To Do List</h1>
      </div>
      <div className='container row'>
        <Lists lists={lists}
          colors={colors}
          setAddList={setAddList}
          setRemoveList={setRemoveList}
          setUpdateLists={setUpdateLists}
          setNavigate={setNavigate}
          navigate={navigate} />
        <div className="todo__tasks">
          {!activeList && <h2 className="tasks__title">All Tasks</h2>}
          <Routes>
            <Route exact path="/" element=
              {lists &&
                <Tasks items={{ lists, tasks }}
                  setAddTask={setAddTask}
                  setRemoveTask={setRemoveTask}
                  setUpdateTask={setUpdateTask}
                  withEmpty
                />
              }>
            </Route>
            <Route path="/list/:id" element=
              {lists && activeList &&
                <Tasks items={{ lists: activeList, tasks: activeList.tasks }}
                  setAddTask={setAddTask}
                  setRemoveTask={setRemoveTask}
                  setUpdateTask={setUpdateTask} />
              }>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
