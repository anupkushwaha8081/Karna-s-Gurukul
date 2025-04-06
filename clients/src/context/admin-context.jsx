import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { 
  fetchAllCoursesService,
  fetchCourseStatsService,
  fetchAllUsersService,
  approveCourseService,
  suspendUserService
} from '../services/services';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [allCourses, setAllCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [userFilter, setUserFilter] = useState('all');
  const [isBulkActionLoading, setIsBulkActionLoading] = useState(false);
  const [loading, setLoading] = useState({
    courses: false,
    users: false,
    stats: false
  });

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, stats: true }));
      const { data } = await fetchCourseStatsService();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(prev => ({ ...prev, stats: false }));
    }
  }, []);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, courses: true }));
      const { data } = await fetchAllCoursesService();
      setAllCourses(data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(prev => ({ ...prev, courses: false }));
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, users: true }));
      const { data } = await fetchAllUsersService();
      // console.log("data", data);
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(prev => ({ ...prev, users: false }));
    }
  }, []);

  const approveCourse = async (courseId) => {
    try {
      setIsBulkActionLoading(true);
      await approveCourseService(courseId);
      await fetchCourses();
    } catch (error) {
      console.error('Approval failed:', error);
      throw error;
    } finally {
      setIsBulkActionLoading(false);
    }
  };

  const suspendUser = async (userId) => {
    try {
      setIsBulkActionLoading(true);
      await suspendUserService(userId);
      await fetchUsers();
    } catch (error) {
      console.error('Suspension failed:', error);
      throw error;
    } finally {
      setIsBulkActionLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    fetchCourses();
    fetchUsers();
  }, [fetchAllData, fetchCourses, fetchUsers]);

  return (
    <AdminContext.Provider
      value={{
        allCourses,
        users,
        stats,
        userFilter,
        loading,
        isBulkActionLoading,
        setUserFilter,
        approveCourse,
        suspendUser,
        refreshData: {
          courses: fetchCourses,
          users: fetchUsers,
          stats: fetchAllData
        }
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};
