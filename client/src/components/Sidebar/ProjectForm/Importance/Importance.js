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

const importanceLabels = {
	1: "Low",
	2: "Medium",
	3: "High",
	4: "ASAP!",
};

const Importance = ({ projectData, setProjectData, hover, setHover }) => {
	console.log(hover + " vs " + projectData.importance);
	return (
		<>
			<Typography component="legend">Importance</Typography>
			<Stack
				margin="dense"
				direction="row"
				divider={<Divider orientation="vertical" flexItem />}
				spacing={2}
			>
				<StyledRating
					value={projectData.importance}
					getLabelText={(value) => `${value} Importance`}
					max={4}
					icon={<FmdBadIcon fontSize="inherit" />}
					emptyIcon={<FmdBadIcon fontSize="inherit" />}
					onChangeActive={(event, newHover) => {
						setHover(newHover);
					}}
					onChange={(event, newImportance) =>
						setProjectData({ ...projectData, importance: newImportance })
					}
				/>
				{projectData.importance !== "" && (
					<Box sx={{ ml: 2 }}>
						{importanceLabels[hover !== -1 ? hover : projectData.importance]}
					</Box>
				)}
			</Stack>
		</>
	);
};

export default Importance;
