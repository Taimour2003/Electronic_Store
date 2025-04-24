import Illustration from "../components/Illustration";
import SignInForm from "../components/signInForm";


const SignInPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg flex p-8 w-full max-w-4xl">
        {/* Left Side - Sign In Form */}
        <div className="w-1/2 pr-6">
          <SignInForm/>
        </div>
        {/* Right Side - Illustration */}
        <div className="w-1/2 hidden md:block">
          <Illustration />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
