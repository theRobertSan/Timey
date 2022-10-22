import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	Grid,
	StyledEngineProvider,
	createTheme,
	ThemeProvider,
} from "@mui/material";

import Sidebar from "./components/Sidebar/Sidebar";
import { getCourses } from "./store/actions/courses";
import Projects from "./components/Projects/Projects";
import { getProjects } from "./store/actions/projects";
import { getColors } from "./store/actions/colors";
import useGlobalStyles from "./globalStyles";

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
	const global = useGlobalStyles();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCourses());
		dispatch(getProjects());
		dispatch(getColors());
	}, [dispatch]);

	return (
		<>
			<ThemeProvider theme={theme}>
				<StyledEngineProvider injectFirst>
					<Grid container direction="row" className={global.home}>
						<Grid item xs>
							<Sidebar />
						</Grid>
						<Grid item xs="10">
							<Projects />
						</Grid>
					</Grid>
				</StyledEngineProvider>
			</ThemeProvider>
		</>
	);
};

export default App;
