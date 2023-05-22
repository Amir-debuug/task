import { useState } from "react";
import Navbar from "../components/Navbar";
import TasksSection from "../components/TasksSection";
import { searchparams } from "../typescript/types";

const Home: React.FC = () => {
  const [search, setSearch] = useState<searchparams>("");

  return (
    <>
      <Navbar setSearch={setSearch} />
      <TasksSection search={search} />
    </>
  );
};

export default Home;
