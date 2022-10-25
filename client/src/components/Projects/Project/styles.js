import { makeStyles } from "@mui/styles";

export default makeStyles({
  projectBox: {
    padding: "30px 25px 30px 35px",
    margin: "0px",
    borderRadius: "80px",
    border: "1px solid #fff",
    height: "120px",
    minWidth: "200px",
    color: "white",
    fontFamily: "var(--fontFamily-nunito-bold)",

    // backgroundColor: "#62B4FE",
  },
  courseTitle: {
    fontFamily: "var(--fontFamily-nunito-bold)",
    width: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  projectTitle: {
    fontFamily: "var(--fontFamily-nunito-bold)",
    width: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  projectDueDate: {
    fontFamily: "var(--fontFamily-nunito-bold)",
  },

  infoDialog: {
    minWidth: "200px",
  },
  speedDial: {
    backgroundColor: "#F76C6C",
    "&:hover": {
      backgroundColor: "rgba(247, 108, 108, 0.2)",
    },
    boxShadow: "none",
  },

  optionsButton: {
    color: "white",
    // "&:hover": {
    //   color: "#F76C6C",
    // },
  },
});
