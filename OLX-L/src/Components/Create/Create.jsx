import { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { FirebaseContext, AuthContext } from "../../store/Context";

const Create = () => {
  const { storage, db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [fname, setFname] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const date = new Date();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async () => {
    if (!fname || !category || !price || !image) {
      setError("Please fill in all fields and select an image.");
      return;
    }

    try {
      const storageRef = storage.ref(`/images/${image.name}`);
      const uploadTask = await storageRef.put(image);
      const url = await uploadTask.ref.getDownloadURL();

      const productData = {
        name: fname,
        category,
        price,
        url,
        userId: user.uid,
        createdAt: date.toDateString(),
      };

      await db.collection("products").add(productData);
      navigate("/");
    } catch (error) {
      setError("Error uploading the product: " + error.message);
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <h3>Add a Selling Item</h3>
        <label htmlFor="fname">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="fname"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          name="Name"
        />
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="category"
          value={category}
          name="category"
          onChange={(e) => {
            const inputValue = e.target.value;
            if (!/\d/.test(inputValue)) {
              setCategory(inputValue);
            }
          }}
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          className="input"
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          name="Price"
        />
        <br />
        <label htmlFor="image">Image</label>
        <br />
        <input onChange={handleImageChange} type="file" accept="image/*" />
        {image && (
          <div className="image-preview">
            <img
              src={URL.createObjectURL(image)}
              alt="Selected"
              width="90px"
              height="90px"
              className="preview-image"
            />
          </div>
        )}
        {!image && (
          <div className="thumbnail-placeholder">
            <span>No image selected</span>
          </div>
        )}
        <div className="error-message">{error}</div>
        <br />
        <button onClick={handleSubmit} className="uploadBtn">
          Upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;
