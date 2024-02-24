import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getList } from "./redux/slice/listSlice";
import Header from "./componenets/Header/Header";
import NotFoundPage from "./componenets/NotFoundPage/NotFounPage";
import TestTaskOne from "./testTasks/testTaskOne/TestTaskOne";
import TestTaskTwo from "./testTasks/testTaskTwo/TestTaskTwo";
import OnePageFromList from "./testTasks/testTaskTwo/components/OnePageFromList/OnePageFromList";

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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
