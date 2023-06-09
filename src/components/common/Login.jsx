import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "assets/image/learningportal.svg";
import { useLoginMutation } from "features/auth/authApi";

function Login({ role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();


  const handleSubmit = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center"><p className="text-xl text-yellow-400 font-HindSiliguri">এডমিন লগইন করতে /Admin/Login রাউটে যান । 
    </p>
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
        
          <img className="h-12 mx-auto" src={Logo} />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Sign in to {role} Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="login-input rounded-t-md"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="login-input rounded-b-md"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="text-sm">
              {role === "Student" ? (
                <Link
                  to={"/Registration"}
                  className="font-medium text-violet-600 hover:text-violet-500"
                >
                  Create New Account
                </Link>
              ) : null}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
