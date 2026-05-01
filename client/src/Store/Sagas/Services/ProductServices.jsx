// ProductService.js
const BASE_URL = process.env.REACT_APP_API_URL;

if (!BASE_URL) {
  console.warn("⚠️ REACT_APP_API_URL is not defined in environment variables!");
}

// Helper to get auth token
const getToken = () => {
  return localStorage.getItem("token");
};

// Improved response handler with better error messages
const handleResponse = async (res) => {
  if (!res.ok) {
    let errorMessage = "Something went wrong";

    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || await res.text();
    } catch (e) {
      errorMessage = await res.text() || res.statusText || errorMessage;
    }

    console.error(`API Error: ${res.status} - ${errorMessage}`);
    throw new Error(errorMessage);
  }

  return res.json();
};

// ====================== CRUD Operations ======================

// ✅ GET ALL PRODUCTS
export async function getRecord() {
  if (!BASE_URL) {
    throw new Error("API base URL is not configured. Please check environment variables.");
  }

  try {
    const res = await fetch(`${BASE_URL}/product`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Prevent aggressive caching in production
      cache: "no-store",
      next: { revalidate: 0 }, // Only works in Next.js, safe to keep
    });

    return await handleResponse(res);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error; // Let the component handle the error
  }
}

// ✅ ADD NEW PRODUCT
export async function addRecord(payload) {
  if (!BASE_URL) {
    throw new Error("API base URL is not configured.");
  }

  const res = await fetch(`${BASE_URL}/product`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      // Do NOT set Content-Type when sending FormData
    },
    body: payload, // FormData
  });

  return handleResponse(res);
}

// ✅ UPDATE PRODUCT
export async function updateRecord(payload) {
  if (!BASE_URL) {
    throw new Error("API base URL is not configured.");
  }

  const id = payload.get("_id");
  if (!id) {
    throw new Error("Product ID is required for update.");
  }

  const res = await fetch(`${BASE_URL}/product/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: payload, // FormData
  });

  return handleResponse(res);
}

// ✅ DELETE PRODUCT
export async function deleteRecord(payload) {
  if (!BASE_URL) {
    throw new Error("API base URL is not configured.");
  }

  if (!payload?._id) {
    throw new Error("Product ID is required for deletion.");
  }

  const res = await fetch(`${BASE_URL}/product/${payload._id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });

  return handleResponse(res);
}