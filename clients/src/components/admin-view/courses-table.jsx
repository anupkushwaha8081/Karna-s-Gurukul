// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// export default function AdminCoursesTable({ courses, loading }) {
//   if (loading) return <div>Loading courses...</div>;
//   if (!courses?.length) return <div>No courses found</div>;

//   return (
//     <div className="bg-white rounded-lg shadow overflow-hidden">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Title</TableHead>
//             <TableHead>Instructor</TableHead>
//             <TableHead>Students</TableHead>
//             <TableHead>Created At</TableHead>

//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {courses.map((course) => (
//             <TableRow key={course._id}>
//               <TableCell>{course.title}</TableCell>
//               <TableCell>{course.instructor?.name || 'N/A'}</TableCell>
//               <TableCell>{course.students?.length || 0}</TableCell>
//               <TableCell>
//                 {new Date(course.createdAt).toLocaleDateString()}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminContext } from "@/context/admin-context";
import { toast } from "react-toastify";
export default function AdminCoursesTable({ courses, loading }) {
  const { approveCourse, isBulkActionLoading } = useAdminContext();

  if (loading) return <div>Loading courses...</div>;
  if (!courses?.length) return <div>No courses found</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Instructor</TableHead>
            {/* <TableHead>Students</TableHead> */}
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.instructorName || "N/A"}</TableCell>
              {/* <TableCell>{course.students?.length || 0}</TableCell> */}
              <TableCell>
                {new Date(course.createdAt).toLocaleDateString()}
              </TableCell>
              {/* <TableCell>
                {course.status === "approved" ? (
                  <span className="text-green-600 font-semibold">Approved</span>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
                    onClick={() => approveCourse(course._id)}
                    disabled={isBulkActionLoading}
                  >
                    Approve
                  </button>
                )}
              </TableCell> */}
              <TableCell>
                <button
                  className={`px-3 py-1 rounded text-white ${
                    course.status === "approved"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-500 hover:bg-blue-600"
                  } disabled:opacity-50`}
                  onClick={async () => {
                    try {
                      await approveCourse(course._id);
                      const action =
                        course.status === "approved"
                          ? "unapproved"
                          : "approved";
                      toast.success(`Course ${action} successfully!`);
                    } catch (error) {
                      toast.error("Failed to update course status");
                    }
                  }}
                  disabled={isBulkActionLoading}
                >
                  {course.status === "approved" ? "Unapprove" : "Approve"}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
