import styles from "../../styles/Register.module.css";
import otp from "../../styles/OTP.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { GridLoader, HashLoader } from "react-spinners";
import { LoginContext } from '../../context/Login.context';
import { RegistrationContext } from "../../context/Register.context";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { auth, facebookProvider, provider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";
import { Message, useToaster, ButtonToolbar, SelectPicker, Button } from 'rsuite';
import { useImageContext } from "../../context/ImageContext.context";
import Toast from "../../components/Toast";
import { Success } from "../../components/Modals/Offer.modal";

const Registration = () => {
  const router = useRouter();
  const data = router.query;
  const [type, setType] = useState(data.option);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [iserror, setError] = useState()
  const { setUserInformation } = useContext(LoginContext);
  const [loginStatus, setLoginStatus] = useState(null); // To manage toast display state
  const [toastContent, setToastContent] = useState('');
  const [toastType, setToastType] = useState('info');


  let sign = "signup";
  let login = "login";
  let verify = "verify";
  let forgetPassword = "forgetPassword";

  const handleChange = () => {
    setTimeout(() => {
      setType("login");
    });
  };

  useEffect(() => {
    setType(data.option);
  });

  const handleGoogleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const { uid, displayName, email, photoURL } = result.user;

      console.log("Google Auth Info:", { uid, displayName, email, photoURL });

      // Attempt to register first
      const registerResponse = await fetch("https://nutlip-server.uc.r.appspot.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: displayName,
          email: email,
          password: uid
        }),
      });

      if (registerResponse.ok) {
        const registerData = await registerResponse.json();
        console.log("Register Response:", registerData);
        localStorage.setItem("token", registerData.token);
        localStorage.setItem("userInformation", JSON.stringify(registerData));
        setUserInformation(registerData);
        toast.success("Registration successful. You are now logged in.");
        router.push("/");

      } else {
        // If registration fails (likely because account exists), attempt to login
        const loginResponse = await fetch("https://nutlip-server.uc.r.appspot.com/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: uid,
          }),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          localStorage.setItem("token", loginData.token);
          localStorage.setItem("userInformation", JSON.stringify(loginData));
          setUserInformation(loginData);
          router.push("/");
          toast.success("Login successful.");
        } else {
          console.log(loginData);
          setError(loginData || "Failed to authenticate with Google.");
        }
      }
    } catch (error) {
      console.error("Error during Google authentication:", error);
      setError("An error occurred during Google authentication.");
      toast.error("An error occurred during Google authentication.");
    } finally {
      setLoading(false);
    }
  };
  const handleFacebookAuth = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading indicator

    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const { uid, displayName, email, photoURL } = result.user;

      console.log("Facebook Auth Info:", { uid, displayName, email, photoURL });

      // Check if the user is already registered by attempting to log in
      const loginResponse = await fetch("https://nutlip-server.uc.r.appspot.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: uid, // Using Firebase UID as the password or a unique identifier
        }),
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("userInformation", JSON.stringify(loginData));
        setUserInformation(loginData);
        toast.success("Login successful.");
      } else {
        // If the login fails, try to register the user
        const registerResponse = await fetch("https://nutlip-server.uc.r.appspot.com/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: displayName,
            email: email,
            password: uid,
          }),
        });

        if (registerResponse.ok) {
          const registerData = await registerResponse.json();
          localStorage.setItem("token", registerData.token);
          localStorage.setItem("userInformation", JSON.stringify(registerData));
          setUserInformation(registerData);
          toast.success("Registration successful. You are now logged in.");
        } else {
          throw new Error("Registration failed");
          toast.error("Registration failed.");
        }
      }

      router.push("/"); // Redirect to a protected route after sign-in or registration
    } catch (error) {
      console.error("Error during Facebook authentication:", error);
      setError("An error occurred during Facebook authentication.");
      toast.error("An error occurred during Facebook authentication.");
    } finally {
      setLoading(false); // Reset loading state after request is completed
    }
  };


  return (
    <main className={styles.main}>
      {loginStatus && <Toast type={toastType} content={toastContent} duration />}
      <div className={styles.mainImage}>
        <img
          src={`${type === "signup" ? "/images/form.png" : "/images/form2.png"
            }`}
          alt="form-background"
        />
      </div>
      <div className={styles.container}>
        <div className={styles.FormContainer}>
          <div
            style={
              (type === "verify") | (type === "forgetPassword")
                ? { display: "none" }
                : null
            }
            className={styles.selection}
          >
            <p
              className={`${type === "signup" ? styles.selected : null}`}
              onClick={() => router.push(`/register?option=${sign}`)}
            >
              Create account
            </p>
            <p
              className={`${type === "login" ? styles.selected : null}`}
              onClick={() => router.push(`/register?option=${login}`)}
            >
              Login
            </p>
          </div>
          {type === "signup" && <Signup userCreated={handleChange} handleGoogleAuth={handleGoogleAuth} handleFacebookAuth={handleFacebookAuth} loginStatus={loginStatus} setLoginStatus={setLoginStatus} toastContent={toastContent} setToastContent={setToastContent} toastType={toastType} setToastType={setToastType} />}
          {type === "login" && <Login handleGoogleAuth={handleGoogleAuth} setLoading={setLoading} loading={loading} iserror={iserror} setError={setError} handleFacebookAuth={handleFacebookAuth} loginStatus={loginStatus} setLoginStatus={setLoginStatus} toastContent={toastContent} setToastContent={setToastContent} toastType={toastType} setToastType={setToastType} />}
          {type === "verify" && <Verify />}
          {type === "forgetPassword" && <ForgetPassword />}
        </div >
      </div >
    </main >
  );
};

