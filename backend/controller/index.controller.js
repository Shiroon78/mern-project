import productModel from "../Model/product.model.js";
import mongoose from "mongoose";

export const getProduct = async (req, res) => {
  try {
    const product = await productModel.find();
    res.status(200).json({ success: true, data: product })
  } catch (error) {
    console.error("Error occured while fetcting data : ", error.message)
    res.status(500).json({ sucess: false, message: "Server Error" })
  }
}

export const postProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: "All fields are required" })
  }
  const newProduct = new productModel(product);

  try {
    await newProduct.save()
    res.status(201).json(newProduct)
  } catch (error) {
    console.error(`Error : ${error.message}`);
    res.status(500).json({ message: "Something went wrong" })
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  // Correct the ID validation logic
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid ID" });
  }

  try {
    // Capture the updated product
    const updatedProduct = await productModel.findByIdAndUpdate(id, product, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(`Error : ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" }); // Correct the typo
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await productModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Successfully deleted" })
  } catch (error) {
    console.error(`Error : ${error.message}`);
    res.status(500).json({ message: "Something went wrong" })
  }
}