// components/UploadImage.js
import React, { useState, useContext } from 'react';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ImageContext } from '../context/ImageContext.context';
import styles from "../styles/dashboard/postProperty.module.css";
const UploadImage = ({onUpload}) => {
  const [image, setImage] = useState(null);
  const [imageFields, setImageFields] = useState([{ id: 1, file: null }]);
  const { url, setUrl } = useContext(ImageContext);
  const [urls, setUrls] = useState([]);
  const [files, setFiles] = useState([]);


  const handleImageChange = (e, id) => {
    const file = e.target.files[0];
    setImageFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, file } : field
      )
    );
  };

  const handleUpload = (event,id) => {
       // event.preventDefault();
    const field = imageFields.find((field) => field.id === id);
    if (!field || !field.file) return;
    const storageRef = ref(storage, `images/${field.file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, field.file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Progress function ...
      },
      (error) => {
        // Error function ...
        console.error(error);
      },
      () => {
        // Complete function ...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrls((prevUrls) => [...prevUrls, downloadURL]);
          setUrl((prevUrls) => [...prevUrls, downloadURL]);  // Update the context
          console.log('File available at:', downloadURL);  // Log the URL
        });
      }
    );
  };

  const addImageField = () => {
    const newId = imageFields.length + 1;
    setImageFields([...imageFields, { id: newId, file: null }]);
  };

  return (
    <div>
    <div className={styles.inputField}>
      {imageFields.map((field, index) => (
        <div key={field.id} id={styles.file_upload}>
          <label>
            {!files[index] && `Upload Document`}
            <input
              type="file"
              onChange={(e) => handleImageChange(e, field.id)}
            />
            {files[index] && (
              <img
                src={URL.createObjectURL(files[index])}
                width={210}
                height={200}
                alt={`Image ${index + 1}`}
              />
            )}
          </label>
          <button type="button" onClick={(e) => handleUpload(e, field.id)}>Upload</button>
        </div>
      ))}
    </div>
    <button type="button" onClick={addImageField}>Add Another Image</button>
    <br />
    {urls.map((url, index) => (
      <div key={index}>
        <img src={url} alt={`Uploaded ${index + 1}`} />
      </div>
    ))}
  </div>
  );
};

export default UploadImage;