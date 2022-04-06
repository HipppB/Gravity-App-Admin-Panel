import React, { useEect, useState } from "react";

function useFetch() {
  const API = "https://api.liste-gravity.fr/";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  async function newRequest(endPoint, method, content, apiToken, file) {
    console.log("New request", endPoint);
    setLoading(true);
    setData(null);
    setError(null);
    let options = {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + apiToken,
      },
    };
    if (apiToken) {
      options.headers.Authorization = "Bearer " + apiToken;
    }
    if (method !== "GET" && !file) {
      options.body = JSON.stringify(content);
    }
    if (method !== "GET" && file) {
      let formdata = new FormData();

      formdata.append("image", {
        type: "image/jpg",
        name: "image.png",
        uri: file,
      });

      options.body = formdata;
    }

    try {
      const response = await fetch(API + endPoint, options);
      const json = await response.json();
      // console.log("response", endPoint, json);
      setError(null);
      setData(json);
      setLoading(false);
    } catch (e) {
      console.warn("error fetching", e);
      setError(e);
      setData(null);
      setLoading(false);
    }
  }

  return { data, loading, error, newRequest };
}

export default useFetch;
