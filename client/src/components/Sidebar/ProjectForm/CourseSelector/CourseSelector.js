import { TextField, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";

const CourseSelector = ({ projectData, setProjectData }) => {
  const courses = useSelector((state) => state.courses);

  const coursesItems = courses.map((course) => (
    <MenuItem key={course._id} value={course._id}>
      {course.name}
    </MenuItem>
  ));

  return (
    <>
      <TextField required select margin="dense" label="Related Course" name="relatedCourse" value={projectData.course} onChange={(e) => setProjectData({ ...projectData, course: e.target.value })}>
        {coursesItems}
      </TextField>
    </>
  );
};

export default CourseSelector;
