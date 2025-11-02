import { useState } from "react";
import postLogin from "../api/post-login.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

function LoginForm() {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();

    const [isLogin, setIsLogin] = useState(true);
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isLogin) {
            if (credentials.username && credentials.password) {
                postLogin(credentials.username, credentials.password)
                    .then(response => {
                        
                        window.localStorage.setItem("token", response.token);
                        window.localStorage.setItem("userId", response.userId);

                        setAuth({ token: response.token, userId: response.userId });

                        navigate("/");
                    })
                    .catch(error => {
                        console.error("Login error:", error.message);
                        alert("Login failed!");
                    });
            }
        } else {
            if (credentials.username && credentials.email && credentials.password) {
                fetch(`${import.meta.env.VITE_API_URL}/users/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(credentials)
                })
                    .then(res => {
                        if (!res.ok) throw new Error("Error creating user");
                        return res.json();
                    })
                    .then(data => {
                        console.log("User created:", data);
                        alert("User created successfully!");
                        setIsLogin(true);
                    })
                    .catch(err => {
                        console.error(err.message);
                        alert(err.message);
                    });
            }
        }
    };

    return (
        <div>
            <h1>Welcome to English for Hope!</h1>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter username"
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                <div>
                    <label htmlFor="email">{isLogin ? "Username:" : "Email:"}</label>
                    <input
                        type={isLogin ? "text" : "email"}
                        id={isLogin ? "username" : "email"}
                        placeholder={isLogin ? "Enter username" : "Enter email"}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>

                <p>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ color: "blue", background: "none", border: "none", cursor: "pointer" }}
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>
            </form>
        </div>
    );
}

export default LoginForm;
