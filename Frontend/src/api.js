    export const convertCurrency = async (data) => {
    const response = await fetch("http://localhost:5000/api/convert", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    });
    return response.json();
};

export const getHistory = async () => {
  const response = await fetch("http://localhost:5000/api/convert");
  return response.json();
};

