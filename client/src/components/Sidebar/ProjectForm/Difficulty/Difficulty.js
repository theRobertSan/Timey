import { Typography, Divider, Rating, Box, Stack, styled } from "@mui/material";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import { useState } from "react";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const difficultyLabels = {
  1: "Easy",
  2: "Average",
  3: "Hard",
  4: "Very Hard",
};

const Difficulty = ({ projectData, setProjectData, hover, setHover }) => {
  return (
    <>
      <Typography component="legend">Difficulty</Typography>
      <Stack margin="dense" direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
        <StyledRating
          value={projectData.difficulty}
          getLabelText={(value) => `${value} Difficulty`}
          max={4}
          icon={<FmdBadIcon fontSize="inherit" />}
          emptyIcon={<FmdBadIcon fontSize="inherit" />}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          onChange={(event, newDifficulty) => setProjectData({ ...projectData, difficulty: newDifficulty })}
        />
        {projectData.difficulty !== "" && <Box sx={{ ml: 2 }}>{difficultyLabels[hover !== -1 ? hover : projectData.difficulty]}</Box>}
      </Stack>
    </>
  );
};

export default Difficulty;
