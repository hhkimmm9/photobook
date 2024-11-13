"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import PasswordFormWrapper from "@/app/(components)/PasswordFormWrapper";
import Image from "next/image";

const UploadPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    thumbnailImage: null as File | null,
    description: "",
    password: "",
    photos: [] as File[],
  });
  const [state, setState] = useState({
    hasAccess: false,
    thumbnailImageUrl: null as string | null,
    thumbnailFeedback: "",
    photosFeedback: ""
  });

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  const handleThumbnailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setState(prevState => ({ ...prevState, thumbnailFeedback: 'NOPE: No files selected.' }));
      return;
    }
    if (file.type.startsWith('image/')) {
      setFormData(prevState => ({ ...prevState, thumbnailImage: file }));
      setState(prevState => ({
        ...prevState,
        thumbnailImageUrl: URL.createObjectURL(file),
        thumbnailFeedback: 'OK: Image file selected.'
      }));
    } else {
      setFormData(prevState => ({ ...prevState, thumbnailImage: null }));
      setState(prevState => ({
        ...prevState,
        thumbnailImageUrl: null,
        thumbnailFeedback: 'NOPE: Please select a valid image file.'
      }));
    }
  }, []);

  const handlePhotosChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      setState(prevState => ({ ...prevState, photosFeedback: 'NOPE: No files selected.' }));
      return;
    }
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    if (validFiles.length === files.length) {
      setFormData(prevState => ({
        ...prevState,
        photos: validFiles
      }));
      setState(prevState => ({ ...prevState, photosFeedback: 'OK: All selected files are valid images.' }));
    } else {
      setFormData(prevState => ({ ...prevState, photos: [] }));
      setState(prevState => ({ ...prevState, photosFeedback: 'NOPE: Some selected files are not valid images.' }));
    }
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    if (formData.thumbnailImage) {
      data.append("thumbnailImage", formData.thumbnailImage);
    }
    data.append("description", formData.description);
    data.append("password", formData.password);
    formData.photos.forEach(photo => data.append("photos", photo));

    try {
      const response = await fetch('/api/albums', {
        method: 'POST',
        body: data
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);

      router.push('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }, [formData, router]);

  const getFeedbackStyle = (feedback: string) => {
    return feedback.startsWith('NOPE') ? 'text-red-500' : 'text-green-500';
  };

  const FileInputButton = ({ onChange, label, multiple }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, label: string, multiple: boolean }) => (
    <div className="relative">
      <input 
        type="file" 
        onChange={onChange} 
        multiple={multiple}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <button 
        type="button" 
        className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-300 bg-white text-gray-700"
      >
        {label}
      </button>
    </div>
  );

  return (
    <PasswordFormWrapper albumId={null}>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center text-gray-700">Create A New Album</h2>
          <input 
            type="text" 
            name="title"
            placeholder="Title" 
            value={formData.title} 
            onChange={handleInputChange} 
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-300"
          />
          <FileInputButton onChange={handleThumbnailChange} label="Choose Thumbnail" multiple={false} />
          {state.thumbnailImageUrl && (
            <div className="grid justify-items-center">
              <Image src={state.thumbnailImageUrl} alt="Thumbnail preview" width={256} height={256} />
            </div>
          )}
          {state.thumbnailFeedback && (
            <div className={`text-center ${getFeedbackStyle(state.thumbnailFeedback)}`}>
              {state.thumbnailFeedback}
            </div>
          )}
          <FileInputButton onChange={handlePhotosChange} label="Choose Photos" multiple={true} />
          {state.photosFeedback && (
            <div className={`text-center ${getFeedbackStyle(state.photosFeedback)}`}>
              {state.photosFeedback}
            </div>
          )}
          <textarea 
            name="description"
            placeholder="Description" 
            value={formData.description} 
            onChange={handleInputChange} 
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-300"
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            value={formData.password} 
            onChange={handleInputChange} 
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-300"
          />
          <button 
            type="submit" 
            className="block w-full p-3 bg-stone-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-700"
          >
            Submit
          </button>
        </form>
      </div>
    </PasswordFormWrapper>
  )
};

export default UploadPage;
