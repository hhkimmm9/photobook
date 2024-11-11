"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import PasswordForm from "@/app/(components)/passwordForm";

const UploadPage = () => {
  const router = useRouter();

  const [hasAccess, setHasAccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    thumbnailImage: null as File | null,
    description: "",
    password: "",
    photos: [] as File[],
  });
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<string | null>(null);
  const [thumbnailFeedback, setThumbnailFeedback] = useState("");
  const [photosFeedback, setPhotosFeedback] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      setThumbnailFeedback('NOPE: No files selected.');
      return;
    }
    const file = files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prevState => ({
        ...prevState,
        thumbnailImage: file
      }));
      setThumbnailImageUrl(URL.createObjectURL(file));
      setThumbnailFeedback('OK: Image file selected.');
    } else {
      setFormData(prevState => ({
        ...prevState,
        thumbnailImage: null
      }));
      setThumbnailImageUrl(null);
      setThumbnailFeedback('NOPE: Please select a valid image file.');
    }
  };

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      setPhotosFeedback('NOPE: No files selected.');
      return;
    }
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    if (validFiles.length === files.length) {
      setFormData(prevState => ({
        ...prevState,
        photos: validFiles
      }));
      setPhotosFeedback('OK: All selected files are valid images.');
    } else {
      setFormData(prevState => ({
        ...prevState,
        photos: []
      }));
      setPhotosFeedback('NOPE: Some selected files are not valid images.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    if (formData.thumbnailImage) {
      data.append("thumbnailImage", formData.thumbnailImage);
    }
    data.append("description", formData.description);
    data.append("password", formData.password);
    formData.photos.forEach(photo => data.append("photos", photo));

    const response = await fetch('/api/albums', {
      method: 'POST',
      body: data
    });

    const result = await response.json();
    console.log(result);

    router.push('/');
  };

  const getFeedbackStyle = (feedback: string) => {
    return feedback.startsWith('NOPE') ? 'text-red-500' : 'text-green-500';
  };

  return !hasAccess ? <PasswordForm hasAccess={() => setHasAccess(true)} /> : (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Create A New Album</h2>
        <input 
          type="text" 
          name="title"
          placeholder="Title" 
          value={formData.title} 
          onChange={handleInputChange} 
          className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="relative">
          <input 
            type="file" 
            onChange={handleThumbnailChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <button 
            type="button" 
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
          >
            Choose Thumbnail
          </button>
        </div>
        {thumbnailImageUrl && (
          <div className="grid justify-items-center">
            <Image src={thumbnailImageUrl} alt="Thumbnail preview" width={256} height={256} />
          </div>
        )}
        {thumbnailFeedback && (
          <div className={`text-center ${getFeedbackStyle(thumbnailFeedback)}`}>
            {thumbnailFeedback}
          </div>
        )}
        <div className="relative">
          <input 
            type="file" 
            multiple 
            onChange={handlePhotosChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <button 
            type="button" 
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
          >
            Choose Photos
          </button>
        </div>
        {photosFeedback && (
          <div className={`text-center ${getFeedbackStyle(photosFeedback)}`}>
            {photosFeedback}
          </div>
        )}
        <textarea 
          name="description"
          placeholder="Description" 
          value={formData.description} 
          onChange={handleInputChange} 
          className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="password" 
          name="password"
          placeholder="Password" 
          value={formData.password} 
          onChange={handleInputChange} 
          className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="block w-full p-3 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadPage;