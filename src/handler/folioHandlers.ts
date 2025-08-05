import { BACKEND_URL } from "../config";

export const getAllFolios = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/folio`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (!data || !data.data) {
      throw new Error("Invalid data format");
    }
    if (data.error) {
      throw new Error(data.message || "Error fetching folios");
    }
    return data.data;
  } catch (err: any) {
    console.error("Error fetching all folios:", err);
  }
};
export const getFolioByName = async (folioName:String) => {
  try {
    const response = await fetch(`${BACKEND_URL}/folio/${folioName}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (!data || !data.data) {
      throw new Error("Invalid data format");
    }
    if (data.error) {
      throw new Error(data.message || "Error fetching folios");
    }
    return data.data;
  } catch (err: any) {
    console.error("Error fetching folio:", err);
  }
};
export const getAvatarByUsername = async (username:String) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // console.log('data: ', data);
    if (!data) {
      throw new Error("Invalid data format");
    }
    if (data.error) {
      throw new Error(data.message || "Error fetching folios");
    }
    return data.avatar_url;
  } catch (err: any) {
    console.error("Error fetching folio:", err);
  }
};
