import FromDate from "components/froms/fromDate";
import MYTable from "components/data-table/muiTable";
import { useTasks } from "store/task";
import { Button, Box } from "@mui/material";
import { format } from "date-fns";

export default function MainPage() {
  const { tasks } = useTasks() as any;

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
      }}
    >
      <FromDate />

      <Box>
        <MYTable
          data={tasks}
          columns={[
            {
              accessor: "task_id",
              Header: "Task id",
            },
            {
              accessor: "user_id",
              Header: "User id",
            },
            {
              accessor: "start_date",
              Header: "Start Date",
              Cell: (props: any) => format(props?.value || new Date(), "PPpp"),
            },
            {
              accessor: "end_date",
              Header: "End Date",
              Cell: (props: any) => format(props?.value || new Date(), "PPpp"),
            },
          ]}
        />
      </Box>
    </Box>
  );
}
