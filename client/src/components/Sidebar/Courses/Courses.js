import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import { FixedSizeList } from "react-window";

import useStyles from "./styles.js";

const Courses = () => {
  const classes = useStyles();

  const courses = useSelector((state) => state.courses);

  const renderRow = (props) => {
    const { index, style } = props;

    return (
      <ListItem className={classes.row} style={style} key={courses[index]._id} component="div" disablePadding>
        {courses[index].name}
      </ListItem>
    );
  };

  return (
    <>
      <FixedSizeList height={300} width={270} itemSize={50} itemCount={courses.length} overscanCount={5}>
        {renderRow}
      </FixedSizeList>
    </>
  );
};

export default Courses;
