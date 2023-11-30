import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const convertFiletoDataUrl = async (file: File) => {
  try {
    const base64String = Buffer.from(await file.arrayBuffer()).toString(
      "base64"
    );
    return `data:${file.type};base64,${base64String}`;
  } catch (error) {
    return null;
  }
};

async function uploadImage(file: File, folder?: string) {
  try {
    if (!file.type.startsWith("image")) return null;
    const fileDataUrl = await convertFiletoDataUrl(file);
    if (!fileDataUrl) return null;
    const response = await cloudinary.uploader.upload(fileDataUrl, {
      resource_type: "image",
      folder: folder,
    });
    return response;
  } catch (error) {
    console.log("Image Upload Error", error);
    return null;
  }
}

async function uploadVideo(file: File, folder?: string) {
  try {
    if (!file.type.startsWith("video")) return null;
    const fileDataUrl = await convertFiletoDataUrl(file);
    if (!fileDataUrl) return null;
    const response = await cloudinary.uploader.upload(fileDataUrl, {
      resource_type: "video",
      folder: folder,
    });
    return response;
  } catch (error) {
    console.log("Image Upload Error", error);
    return null;
  }
}

async function uploadFile(file: File, folder?: string) {
  // if (file.type.startsWith("image")) {
  //   return await cldClient.uploadImage(file, folder);
  // }
  // if (file.type.startsWith("video")) {
  //   return await cldClient.uploadVideo(file, folder);
  // }
  // return null;

  try {
    const fileDataUrl = await convertFiletoDataUrl(file);
    if (!fileDataUrl) return null;
    const response = await cloudinary.uploader.upload(fileDataUrl, {
      resource_type: "auto",
      folder: folder,
    });
    return response;
  } catch (error) {
    console.log("File Upload Error", error);
    return null;
  }
}

const cldClient = {
  uploadImage,
  uploadVideo,
  uploadFile,
};
export default cldClient;
