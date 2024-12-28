import React, { useState } from "react";
import { useProductStore } from "../store/product";

interface CardProps {
  name: string;
  price: number;
  img: string;
  id: string;
}

const Card: React.FC<CardProps> = ({ name, price, img, id }) => {
  const { deleteProducts, editProduct } = useProductStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedImg, setEditedImg] = useState(img);

  const handleDelete = async () => {
    const { success, message } = await deleteProducts(id);
    if (success) {
      console.log("Product deleted successfully:", message);
    } else {
      console.error("Failed to delete product:", message);
    }
  };

  const handleEdit = async () => {
    // Ensure id is a string before calling editProduct
    const updatedProduct = { name: editedName, price: editedPrice, image: editedImg };
    const { success, message } = await editProduct(id ?? "default-id", updatedProduct); // Default id fallback
    if (success) {
      console.log("Product updated successfully:", message);
      setIsEditing(false); // Exit edit mode after successful update
    } else {
      console.error("Failed to update product:", message);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={img} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{isEditing ? "Edit Product" : name}</h2>

        {/* Conditionally render form fields when editing */}
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              className="input input-bordered w-full"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <input
              type="number"
              className="input input-bordered w-full"
              value={editedPrice}
              onChange={(e) => setEditedPrice(Number(e.target.value))}
            />
            <input
              type="text"
              className="input input-bordered w-full"
              value={editedImg}
              onChange={(e) => setEditedImg(e.target.value)}
            />
          </div>
        ) : (
          <p>{price}</p>
        )}

        <div className="card-actions justify-end">
          {/* Toggle edit mode */}
          <button
            className="btn btn-warning mr-2"
            onClick={() => setIsEditing(!isEditing)} // Toggle edit mode on button click
          >
            {isEditing ? "Save Changes" : "Edit"}
          </button>
          <button className="btn btn-error" onClick={handleDelete}>
            Delete
          </button>
        </div>

        {/* Handle saving the changes */}
        {isEditing && (
          <button className="btn btn-success mt-4" onClick={handleEdit}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
