import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomFileInput.css";
import React, { useState } from "react";

function CustomFileInput() {
  const [selectedFile, setSelectedFile] = useState(null);

  // Mengatur tampilan label saat file dipilih
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Mengatur tampilan label saat file dijatuhkan ke zona drag-and-drop
  const handleDropzoneChange = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  // Mencegah perilaku default saat file dijatuhkan
  const preventDefault = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Input file kustom */}
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={handleFileChange}
            />
            <label className="custom-file-label" htmlFor="customFile">
              {selectedFile ? selectedFile.name : "Pilih file"}
            </label>
          </div>

          {/* Zona drag-and-drop kustom */}
          <div
            className="custom-dropzone mt-4"
            onDragOver={preventDefault}
            onDragEnter={preventDefault}
            onDragLeave={preventDefault}
            onDrop={handleDropzoneChange}
          >
            <span className="custom-dropzone-message">
              Seret dan lepaskan file di sini atau klik untuk memilih file
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomFileInput;
