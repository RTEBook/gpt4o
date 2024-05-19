import React, { useState } from 'react';

// 定义上传文件的类型
interface UploadedFile {
  name: string;
  size: number;
  type: string;
  url?: string;
}

// Uploader 组件
const Uploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    // 模拟文件上传过程
    const simulatedUploadTime = Math.floor((Math.random() * 3000) + 1000);
    setTimeout(() => {
      const uploadedFile: UploadedFile = {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        url: `https://example.com/uploads/${selectedFile.name}`,
      };

      setUploadedFiles([...uploadedFiles, uploadedFile]);
      setSelectedFile(null);
    }, simulatedUploadTime);
  };

  return (
    <div className="bg-blue-800 text-white p-4 rounded-md">
      <input type="file" className="hidden" onChange={handleFileChange} />
      <button onClick={handleUpload} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500">Choose Image</button>
      <ul className="mt-4">
        {uploadedFiles.map((file, index) => (
          <li key={index} className="flex items-center mb-2">
            <span className="mr-2">{file.name} - {file.size} bytes - {file.type}</span>
            {file.url && (
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-blue-100">Download</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Define the type for the component's props
interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

// Input component with TypeScript
const Input: React.FC<InputProps> = ({ label, name, value, onChange }) => {
  return (
    <div className="p-5"> {/* 添加了 5px 的内边距 */}
    <label htmlFor={name} className="border-gray-300">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="border-gray-300 border-2 ml-3" // 设置灰色边框
    />
  </div>
  );
};

export default function Home() {
  const [inputValue, setInputValue] = useState<string>('');

  // 使用 Uploader 组件来实现一个上传文件的功能

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <main>

      <div>
        <h1>GPT4o</h1>
      </div>
      <Input
        label="Your Question here:"
        name="yourInputName"
        value={inputValue}
        onChange={handleInputChange}
      />

      <Uploader />

      <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200">
  Submit
</button>

    
    </main>
  );
}
