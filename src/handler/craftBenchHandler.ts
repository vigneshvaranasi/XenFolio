import { BACKEND_URL, FRONTEND_URL } from "../config";

export const createCraftBench = async (folioConfig: any, meta: any) => {
  try {
    let currToken = localStorage.getItem("accessToken")!;
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", FRONTEND_URL);
    headers.append("token", currToken);

    const newCraftBench = fetch(`${BACKEND_URL}/craftbench/new`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        folioConfig,
        meta,
      }),
    });
    const response = await newCraftBench;
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("data: ", data);
    if (data.error) {
      throw new Error(data.message || "Error creating craft bench");
    }
    return data;
  } catch (err: any) {
    console.error("Error creating craft bench:", err);
    return {
      error: true,
      message: err.message || "Error creating craft bench",
    };
  }
};
