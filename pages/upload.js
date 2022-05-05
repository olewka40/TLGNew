import React, { useRef, useState } from "react";
import axios from "axios";

import styled from "styled-components";
import {StyledButton} from "../components/Registration/styled";
export const FileUpload = ({ getUserInfo }) => {
  const [files, setFiles] = useState(""); // storing the uploaded file    // storing the recived file from backend
  const [data, getFile] = useState([{ name: "", path: "" }]);
  const [progress, setProgress] = useState(0); // progess bar
  const el = useRef(); // accesing input element
  const handleChange = e => {
    setProgress(0);
    const files = e.target.files; // accesing file
    setFiles(files); // storing file
  };
  const uploadFile = () => {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append(file.name, file); // appending file
    });
    axios
      .post("http://localhost:3000/api/upload-photos", formData, {
        onUploadProgress: ProgressEvent => {
          let progress =
            Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
            "%";
          setProgress(progress);
        }
      })
      .then(res => {
        getFile({
          name: res.data.data[0].name,
          path: "http://localhost:3000/api/files/" + res.data.data[0].link
        });
        getUserInfo();
      })
      .catch(err => console.log(err));
  };
  return (
    <UploadFilesContainer>
      <input
        ref={el}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />

      <StyledButton
        onClick={() => el.current && el.current.click()}
        variant="contained"
      >
        Выберите файл
      </StyledButton>

      <StyledButton color="primary" variant="outlined" onClick={uploadFile}>
        Загрузить
      </StyledButton>
    </UploadFilesContainer>
  );
};
export default FileUpload;

const UploadFilesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  > {
    margin: 10px;
  }
`;
