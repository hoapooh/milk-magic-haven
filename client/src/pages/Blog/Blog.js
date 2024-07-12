import React, { useDebugValue, useEffect, useState } from "react";
import "./Blog.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Container, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import AuthNav from "../../components/AuthNav/AuthNav";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function convertSQLDate(sqlDate) {
	const date = new Date(sqlDate);
	const options = { year: "numeric", month: "short", day: "2-digit" };
	return date.toLocaleDateString("en-US", options);
}

export default function Blog() {
	// const [category, setCategory] = useState("Education and Development");
	const [blog, setBlog] = useState([]);

	const fetchData = async () => {
		const data = await fetch(
			"http://localhost:8000/user/get-all-post"
		).then((res) => res.json());
		console.log(data.data);
		setBlog(data.data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
	}

	const [page, setPage] = useState(1);

	const blogPostsPerPage = 3;
	const pagesVisited = (page - 1) * blogPostsPerPage;

	const displayBlogPosts = blog
		.slice(pagesVisited, pagesVisited + blogPostsPerPage)
		.map((post) => (
			<div className="blog__post__item" key={post.post_id}>
				<img
					src={post.img_thumbnail}
					alt="post item"
					className="blog__post__item__image"
				/>
				<div className="blog__post__item__info">
					<div className="blog__post__item__calendar">
						<CalendarTodayIcon /> {convertSQLDate(post.post_date)}
					</div>
					<h2 className="blog__post__item__title">{post.content}</h2>
					{/* <p className="blog__post__item__content">{post.content}</p> */}
				</div>
			</div>
		));

	const pageCount = Math.ceil(blog.length / blogPostsPerPage);

	const handleChange = (event, value) => {
		setPage(value);
	};

	return (
		<>
			<AuthNav />
			<Header />
			<div>
				<Breadcrumb>Bài viết</Breadcrumb>
				<Container className="blog__container" maxWidth="xl">
					<div className="blog">
						<Grid container spacing={3} className="blog__navbar">
							<Grid item xs={12} md={3}>
								<h1 className="blog__title">
									Bài viết tiêu chuẩn
								</h1>

								{/* ======== SEARCH ======== */}
								<form className="blog__search">
									<input
										className="blog__search__input"
										type="search"
										placeholder="Search..."
									/>
									<button
										onClick={handleSubmit}
										type="submit"
										className="blog__search__submit"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="15"
											height="16"
											viewBox="0 0 15 16"
											fill="none"
										>
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M9.67416 11.7217C8.68008 12.4926 7.44031 12.9501 6.09593 12.9501C2.8247 12.9501 0.172852 10.2414 0.172852 6.9001C0.172852 3.55877 2.8247 0.850098 6.09593 0.850098C9.36715 0.850098 12.019 3.55877 12.019 6.9001C12.019 8.27329 11.5711 9.53962 10.8164 10.555L13.9363 13.7417C14.2517 14.0639 14.2517 14.5863 13.9363 14.9085C13.6209 15.2306 13.1095 15.2306 12.794 14.9085L9.67416 11.7217ZM10.4036 6.9001C10.4036 9.33015 8.475 11.3001 6.09593 11.3001C3.71686 11.3001 1.78824 9.33015 1.78824 6.9001C1.78824 4.47004 3.71686 2.5001 6.09593 2.5001C8.475 2.5001 10.4036 4.47004 10.4036 6.9001Z"
												fill="#F2F2F2"
											/>
										</svg>
									</button>
								</form>

								{/* ======== CATEGORY ======== */}
								<div className="blog__category">
									<div className="blog__category__title">
										Danh mục
									</div>
									<ul className="blog__category__list">
										<li className="blog__category__list__item">
											<Link
												to={"/blog"}
												// onClick={() => {
												// 	setCategory(() => "Education and Development");
												// }}
											>
												<AddIcon />
												Education and Development
											</Link>
										</li>
										<li className="blog__category__list__item">
											<Link
												to={"/blog"}
												// onClick={() => {
												// 	setCategory(() => "Toy Safety");
												// }}
											>
												<AddIcon />
												Toy Safety
											</Link>
										</li>
										<li className="blog__category__list__item">
											<Link to={"/blog"}>
												<AddIcon />
												Toy Trends
											</Link>
										</li>
										<li className="blog__category__list__item">
											<Link to={"/blog"}>
												<AddIcon />
												Customer Stories
											</Link>
										</li>
										<li className="blog__category__list__item">
											<Link to={"/blog"}>
												<AddIcon />
												Events and Promotions
											</Link>
										</li>
									</ul>
								</div>

								{/* ======== RECENT POST ======== */}
								<div className="blog__recent__posts">
									<div className="blog__recent__posts__title">
										Bài viết gần đây
									</div>
									<div className="blog__recent__posts__thumb">
										<Link
											to={"/blog"}
											className="thumb__item"
										>
											<img
												src="/assets/images/post.png"
												alt="thumbnail"
											/>
											<div className="thumb__item__title">
												Enhancing motor skills through
												play
											</div>
										</Link>
										<Link
											to={"/blog"}
											className="thumb__item"
										>
											<img
												src="/assets/images/post.png"
												alt="thumbnail"
											/>
											<div className="thumb__item__title">
												Enhancing motor skills through
												play
											</div>
										</Link>
										<Link
											to={"/blog"}
											className="thumb__item"
										>
											<img
												src="/assets/images/post.png"
												alt="thumbnail"
											/>
											<div className="thumb__item__title">
												Enhancing motor skills through
												play
											</div>
										</Link>
									</div>
								</div>
							</Grid>

							{/* ======== BLOG POST ======== */}
							<Grid item xs={12} md={9}>
								<div className="blog__post">
									{/* ======== BLOG POST ITEM ======== */}
									{displayBlogPosts}

									<Stack spacing={2}>
										<Pagination
											className="pagination"
											count={pageCount}
											variant="outlined"
											color="primary"
											size="large"
											page={page}
											onChange={handleChange}
										/>
									</Stack>
								</div>
							</Grid>
						</Grid>
					</div>
				</Container>
			</div>
			<Footer />
		</>
	);
}
