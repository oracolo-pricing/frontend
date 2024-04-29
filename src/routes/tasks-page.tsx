import { columns } from "components/tasks-table/columns";
import { DataTable } from "components/ui/DataTable";
import { useEffect, useState } from "react";
import { getTasks } from "repository/Supabase";
import { Task } from "types/entities";

export const TasksPage: React.FC = () => {
   const [tasks, setTasks] = useState<Task[]>([]);

   const fetch = async () => {
      const data = await getTasks();
      setTasks(data);
   };

   useEffect(() => {
      fetch();
      const interval = setInterval(fetch, 60000);
      return () => clearInterval(interval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className="whitespace-nowrap">
         <DataTable columns={columns} data={tasks} />
      </div>
   );
};
