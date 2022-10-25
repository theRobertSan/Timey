import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid, StyledEngineProvider, createTheme, ThemeProvider } from "@mui/material";

import Sidebar from "./components/Sidebar/Sidebar";
import { getCourses } from "./store/actions/courses";
import Projects from "./components/Projects/Projects";
import { getProjects } from "./store/actions/projects";
import { getColors } from "./store/actions/colors";
import useGlobalStyles from "./globalStyles";

const App = () => {
  const global = useGlobalStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getProjects());
    dispatch(getColors());
  }, [dispatch]);

  return (
    <>
      <StyledEngineProvider injectFirst>
        <Grid container direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} className={global.home}>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs>
            <Projects />
          </Grid>
        </Grid>
      </StyledEngineProvider>
    </>
  );
};

export default App;
