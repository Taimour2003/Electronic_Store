const SignInForm = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Sign in to your Account</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email address</label>
          <input type="email" className="w-full p-2 border rounded-md mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" className="w-full p-2 border rounded-md mt-1" />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
          </div>
          <a href="#" className="text-blue-600 text-sm">Forgot password?</a>
        </div>
        <button className="w-full bg-black text-white p-2 rounded-md">Sign in</button>
        <p className="text-sm text-center">
          New here? <a href="#" className="text-blue-600">Sign Up</a>
        </p>
      </div>
    );
  };
  
  export default SignInForm;
  