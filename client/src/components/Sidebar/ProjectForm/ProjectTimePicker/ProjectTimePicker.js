import { TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";

const ProjectTimePicker = ({ projectData, setProjectData }) => {
  console.log(moment({ hour: 23, minute: 55 }));
  return (
    <>
      <TimePicker
        disabled={projectData.dueDate === null}
        ampm
        label="Due Time"
        value={projectData.dueTime || moment({ hour: 23, minute: 55 })}
        onChange={(newTime) => {
          setProjectData({
            ...projectData,
            dueTime: newTime ? newTime._d : null,
          });
        }}
        minutesStep={5}
        minTime={moment(projectData.dueDate).isSame(new Date(), "day") ? moment(new Date()) : undefined}
        renderInput={(params) => <TextField {...params} />}
      />
    </>
  );
};

export default ProjectTimePicker;
