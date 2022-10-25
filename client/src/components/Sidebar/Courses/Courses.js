import { ListItem } from "@mui/material";
import { useSelector } from "react-redux";
import { FixedSizeList } from "react-window";
import CircleIcon from "@mui/icons-material/Circle";

import useStyles from "./styles.js";

const Courses = () => {
  const classes = useStyles();

  const courses = useSelector((state) => state.courses);

  const renderRow = (props) => {
    const { index, style } = props;

    return (
      <ListItem className={classes.row} style={style} key={courses[index]._id} component="div" disablePadding>
        <CircleIcon style={{ color: courses[index].color.hex }} /> &nbsp; {courses[index].name}
      </ListItem>
    );
  };

  return (
    <>
      <FixedSizeList className={classes.list} height={150} width={250} itemSize={50} itemCount={courses.length} overscanCount={5}>
        {renderRow}
      </FixedSizeList>
    </>
  );
};

export default Courses;
