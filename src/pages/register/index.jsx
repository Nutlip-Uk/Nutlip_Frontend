import styles from "../../styles/Register.module.css";
import otp from "../../styles/OTP.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {HashLoader} from "react-spinners"
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
              type === "verify" | type === "forgetPassword"
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
  const [showodal, setShowModal] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [formData, setFormData] = useState({
    full_Name: "",
    email: "",
    description: "",
    password: "",
  });

  // Condiiton to disable and enable button
  const validate = () => {
    return (
      formData.full_Name.length &&
      formData.email.length &&
      formData.description &&
      formData.password.length
    );
  };

  // Password validation function
  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{10,}$/;
    return passwordRegex.test(formData.password);
  };

  useEffect(() => {
    setIsPasswordValid(validatePassword());
  }, [formData.password]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // handling submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to your backend server
      const response = await toast.promise(
        fetch(
          "https://nutlip-registration-backend-demo.onrender.com/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        ),
        {
          pending: "Creating user, please wait",
          success: "Account successfully created! Redirecting to login",
          error: "An error has occured try again",
        }
      );

      if (response.ok) {
        // Handle successful form submission
        console.log("Form submitted successfully!");
        // Reset the form fields
        props.userCreated();
        setFormData({
          full_Name: "",
          email: "",
          description: "",
          password: "",
        });
        setShowSubmit(true);
      } else {
        // Handle error response from the server
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("An error occurred during form submission:", error);
    }
  };
  let verify = "verify";
  const router = useRouter();
  const data = router.query;

  return (
    <form className={styles.signup} onSubmit={handleSubmit}>
      <label>
        Full name
        <input
          type="text"
          name="full_Name"
          placeholder="Fullname"
          required
          value={formData.full_Name}
          onChange={handleChange}
        />
      </label>
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
      <label>
        What best describes you
        <select
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          // className=" rounded-[8px] block text-[#505050] p-[16px] w-full text-[18px]"
        >
          <option
            value=""
            className="disabled"
            disabled
            defaultValue={"What best describes you"}
          >
            What best describes you
          </option>
          <option value="Property seeker">Property seeker</option>
          <option value="Real estate agent">Real estate agent</option>
          <option value="Mortgage broker">Mortgage broker</option>
          <option value="Conveyancer">Conveyancer</option>
        </select>
      </label>

      <label className={styles.passwordLabel}>
        Password
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "texts" : "password"}
            name="password"
            placeholder="Password"
            required
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

      <p style={{ color: isPasswordValid ? "black" : "red" }}>
        {isPasswordValid
          ? "Create a strong password with a minimum combination of 10 characters, including Uppercase letters & numbers"
          : "Password must be a minimum combination of 10 characters, including Uppercase letters & numbers"}
      </p>

      <button
        onClick={() => router.push(`/register?option=${verify}`)}
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

      <div className={styles.GoogleContainer}>
        <button className={styles.Google} style={{ backgroundColor: "white" }}>
          <img src="/google.svg" alt="" />
          <p>Continue with Google</p>
        </button>
        <button className={styles.Facebook}>
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/color/48/facebook.png"
            alt="facebook"
          />
          <p>Continue with Facebook</p>
        </button>
      </div>
    </form>
  );
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [home, setHome] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const router = useRouter();
  let forgetPassword = "forgetPassword";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Condiiton to disable and enable button
  const validate = () => {
    return formData.email.length && formData.password.length;
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{10,}$/;
    return passwordRegex.test(formData.password);
  };

  useEffect(() => {
    setIsPasswordValid(validatePassword());
  }, [formData.password]);

  // Redirect home
  useEffect(() => {
    if (home) {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to your backend server
      const response = await toast.promise(
        fetch("https://nutlip-registration-backend-demo.onrender.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }),
        {
          pending: "Logining user in...",
          success:
            "User logged in successfully, moving you back to the Homepage",
          error: "An error has occured try again",
        }
      );

      if (response.ok) {
        // Handle successful form submission
        console.log("Form submitted successfully!");
        // Reset the form fields
        //   props.userCreated()
        setFormData({
          email: "",
          password: "",
        });
        setHome(true);
      } else {
        // Handle error response from the server
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("An error occurred during form submission:", error);
    }
  };

  return (
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

        <button onClick={() => router.push(`/register?option=${forgetPassword}`)} className={styles.forgetPassword}>Forget password ?</button>
      </div>

      <p style={{ color: isPasswordValid ? "black" : "red" }}>
        {isPasswordValid
          ? "Password must be a minimum combination of 10 characters, including Uppercase letters & numbers"
          : "invalid password"}
      </p>

      <button
        className={styles.LoginButton}
        type="submit"
        disabled={!validate()}
      >
        Login
      </button>
      <div className={styles.OR}>
        <hr />
        OR
        <hr />
      </div>

      <div className={styles.GoogleContainer}>
        <button className={styles.Google} style={{ backgroundColor: "white" }}>
          <img src="/google.svg" alt="" />
          <p>Continue with Google</p>
        </button>
        <button className={styles.Facebook}>
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/color/48/facebook.png"
            alt="facebook"
          />
          <p>Continue with Facebook</p>
        </button>
      </div>
    </form>
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
          <HashLoader
  color="#DA0025"
  size={100}
/>
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
        <p className={otp.congrats}>Congratulations!! You have successfully created an account</p>
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
              <p>
                Enter your email address to reset your password
              </p>

              <form action="" className={otp.ForgetForm}>
                <label>
                  Email address
                  <input type="text" placeholder="Enter email address" />
                </label>
                <button >Reset Password</button>
              </form>
            </div>
          </div>
        </section>
      
    </>
  );
};


export default Registration;
