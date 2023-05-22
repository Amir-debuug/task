import axiosPrivate from "../axios/useAxiosPrivate";

class taskServices {
  constructor(axiosPrivate) {
    this.axiosPrivate = axiosPrivate();
  }

  async getAllTask(filter, search, controller) {
    try {
      const response = await this.axiosPrivate.get(
        `task/all?page=${filter?.pageNum}&limit=10`,
        {
          signal: controller.signal,
          params: {
            search: search,
            status: filter?.status === "All" ? "" : filter?.status,
            priority: filter?.priority === "All" ? "" : filter?.priority,
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async createNewTask(data) {
    try {
      const response = await this.axiosPrivate.post("task/create", data);
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateTask(data, id) {
    try {
      const response = await this.axiosPrivate.patch(`task/update/${id}`, data);
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteTask(id) {
    try {
      const response = await this.axiosPrivate.delete(`task/delete/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new taskServices(axiosPrivate);
