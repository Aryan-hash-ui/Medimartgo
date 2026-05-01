const BASE_URL = process.env.REACT_APP_API_URL;

function getToken() {
  return localStorage.getItem("token");
}

async function handleResponse(res) {
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Something went wrong");
  }
  return res.json();
}

// ✅ ADD PRODUCT
export async function addRecord(payload) {
  const res = await fetch(`${BASE_URL}/product`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: payload // FormData (no content-type needed)
  });

  return handleResponse(res);
}

// ✅ GET PRODUCTS
export async function getRecord() {
  const res = await fetch(`${BASE_URL}/product`);
  return handleResponse(res);
}

// ✅ UPDATE PRODUCT
export async function updateRecord(payload) {
  const id = payload.get("_id");

  const res = await fetch(`${BASE_URL}/product/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: payload
  });

  return handleResponse(res);
}

// ✅ DELETE PRODUCT
export async function deleteRecord(payload) {
  const res = await fetch(`${BASE_URL}/product/${payload._id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return handleResponse(res);
}