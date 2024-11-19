import { Box, Image, Input, Text, Icon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; // Import Chakra UI icons
import "../styles/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Redux/user/userAction";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message } = useSelector((store) => store.user);

  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  const togglePassword = () => {
    setShow(!show);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      email: email,
      password: password,
    };
    dispatch(loginUser(obj, navigate));
  };

  return (
    <Box backgroundColor="#dbdbdb" height="100vh">
      <Box className="login-bg">
        <Image
          src={"/images/login-bg.jpg"}
          alt={"login-bg-img"}
          height={{
            sm: "280px",
            md: "auto",
            base: "280px",
            lg: "auto",
            xl: "auto",
          }}
        />
      </Box>
      <Box
        color={"white"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        position={"absolute"}
        zIndex={"100"}
        top={{ sm: "2%", base: "2%", md: "2%", lg: "4%", xl: "4%" }}
        left={{ sm: "20%", base: "20%", md: "40%", lg: "42%", xl: "42%" }}
      >
        <Image src="/images/Logo.svg" alt={"icon-img"} width={"120px"} />
        <Text mt={"5px"} fontSize={"16px"} >
          Online Project Management
        </Text>
      </Box>

      <Box
    backgroundColor={"white"}
    display={"flex"}
    flexDirection={"column"}
    justifyContent={"center"}
    alignItems={"center"} // Center content horizontally
    textAlign={"center"} // Center text inside the box
    width={{ sm: "80%", base: "80%", md: "80%", lg: "35%", xl: "28%" }}
    padding={"20px"}
    m={"auto"}
    position={{ lg: "absolute", xl: "absolute" }} // Maintain absolute positioning
    zIndex={{ lg: "100", xl: "100" }}
    top={{ lg: "25%", xl: "25%" }} // Adjusted to move the box down
    left={{ lg: "50%", xl: "50%" }} // Center horizontally
    transform={{ lg: "translate(-50%, 20%)", xl: "translate(-50%, 20%)" }} // Adjust Y translation to position lower
    boxShadow={{
        lg: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
        xl: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
    }}
    borderRadius={"10px"}
>
        <br />
        <Text  fontSize={{ base: "18px", sm: "20px" }} mt={"20px"} fontWeight={"500"} color="#3F3F3F" textAlign="center">
          Login to get started
        </Text>
        <br />
        <form className="form" onSubmit={handleLoginSubmit}>
          <label>Email</label>
          <Input
            variant="unstyled"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            backgroundColor={"white"}
            pl={"5px"}
          />
          {emailTouched && email === "" && (
            <Text className="error-label" fontSize={"15px"}>
              Email is required
            </Text>
          )}
          <br />
          <label>Password</label>
          <div className="password-div">
            <Input
              variant="unstyled"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
              backgroundColor={"white"}
              pl={"5px"}
            />
            {/* <span onClick={togglePassword} style={{ cursor: "pointer" }}>
              {show ? (
                <Icon as={ViewIcon} boxSize={6} />
              ) : (
                <Icon as={ViewOffIcon} boxSize={6} />
              )}
            </span> */}
          </div>
          {passwordTouched && password === "" && (
            <Text className="error-label" fontSize={"15px"}>
              Password is required
            </Text>
          )}
          <br />
          <Input
            type="submit"
            value={"Login"}
            cursor={"pointer"}
            width={{ lg: "150px", xl: "150px" }}
            p={"5px 20px"}
            m={"auto"}
            borderRadius={"20px"}
            backgroundColor={"#254fd9"}
            color={"white"}
          />
          <br />
          <Text className="error-label" fontSize={"15px"}>
          Invalid Credentials
          </Text>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
