import { useState, useEffect } from "react";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebase.js"; // firebase config file

import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import "./Login.css";
import logo from "../assets/white Logo.png";

export default function Login() {
  const auth = getAuth(app);
  const storage = getStorage(app);

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [userName, setUserName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Touched states for validation
  const [loginTouched, setLoginTouched] = useState({ email: false, password: false });
  const [signupTouched, setSignupTouched] = useState({ userName: false, email: false, password: false });

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Check URL parameters on component mount
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signup') {
      setIsSignUpMode(true);
      searchParams.delete('mode');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const toggleMode = () => setIsSignUpMode(!isSignUpMode);

  const imageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImage(null);
      setSelectedFile(null);
      setImagePreview(null);
    }
  };

  // SIGNUP HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !signupEmail || !signupPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (signupPassword.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword
      );

      const user = userCredential.user;
      let imageUrl = "";

      // 2️⃣ Upload profile image to Firebase Storage (if exists)
      if (profileImage) {
        try {
          // Create a unique filename with timestamp
          const timestamp = Date.now();
          const imageName = `${user.uid}_${timestamp}_${profileImage.name}`;
          const imageRef = ref(storage, `profileImages/${imageName}`);
          
          // Upload the image
          await uploadBytes(imageRef, profileImage);
          
          // Get download URL
          imageUrl = await getDownloadURL(imageRef);
          
          console.log("Image uploaded successfully:", imageUrl);
        } catch (uploadError) {
          console.error("Error uploading image:", uploadError);
          toast.warn("Profile created but image upload failed");
        }
      }

      // 3️⃣ Update user profile with display name and photo URL
      await updateProfile(user, {
        displayName: userName,
        photoURL: imageUrl || null
      });

      // 4️⃣ Save additional user data in Firestore (optional - agar aap Firestore use karte hain)
      // Note: Agar aap Firestore use karna chahte hain, toh alag se Firestore setup karna hoga

      console.log("User created successfully:", user.uid, userName);

      // Optional: Store user data in localStorage
      localStorage.setItem("firebaseUser", JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: userName,
        photoURL: imageUrl
      }));

      toast.success("Signup successful!");
      navigate("/");

    } catch (error) {
      console.error("Signup error:", error);
      
      // User-friendly error messages
      if (error.code === 'auth/email-already-in-use') {
        toast.error("Email already exists. Please use a different email.");
      } else if (error.code === 'auth/invalid-email') {
        toast.error("Invalid email address.");
      } else if (error.code === 'auth/weak-password') {
        toast.error("Password is too weak. Use at least 6 characters.");
      } else {
        toast.error(error.message || "Error creating account");
      }
    } finally {
      setLoading(false);
    }
  };

  // LOGIN HANDLER
  const handleloginSubmit = async (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      const user = userCredential.user;

      // Store user data in localStorage
      localStorage.setItem("firebaseUser", JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }));

      toast.success("Login successful!");
      navigate("/");

    } catch (error) {
      console.error("Login error:", error);
      
      // User-friendly error messages
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        toast.error("Invalid email or password.");
      } else if (error.code === 'auth/invalid-email') {
        toast.error("Invalid email address.");
      } else if (error.code === 'auth/user-disabled') {
        toast.error("This account has been disabled.");
      } else if (error.code === 'auth/too-many-requests') {
        toast.error("Too many failed attempts. Please try again later.");
      } else {
        toast.error(error.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`mycontainer ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <ToastContainer position="top-right" autoClose={3000} />
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-[#181894] border-dashed rounded-full animate-spin-slow"></div>
            <span className="mt-4 text-lg font-semibold text-[#181894]">Loading...</span>
          </div>
        </div>
      )}

      <div className="forms-container">
        <div className="signin-signup">
          {/* LOGIN FORM */}
          <form onSubmit={handleloginSubmit} className="sign-in-form">
            <h2 className="title">Sign In</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                onBlur={() => setLoginTouched((prev) => ({ ...prev, email: true }))}
                type="email"
                placeholder="Email"
                className={loginTouched.email && !loginEmail ? "input-error" : ""}
                disabled={loading}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                onBlur={() => setLoginTouched((prev) => ({ ...prev, password: true }))}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={loginTouched.password && !loginPassword ? "input-error" : ""}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button type="submit" className="btn solid" disabled={loading}>
              {loading ? "Logging in..." : "LogIn"}
            </button>
          </form>

          {/* SIGNUP FORM */}
          <form onSubmit={handleSubmit} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                disabled={loading}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={() => setSignupTouched((prev) => ({ ...prev, userName: true }))}
                type="text"
                placeholder="Username"
                className={signupTouched.userName && !userName ? "input-error" : ""}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                disabled={loading}
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                onBlur={() => setSignupTouched((prev) => ({ ...prev, email: true }))}
                type="email"
                placeholder="Email"
                className={signupTouched.email && !signupEmail ? "input-error" : ""}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                disabled={loading}
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                onBlur={() => setSignupTouched((prev) => ({ ...prev, password: true }))}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Password (min. 6 characters)"
                className={signupTouched.password && !signupPassword ? "input-error" : ""}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle"
                disabled={loading}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="input-field file-input-field">
              <i className="fas fa-plus file-plus-icon"></i>
              <input
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*"
                className="custom-file-input"
                onChange={imageChange}
                disabled={loading}
              />
              <span className="file-placeholder">
                {selectedFile ? selectedFile.name : "Choose a profile image (optional)"}
              </span>
            </div>
            {imagePreview && (
              <div className="mt-4 flex justify-center">
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#181894]"
                />
              </div>
            )}
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Creating Account..." : "SignUp"}
            </button>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <img src={logo} className="image" alt="" />
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Create your account today and start customizing premium water bottles for your restaurant!
            </p>
            <button className="btn transparent" onClick={toggleMode} disabled={loading}>
              Sign up
            </button>
          </div>
        </div>
        <div className="panel right-panel">
          <img src={logo} className="image" alt="" />
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Welcome back! Log in to manage your orders and customize your branding.
            </p>
            <button className="btn transparent" onClick={toggleMode} disabled={loading}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}