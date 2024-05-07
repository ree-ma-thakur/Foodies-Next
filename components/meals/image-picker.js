"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

const ImagePicker = ({ label, name }) => {
  const [image, setImage] = useState();
  const imageInputRef = useRef();

  const handlePickCLick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!image ? (
            <p>No image picked yet</p>
          ) : (
            <Image src={image} fill alt="Image selected by user" />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInputRef}
          onChange={(e) => handleImageChange()}
          required
        />
        <button
          type="button"
          className={classes.button}
          onClick={() => handlePickCLick()}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
