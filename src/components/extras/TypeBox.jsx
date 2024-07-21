"use client";

import { BackgroundGradient } from "../ui/background-gradient";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

export function TypeBox({ prompt, setPrompt, onSubmitPrompt, loading }) {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitPrompt(prompt);
    setPrompt('');
   
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 w-full">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={handleSubmit}
        disabled={loading}
        
      />
    </div>
  );
}
