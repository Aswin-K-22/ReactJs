import  { useState, useEffect, useContext } from "react";

import Heart from "../../assets/Heart";
import "./Posts.css";
import { FirebaseContext } from "../../store/Context";
import { PostContext } from "../../store/PostContext";
import { useNavigate } from "react-router-dom";


function Posts() {
  const { db } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await db.collection("products").get();
        const allPosts = snapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        setProducts(allPosts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [db]);



  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div
              className="card"
              key={product.id} 
              onClick={() => {
                setPostDetails(product);
                navigate("/view"); 
              }}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <p className="kilometer">{product.name}</p>
                <span className="name">{product.category}</span>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div
              className="card"
              key={product.id} 
              onClick={() => {
                setPostDetails(product);
                navigate("/view"); 
              }}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <p className="kilometer">{product.name}</p>
                <span className="name">{product.category}</span>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;