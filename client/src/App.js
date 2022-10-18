import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";

import Sidebar from "./components/Sidebar/Sidebar";
import { getCourses } from "./actions/courses";
import Projects from "./components/Projects/Projects";
import { getProjects } from "./actions/projects";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF9398",
    },
    secondary: {
      main: "#FF9398",
    },
  },
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container direction="row" justifyContent="space-around" alignItems="stretch">
          <Sidebar />
          <Projects />
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default App;
