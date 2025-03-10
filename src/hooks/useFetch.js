import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sử dụng access_token đã cung cấp
  const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHSHg0Qmk2THhvdVRGLWZuQmg0WXhMbUtUbGZzT2tmTm9fQ05yT1pMZHNrIn0.eyJleHAiOjE3NDE2MTc4NzcsImlhdCI6MTc0MTYxNjk3NywiYXV0aF90aW1lIjoxNzQxNjE2OTc1LCJqdGkiOiJjM2E0Yjk2My0xODg2LTRkNWQtYWIwNy1iYWEyZGM2YWVmZmIiLCJpc3MiOiJodHRwczovL2F1dGgubWFuZ2FkZXgub3JnL3JlYWxtcy9tYW5nYWRleCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI1MDQyMjkzOS05NDhmLTQ5YjItOTYyZS0yMjEwMGY0N2M4YmIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJtYW5nYWRleC1mcm9udGVuZC1zdGFibGUiLCJzZXNzaW9uX3N0YXRlIjoiMjZmYjI1OWYtNmJhNS00ZmFlLWFkZGQtMjI4ZjZiY2IyMjMyIiwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGdyb3VwcyBlbWFpbCBwcm9maWxlIiwic2lkIjoiMjZmYjI1OWYtNmJhNS00ZmFlLWFkZGQtMjI4ZjZiY2IyMjMyIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInJvbGVzIjpbIlJPTEVfVVNFUiIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLW1hbmdhZGV4Il0sImdyb3VwcyI6WyJHUk9VUF9VU0VSIl0sInByZWZlcnJlZF91c2VybmFtZSI6ImtlbjY2NzU2NDM1Njc4IiwiZW1haWwiOiJob2FuZ2tpdHZpbkBnbWFpbC5jb20ifQ.w3QfCc4YyjqOg2BJFV13MZpkzXoKbUKr2sKTjmzxC5o2jlzn_ZyBVfUdv8tNjTKTipH8LlQbALy-H4xYoOL6io_D0FN9Gdp9Y50R2Wxwb9hb_7eUUpNLikEBqId_QTyedcdS5yeFpDpd-SfA6bUfGeDGLyyXLEgRksVTCDhQHr53cKUgM6s-RrWYXFwrF526tcn1eb1HnjuzZVOQCpJeds59LjA1l9ZJz3M4PxuQh1GfIlaRPTjwb4ox9R3y71sKF_vtHByddO_O0a82wrmNhfq5UQWP4Aslr9I7XBtUF8gauj9mw1Nrzuhin19I-AY8vxxN21FBcHbm4f-riNaCAQ';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Thêm access token vào header
          },
        });
        setData(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(params)]); // Bỏ accessToken khỏi dependency array

  return { data, loading, error };
};

export default useFetch;