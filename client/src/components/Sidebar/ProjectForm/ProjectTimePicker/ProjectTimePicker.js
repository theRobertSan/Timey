import { TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const ProjectTimePicker = ({ projectData, setProjectData }) => {
  return (
    <>
      <TimePicker
        label="Due Time"
        value={projectData.dueTime || null}
        onChange={(newTime) => {
          setProjectData({
            ...projectData,
            dueTime: newTime ? newTime._d : null,
          });
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </>
  );
};

export default ProjectTimePicker;
