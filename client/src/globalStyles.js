import { makeStyles } from "@mui/styles";

export default makeStyles({
  sideButton: {
    backgroundColor: "#F76C6C",
    fontFamily: "var(--fontFamily-nunito-bold)",
    fontSize: "20px",
    color: "#fefefe",
    borderRadius: "40px",
    textAlign: "center",
    display: "inline-block",
    padding: "15px 40px",
    cursor: "pointer",
    letterSpacing: "2px",
    position: "relative",
    overflow: "hidden",
    margin: "20px",
    "&:before": {
      content: '""',
      position: "absolute",
      height: "150px",
      width: "50px",
      background: "#fefefe",
      left: "-55px",
      top: "-40px",
      transform: "rotate(37deg)",
      transition: "all .3s",
      opacity: 0.3,
    },
    "&:hover:before": {
      left: "95%",
    },
    "&:hover": {
      backgroundColor: "rgba(247, 108, 108, 0.2)",
      color: "#F76C6C",
    },
  },

  home: {
    height: "100vh",
    margin: "0px",
  },
});
