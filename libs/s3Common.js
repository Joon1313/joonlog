const blobToDataUrl = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

const uploadImage = async (blob, title) => {
  try {
    const name = blob.name;
    const blobToBase64 = await blobToDataUrl(blob);
    const data = {
      base64: blobToBase64,
      title,
      name,
    };
    const response = await fetch("http://localhost:3000/api/s3", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { location } = await response.json();
    return location;
  } catch (err) {
    console.log("aws s3 error", err);
  }
};

export { uploadImage };
