import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { modalProps } from "../typescript/types";
import useStyles from "../mui/useStyles";
import MainButton from "./MainButton";
import CloseIcon from "@mui/icons-material/Close";
import taskServices from "../services/taskServices";
import { ToastContainer, toast } from "react-toastify";
import { CreateAuthContext } from "../contextApi/useAuthContext";

const TaskModal: React.FC<modalProps> = ({
  openModal,
  setOpenModal,
  title,
  task,
}) => {
  const { updateList, setUpdateList } = useContext(CreateAuthContext);
  const [createTask, setCreateTask] = useState({
    name: task?.name || "",
    priority: task?.priority || false,
    status: task?.status || ["Inprogress"],
    description: task?.description || ""
  });

  const createNewTask = async () => {
    if (!createTask.name || !createTask.description) {
      toast.error("Todo & description required");
      return;
    }

    const response = await taskServices.createNewTask(createTask);
    console.log(response);
    if (response?.status < 300) {
      setUpdateList(!updateList);
      setOpenModal(false);
    }

    if (response?.response?.data?.error === true) {
      toast.error(response?.response?.data?.message);
    }
  };

  const updateTask = async () => {
    if (!createTask.name || !createTask.description ) {
      toast.error("Todo required");
      return;
    }

    const response = await taskServices.updateTask(createTask, task?._id);
    if (response?.status < 300) {
      setUpdateList(!updateList);
      setOpenModal(false);
    }

    if (response?.response?.data?.error === true) {
      toast.error(response?.response?.data?.message);
    }
  };

  const classes = useStyles();

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      className={classes.modalContainer}
    >
      <Box className={classes.modalWrapper}>
        <ToastContainer />
        <Typography variant="h5" fontWeight="700">
          {title}
        </Typography>
        <Box>
          <div className={classes.modalheading}>Todo</div>
          <input
            type="text"
            placeholder="What to do"
            defaultValue={task?.name}
            className={classes.modalInput}
            onChange={(e) =>
              setCreateTask({ ...createTask, name: e.target.value })
            }
          />
          <div className={classes.modalheading}>Description</div>
          <input
            type="text"
            placeholder="Description"
            defaultValue={task?.description}
            className={classes.modalInput}
            onChange={(e) =>
              setCreateTask({ ...createTask, description: e.target.value })
            }
          />
          <div className={classes.modalheading}>Status</div>
          <FormControl className={classes.modalStatus}>
            <Select
              defaultValue={task?.status || "Inprogress"}
              onChange={(e) =>
                setCreateTask({ ...createTask, status: [e.target.value] })
              }
            >
              <MenuItem value="Inprogress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="secondary"
                defaultChecked={task?.priority}
                onChange={(e) =>
                  setCreateTask({ ...createTask, priority: e.target.checked })
                }
              />
            }
            label="Priority"
          />
        </Box>
        <Box className={classes.modalbtn}>
          <MainButton
            variant="contained"
            color="secondary"
            text={task ? "Save" : "Create Task"}
            fullWidth={true}
            onClick={task ? updateTask : createNewTask}
          />
        </Box>

        <div className={classes.modalClose} onClick={() => setOpenModal(false)}>
          <CloseIcon />
        </div>
      </Box>
    </Modal>
  );
};

export default TaskModal;
