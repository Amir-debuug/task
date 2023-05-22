import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import useStyles from '../mui/useStyles';

const Loading: React.FC = () => {

  const classes = useStyles();

  return (
    <Box className={classes.loadingContainer} >
      <CircularProgress color='secondary' />
    </Box>
  )
}

export default Loading