import axios from "axios";

export const upload_img = async (selectedImage: any = null) => {
  const cloud_name = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
  const cloudinary_api = process.env.NEXT_PUBLIC_CLOUDINARY_URI;

  try {
    if (!selectedImage || selectedImage === "") {
      return null
    }

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", `${uploadPreset}`);

    const response = await axios.post(
      `${cloudinary_api}/${cloud_name}/image/upload`,
      formData
    );

    return response.data.secure_url;
  } catch (err: any) {
    return err.message || null;
  }
};
