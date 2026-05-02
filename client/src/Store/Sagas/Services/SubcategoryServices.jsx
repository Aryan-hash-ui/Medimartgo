// src/Store/Services/SubcategoryServices.js   (or wherever your service is)

const BASE_URL = process.env.REACT_APP_API_URL;

if (!BASE_URL) {
  console.warn("⚠️ REACT_APP_API_URL is not set in Vercel Environment Variables");
}

// Helper function
const handleResponse = async (res) => {
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Something went wrong");
  }
  return res.json();
};

// ✅ GET ALL SUBCATEGORIES
export async function getRecord() {
  if (!BASE_URL) throw new Error("API URL not configured");

  const res = await fetch(`${BASE_URL}/api/subcategory`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const result = await handleResponse(res);
  return result.data || result;   // Handle both {data: [...]} and direct array
}

// ✅ ADD SUBCATEGORY
export async function addRecord(payload) {
  if (!BASE_URL) throw new Error("API URL not configured");

  const res = await fetch(`${BASE_URL}/api/subcategory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token")
    },
    body: JSON.stringify(payload)
  });

  return handleResponse(res);
}

// ✅ UPDATE SUBCATEGORY
export async function updateRecord(payload) {
  if (!BASE_URL) throw new Error("API URL not configured");

  const res = await fetch(`${BASE_URL}/api/subcategory/${payload._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token")
    },
    body: JSON.stringify(payload)
  });

  return handleResponse(res);
}

// ✅ DELETE SUBCATEGORY
export async function deleteRecord(payload) {
  if (!BASE_URL) throw new Error("API URL not configured");

  const res = await fetch(`${BASE_URL}/api/subcategory/${payload._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token")
    }
  });

  return handleResponse(res);
}