import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-toastify";
import { useAdminContext } from "@/context/admin-context";

export default function AdminUsersTable({ users, loading }) {
  const { suspendUser, isBulkActionLoading } = useAdminContext();

  if (loading) return <div>Loading users...</div>;
  if (!users?.length) return <div>No users found</div>;
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Availability</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.userName}</TableCell>
              <TableCell>{user.userEmail}</TableCell>
              <TableCell className="capitalize">{user.role}</TableCell>
              
              {/* <TableCell className="py-4">
                <button
                  className={`text-white px-2 py-1 rounded disabled:opacity-50 ${
                    user.isActive
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                  onClick={async () => {
                    try {
                      await suspendUser(user._id);
                      const action = user.isActive ? "suspended" : "activated";
                      toast.success(`User ${action} successfully!`);
                    } catch (error) {
                      toast.error("Failed to update user status");
                    }
                  }}
                  disabled={isBulkActionLoading}
                >
                  {isBulkActionLoading
                    ? "Processing..."
                    : user.isActive
                    ? "Suspend"
                    : "Activate"}
                </button>
              </TableCell> */}
             {(user.role === "user" || user.role === "instructor") && (
  <TableCell className="py-4">
    <button
      className={`text-white px-2 py-1 rounded disabled:opacity-50 ${
        user.isActive
          ? "bg-red-500 hover:bg-red-600"
          : "bg-green-500 hover:bg-green-600"
      }`}
      onClick={async () => {
        try {
          await suspendUser(user._id);
          const action = user.isActive ? "suspended" : "activated";
          toast.success(`User ${action} successfully!`);
        } catch (error) {
          toast.error("Failed to update user status");
        }
      }}
      disabled={isBulkActionLoading}
    >
      {isBulkActionLoading
        ? "Processing..."
        : user.isActive
        ? "Suspend"
        : "Activate"}
    </button>
  </TableCell>
)}


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
