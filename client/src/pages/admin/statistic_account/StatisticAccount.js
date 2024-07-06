import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./StatisticAccount.scss";
import Sidebar from "../sidebar/Sidebar";
import { Grid } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatisticAccount() {
  const [usersAPI, setUsersAPI] = useState([]);

  const baseURL = "http://localhost:8000/user/get-all-user";

  useEffect(() => {
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched users data:", data);
        setUsersAPI(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const roleCounts = usersAPI.reduce(
    (acc, user) => {
      if (user.role_id === "admin") acc.admin += 1;
      else if (user.role_id === "customer") acc.customer += 1;
      else if (user.role_id === "staff") acc.staff += 1;
      return acc;
    },
    { admin: 0, customer: 0, staff: 0 }
  );

  const data = {
    labels: ["Admin", "Customer", "Staff"],
    datasets: [
      {
        data: [roleCounts.admin, roleCounts.customer, roleCounts.staff],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  return (
    <div className="StatisticAccount">
      <Grid container spacing={2}>
        <Grid item md={2}>
          <Sidebar />
        </Grid>
        <Grid item md={10}>
          <div className="StatisticAccount_pie">
            <h1>Biểu đồ tròn thống kê tài khoản</h1>
            <Pie data={data} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
