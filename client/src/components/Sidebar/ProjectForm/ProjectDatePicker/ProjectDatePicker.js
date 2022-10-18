import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const ProjectDatePicker = ({ projectData, setProjectData }) => {
  return (
    <>
      <DesktopDatePicker
        label="Due Date"
        inputFormat="DD/MM/YYYY"
        value={projectData.dueDate || null}
        onChange={(newDate) => {
          setProjectData({
            ...projectData,
            dueDate: newDate ? newDate._d : null,
          });
        }}
        renderInput={(params) => <TextField required {...params} />}
      />
    </>
  );
};

export default ProjectDatePicker;
