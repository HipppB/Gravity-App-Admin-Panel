import React from "react";

async function getImagePath (file, apiToken) {
    var formdata = new FormData();
    formdata.append("image", file, file.name);
    let options = {
        method: "POST",
        headers: {
          Accept: "multipart/form-data",
          Authorization: "Bearer " + apiToken
        },
        body: formdata,

      };

    const response = await fetch("https://api.liste-gravity.fr/static/upload", options);
    const json = await response.json();
    return json


}

export default getImagePath;