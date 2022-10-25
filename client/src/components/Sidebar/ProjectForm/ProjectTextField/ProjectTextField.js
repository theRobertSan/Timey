import { TextField } from "@mui/material";

const ProjectTextField = ({ projectData, setProjectData, label, required, limit }) => {
  return (
    <>
      <TextField
        required={required}
        fullWidth
        label={label}
        value={projectData[label.toLowerCase()]}
        onChange={(e) =>
          setProjectData({
            ...projectData,
            [label.toLowerCase()]: e.target.value,
          })
        }
        inputProps={{ maxLength: limit }}
      />
    </>
  );
};

export default ProjectTextField;
