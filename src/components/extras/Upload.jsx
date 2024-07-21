'use client';

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Spinner } from "@nextui-org/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Upload = ({ setDocuments }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // Immediately upload the file after selection
        setLoading(true);
        await handleFileUpload(file);
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger file selection dialog
        } else {
            console.error('File input reference is not set');
        }
    };

const handleFileUpload = async (file) => {
    if (!file) return; // Early return if no file is selected

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post('https://localhost:5001/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.status === 200) {
            setFileUrl(response.data.fileUrl); // Assuming the response contains a fileUrl
            toast.success('File uploaded successfully!');
            // Additional logic for handling successful uploads...
        } else {
            // toast.error("An error occurred while uploading the file. Please check your connection or refer to the documentation.");
        }
    } catch (error) {
        // Check if the error is related to the network
        alert("Please setup backend.Follow this documentation  https://drive.google.com/file/d/173h6xvU21zu4pg-20piETAuvZCfsM4kU/view?usp=sharing  ");
        if (error.response && error.response.status === 503) {
            // toast.error(
            //     <div>
            //         Server unavailable. Please check your connection or <a href="https://drive.google.com/file/d/173h6xvU21zu4pg-20piETAuvZCfsM4kU/view?usp=sharing" target="_blank" rel="noopener noreferrer">refer to the documentation</a> for more details.
            //     </div>
            // );
        } else {
            // toast.error(
            //     <div>
            //         Error uploading file. Please check your connection or <a href="https://drive.google.com/file/d/173h6xvU21zu4pg-20piETAuvZCfsM4kU/view?usp=sharing" target="_blank" rel="noopener noreferrer">refer to the documentation</a> for more details.
            //     </div>
            // );
        }
    } finally {
        setLoading(false);
    }
};



    return (
        <div>
            <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }} // Keep the file input hidden
            />
            <TailwindcssButtons onClick={handleButtonClick} />
            {loading && (
                <div className="flex flex-col items-center mt-4">
                    <Spinner label="Uploading..." color="warning" />
                    <p className="mt-2 text-white">Uploading...</p>
                </div>
            )}
            {fileUrl && (
                <div className="mt-4">
                    {/* Removed the iframe for direct redirection */}
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200 ease-in-out">Preview</button>
                    </a>
                </div>
            )}
            <ToastContainer containerId="Container B"/>
        </div>
    );
};

export default Upload;

export function TailwindcssButtons({ onClick }) {
    return (
        <div className="w-full">
            <button className="relative p-[3px] w-full" onClick={onClick}>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg" />
                <div className="px-8 py-2 bg-[#080621] rounded-[6px] relative group transition duration-200 font-  text-white hover:bg-transparent w-full">
                    Upload File
                </div>
            </button>
        </div>
    );
}
