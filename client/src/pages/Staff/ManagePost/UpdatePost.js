import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useEffect, useState } from "react";
import { MainAPI } from "../../../API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const ENDPOINT = "staff/uploads";

function uploadAdapter(loader) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const fd = new FormData();
        loader.file.then((file) => {
          // here check the mimetype and send request
          // to relevant backend api endpoint
          fd.append("uploads", file);
          fetch(`${MainAPI}/${ENDPOINT}`, {
            method: "POST",
            body: fd,
          })
            .then((res) => res.json())
            .then((res) => {
              resolve({ default: `${MainAPI}/${res.url}` });
            })
            .catch((err) => {
              reject(err);
            });
        });
      });
    },
  };
}

function uploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}

export default function UpdatePost() {
  const [content, setContent] = useState("");
  const [post, setPost] = useState({});
  const { id } = useParams();
  const nav = useNavigate();
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`${MainAPI}/user/get-post-by-id/${id}`).then(
        (res) => res.json()
      );
      console.log(data);
      setPost(data.data);
    }
    fetchData();
  }, []);

  const handleUpdatePost = (e) => {
    e.preventDefault();
    const data = {
      title: post.title,
      img_thumbnail: post.img_thumbnail,
      content: post.content,
    };

    fetch(`${MainAPI}/staff/update-post/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        toast.success("Update post successfully");
        setTimeout(() => {
          nav("/staff/managepost");
        }, 2000);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  console.log(post);

  return (
    <>
      <Box sx={{ width: "90%", margin: "0" }}>
        <ToastContainer autoClose={2000} />
        <Box>
          <Typography variant="h2" sx={{ marginTop: "10px" }}>
            Create Post
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <form onSubmit={(e) => handleUpdatePost(e)}>
              <TextField
                hiddenLabel
                id="filled-hidden-label-normal"
                variant="filled"
                name="title"
                value={post.title}
                onChange={(e) => {
                  setPost({ ...post, title: e.target.value });
                }}
                placeholder="Title"
                sx={{ width: "100%", margin: "20px 20px 0 20px" }}
              />

              <TextField
                hiddenLabel
                id="filled-hidden-label-normal"
                variant="filled"
                placeholder="Image thumbnail URL"
                name="img_thumbnail"
                value={post.img_thumbnail}
                onChange={(e) => {
                  setPost({ ...post, img_thumbnail: e.target.value });
                }}
                sx={{ width: "100%", margin: "20px 20px 0 20px" }}
              />

              <Box sx={{ width: "100%", margin: "20px" }}>
                <CKEditor
                  config={{
                    extraPlugins: [uploadPlugin],
                  }}
                  editor={ClassicEditor}
                  data={post.content}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setPost({ ...post, content: data });
                  }}
                  onBlur={(event, editor) => {
                    // console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    // console.log("Focus.", editor);
                  }}
                />
              </Box>
              <Box sx={{ textAlign: "end" }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ padding: "10px 20px" }}
                >
                  Create
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
}
