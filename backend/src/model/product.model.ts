import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
  },
  {
    timestamps: true,
  }
);

productSchema.index({ category: 1 });

const productModel = mongoose.model("product", productSchema);

export default productModel;
