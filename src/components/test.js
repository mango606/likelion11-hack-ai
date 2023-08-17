import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
  });

  const [attachFile, setAttachFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [otherFiles, setOtherFiles] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAttachFileChange = (event) => {
    setAttachFile(event.target.files[0]);
  };

  const handleImageFilesChange = (event) => {
    setImageFiles([...event.target.files]);
  };

  const handleOtherFilesChange = (event) => {
    setOtherFiles([...event.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const postRequestDto = {
      userId: 1,
      title: formData.title,
      content: formData.content,
      category: formData.category,
    };
  
    const formDataToSend = new FormData();
  
    //formDataToSend.append('postRequestDto', JSON.stringify(postRequestDto));
    
    if (attachFile) {
      formDataToSend.append('attachFile', attachFile);
    }
  
    imageFiles.forEach((imageFile) => {
      formDataToSend.append('imageFiles', imageFile);
    });
  
    try {
      const response = await axios.post(
        'https://dce42b07-7964-479d-844a-a57abe6e2da1.mock.pstmn.io/ailion/files/upload/1', // Replace with your API endpoint
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <section id="write-box">
      <form id="write-form" onSubmit={handleSubmit}>
        {/* Title input */}
<div>
  <input
    type="text"
    name="title"
    placeholder="제목"
    required
    value={formData.title}
    onChange={handleInputChange}
  />
</div>

{/* Category select */}
<div>
  <select
    name="category"
    required
    value={formData.category}
    onChange={handleInputChange}
  >
    <option value="" disabled>
      카테고리 선택
    </option>
    <option value="자신만의 AI 노하우">자신만의 AI 노하우</option>
    <option value="AI 결과물 자랑">AI 결과물 자랑</option>
    <option value="자유">자유</option>
    <option value="수익 창출 공유">수익 창출 공유</option>
  </select>
</div>

{/* Attach file input */}
<div>
  <input
    type="file"
    id="attach-file-input"
    accept="*"
    onChange={handleAttachFileChange}
  />
</div>

{/* Image files input */}
<div>
  <input
    type="file"
    id="image-files-input"
    accept="image/*"
    multiple
    onChange={handleImageFilesChange}
  />
</div>

{/* Other files input */}
<div>
  <input
    type="file"
    id="other-files-input"
    accept="*"
    multiple
    onChange={handleOtherFilesChange}
  />
</div>
        <div className="write-btn">
          <button type="button" className="write-cancl">
            취소
          </button>
          <button type="submit" className="write-submit">
            작성
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;