import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Sidebar from "./components/Sidebar/Sidebar";
import { getCourses } from "./actions/courses";
import Projects from "./components/Projects/Projects";
import { getProjects } from "./actions/projects";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <>
      <Sidebar />
      <Projects />
    </>
  );
};

export default App;
