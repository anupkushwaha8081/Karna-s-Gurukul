import CommonForm from "@/components/common-form/common";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config/config";
import { AuthContext } from "@/context/auth-context";
import { GraduationCap } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
  } = useContext(AuthContext);

  function handleTabChange(value) {
    setActiveTab(value);
  }

  function checkIfSignInFormIsValid() {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== ""
    );
  }

  function checkIfSignUpFormIsValid() {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.password !== ""
    );
  }

  // console.log(signInFormData);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to={"/"} className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-extrabold text-xl">LMS LEARN</span>
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signInFormControls}
                  buttonText={"Sign In"}
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  isButtonDisabled={!checkIfSignInFormIsValid()}
                  handleSubmit={handleLoginUser}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                  Enter your details to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signUpFormControls}
                  buttonText={"Sign Up"}
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  isButtonDisabled={!checkIfSignUpFormIsValid()}
                  handleSubmit={handleRegisterUser}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;

// import CommonForm from "@/components/common-form/common";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { signInFormControls, signUpFormControls } from "@/config/config";
// import { AuthContext } from "@/context/auth-context";
// import { GraduationCap } from "lucide-react";
// import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function AuthPage() {
//   const [activeTab, setActiveTab] = useState("signin");
//   const {
//     signInFormData,
//     setSignInFormData,
//     signUpFormData,
//     setSignUpFormData,
//     handleRegisterUser,
//     handleLoginUser,
//   } = useContext(AuthContext);

//   function handleTabChange(value) {
//     setActiveTab(value);
//   }

//   function checkIfSignInFormIsValid() {
//     return (
//       signInFormData?.userEmail !== "" && signInFormData?.password !== ""
//     );
//   }

//   function checkIfSignUpFormIsValid() {
//     return (
//       signUpFormData?.userName !== "" &&
//       signUpFormData?.userEmail !== "" &&
//       signUpFormData?.password !== ""
//     );
//   }

//   async function handleLogin() {
//     try {
//       await handleLoginUser();
//       toast.success("Login successful!", { theme: "colored", position: "bottom-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, transition: "slide" });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed!", { theme: "colored", position: "bottom-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, transition: "slide" });
//     }
//   }

//   async function handleSignup() {
//     try {
//       await handleRegisterUser();
//       toast.success("Signup successful!", { theme: "colored", position: "bottom-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, transition: "slide" });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Signup failed!", { theme: "colored", position: "bottom-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, transition: "slide" });
//     }
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable transition="slide" />
//       <header className="px-4 lg:px-6 h-14 flex items-center border-b">
//         <Link to={"/"} className="flex items-center justify-center">
//           <GraduationCap className="h-8 w-8 mr-4" />
//           <span className="font-extrabold text-xl">LMS LEARN</span>
//         </Link>
//       </header>
//       <div className="flex items-center justify-center min-h-screen bg-background">
//         <Tabs
//           value={activeTab}
//           onValueChange={handleTabChange}
//           className="w-full max-w-md"
//         >
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="signin">Sign In</TabsTrigger>
//             <TabsTrigger value="signup">Sign Up</TabsTrigger>
//           </TabsList>
//           <TabsContent value="signin">
//             <Card className="p-6 space-y-4">
//               <CardHeader>
//                 <CardTitle>Sign in to your account</CardTitle>
//                 <CardDescription>
//                   Enter your email and password to access your account
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 <CommonForm
//                   formControls={signInFormControls}
//                   buttonText="Sign In"
//                   formData={signInFormData}
//                   setFormData={setSignInFormData}
//                   isButtonDisabled={!checkIfSignInFormIsValid()}
//                   handleSubmit={handleLogin}
//                 />
//               </CardContent>
//             </Card>
//           </TabsContent>
//           <TabsContent value="signup">
//             <Card className="p-6 space-y-4">
//               <CardHeader>
//                 <CardTitle>Create a new account</CardTitle>
//                 <CardDescription>Enter your details to get started</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 <CommonForm
//                   formControls={signUpFormControls}
//                   buttonText="Sign Up"
//                   formData={signUpFormData}
//                   setFormData={setSignUpFormData}
//                   isButtonDisabled={!checkIfSignUpFormIsValid()}
//                   handleSubmit={handleSignup}
//                 />
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

// export default AuthPage;
