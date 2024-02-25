import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getList } from "./redux/slice/listSlice";
import Header from "./componenets/Header/Header";
import NotFoundPage from "./componenets/NotFoundPage/NotFounPage";
import TestTaskOne from "./testTasks/testTaskOne/TestTaskOne";
import TestTaskTwo from "./testTasks/testTaskTwo/TestTaskTwo";
import OnePageFromList from "./testTasks/testTaskTwo/components/OnePageFromList/OnePageFromList";
import TestTaskThree from "./testTasks/testTaskThree/testTaskThree";
import CreateTask from "./testTasks/testTaskThree/components/CreateTask/CreateTasks";
import TaskList from "./testTasks/testTaskThree/components/TaskList/TaskList";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<TestTaskOne />} />
          <Route path="services" element={<TestTaskTwo />} />
          <Route path="services/:id" element={<OnePageFromList />} />
          <Route path="calendar" element={<TestTaskThree />} />
          <Route path="calendar/create-task" element={<CreateTask />} />
          <Route path="calendar/task-list" element={<TaskList />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
