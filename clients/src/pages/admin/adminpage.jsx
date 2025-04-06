// import { useEffect, useState } from "react";
// import { BarChart, Book, Users, LogOut } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent } from "@/components/ui/tabs";
// import { toast } from "react-toastify";
// import { useAuth } from "@/context/auth-context";

// import {
//   fetchAllCoursesService,
//   fetchCourseStatsService,
//   fetchAllUsersService,
//   approveCourseService,
//   suspendUserService,
// } from "@/services/services";

// import AdminCoursesTable from "@/components/admin-view/courses-table";
// import AdminStatsCards from "@/components/admin-view/stats-cards";
// import AdminUsersTable from "@/components/admin-view/users-table";

// export default function AdminDashboardPage() {
//   const { logout } = useAuth();

//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [allCourses, setAllCourses] = useState([]);
//   const [stats, setStats] = useState({});
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState({
//     courses: false,
//     stats: false,
//     users: false,
//   });
//   const [userFilter, setUserFilter] = useState("all");

//   const filteredUsers = users?.filter(
//     (user) => userFilter === "all" || user.role === userFilter
//   );

//   useEffect(() => {
//     loadAllData();
//   }, []);

//   const loadAllData = async () => {
//     try {
//       setLoading({ courses: true, stats: true, users: true });

//       const [courseRes, statsRes, usersRes] = await Promise.all([
//         fetchAllCoursesService(),
//         fetchCourseStatsService(),
//         fetchAllUsersService(),
//       ]);

//       setAllCourses(courseRes?.data || []);
//       setStats(statsRes?.data || {});
//       setUsers(usersRes?.data || []);
//     } catch (err) {
//       toast.error("Error loading admin data");
//     } finally {
//       setLoading({ courses: false, stats: false, users: false });
//     }
//   };

//   const handleApproveCourse = async (courseId) => {
//     try {
//       await approveCourseService(courseId);
//       toast.success("Course approved");
//       loadAllData();
//     } catch (err) {
//       toast.error("Failed to approve course");
//     }
//   };

//   const handleSuspendUser = async (userId) => {
//     try {
//       await suspendUserService(userId);
//       toast.success("User suspended");
//       loadAllData();
//     } catch (err) {
//       toast.error("Failed to suspend user");
//     }
//   };

//   const menuItems = [
//     {
//       icon: BarChart,
//       label: "Dashboard",
//       value: "dashboard",
//       component: <AdminStatsCards stats={stats} loading={loading.stats} />,
//     },
//     {
//       icon: Book,
//       label: "Courses",
//       value: "courses",
//       component: (
//         <AdminCoursesTable
//           courses={allCourses}
//           loading={loading.courses}
//           onApprove={handleApproveCourse}
//         />
//       ),
//     },
//     {
//       icon: Users,
//       label: "Users",
//       value: "users",
//       component: (
//         <AdminUsersTable
//           users={filteredUsers}
//           loading={loading.users}
//           filter={userFilter}
//           onFilterChange={setUserFilter}
//           onSuspend={handleSuspendUser}
//         />
//       ),
//     },
//     {
//       icon: LogOut,
//       label: "Logout",
//       value: "logout",
//       component: null,
//     },
//   ];

//   return (
//     <div className="flex h-full min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-md hidden md:block">
//         <div className="p-4">
//           <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
//           <nav>
//             {menuItems.map((menuItem) => (
//               <Button
//                 key={menuItem.value}
//                 className="w-full justify-start mb-2"
//                 variant={activeTab === menuItem.value ? "secondary" : "ghost"}
//                 onClick={() =>
//                   menuItem.value === "logout"
//                     ? logout()
//                     : setActiveTab(menuItem.value)
//                 }
//               >
//                 <menuItem.icon className="mr-2 h-4 w-4" />
//                 {menuItem.label}
//               </Button>
//             ))}
//           </nav>
//         </div>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-8 overflow-y-auto">
//         <div className="max-w-7xl mx-auto">
//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             {menuItems.map(
//               (menuItem) =>
//                 menuItem.component && (
//                   <TabsContent key={menuItem.value} value={menuItem.value}>
//                     <h1 className="text-3xl font-bold mb-8 capitalize">
//                       {menuItem.label}
//                     </h1>
//                     {menuItem.component}
//                   </TabsContent>
//                 )
//             )}
//           </Tabs>
//         </div>
//       </main>
//     </div>
//   );
// }



// import React from 'react';
// import { useAdminContext } from '../../context/admin-context';

// const AdminDashboardPage = () => {
//   const {
//     allCourses,
//     users,
//     stats,
//     userFilter,
//     setUserFilter,
//     loading,
//     isBulkActionLoading,
//     approveCourse,
//     suspendUser
//   } = useAdminContext();

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

//       {/* Stats */}
//       <div className="mb-6">
//         {loading.stats ? (
//           <p>Loading stats...</p>
//         ) : stats ? (
//           <div className="grid grid-cols-3 gap-4">
//             <div>Total Courses: {stats.totalCourses}</div>
//             <div>Total Students: {stats.totalStudents}</div>
//             <div>Total Instructors: {stats.totalInstructors}</div>
//           </div>
//         ) : (
//           <p>No stats available</p>
//         )}
//       </div>

//       {/* Course List */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Courses</h2>
//         {loading.courses ? (
//           <p>Loading courses...</p>
//         ) : (
//           <ul>
//             {allCourses.map(course => (
//               <li key={course._id} className="border p-2 my-2 flex justify-between items-center">
//                 <span>{course.title}</span>
//                 {!course.approved && (
//                   <button
//                     className="bg-green-500 text-white px-3 py-1 rounded"
//                     onClick={() => approveCourse(course._id)}
//                     disabled={isBulkActionLoading}
//                   >
//                     Approve
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* User List */}
//       <div>
//         <h2 className="text-xl font-semibold">Users</h2>
//         <select
//           value={userFilter}
//           onChange={(e) => setUserFilter(e.target.value)}
//           className="border px-2 py-1 mb-2"
//         >
//           <option value="all">All</option>
//           <option value="student">Students</option>
//           <option value="instructor">Instructors</option>
//         </select>

//         {loading.users ? (
//           <p>Loading users...</p>
//         ) : (
//           <ul>
//             {users
//               .filter(user => userFilter === 'all' || user.role === userFilter)
//               .map(user => (
//                 <li key={user._id} className="border p-2 my-2 flex justify-between items-center">
//                   <span>{user.name} - {user.role}</span>
//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                     onClick={() => suspendUser(user._id)}
//                     disabled={isBulkActionLoading}
//                   >
//                     Suspend
//                   </button>
//                 </li>
//               ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardPage;


import React, { useState } from 'react';
import { BarChart, Book, Users, LogOut } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useAdminContext } from '@/context/admin-context';
import AdminCoursesTable from '@/components/admin-view/courses-table';
import AdminUsersTable from '@/components/admin-view/users-table';
import AdminStatsCards from '@/components/admin-view/stats-cards';
const AdminDashboardPage = () => {
  const { logout } = useAuth();
  const {
    allCourses,
    users,
    stats,
    userFilter,
    setUserFilter,
    loading,
    isBulkActionLoading,
    approveCourse,
    suspendUser,
  } = useAdminContext();

  const [activeTab, setActiveTab] = useState('dashboard');

  const filteredUsers = users?.filter(
    (user) => userFilter === 'all' || user.role === userFilter
  );

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Admin</h2>
          <nav>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-4 py-2 mb-2 rounded ${
                activeTab === 'dashboard' ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
            >
              <BarChart className="inline-block w-4 h-4 mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full text-left px-4 py-2 mb-2 rounded ${
                activeTab === 'courses' ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
            >
              <Book className="inline-block w-4 h-4 mr-2" />
              Courses
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full text-left px-4 py-2 mb-2 rounded ${
                activeTab === 'users' ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
            >
              <Users className="inline-block w-4 h-4 mr-2" />
              Users
            </button>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 rounded"
            >
              <LogOut className="inline-block w-4 h-4 mr-2" />
              Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 capitalize">{activeTab}</h1>

        {activeTab === 'dashboard' && (
  <AdminStatsCards stats={stats} loading={loading.stats} />
)}

        {activeTab === 'courses' && (
          <div>
            {loading.courses ? (
              <p>Loading courses...</p>
            ) : (
              // <ul>
              //   {allCourses.map((course) => (
              //     <li
              //       key={course._id}
              //       className="bg-white shadow p-4 mb-3 rounded flex justify-between items-center"
              //     >
              //       <span>{course.title}</span>
              //       {!course.approved && (
              //         <button
              //           className="bg-green-600 text-white px-3 py-1 rounded"
              //           onClick={() => approveCourse(course._id)}
              //           disabled={isBulkActionLoading}
              //         >
              //           Approve
              //         </button>
              //       )}
              //     </li>
              //   ))}
              // </ul>
              <AdminCoursesTable
                courses={allCourses}
                loading={loading.courses}
                onApprove={approveCourse}
                isBulkActionLoading={isBulkActionLoading}/>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <div className="mb-2">
              <select
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                className="border px-3 py-1 rounded"
              >
                <option value="all">All</option>
                <option value="user">Student</option>
                <option value="admin">Admin</option>
                <option value="instructor">Instructors</option>
              </select>
            </div>
            {loading.users ? (
              <p>Loading users...</p>
            ) : (
              // <ul>
              //   {filteredUsers.map((user) => (
              //     <li
              //       key={user._id}
              //       className="bg-white shadow p-4 mb-3 rounded flex justify-between items-center"
              //     >
              //       <span>
              //         {user.userName} - <span className="italic">{user.role}</span>
              //       </span>
              //       <button
              //         className="bg-red-500 text-white px-3 py-1 rounded"
              //         onClick={() => suspendUser(user._id)}
              //         disabled={isBulkActionLoading}
              //       >
              //         Suspend
              //       </button>
              //     </li>
              //   ))}
              // </ul>
              <AdminUsersTable
  users={filteredUsers}
  loading={loading.users}
  filter={userFilter}
  onFilterChange={setUserFilter}
  onSuspend={suspendUser}
/>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboardPage;
