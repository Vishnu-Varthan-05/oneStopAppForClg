import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { postData } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("student");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({ email, password, userType }) => {
      const endpoint =
        userType === "student" ? "/students/login" : "/faculty/login";
      const response = await postData(endpoint, { email, password });
      return response;
    },
    onError: (error) => {
      setError("Login failed. Please check your credentials and try again.");
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ userType }));
      if (userType === "student") {
        navigate("/");
      } else {
        navigate("/dashboard");
      }
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password, userType });
  };

  const handleUserTypeChange = () => {
    setUserType(userType === "student" ? "faculty" : "student");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 border border-black rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-purple">Login</h2>
        <form onSubmit={handleLogin} className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg text-purple">Login as:</span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                className="sr-only"
                checked={userType === "faculty"}
                onChange={handleUserTypeChange}
              />
              <label
                htmlFor="toggle"
                className="block overflow-hidden h-6 rounded-full bg-blue-300 border border-black cursor-pointer"
              >
                <span
                  className={`${
                    userType === "faculty"
                  } absolute left-1 top-1 bg-purple w-4 h-4 rounded-full transition-transform duration-200 ease-in transform ${
                    userType === "faculty" ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </label>
            </div>
            <span className="text-lg text-purple">
              {userType === "student" ? "Student" : "Faculty"}
            </span>
          </div>
          <TextInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Logging in..." : "Login"}
          </Button>
          {error && <p className="mt-2 text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}
