/* TODO - add your code to create a functional React component that renders a login form */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../API";

const Login = ({setToken}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetchLogin(email,password);

        if (response && response.token !== undefined) {
            setToken(response.token);                      /*Setting state token*/
            localStorage.setItem("token", response.token); /*Setting local token*/
            
            navigate('/users/me');  /*navigate to user page*/
        } else {
            setError("Login fail. Please check your informations and try again!")
            return;
        }

        setEmail("");
        setPassword("");
    }
    
    return (
        <div className="formContainer">
            <h1>Login</h1>

            {error && (<p className="errorMsg">{error}</p>)}

            <form onSubmit={handleSubmit}>
                <label>
                    Email: {" "}
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </label>

                <label>
                    Password: {" "}
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </label>

                <button type="submit" className="formButtons">Log in</button>
            </form>
        </div>
    );
}

 
export default Login;

