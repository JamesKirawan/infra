export class Image {
  imageId: number;
  imageType: string;
  imageName: string;
  imagePath: string;
  createdAt: string;
  used: boolean;
  productId: number;

  constructor(Image?: Image){
    this.imageId = Image.imageId || 0;
    this.imageType = Image.imageType || '';
    this.imageName = Image.imageName || '';
    this.imagePath = Image.imagePath || '';
    this.used = Image.used || false;
    this.createdAt = Image.createdAt || null;
    this.productId = Image.productId || 0;
  }
}