const uploadImage = async (blob, title) => {
  try {
    const formData = new FormData();
    formData.append("blob", blob);
    formData.append("title", title);
    const response = await fetch("https://camlog.vercel.app/api/s3", {
      method: "POST",
      body: formData,
    });
    return response.body.location;
  } catch (err) {
    console.log("aws s3 error", err);
  }
};

export { uploadImage };
