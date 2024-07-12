import axios from "axios";
import React, { useEffect, useState } from "react";
import { MainAPI } from "../../API";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Post.scss";
import AuthNav from "../../components/AuthNav/AuthNav";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    axios
      .get(`${MainAPI}/user/get-post-by-id/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setPost(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data post:", error);
      });
  }, []);

  return (
    <>
      <AuthNav />
      <Header />
      <Container>
        <div>
          <div className="post-container">
            <div
              className="editor"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
