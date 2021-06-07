let baseUrl = "http://localhost:5000/api/v1";

if (process.env.NODE_ENV === "production") {
  baseUrl = "https://blog-proximity-backend.herokuapp.com/api/v1";
}

export default baseUrl;
