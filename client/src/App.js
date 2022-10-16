import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Sidebar from "./components/Sidebar/Sidebar";
import { getCourses } from "./actions/courses";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCourses());
	}, [dispatch]);

	return (
		<>
			<Sidebar />
		</>
	);
};

export default App;
