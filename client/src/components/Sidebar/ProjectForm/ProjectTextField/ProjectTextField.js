import { TextField } from "@mui/material";

const ProjectTextField = ({ projectData, setProjectData, label, required }) => {
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
      />
    </>
  );
};

export default ProjectTextField;
