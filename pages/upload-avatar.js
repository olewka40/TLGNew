import React, { useRef, useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [files, setFiles] = useState(""); // storing the uploaded file    // storing the recived file from backend
  const [data, getFile] = useState([{ name: "", path: "" }]);
  const [progress, setProgress] = useState(0); // progess bar
  const el = useRef(); // accesing input element

  const handleChange = e => {
    setProgress(0);
    const files = e.target.files; // accesing file
    console.log(files);
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
        console.log(res);
        getFile({
          name: res.data.name,
          path: "http://localhost:3000" + res.data.path
        });
      })
      .catch(err => console.log(err));
  };
  return (
    <div>
      <input multiple type="file" ref={el} onChange={handleChange} />
      <div style={{ width: progress }}>{progress}</div>
      <button onClick={uploadFile}>Upload</button>
      <hr />
      {/* displaying received image*/}
      {data.path && (
        <img
          src="http://localhost:3000/api/files/Capture001.png"
          alt={data.name}
        />
      )}
    </div>
  );
};
export default FileUpload;
