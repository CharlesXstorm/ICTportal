// import axios from "axios";
// import crypto from "crypto-js";

// export const upload_img = async (
//   selectedImage: any = null,
//   publicID: string
// ) => {
//   const cloud_name = process.env.NEXT_PUBLIC_CLOUD_NAME;
//   const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
//   const cloudinary_api = process.env.NEXT_PUBLIC_CLOUDINARY_URI;
//   const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
//   const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

//   try {
//     if (!selectedImage || selectedImage === "") {
//       return null;
//     }

//     const timestamp = Math.round(new Date().getTime() / 1000); // Get current timestamp

//     const formData = new FormData();
//     formData.append("file", selectedImage);
//     formData.append("upload_preset", `${uploadPreset}`);
//     formData.append("public_id", `${publicID}`);
//     formData.append("timestamp", `${timestamp}`);
//     formData.append("api_key", `${apiKey}`);

//     // Generate signature
//     const signatureString = `public_id=${publicID}&timestamp=${timestamp}&upload_preset=${uploadPreset}${apiSecret}`;
//     const signature = crypto.SHA1(signatureString).toString();
//     formData.append("signature", signature);

//     const response = await axios.post(
//       `${cloudinary_api}/${cloud_name}/image/upload`,
//       formData
//     );

//     return response.data.secure_url;
//   } catch (err: any) {
//     return err.message || null;
//   }
// };
