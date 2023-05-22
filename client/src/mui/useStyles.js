import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  navSearch: {
    border: "1px solid #f1f1f1",
    outline: "none",
    background: "#f1f1f1",
    minWidth: "200px",
    maxWidth: "200px",
    padding: "5px 10px",
    borderRadius: "20px",
  },
  taskTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
  },
  taskContainer: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  filterButton: {
    "& .MuiInputBase-root": {
      padding: 0,
      "& .MuiButtonBase-root": {
        padding: 0,
      },
      "& .MuiInputBase-input": {
        padding: "5px 10px",
      },
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "auto",
  },
  taskWrapper: {
    padding: "5px 20px",
    background: "#f1f1f1",
    position: "relative",
  },
  taskWrapperBorder: {
    padding: "5px 20px",
    background: "#f1f1f1",
    position: "relative",
    borderLeft: "5px solid green",
  },
  taskCloseIcon: {
    position: "absolute",
    right: "20px",
    top: "10px",
    color: "red",
  },
  pagination: {
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'center'
  },
  modalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalWrapper: {
    maxWidth: '350px',
    minWidth: '350px',
    background: '#fff',
    borderRadius: '5px',
    padding: '10px',
    position: 'relative',
  },
  modalInput: {
    width: '100%',
    border: '1px solid lightgray',
    outline: 'none',
    borderRadius: '5px',
    padding: '10px',
  },
  modalStatus: {
    width: '100%',
    outline: '1px solid lightgray',
    borderRadius: '5px',
    "& .MuiInputBase-root": {
      padding: 0,
      color: 'gray',
      "& .MuiButtonBase-root": {
        padding: 0,
      },
      "& .MuiInputBase-input": {
        padding: "7px",
      },
    },
  },
  modalheading: {
    fontSize: '14px',
    fontWeight: '500',
    marginTop: '10px',
    marginBottom: '3px'
  },
  modalbtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalClose: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: 'lightgray',
    cursor: 'pointer'
  },
  link: {
    color: 'gray',
    fontSize: '12px',
    marginTop: '10px'
  },
  loadingContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default useStyles;
