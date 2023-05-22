import { AppBar, Toolbar, Typography } from "@mui/material";
import useStyles from "../mui/useStyles";
import { searchparams } from "../typescript/types";

const Navbar: React.FC<searchparams> = ({ setSearch }) => {
  const classes = useStyles();

  return (
    <AppBar elevation={1} position="sticky">
      <Toolbar
        variant="dense"
        className={classes.toolbar}
        sx={{ minWidth: { xs: "100vw", sm: "70vw" } }}
      >
        <Typography variant="h5" fontWeight="700">
          Task Tracker
        </Typography>
        <input
          type="text"
          placeholder="Search"
          className={classes.navSearch}
          onChange={(e): void => setSearch(e.target.value)}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
