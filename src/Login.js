// import React, { useState } from "react";

// const Login = () => {
//   const [loginData, setLoginData] = useState({ username: "", password: "" });

//   function changeLogInData(e) {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   }

//   function onLogIn() {
//     authentication.onAuthentication();
//   }

//   return (
//     <div>
//       <h2>Welcome to LogIn...</h2>
//       <p>
//         <label>
//           UserName :{" "}
//           <input
//             type="text"
//             value={loginData.username}
//             name="username"
//             onChange={changeLogInData}
//           ></input>
//         </label>
//       </p>
//       <p>
//         <label>
//           PassWord :{" "}
//           <input
//             type="text"
//             value={loginData.password}
//             name="password"
//             onChange={changeLogInData}
//           ></input>
//         </label>
//       </p>
//       <button onClick={onLogIn}>LogIn</button>
//     </div>
//   );
// };

// export default Login;
