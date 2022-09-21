import React from "react";

import { categories } from "../data/dataFront";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { Alert } from "./";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";

import { saveItem } from "../fireBaseFunctions";

//
const initialState = {
  name: "",
  categorie: "",
  imageFile: "",
  price: 0,
  calories: 0,
};

const initialAlert = {
  msg: "",
  show: "hide",
  color: "alert-danger",
};
const AddItem = () => {
  //
  const [formState, setFormState] = useState(initialState);
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState("");

  // alert state
  const [alertState, setAlert] = useState(initialAlert);
  //

  const onChange = (e) => {
    //
    const name = e.target.name;
    setFormState((prevState) => {
      if (name == "imageFile") {
        //
        setImageLoading(true);
        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `Imgs/${Date.now()}-${imageFile.name}`);

        const uploadImage = uploadBytesResumable(storageRef, imageFile);

        uploadImage.on(
          "state_changed",
          (snapshot) => {
            const uploadingProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error);
            setAlert({
              show: "show",
              color: "alert-success",
              msg: "an error occured while aploading Image ... ",
            });

            setInterval(() => {
              setAlert(initialAlert);
            }, 3000);
          },
          () => {
            getDownloadURL(uploadImage.snapshot.ref).then((url) => {
              //
              setImage(url);
              setImageLoading(false);
              setAlert({
                show: "show",
                color: "alert-success",
                msg: "the image was successfully uploaded",
              });

              setInterval(() => {
                setAlert(initialAlert);
              }, 3000);
              console.log(url);
            });
          }
        );
        return { ...prevState, [name]: e.target.files[0] };
        //
      } else return { ...prevState, [name]: e.target.value };
    });
  };

  // delet image
  const deletImage = () => {
    //
    setImageLoading(true);
    const deleteRef = ref(storage, image);
    deleteObject(deleteRef).then(() => {
      setImage("");
      setImageLoading(false);
      setFormState((prevState) => {
        return { ...prevState, imageFile: "" };
      });
      setAlert({
        show: "show",
        color: "alert-success",
        msg: "the image was successfully deleted",
      });

      setInterval(() => {
        setAlert(initialAlert);
      }, 3000);
    });
  };

  // handeling form submit

  const handelSubmit = (e) => {
    e.preventDefault();
    setImageLoading(true);
    try {
      saveItem({ ...formState, imageFile: image, id: Date.now() });
      setFormState(initialState);
      setImage("");
      setInterval(() => {
        setImageLoading(false);
      }, 3000);
      setAlert({
        show: "show",
        color: "alert-success",
        msg: "the item was successfully added",
      });

      setInterval(() => {
        setAlert(initialAlert);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="container d-flex flex-column justify-content-center center-block position-relative"
      style={{ padding: "7rem 0" }}
    >
      <Alert
        show={alertState.show}
        msg={alertState.msg}
        color={alertState.color}
      />
      <form onSubmit={handelSubmit}>
        <div className="form-row justify-content-center">
          <div className="form-group col-md-4">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              id="inputEmail4"
              placeholder="food name"
              onChange={(e) => onChange(e)}
              required
              value={formState.name}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="categorie">Categorie</label>
            <select
              name="categorie"
              type="text"
              className="form-control"
              placeholder="Password"
              onChange={(e) => onChange(e)}
              required
              value={formState.categorie}
            >
              <option value="other"> chose a categorie</option>
              {categories.map((categorie) => {
                return (
                  <option key={categorie.id} value={categorie.categorieName}>
                    {categorie.categorieName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div
          className="row justify-content-center"
          style={{ marginTop: "2rem" }}
        >
          <div className="form-group col-md-8" style={{ position: "relative" }}>
            <div
              className="input-group mb-3 px-2  bg-white shadow-sm"
              style={{ paddingBottom: "10rem", overflow: "hidden" }}
            >
              <input
                name="imageFile"
                id="upload"
                type="file"
                className="form-control border-0"
                style={{ opacity: "0" }}
                onChange={(e) => onChange(e)}
                required
              />
              <label htmlFor="upload" style={{ position: "absolute" }}>
                {!formState.imageFile.name
                  ? "No image yet"
                  : formState.imageFile.name}
              </label>
              {image != "" && (
                <img
                  htmlFor="upload"
                  src={image}
                  alt="Upload"
                  className="image-fluid position-absolute upload-image"
                />
              )}
              <div className="input-group-append">
                <label
                  htmlFor="upload"
                  className="btn btn-light m-0 rounded-pill px-4"
                >
                  <i className="bi bi-cloud-arrow-up-fill mr-2 text-muted"></i>
                  <small class="text-uppercase font-weight-bold text-muted">
                    Choose Image
                  </small>
                </label>
                {image != "" && (
                  <label
                    className="btn btn-danger m-0 rounded-pill px-4"
                    onClick={deletImage}
                  >
                    <i className="bi bi-trash mr-2 text-muted"></i>
                    <small class="text-uppercase font-weight-bold text-muted">
                      Delete
                    </small>
                  </label>
                )}
              </div>
              {imageLoading && (
                <BeatLoader
                  color="black"
                  cssOverride={{
                    position: "absolute",
                    display: "inherit",
                    left: "40%",
                    top: "51%",
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="form-row justify-content-center">
          <div className="form-group col-md-4">
            <label htmlFor="price">Price</label>
            <input
              name="price"
              type="number"
              className="form-control"
              placeholder="food name"
              onChange={(e) => onChange(e)}
              required
              value={formState.price}
            />
            <i className="bi bi-currency-dollar icon-form"></i>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="calories">Calories</label>
            <input
              name="calories"
              type="number"
              className="form-control"
              placeholder="food name"
              onChange={(e) => onChange(e)}
              required
              value={formState.calories}
            />
            <i className="bi bi-shield-check icon-form"></i>
          </div>
        </div>
        <div className="form-row position-relative">
          <button
            type="submit"
            className="btn position-absolute "
            style={{ right: "17%", background: "#ff264c", width: "10rem" }}
          >
            Add item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
