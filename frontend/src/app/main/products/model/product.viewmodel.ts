export class Product {
  beforeDiscount?: number;
  productId: number;
  productName: string;
  productSummary: string;
  productCategory: string;
  productDesc: string;
  productBrand: string;
  productPrice: number;
  productStock: number;
  discountId?: number;
  finalRating?: number;
  productRating?: number;
  userRating?: number;
  product_galleries?: any;
  product_discount?: Discount;

  constructor(Product: any = {}) {
    this.productId = Product.productId || 0;
    this.productName = Product.productName || '';
    this.productCategory = Product.productCategory || '';
    this.productSummary = Product.productSummary || '';
    this.productDesc = Product.productDesc || '';
    this.productBrand = Product.productBrand || '';
    this.productPrice = Product.productPrice || 0;
    this.productStock = Product.productStock || 0;
    this.discountId = Product.discountId || 0 ;
  }
}

export interface Discount{ 
  createdAt: string;
  discountId: number;
  discountName: string;
  discountPercent: number;
  updatedAt: string
}

export class ProductRating {
  product_rating_id: number;
  user_id: number;
  productId: number;
  product_rating: number;
  created_at: string | null;
  updated_at: string | null;

  constructor(ProductRating: any = {}) {
    this.product_rating_id = ProductRating.product_rating_id || 0;
    this.user_id = ProductRating.user_id || 0;
    this.productId = ProductRating.productId || 0;
    this.product_rating = ProductRating.product_rating || 0;
    this.created_at = ProductRating.created_at || null;
    this.updated_at = ProductRating.updated_at || null;
  }
}

export class ProductDiscount {
  discount_id: number;
  discount_name: string;
  discount_percent: number;
  created_at: string | null;
  updated_at: string | null;

  constructor(ProductDiscount: any = {}){
    this.discount_id = ProductDiscount.discount_id || 0;
    this.discount_name = ProductDiscount.discount_name || '';
    this.discount_percent = ProductDiscount.discount_percent || 0;
    this.created_at = ProductDiscount.created_at || null;
    this.updated_at = ProductDiscount.updated_at || null;
  }
}

export class ProductComment {
  user_id: number;
  productId: number;
  comment_text: string;
  created_at: string | null;
  updated_at: string | null;

  constructor(ProductComment: any = {}) {
    this.user_id = ProductComment.user_id || 0;
    this.productId = ProductComment.productId || 0;
    this.comment_text = ProductComment.comment_text || '';
    this.created_at = ProductComment.created_at || null;
    this.updated_at = ProductComment.updated_at || null;
  }
}

export class ProductImage {
  createdAt: string
  imageId: number
  imageName: string
  imagePath: string
  imageType: string
  productId: number
  used: boolean

  constructor(ProductImage: any = {}) {
    this.createdAt = ProductImage.createdAt || null;
    this.imageId = ProductImage.imageId || 0;
    this.imageName = ProductImage.imageName || '';
    this.imagePath = ProductImage.imagePath || '';
    this.imageType = ProductImage.imageType || '';
    this.productId = ProductImage.productId || 0;
    this.used = ProductImage.used || false;
  }
}

export class ProductSearch{
  page: number;
  size: number;
  filterType: string;
  filterValue: string;
  filterBrand: string[];
  filterCategory: string;
  searchedProduct: string;

  constructor(ProductSearch: any = {}) {
    this.page = ProductSearch.page || 0;
    this.size = ProductSearch.size || 6;
    this.filterBrand = ProductSearch.filterType || [];
    this.filterCategory = ProductSearch.filterValue || "";
    this.searchedProduct = ProductSearch.searchedProduct || "";
  }
}