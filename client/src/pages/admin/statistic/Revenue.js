import React from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import Sidebar from "../sidebar/Sidebar";
import "./Revenue.css";
import { Grid } from "@mui/material";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const data = {
//   labels: ["January", "February", "March", "April", "May", "June", "July"],
//   datasets: [
//     {
//       label: "Dataset 1",
//       backgroundColor: "rgba(75,192,192,0.4)",
//       borderColor: "rgba(75,192,192,1)",
//       borderWidth: 1,
//       hoverBackgroundColor: "rgba(75,192,192,0.7)",
//       hoverBorderColor: "rgba(75,192,192,1)",
//       data: [65, 59, 80, 81, 56, 55, 40],
//     },
//   ],
// };

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "Sample Bar Chart",
//     },
//   },
// };

export default function Revenue() {
	return (
		<div className="Revenue">
			<Grid container spacing={2}>
				<Grid item md={2}>
					<Sidebar />
				</Grid>
				<Grid item md={10}>
					<div className="admin__content">
						<h1 className="admin__title">Thống kê doanh thu</h1>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}
