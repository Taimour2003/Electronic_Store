import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaMobile, FaLock, FaUpload } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    avatar: null,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const navigate = useNavigate();

  // Calculate form completion percentage
  const totalFields = 6; // firstName, lastName, mobile, email, password, confirmPassword
  const filledFields = Object.entries(formData).filter(
    ([key, value]) => 
      ['firstName', 'lastName', 'mobile', 'email', 'password', 'confirmPassword'].includes(key) && 
      value !== ""
  ).length;
  const completionPercentage = Math.round((filledFields / totalFields) * 100);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle avatar upload
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prevState) => ({
        ...prevState,
        avatar: file,
      }));
      setFileName(file.name);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword || !formData.mobile) {
      setError("All fields are required!");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", `${formData.firstName} ${formData.lastName}`);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("mobile", formData.mobile);
      formDataToSend.append("role", formData.role);
      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }

      await axios.post("http://localhost:5000/api/users/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      setMessage("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden"
      >
        {/* Form Section */}
        <div className="md:w-1/2 p-8">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your Account</h1>
            <p className="text-gray-600 mb-6">Join our community and start exploring</p>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <motion.div 
              className="bg-blue-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>

          {/* Error and Success Messages */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 text-red-700"
            >
              {error}
            </motion.div>
          )}
          
          {message && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 text-green-700"
            >
              {message}
            </motion.div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <FaUser />
                </div>
                <motion.input 
                  whileFocus="focus"
                  variants={inputVariants}
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300" 
                  placeholder="First Name" 
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <FaUser />
                </div>
                <motion.input 
                  whileFocus="focus"
                  variants={inputVariants}
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300" 
                  placeholder="Last Name" 
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <FaMobile />
              </div>
              <motion.input 
                whileFocus="focus"
                variants={inputVariants}
                type="text" 
                name="mobile" 
                value={formData.mobile} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300" 
                placeholder="Mobile Number" 
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <FaEnvelope />
              </div>
              <motion.input 
                whileFocus="focus"
                variants={inputVariants}
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300" 
                placeholder="Email" 
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <FaLock />
              </div>
              <motion.input 
                whileFocus="focus"
                variants={inputVariants}
                type={showPassword ? "text" : "password"} 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg p-2.5 pl-10 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300" 
                placeholder="Password" 
              />
              <button 
                type="button" 
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <FaLock />
              </div>
              <motion.input 
                whileFocus="focus"
                variants={inputVariants}
                type={showConfirmPassword ? "text" : "password"} 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg p-2.5 pl-10 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300" 
                placeholder="Confirm Password" 
              />
              <button 
                type="button" 
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <motion.select 
              whileFocus="focus"
              variants={inputVariants}
              name="role" 
              value={formData.role} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </motion.select>

            {/* File Upload with Preview */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
              <div className="flex items-center space-x-4">
                {previewUrl && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500"
                  >
                    <img src={previewUrl || "/placeholder.svg"} alt="Avatar preview" className="w-full h-full object-cover" />
                  </motion.div>
                )}
                <label className="flex-1">
                  <div className="relative flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaUpload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                  {fileName && (
                    <p className="mt-1 text-sm text-gray-500 truncate">{fileName}</p>
                  )}
                </label>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={isLoading}
              className={`w-full ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 rounded-lg mt-6 font-medium transition-all duration-300 flex items-center justify-center`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : "Create Account"}
            </motion.button>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-gray-600 mt-4"
            >
              Already a user? <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200">Login</Link>
            </motion.p>
          </form>
        </div>
        
        {/* Illustration Section */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 hidden md:flex items-center justify-center p-8 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative z-10 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Welcome to TechPulse</h2>
            <p className="mb-8">Create an account and discover amazing tech products</p>
            <img 
              src="/signup-illustration.png" 
              alt="Signup Illustration" 
              className="w-full max-w-md mx-auto drop-shadow-2xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=300&width=300";
              }}
            />
          </motion.div>
          
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <motion.div 
              className="absolute w-40 h-40 bg-white opacity-10 rounded-full"
              animate={{
                x: [0, 100, 50, 0],
                y: [0, 50, 100, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{ top: '10%', left: '20%' }}
            />
            <motion.div 
              className="absolute w-20 h-20 bg-white opacity-10 rounded-full"
              animate={{
                x: [0, -50, -100, 0],
                y: [0, 100, 50, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{ top: '60%', right: '20%' }}
            />
            <motion.div 
              className="absolute w-32 h-32 bg-white opacity-10 rounded-full"
              animate={{
                x: [0, 80, 0, -80, 0],
                y: [0, -80, 0, 80, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{ bottom: '10%', left: '30%' }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
