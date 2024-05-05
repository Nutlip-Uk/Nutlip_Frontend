
import styles from "../../styles/Register.module.css";
import otp from "../../styles/OTP.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { GridLoader, HashLoader } from "react-spinners";
import { RegistrationContext } from "../../context/Register.context";
import {  signIn } from "next-auth/react";
import axios from "axios";
import { parseCookies } from 'nookies';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';



export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const token = cookies['token'];

  if (!token) {
    return {
      props: {}, // will be passed to the page component as props
    };
  }

  const userInformation = jwtDecode(token);
  return {
    props: { userInformation }, // will be passed to the page component as props
  };
}
const Registration = () => {
  const router = useRouter();
  const data = router.query;
  const [type, setType] = useState(data.option);
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

  return (
    <main className={styles.main}>
      <div className={styles.mainImage}>
        <img
          src={`${
            type === "signup" ? "/images/form.png" : "/images/form2.png"
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
          {type === "signup" && <Signup userCreated={handleChange} />}
          {type === "login" && <Login />}
          {type === "verify" && <Verify />}
          {type === "forgetPassword" && <ForgetPassword />}
        </div>
      </div>
    </main>
  );
};

const Signup = (props) => {
  const {
    regType,
    formData,
    isPasswordValid,
    setFormData,
    setIsUserFirstTime,
  } = useContext(RegistrationContext);

  
  const [showPassword, setShowPassword] = useState(false);
  const [home, setHome] = useState(false);
  const [isError, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!userInformation);
  const [userInfo, setUserInfo] = useState(userInformation || {});
  const router = useRouter();



  useEffect(() => {}, [formData.password]);

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
    try {
      const response = await fetch("api/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to register');
      }
  
      // If registration is successful, you might redirect the user to the login page
      router.push("/register?option=login");
  
    } catch (error) {
      setError(error.errors);
      console.log(error.errors);
    }
  };

  const handleGoogleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      // Initiate sign in request
      await signIn("google");

      // Redirect on success
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const FacebookSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    //todo Call API to login with facebook
    //    try {
    //     const response = await fetch("http://localhost:3000/api/auth/callback/google", {
    //       method: "POST",
    //       body: JSON.stringify(formData),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     const data = await response.json();
    //     router.push("/register?option=signup");
    //     console.log(data);
    //   } catch (error) {
    //     console.error("An error occurred during form submission:", error);
    //   }
    // };

    setLoading(false);
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
        </label>
        {/* changed the label nd value of the different options */}
        {/* <label>
          What best describes you
          <select
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}

            // className=" rounded-[8px] block text-[#505050] p-[16px] w-full text-[18px]"
          >
            <option
              value=""
              id="description"
              className="disabled"
              disabled
              defaultValue={"What best describes you"}
            >
              What best describes you
            </option>
            <option value="property_seeker">property seeker</option>
            <option value="Real_estate_agent">Real estate agent</option>
            <option value="Mortgage_broker">Mortgage broker</option>
            <option value="Conveyancer">Conveyancer</option>
          </select>
        </label> */}

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
            />
            <Image
              className={styles.HidePassword}
              src="/images/eye-slash.svg"
              width={0}
              height={0}
              alt="eye-slash_icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </label>

        <p style={{ color: isError ? "red" : "black" }}>
          {isError
            ? isError.password
            : "Create a strong password with a minimum combination of 10 characters, including Uppercase letters & numbers"}
        </p>

        <button
          /* onClick={() => router.push(`/register?option=${verify}`)} */
          onClick={() => toast.success("Creating account")}
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
      </form>

      <div className={styles.GoogleContainer}>
        <form className={styles.alternateLog}>
          <button
            className={styles.Google}
            style={{ backgroundColor: "white" }}
            onClick={handleGoogleSubmit}
          >
            <img src="/google.svg" alt="" />
            <p>Continue with Google</p>
          </button>
        </form>
        <form className={styles.alternateLog} onSubmit={FacebookSubmit}>
          <button
            className={styles.Facebook}
            onClick={() => signIn("facebook")}
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

const Login = () => {
  
  const { setUserInformation, userInformation } =
    useContext(RegistrationContext);


  const [showPassword, setShowPassword] = useState(false);
  const [home, setHome] = useState(false);
  const router = useRouter();
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!userInformation);
  const [userInfo, setUserInfo] = useState(userInformation || {});

  let forgetPassword = "forgetPassword";


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  // Redirect home
  useEffect(() => {
    if (home) {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  });

  const yourDecodingFunction = (token) => {
    const decodedToken = jwtDecode(token);
    return {
      userId: decodedToken.id,
      username: decodedToken.name,
      email: decodedToken.email,
    };
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      // If token exists, set the user information and mark the user as authenticated
      setUserInformation(yourDecodingFunction(token)); // Implement yourDecodingFunction to decode the token and extract user information
      setIsAuthenticated(true); // Assuming you have a state variable to track authentication status
    }
  }, []);

  useEffect(() => {
    console.log(userInformation);
  }, [userInformation]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
  
      const data = await response.json();
      console.log(data);
      setUserInformation(data);
      console.log(userInformation);
  
      const token = data.token;
      console.log(token);
  
      // Store the token in a cookie named 'token'
      Cookies.set('token', token, { expires: 7 }); // Cookie expires in 7 days
  
      setIsAuthenticated(true); // Mark the user as authenticated after successful login
      router.push("/");
  
    } catch (error) {
      console.error("An error occurred during form submission:", error);
    } finally {
      setLoading(false); // Reset loading state after request is completed
    }
  };

  const GoogleSubmit = async (event) => {
    event.preventDefault();
    // setLoading(true);
    // Call API to login with Google
    setLoading(false);
  };
  const FacebookSubmit = async (event) => {
    event.preventDefault();
    // setLoading(true);
    // Call API to login with Google
    setLoading(false);
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
              />
              <Image
                className={styles.LoginHidePassword}
                src="/images/eye-slash.svg"
                width={0}
                height={0}
                alt="eye-slash_icon"
                onClick={() => setShowPassword(!showPassword)}
              />
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

          <p style={{ color: isPasswordValid ? "black" : "red" }}>
            {isPasswordValid
              ? "Password must be a minimum combination of 10 characters, including Uppercase letters & numbers"
              : "invalid password"}
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
          <form className={styles.alternateLog} onSubmit={GoogleSubmit}>
            <button
              className={styles.Google}
              style={{ backgroundColor: "white" }}
            >
              <img src="/google.svg" alt="" />
              <p>Continue with Google</p>
            </button>
          </form>

          <form className={styles.alternateLog} onSubmit={FacebookSubmit}>
            <button className={styles.Facebook}>
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

const Success = () => {
  return (
    <>
      <div className={otp.successContainer}>
        <img src="/success.svg" alt="success" />
        <p className={otp.success}>Successful</p>
        <p className={otp.congrats}>
          Congratulations!! You have successfully created an account
        </p>
      </div>
    </>
  );
};

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
