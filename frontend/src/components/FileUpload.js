import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', selectedFile); // Append the selected file

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(res.data.message);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('File upload failed');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Upload File</h2>

      <form onSubmit={handleFileUpload}>
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>

      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default FileUpload;
