import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useState } from "react";
import { MainAPI } from "../../../API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

export default function CreatePost() {
  const [content, setContent] = useState("");
  const nav = useNavigate();
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  const formik = useFormik({
    isDirtyForm: true,
    initialValues: {
      title: "",
      img_thumbnail: "",
    },

    onSubmit: (values) => {
      handleCreatePost();
      console.log(values);
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
      img_thumbnail: Yup.string()
        .required("Required.")
        .matches(urlRegex, "Invalid URL"),
    }),
  });

  const handleCreatePost = () => {
    const data = {
      title: formik.values.title,
      img_thumbnail: formik.values.img_thumbnail,
      content: content,
    };

    axios
      .post(`${MainAPI}/staff/create-post`, data, {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Create post successfully");
        setTimeout(() => {
          nav("/staff/managepost");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <Box sx={{ width: "90%", margin: "0" }}>
        <ToastContainer autoClose={2000} />
        <Box>
          <Typography variant="h2" sx={{ marginTop: "10px" }}>
            Create Post
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                hiddenLabel
                id="filled-hidden-label-normal"
                variant="filled"
                name="title"
                onChange={formik.handleChange}
                placeholder="Title"
                sx={{ width: "100%", margin: "20px 20px 0 20px" }}
              />
              {formik.errors.title && formik.touched.title ? (
                <>
                  <Alert
                    sx={{ width: "100%", margin: "0 20px" }}
                    severity="error"
                  >
                    {formik.errors.title}
                  </Alert>
                </>
              ) : null}

              <TextField
                hiddenLabel
                id="filled-hidden-label-normal"
                variant="filled"
                placeholder="Image thumbnail URL"
                name="img_thumbnail"
                onChange={formik.handleChange}
                sx={{ width: "100%", margin: "20px 20px 0 20px" }}
              />
              {formik.errors.img_thumbnail && formik.touched.img_thumbnail ? (
                <>
                  <Alert
                    sx={{ width: "100%", margin: "0 20px" }}
                    severity="error"
                  >
                    {formik.errors.img_thumbnail}
                  </Alert>
                </>
              ) : null}

              <Box sx={{ width: "100%", margin: "20px" }}>
                <CKEditor
                  config={{
                    extraPlugins: [uploadPlugin],
                  }}
                  editor={ClassicEditor}
                  data="<p>Insert text here&nbsp;!</p>"
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                    console.log(data);
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
