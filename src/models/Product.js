import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: String,
    required: true,
  },
  //book size
  productSize: {
    type: String,
    required: true,
  },
  //Cover type
  // productMaterial:{
  //     type:String,
  //     required:true,
  // },
  productDesc: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  productWriter: {
    type: String,
    required: true,
  },
  productLanguage: {
    type: String,
    required: true,
  },
  //شمارهٔ استاندارد بین‌المللی ۱۰ یا ۱۳ رقم که به کتاب‌های منتشرشده
  productShabak: {
    type: Number,
    required: true,
  },
  productPageNum: {
    type: Number,
    required: true,
  },
  // year of publication
  productYear: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Product = models.Product || model("Product", productSchema);

export default Product;