const Signup = ({ handleGoogleAuth, handleFacebookAuth, loginStatus, setLoginStatus, toastContent, setToastContent, toastType, setToastType }, props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [home, setHome] = useState(false);
  const [isError, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();


  const {
    regType,
    formData,
    isPasswordValid,
    setFormData,
    setIsUserFirstTime,
  } = useContext(RegistrationContext);

  useEffect(() => { }, [formData.password]);

  useEffect(() => {
    if (home) {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // handling submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(false);
    setError(null);
    try {
      const response = await fetch("https://nutlip-server.uc.r.appspot.com/api/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(formData)

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
        setToastContent(errorData || "Failed to register check your email or password ");
        setToastType('error');
        setError(errorData || "Failed to register check your email or password ");
        return;
      }

      //* If registration is successful, you might redirect the user to the login page
      if (response.status === 201) {
        setToastContent('Registeration Successful!');
        setToastType('success');
        router.push("/register?option=login");
      }

    } catch (error) {
      console.log(error)
      setToastContent(error || "Something went wrong !");
      setToastType('error');

    }

    setLoginStatus(true);
  };

  let verify = "verify";

  const data = router.query;

  return (
    <>
      <form className={styles.signup} onSubmit={handleSubmit}>
        <label>
          Full name
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Fullname"
            value={formData.name}
            onChange={handleChange}
          />
          <p>{isError?.errors?.username}</p>
        </label>
        <label>
          Email address
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />
          <p>{isError?.errors?.email}</p>
        </label>



        <label className={styles.passwordLabel}>
          Password
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "texts" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={styles.passwordInput}
              style={{ outline: "none", border: "none" }}
            />
            {showPassword ? <FaRegEyeSlash
              className={styles.HidePassword}
              alt="eye-slash_icon"
              onClick={() => setShowPassword(!showPassword)}
            /> : <IoEyeOutline className={styles.HidePassword} onClick={() => setShowPassword(!showPassword)} />}
          </div>

          <p>{isError?.errors?.password}</p>
        </label>

        <p style={{ color: isError ? "red" : "black" }}>
          {isError
            ? isError.message : "Create a strong password with a minimum combination of 10 characters, including Uppercase letters & numbers"}
        </p>

        <button
          /* onClick={() => router.push(`/register?option=${verify}`)} */
          className={styles.CreateAccount}
          type="submit"
        >
          Create account
        </button>

        <div className={styles.OR}>
          <hr />
          OR
          <hr />
        </div>
      </form >

      <div className={styles.GoogleContainer}>
        <form className={styles.alternateLog}>
          <button
            className={styles.Google}
            style={{ backgroundColor: "white" }}
            onClick={handleGoogleAuth}
          >
            <img src="/google.svg" alt="" />
            <p>Continue with Google</p>
          </button>
        </form>
        <form className={styles.alternateLog} >
          <button
            className={styles.Facebook}
            onClick={handleFacebookAuth}
          >
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/color/48/facebook.png"
              alt="facebook"
            />
            <p>Continue with Facebook</p>
          </button>
        </form>
      </div>
    </>
  );
};

export const Login = ({ handleGoogleAuth, setLoading, loading, setError, iserror, handleFacebookAuth, loginStatus, setLoginStatus, toastContent, setToastContent, toastType, setToastType }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [home, setHome] = useState(false);
  const router = useRouter();
  const [isPasswordValid, setIsPasswordValid] = useState(true);


  let forgetPassword = "forgetPassword";
  const { handleLogin, setUserInformation } = useContext(LoginContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (home) {
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await handleLogin(formData);
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("userInformation", JSON.stringify(data));
        setUserInformation(data);
        setToastContent("Login successful");
        setToastType("success");
        toast.success("Logging In")
        setTimeout(() => {
          router.push("/");
        }, 5000);
      } else {
        console.log(data)
        setError(data.message || "Failed to register check your email or password ");
        setToastContent("Login failed");
        setToastType("error");
        toast.error("Login Failed")
      }
    } catch (error) {
      setToastContent("Error during Login");
      setToastType("error");
      toast.error("Login Failed")
    } finally {
      setLoading(false); // Reset loading state after request is completed
    }
    setLoginStatus(true);
  };
  return (
    <>

      {loading ? (

        <div className={styles.loader}>
          <GridLoader
            color="#3670d6"
            size={50}
          />
        </div>

      ) : (<>

        <form className={styles.login} onSubmit={handleSubmit}>
          <label>
            Email address
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.LoginpasswordLabel}>
            Password
            <div className={styles.LoginpasswordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className={styles.passwordInput}
                style={{ outline: "none", border: "none" }}
              />
              {showPassword ? <FaRegEyeSlash
                className={styles.HidePassword}
                alt="eye-slash_icon"
                onClick={() => setShowPassword(!showPassword)}
              /> : <IoEyeOutline className={styles.HidePassword} onClick={() => setShowPassword(!showPassword)} />}
            </div>
          </label>
          <div className={styles.RememberContainer}>
            <div className={styles.Remember}>
              <input type="checkbox" name="" id="" />
              <p>Remember me</p>
            </div>

            <button
              onClick={() => router.push(`/register?option=${forgetPassword}`)}
              className={styles.forgetPassword}
            >
              Forget password ?
            </button>
          </div>

          <p style={{ color: iserror ? "red" : "black" }}>
            {iserror?.message}
          </p>

          <button className={styles.LoginButton} type="submit">
            Login
          </button>
          <div className={styles.OR}>
            <hr />
            OR
            <hr />
          </div>
        </form>
        <div className={styles.GoogleContainer}>
          <form className={styles.alternateLog} onSubmit={handleGoogleAuth}>
            <button
              className={styles.Google}
              style={{ backgroundColor: "white" }}
            >
              <img src="/google.svg" alt="" />
              <p>Continue with Google</p>
            </button>
          </form>

          <form className={styles.alternateLog} >
            <button className={styles.Facebook} onClick={handleFacebookAuth}>
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/color/48/facebook.png"
                alt="facebook"
              />
              <p>Continue with Facebook</p>
            </button>
          </form>
        </div>
      </>

      )}
    </>
  );
};
const Verify = () => {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    setLoading(true);

    setTimeout(() => {
      setShowSuccess(true);

      setTimeout(() => {
        router.push("/");
      }, 5000);
    }, 5000);
  };

  return (
    <>
      {/* Render Success, Loading, or Verify content based on the state */}
      {showSuccess ? (
        <Success />
      ) : loading ? (
        <div className={otp.LoadingState}>
          <HashLoader color="#DA0025" size={100} />
        </div>
      ) : (
        <section className={otp.VerifySection}>
          <div className={otp.VerifyContainer}>
            <div className={otp.VerifyHeader}>
              <h1 onClick={() => router.back()}>{"< Verify email address"}</h1>
            </div>
            <div className={otp.VerifyContent}>
              <p>
                To verify your email address, an OTP has been sent to the
                registered account <span>{"users email"}</span>{" "}
              </p>
              <form action="" className={otp.VerifyForm}>
                <input type="text" placeholder="Enter OTP" />
                <button onClick={handleContinue}>Continue</button>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

// const Success = () => {
//   return (
//     <>
//       <div className={otp.successContainer}>
//         <img src="/success.svg" alt="success" />
//         <p className={otp.success}>Successful</p>
//         <p className={otp.congrats}>
//           Congratulations!! You have successfully created an account
//         </p>
//       </div>
//     </>
//   );
// };

const ForgetPassword = () => {
  const router = useRouter();

  return (
    <>
      <section className={otp.VerifySection}>
        <div className={otp.VerifyContainer}>
          <div className={otp.VerifyHeader}>
            <h1 onClick={() => router.back()}>{"< Forget Password"}</h1>
          </div>
          <div className={otp.VerifyContent}>
            <p>Enter your email address to reset your password</p>

            <form action="" className={otp.ForgetForm}>
              <label>
                Email address
                <input type="text" placeholder="Enter email address" />
              </label>
              <button>Reset Password</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Registration;