import {
  paginationtypes,
  searchparams,
  taskfiltertypes,
  tasksLists,
} from "../typescript/types";
import { Box, FormControl, Select, MenuItem, Pagination } from "@mui/material";
import useStyles from "../mui/useStyles";
import Task from "./Task";
import MainButton from "../items/MainButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState, useEffect, useContext } from "react";
import TaskModal from "../items/TaskModal";
import taskServices from "../services/taskServices";
import { CreateAuthContext } from "../contextApi/useAuthContext";

const TasksSection: React.FC<searchparams> = ({ search }) => {
  const [tasksLists, setTasksLists] = useState<tasksLists[]>();
  const [taskModal, setTaskModal] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<paginationtypes>({
    pages: 1,
    limit: 10,
    total: 10,
  });
  const [taskFilters, setTaskFilters] = useState<taskfiltertypes>({
    status: "All",
    priority: "All",
    pageNum: 1,
  });
  const { updateList } = useContext(CreateAuthContext);
  const classes = useStyles();

  const getTasks = async (controller: any) => {
    const response = await taskServices.getAllTask(taskFilters, search, controller);
    if (response?.status === 200) {
      setTasksLists(response?.data?.data);
      setPageInfo(response?.data?.pagination);
      setTaskModal(false);
    }
  };

  useEffect(() => {

    const controller = new AbortController();

    getTasks(controller);

    return () => {
      controller.abort();
    }
  }, [updateList, taskFilters, search]);

  return (
    <Box sx={{ maxWidth: { xs: "100vw", sm: "70vw" }, margin: "auto" }}>
      <Box className={classes.taskTop}>
        <Box>
          <FormControl
            className={classes.filterButton}
            sx={{ marginRight: "10px" }}
          >
            <Select
              value={taskFilters?.priority}
              IconComponent={() => <FilterAltIcon />}
              onChange={(e) =>
                setTaskFilters({ ...taskFilters, priority: e.target.value })
              }
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="true">Priority</MenuItem>
              <MenuItem value="false">No Priority</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.filterButton}>
            <Select
              value={taskFilters?.status}
              IconComponent={() => <FilterAltIcon />}
              onChange={(e) =>
                setTaskFilters({ ...taskFilters, status: e.target.value })
              }
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Inprogress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Canacelled</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <MainButton
          text="Create New"
          variant="contained"
          color="secondary"
          onClick={() => setTaskModal(!taskModal)}
        />
      </Box>
      {tasksLists?.length ? (
        <Box className={classes.taskContainer}>
          {tasksLists?.map((task: tasksLists, index: number) => (
            <Task task={task} key={index} />
          ))}
        </Box>
      ) : (
        <h1 style={{ textAlign: "center" }}>No Task to Display</h1>
      )}
      {tasksLists?.length ? (
        <Box className={classes.pagination}>
          <Pagination
            count={pageInfo?.pages}
            color="secondary"
            onChange={(e, pagenumber) =>
              setTaskFilters({ ...taskFilters, pageNum: pagenumber })
            }
          />
        </Box>
      ) : (
        ""
      )}
      <TaskModal
        openModal={taskModal}
        setOpenModal={setTaskModal}
        title="Create New Task"
      />
    </Box>
  );
};

export default TasksSection;
