import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Sidebar from "../../sidebar/Sidebar";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
} from "chart.js";
import "./StatisticProduct.scss";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale
);

export default function StatisticProduct() {
	const [topProducts, setTopProducts] = useState([]);
	const [productByBrand, setProductByBrand] = useState([]);

	const dashboardBaseURL = "http://localhost:8000/admin/dashboard";

	useEffect(() => {
		fetch(dashboardBaseURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": localStorage.getItem("accessToken"),
			},
			credentials: "same-origin",
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Fetched dashboard data:", data);
				setTopProducts(data.topProduct);
				setProductByBrand(data.productByBrand);
			})
			.catch((error) => console.log(error));
	}, []);

	const topProductBarData = {
		labels: topProducts.map((product) => product.product_name),
		datasets: [
			{
				label: "Total Quantity Sold",
				data: topProducts.map((product) => product.total_quantity_sold),
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderWidth: 1,
			},
		],
	};

	const brandPieData = {
		labels: productByBrand.map((brand) => brand.brand_name),
		datasets: [
			{
				data: productByBrand.map((brand) => brand.total_stock),
				backgroundColor: [
					"#FF6384",
					"#36A2EB",
					"#FFCE56",
					"#4BC0C0",
					"#9966FF",
					"#FF9F40",
					"#FFCD56",
					"#C9CBCF",
				],
				hoverBackgroundColor: [
					"#FF6384",
					"#36A2EB",
					"#FFCE56",
					"#4BC0C0",
					"#9966FF",
					"#FF9F40",
					"#FFCD56",
					"#C9CBCF",
				],
			},
		],
	};

	const barOptions = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				ticks: {
					autoSkip: false,
					maxRotation: 90,
					minRotation: 45,
				},
			},
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 1,
					precision: 0,
				},
			},
		},
	};

	return (
		<div className="StatisticProduct">
			<Grid container spacing={2}>
				<Grid item md={2}>
					<Sidebar />
				</Grid>
				<Grid item md={10}>
					<div className="StatisticProduct_content">
						<div className="StatisticProduct_pie">
							<h1>
								Biểu đồ tròn thống kê số sản phẩm trong từng thể
								loại
							</h1>
							<Pie data={brandPieData} />
						</div>
						<div className="StatisticProduct_bar">
							<h1>
								Biểu đồ cột thống kê những sản phẩm bán chạy
							</h1>
							<Bar
								data={topProductBarData}
								options={barOptions}
							/>
						</div>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}
