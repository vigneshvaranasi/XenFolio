import { BACKEND_URL, FRONTEND_URL } from "../config";

export const createCraftBench = async (meta:any, folioConfig?: any, isRecentConfig?:boolean) => {
  try {
    let currToken = localStorage.getItem("accessToken")!;
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", FRONTEND_URL);
    headers.append("token", currToken);
    let body;
    if (!folioConfig && isRecentConfig) {
      body = {
        meta,
        isRecentConfig: true
      };
    }else if(folioConfig){
      body = {
        meta,
        folioConfig,
        isRecentConfig:false
      };
    }else{
      throw new Error("Folio configuration is required to create a craft bench.");
    }
    const newCraftBench = fetch(`${BACKEND_URL}/craftbench/new`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
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
export const updateCraftBench = async (craftId:string, folioConfig: any) => {
  try {
    let currToken = localStorage.getItem("accessToken")!;
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", FRONTEND_URL);
    headers.append("token", currToken);
    let body= {
        craftId,
        folioConfig
    };
    const newCraftBench = fetch(`${BACKEND_URL}/craftbench/config`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(body),
    });
    const response = await newCraftBench;
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("data: ", data);
    if (data.error) {
      throw new Error(data.message || "Error updating craft bench");
    }
    return data;
  } catch (err: any) {
    console.error("Error updating craft bench:", err);
    return {
      error: true,
      message: err.message || "Error updating craft bench",
    };
  }
};


export const getCraftBench = async (craftId:string)=>{
  try {
    let currToken = localStorage.getItem("accessToken")!;
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", FRONTEND_URL);
    headers.append("token", currToken);

    const response = await fetch(`${BACKEND_URL}/craftbench/${craftId}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    console.error("Error getting craft bench:", err);
    return {
      error: true,
      message: err.message || "Error getting craft bench",
    };
  }
}
export const downloadCode = async (craftId:string)=>{
  try {
    let currToken = localStorage.getItem("accessToken")!;
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", FRONTEND_URL);
    headers.append("token", currToken);

    const response = await fetch(`${BACKEND_URL}/craftbench/download/${craftId}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.text();
    return data;
  } catch (err: any) {
    console.error("Error downloading code:", err);
    return {
      error: true,
      message: err.message || "Error downloading code",
    };
  }
}

export const publishFolio = async(craftId:string)=>{
  try {
    let currToken = localStorage.getItem("accessToken")!;
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", FRONTEND_URL);
    headers.append("token", currToken);

    const response = await fetch(`${BACKEND_URL}/craftbench/publish/${craftId}`, {
      method: "POST",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if(!data.success){
      throw new Error(data.message || "Error publishing folio");
    }
    return data;
  } catch (err: any) {
    console.error("Error publishing folio:", err);
    return {
      error: true,
      message: err.message || "Error publishing folio",
    };
  }
}

