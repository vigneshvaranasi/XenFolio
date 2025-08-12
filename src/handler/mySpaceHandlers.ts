import { BACKEND_URL } from "../config";

export const getAllCraftBenches = async () =>{
    try{
        let currToken = localStorage.getItem("accessToken")!;
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        headers.append("Origin", BACKEND_URL);
        headers.append("token", currToken);

        const response = await fetch(`${BACKEND_URL}/craftBench/myspace`, {
            method: "GET",
            headers: headers,
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        
        const data = await response.json();


        if(!data || data.error){
            throw new Error(data.errorMessage || "Failed to fetch craft benches");
        }

        return data.craftBenches;
    }
    catch(err:any){
        console.error("Error fetching craft benches");
    }
}