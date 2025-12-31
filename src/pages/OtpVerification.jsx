import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";

const OtpVerification = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('emailForOtp');
  const [loading, setLoading] = useState(false);

  // Hold individual OTP digits
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpTouched, setOtpTouched] = useState(false);
  const [animatePanel, setAnimatePanel] = useState(false);

  // Refs for inputs
  const inputsRef = useRef([]);

  useEffect(() => {
    setTimeout(() => setAnimatePanel(true), 100); // Delay for smooth animation
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!value) return;

    const newOtp = [...otpDigits];
    
    // If user pastes multiple characters, distribute them
    if (value.length > 1) {
      const chars = value.split('').slice(0, 6 - index);
      chars.forEach((char, i) => {
        if (index + i < 6) {
          newOtp[index + i] = char;
        }
      });
      setOtpDigits(newOtp);
      
      // Focus on the last input
      const lastIndex = Math.min(index + chars.length - 1, 5);
      if (inputsRef.current[lastIndex]) {
        inputsRef.current[lastIndex].focus();
      }
      
      // Auto-submit if all digits are entered
      if (newOtp.every(digit => digit !== '')) {
        verifyOtp(newOtp.join(''));
      }
    } else {
      // Single character input
      newOtp[index] = value;
      setOtpDigits(newOtp);

      // Move to next input if exists
      if (index < 5 && value) {
        inputsRef.current[index + 1]?.focus();
      }

      // Auto-submit if last digit entered
      if (index === 5 && value) {
        verifyOtp(newOtp.join(''));
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otpDigits[index]) {
        // Clear this box
        const newOtp = [...otpDigits];
        newOtp[index] = '';
        setOtpDigits(newOtp);
      } else if (index > 0) {
        // Move to previous box
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft") {
      // Move to previous input on left arrow
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowRight") {
      // Move to next input on right arrow
      if (index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    if (pastedData.length >= 6) {
      const newOtp = pastedData.split('').slice(0, 6);
      setOtpDigits(newOtp);
      
      // Focus on the last input
      if (inputsRef.current[5]) {
        inputsRef.current[5].focus();
      }
      
      // Auto-submit if all digits are entered
      if (newOtp.every(digit => digit !== '')) {
        verifyOtp(newOtp.join(''));
      }
    } else {
      toast.error("Please paste a 6-character code");
    }
  };

  const verifyOtp = async (otpValue) => {
    if (!email) {
      toast.error("Email not found. Please login again.");
      navigate('/');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}api/auth/verify-otp`, {
        email,
        otp: otpValue
      });

      if (response.status === 201) {
        localStorage.removeItem('emailForOtp');
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate('/');
      } else {
        toast.error("Verification failed. Please try again.");
      }

    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error(error.response?.data?.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOtpTouched(true);
    const otpValue = otpDigits.join('');
    if (otpValue.length === 6) {
      verifyOtp(otpValue);
    } else {
      toast.error("Please enter a 6-character OTP");
    }
  };

  return (
    <div className="mycontainer w-[100vw]">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="forms-container">
        <div className="signin-signup w-full flex justify-center items-center">
          <form onSubmit={handleSubmit} className="sign-in-form">
            <h2 className="title">OTP Verification</h2>
            <p className="text-center text-gray-600 text-sm mb-4">
              We've sent a 6-character code to your email.
            </p>
            <div className="flex justify-center gap-2 mb-4">
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="6"
                  value={digit}
                  disabled={loading}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={(e) => handlePaste(e, index)}
                  className={
                    `input-custom text-center text-2xl w-12 h-12` +
                    ((otpTouched && !digit) ? " input-error" : "")
                  }
                />
              ))}
            </div>
            <button
              type="submit"
              className={`btn ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        </div>
      </div>

      {/* Optional Panel */}
      <div className={`panels-container ${animatePanel ? "slide-in" : ""}`}>
        <div className={`panel left-panel ${animatePanel ? 'animate' : ''}`}>
          <div className="content">
            <h3>Verification in progress</h3>
            <p>Enter the code sent to your email to complete your sign up.</p>
            <br />
            <button
              className="btn transparent"
              onClick={() => navigate('/auth?mode=signup')}
            >
              Signup
            </button>
          </div>
          <img src={logo} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;