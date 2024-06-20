import React, { useState } from "react";
import "./Blog.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Container, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const blog__item = [
	{
		id: "1",
		image: "/assets/images/blog__item.jpg",
		title: "Enhancing motor skills through play",
		content:
			"Motor skills are divided into two categories: fine motor skills and gross motor skills. Toys play a vital role in the development of both.",
	},
	{
		id: "2",
		image: "/assets/images/blog__item.jpg",
		title: "Enhancing motor skills through play",
		content:
			"Motor skills are divided into two categories: fine motor skills and gross motor skills. Toys play a vital role in the development of both.",
	},
	{
		id: "3",
		image: "/assets/images/blog__item.jpg",
		title: "Enhancing motor skills through play",
		content:
			"Motor skills are divided into two categories: fine motor skills and gross motor skills. Toys play a vital role in the development of both.",
	},
	{
		id: "4",
		image: "/assets/images/blog__item-1.jpg",
		title: "Fostering problem solving skills",
		content:
			"Problem-solving is a critical skill that children begin to develop from a very young age through interactive and engaging play. Toys that challenge children to think and strategize encourage this development.",
	},
	{
		id: "5",
		image: "/assets/images/blog__item.jpg",
		title: "Enhancing motor skills through play",
		content:
			"Motor skills are divided into two categories: fine motor skills and gross motor skills. Toys play a vital role in the development of both.",
	},
	{
		id: "6",
		image: "/assets/images/blog__item.jpg",
		title: "Enhancing motor skills through play",
		content:
			"Motor skills are divided into two categories: fine motor skills and gross motor skills. Toys play a vital role in the development of both.",
	},
];

export default function Blog() {
	// const [category, setCategory] = useState("Education and Development");

	function handleSubmit(e) {
		e.preventDefault();
	}

	const [page, setPage] = useState(1);

	const blogPostsPerPage = 3;
	const pagesVisited = (page - 1) * blogPostsPerPage;

	const displayBlogPosts = blog__item
		.slice(pagesVisited, pagesVisited + blogPostsPerPage)
		.map((post) => (
			<div className="blog__post__item" key={post.id}>
				<img
					src={post.image}
					alt="post item"
					className="blog__post__item__image"
				/>
				<div className="blog__post__item__info">
					<div className="blog__post__item__calendar">
						<CalendarTodayIcon /> March 24, 2024
					</div>
					<h2 className="blog__post__item__title">{post.title}</h2>
					<p className="blog__post__item__content">{post.content}</p>
				</div>
			</div>
		));

	const pageCount = Math.ceil(blog__item.length / blogPostsPerPage);

	const handleChange = (event, value) => {
		setPage(value);
	};

	return (
		<>
			<Breadcrumb>Blog</Breadcrumb>
			<Container className="blog__container" maxWidth="xl">
				<div className="blog">
					<Grid container spacing={3} className="blog__navbar">
						<Grid item xs={12} md={3}>
							<h1 className="blog__title">Blog standard</h1>

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
								<div className="blog__category__title">Categories</div>
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
								<div className="blog__recent__posts__title">Recent Posts</div>
								<div className="blog__recent__posts__thumb">
									<Link to={"/blog"} className="thumb__item">
										<img src="/assets/images/post.png" alt="thumbnail" />
										<div className="thumb__item__title">
											Enhancing motor skills through play
										</div>
									</Link>
									<Link to={"/blog"} className="thumb__item">
										<img src="/assets/images/post.png" alt="thumbnail" />
										<div className="thumb__item__title">
											Enhancing motor skills through play
										</div>
									</Link>
									<Link to={"/blog"} className="thumb__item">
										<img src="/assets/images/post.png" alt="thumbnail" />
										<div className="thumb__item__title">
											Enhancing motor skills through play
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
		</>
	);
}
