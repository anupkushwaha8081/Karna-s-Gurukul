// import InstructorCourses from "@/components/instructor-view/courses/courses";
// import InstructorDashboard from "@/components/instructor-view/dashboard/dashboard";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent } from "@/components/ui/tabs";
// import { AuthContext } from "@/context/auth-context";
// import { InstructorContext } from "@/context/instructor-context";
// import { fetchInstructorCourseListService } from "@/services/services";
// import { BarChart, Book, LogOut } from "lucide-react";
// import { useContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// function InstructorDashboardpage() {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const { auth, resetCredentials } = useContext(AuthContext);
//   const { instructorCoursesList, setInstructorCoursesList } =
//     useContext(InstructorContext);

//     async function fetchAllCourses() {
//       if (auth.user && auth.user._id) {
//         const response = await fetchInstructorCourseListService(auth.user._id);
//         if (response?.success) setInstructorCoursesList(response?.data);
//       }
//     }
  
//     useEffect(() => {
//       fetchAllCourses();
//     }, [auth.user]); // Add auth.user as dependency
  

//   const menuItems = [
//     {
//       icon: BarChart,
//       label: "Dashboard",
//       value: "dashboard",
//       component: <InstructorDashboard listOfCourses={instructorCoursesList} />,
//     },
//     {
//       icon: Book,
//       label: "Courses",
//       value: "Courses",
//       component: <InstructorCourses listOfCourses={instructorCoursesList} />,
//     },
//     {
//       icon: LogOut,
//       label: "Logout",
//       value: "logout",
//       component: null,
//     },
//   ];

//   function handleLogout() {
//     resetCredentials();
//     toast.success("Logout successfully!", { position: "bottom-right" });
//     sessionStorage.clear();

//   }

//   console.log(instructorCoursesList, "instructorCoursesList");

//   return (
//     <div className="flex h-full min-h-screen bg-gray-100">
//       <aside className="w-64 bg-white shadow-md hidden md:block">
//         <div className="p-4">
//           <h2 className="text-2xl font-bold mb-4">Instructor View</h2>
//           <nav>
//             {menuItems.map((menuItem) => (
//               <Button
//                 className="w-full justify-start mb-2"
//                 key={menuItem.value}
//                 variant={activeTab === menuItem.value ? "secondary" : "ghost"}
//                 onClick={
//                   menuItem.value === "logout"
//                     ? handleLogout
//                     : () => setActiveTab(menuItem.value)
//                 }
//               >
//                 <menuItem.icon className="mr-2 h-4 w-4" />
//                 {menuItem.label}
//               </Button>
//             ))}
//           </nav>
//         </div>
//       </aside>
//       <main className="flex-1 p-8 overflow-y-auto">
//         <div className="max-w-7xl mx-auto">
//           {/* <h1 className="text-3xl font-bold mb-8">Dashboard</h1> */}
//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             {menuItems.map((menuItem) => (
//               <TabsContent value={menuItem.value}>
//                 <h1 className="text-3xl font-bold mb-8">{menuItem.value}</h1>

//                 {menuItem.component !== null ? menuItem.component : null}
//               </TabsContent>
//             ))}
//           </Tabs>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default InstructorDashboardpage;

import InstructorCourses from "@/components/instructor-view/courses/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { fetchInstructorCourseListService } from "@/services/services";
import { BarChart, Book, LogOut, Menu } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

function InstructorDashboardpage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { auth, resetCredentials } = useContext(AuthContext);
  const { instructorCoursesList, setInstructorCoursesList } =
    useContext(InstructorContext);

  async function fetchAllCourses() {
    if (auth.user && auth.user._id) {
      const response = await fetchInstructorCourseListService(auth.user._id);
      if (response?.success) setInstructorCoursesList(response?.data);
    }
  }

  useEffect(() => {
    fetchAllCourses();
  }, [auth.user]);

  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboard listOfCourses={instructorCoursesList} />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "Courses",
      component: <InstructorCourses listOfCourses={instructorCoursesList} />,
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];

  function handleLogout() {
    resetCredentials();
    toast.success("Logout successfully!", { position: "bottom-right" });
    sessionStorage.clear();
  }

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="ghost" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md fixed top-0 left-0 z-40 h-screen w-64 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:flex`}
      >
        <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 mt-10 md:mt-0">Instructor View</h2>



          <nav>
            {menuItems.map((menuItem) => (
              <Button
                className="w-full justify-start mb-2"
                key={menuItem.value}
                variant={activeTab === menuItem.value ? "secondary" : "ghost"}
                onClick={() => {
                  if (menuItem.value === "logout") {
                    handleLogout();
                  } else {
                    setActiveTab(menuItem.value);
                    setSidebarOpen(false); // close on small screen
                  }
                }}
              >
                <menuItem.icon className="mr-2 h-4 w-4" />
                {menuItem.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto mt-14 md:mt-0 ">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItem) => (
              <TabsContent
                key={menuItem.value}
                value={menuItem.value}
                className="focus:outline-none"
              >
                <h1 className="text-3xl font-bold mb-8 mt-4 md:mt-0 capitalize">
                  {menuItem.label}
                </h1>
                {menuItem.component !== null ? menuItem.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default InstructorDashboardpage;
