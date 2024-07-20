"use client";

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ButtonsCard } from "../ui/tailwindcss-buttons";

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:3001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
            />
            <TailwindcssButtons onClick={handleButtonClick} />
            {/* <button onClick={handleFileUpload}>Upload</button> */}
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
