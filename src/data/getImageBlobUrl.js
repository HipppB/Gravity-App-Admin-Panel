import React from "react";

async function getImageBlobUrl(imagePath, apiToken, callback) {
  if (imagePath) {
    let options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + apiToken,
      },
    };
    const response = await fetch(
      "https://api.liste-gravity.fr/static/image/" + imagePath,
      options
    );

    const blob = await response.blob();
    const imageObjectURL = URL.createObjectURL(blob);
    callback(imageObjectURL);
  }
}

export default getImageBlobUrl;
