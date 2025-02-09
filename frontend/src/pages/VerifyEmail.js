import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get("token");
        const res = await axios.get(`http://localhost:5000/api/auth/verify-email?token=${token}`);
        setMessage(res.data.message);
      } catch (err) {
        setMessage("Invalid or expired token.");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
