import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    userId: 1,
    title: '',
    category: '',
    content: '',
  });

  const [attachFile, setAttachFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append('postRequestDto', JSON.stringify(formData));
    
    if (attachFile) {
      formDataToSend.append('attachFile', attachFile);
      console.log(attachFile);
    }

    imageFiles.forEach((imageFile) => {
      formDataToSend.append('imageFiles', imageFile);
      console.log(imageFile);
    });

    try {
      const response = await axios.post(
        '/ailion/posts',
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
    <>
      <section id="write-box">
        <form id="write-form" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
          <div id="write-title">
            <input
              type="text"
              className="form-title"
              name="title"
              placeholder="제목"
              required
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

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

        <div>
            <input
                type="file"
                id="attach-file-input"
                accept="모든 확장자"
                onChange={handleAttachFileChange}
          />

          <input
                type="file"
                id="image-files-input"
                accept="image/*"
                multiple
                encType="multipart/form-data"
                onChange={handleImageFilesChange}
          />
        </div>

        <div>
          <textarea
            className="form-content"
            name="content"
            rows="20"
            placeholder="본문 내용을 입력해 주세요."
            required
            value={formData.content}
            onChange={handleInputChange}
          ></textarea>
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
    </>
  );
};

export default Form;
