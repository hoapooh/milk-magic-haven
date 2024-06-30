import React from "react";
import "./ProductPage.css";

const ProductPage = () => {
  const imageUrl = "https://m.media-amazon.com/images/I/51C5TrSt-GL.jpg";

  return (
    <div className="product-page">
      <div className="product-detail">
        <div className="product-images">
          <img src={imageUrl} alt="Product" className="main-image" />
          <div className="thumbnails">
            <img src={imageUrl} alt="Thumbnail" />
            <img src={imageUrl} alt="Thumbnail" />
            <img src={imageUrl} alt="Thumbnail" />
            <img src={imageUrl} alt="Thumbnail" />
          </div>
        </div>
        <div className="product-info">
          <h1>Blocks shape-sorting Toy</h1>
          <p className="price">$39.00</p>
          <p className="rating">⭐⭐⭐⭐⭐ (14 Reviews)</p>
          <p className="description">
            Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat in ante. Mattis tincidunt nunc,
            ullamcorper scelerisque.
          </p>
          <div className="short-description">
            <p>
              <strong>SKU:</strong> DS-1568
            </p>
            <p>
              <strong>Category:</strong> Educational Toy
            </p>
            <p>
              <strong>Tags:</strong> 2 - 5 years
            </p>
            <p>
              <strong>EXP:</strong> 04/08/2026
            </p>
          </div>
          <div className="add-to-cart">
            <div className="quantity">
              <button className="quantity-btn">-</button>
              <input type="text" value="1" readOnly />
              <button className="quantity-btn">+</button>
            </div>
            <button className="add-btn">Add to cart</button>
            <button className="wishlist-btn">❤️</button>
          </div>
          <div className="guarantee">
            <p>Guaranteed Safe Checkout</p>
          </div>
        </div>
      </div>
      <div className="product-tabs">
        <button>Description</button>
        <button>Reviews (14)</button>
      </div>
      <div className="tab-content">
        <div className="description">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        </div>
        <div className="reviews">
          <p>Reviews content here...</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
