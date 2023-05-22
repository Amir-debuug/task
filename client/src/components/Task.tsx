import { Box, Typography } from "@mui/material";
import { props } from "../typescript/types";
import useStyles from "../mui/useStyles";
import MainButton from "../items/MainButton";
import TaskModal from "../items/TaskModal";
import { useState, useContext } from "react";
import taskServices from "../services/taskServices";
import { ToastContainer, toast } from "react-toastify";
import { CreateAuthContext } from "../contextApi/useAuthContext";

const Task: React.FC<props> = ({ task }) => {
  const { updateList, setUpdateList } = useContext(CreateAuthContext);
  const [taskModal, setTaskModal] = useState<boolean>(false);
  const classes = useStyles();

  const deleteTask = async () => {
    const response = await taskServices.deleteTask(task?._id);
    if (response?.status < 300) {
      setUpdateList(!updateList);
    }
    if (response?.response?.status >= 400) {
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <Box
      className={
        task?.priority ? classes.taskWrapperBorder : classes.taskWrapper
      }
    >
      <ToastContainer />
      <Typography variant="h6" fontWeight="500">
        {task?.name}
      </Typography>
      <Typography fontWeight="400">{task?.description}</Typography>
      <Typography fontSize="14px" fontWeight="700">
        {task?.status[0]}
      </Typography>
      <Box className={classes.taskCloseIcon}>
        <MainButton
          text="Edit"
          color="gray"
          onClick={() => setTaskModal(!taskModal)}
        />
        <MainButton text="Delete" color="error" onClick={deleteTask} />
      </Box>

      <TaskModal
        task={task}
        openModal={taskModal}
        setOpenModal={setTaskModal}
        title="Edit Task"
      />
    </Box>
  );
};

export default Task;
