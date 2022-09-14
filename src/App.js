import './App.css';
import { useEffect, useState } from 'react';
import Tasks from './components/Tasks/Tasks';
import Lists from './components/Lists/Lists';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { dispatchState } from './dispatch/dispatchState';
import { API } from './api/api';

const urls = [
  'https://react-todolist-heroku.herokuapp.com/lists?_expand=color&_embed=tasks',
  'https://react-todolist-heroku.herokuapp.com/tasks',
  'https://react-todolist-heroku.herokuapp.com/colors'
]

function App() {
  let [data, setData] = useState({ lists: null, tasks: null, colors: null })
  let [activeList, setActiveList] = useState(null)

  let navigate = useNavigate();
  let location = useLocation();

  const setNavigate = (item) => {
    setActiveList(item)
    navigate('/list/' + item.id)
  }

  useEffect(() => {
    const res = API.getData(urls)
    res.then(res => setData({ lists: res[0], tasks: res[1], colors: res[2] }))
  }, [])

  useEffect(() => {
    const listId = +(location.pathname).split('list/')[1]

    if (data.lists) {
      const list = (data.lists).find(list => list.id === Number(listId));
      if (list) setActiveList(list)
    }
  }, [data.lists, location])

  const setAddList = (list) => {
    setData(prevState => dispatchState.setList(prevState, list))
  }

  const setUpdateLists = (title, id) => {
    setData(prevState => dispatchState.updateList(prevState, title, id))
  }

  const setRemoveList = (id) => {
    setData(prevState => dispatchState.removeList(prevState, id))
  }

  const setAddTask = (task) => {
    setData(prevState => dispatchState.addTask(prevState, task))
  }

  const setUpdateTask = (idTask, text, isCompleted) => {
    setData(prevState => dispatchState.updateTask(prevState, idTask, text, isCompleted))
  }

  const setRemoveTask = (idTask) => {
    setData(prevState => dispatchState.removeTask(prevState, idTask))
  }

  return (
    <div className="todo">
      <div className="todo__header">
        <h1>To Do List</h1>
      </div>
      <div className='container row'>
        <Lists lists={data.lists}
          colors={data.colors}
          setAddList={setAddList}
          setRemoveList={setRemoveList}
          setUpdateLists={setUpdateLists}
          setNavigate={setNavigate}
          navigate={navigate}
          activeListId={activeList} />
        <div className="todo__tasks">
          {/* {!activeList && <h2 className="tasks__title">All Tasks</h2>} */}
          <Routes>
            <Route exact path="/" element=
              {data.lists &&
                <Tasks items={{ lists: data.lists, tasks: data.tasks }}
                  setAddTask={setAddTask}
                  setRemoveTask={setRemoveTask}
                  setUpdateTask={setUpdateTask}
                  withEmpty
                />
              }>
            </Route>
            <Route path="/list/:id" element=
              {data.lists && activeList &&
                <Tasks items={{ lists: activeList, tasks: activeList.tasks }}
                  setAddTask={setAddTask}
                  setRemoveTask={setRemoveTask}
                  setUpdateTask={setUpdateTask}
                />
              }>
            </Route>
            <Route path="*" exact={true} element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
