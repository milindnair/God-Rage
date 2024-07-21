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
            const response = await axios.post('http://localhost:5001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.status === 200) {
                setFileUrl(response.data.fileUrl); // Assuming the response contains a fileUrl
                toast.success('File uploaded successfully!');

                const documentData = response.data.document.data[0]; // Accessing the first element in the data array
                const documentMetadata = {
                    description: documentData.description,
                    title: response.data.fileName.split('.')[0], // Use file name without extension as title
                    content: documentData.summary,
                    fileName: response.data.fileName
                };

                setDocuments(prevDocs => [...prevDocs, documentMetadata]); // Add the new document to the existing list
            }
            else {
                toast.error('File upload failed.');
            }
        } catch (error) {
            toast.error('Error uploading file.');
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
            <ToastContainer />
        </div>
    );
};

export default Upload;

export function TailwindcssButtons({ onClick }) {
    return (
        <div className="w-full">
            <button className="relative p-[3px] w-full" onClick={onClick}>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent w-full">
                    Upload File
                </div>
            </button>
        </div>
    );
}
