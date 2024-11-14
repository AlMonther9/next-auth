"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#2c251d] flex items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-md">
        <div className="absolute -top-4 -left-4 w-8 h-8 text-[#8b7355] text-2xl rotate-180">❀</div>
        <div className="absolute -top-4 -right-4 w-8 h-8 text-[#8b7355] text-2xl">❀</div>
        <div className="absolute -bottom-4 -left-4 w-8 h-8 text-[#8b7355] text-2xl">❀</div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 text-[#8b7355] text-2xl rotate-180">❀</div>

        <form
          onSubmit={handleSubmit}
          method="post"
          className="relative bg-[#3a3024] rounded-2xl p-8 shadow-[0_0_20px_rgba(139,115,85,0.2)]
                     border-2 border-[#8b7355] space-y-6"
        >
          <h1 className="text-2xl font-serif text-center text-[#d4b483] mb-8 tracking-wide">
            Create New User
          </h1>

          {['name', 'email', 'password'].map((field) => (
            <div key={field} className="relative group">
              <label 
                className="block font-serif text-[#d4b483] mb-2 tracking-wide capitalize"
              >
                {field}
              </label>
              <input
                id={field}
                name={field}
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                onChange={handleChange}
                required={true}
                value={formData[field] || ''}
                className="w-full px-4 py-2 bg-[#2c251d] text-[#d4b483] 
                         border-2 border-[#8b7355] rounded-xl
                         focus:outline-none focus:border-[#d4b483] 
                         transition-all duration-300
                         placeholder-[#8b7355]/50"
              />
              <span className="absolute bottom-0 left-0 w-full h-[2px] 
                             bg-gradient-to-r from-transparent via-[#8b7355] to-transparent 
                             scale-x-0 group-hover:scale-x-100
                             transition-transform duration-300"></span>
            </div>
          ))}

          <button
            type="submit"
            className="relative w-full px-6 py-3 mt-8 overflow-hidden font-serif tracking-wide text-center transition-all duration-300 group rounded-xl"
          >
            <span className="relative z-10 text-[#2c251d] group-hover:text-[#1a1610]">
              Create User
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#d4b483] to-[#8b7355]
                           group-hover:shadow-[0_0_20px_rgba(212,180,131,0.3)]
                           transition-all duration-300"></span>
          </button>
        </form>

        {errorMessage && (
          <div className="p-4 mt-4 border-2 rounded-xl bg-red-900/20 border-red-900/30">
            <p className="font-serif text-center text-red-400">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserForm;