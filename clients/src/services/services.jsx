import axiosInstance from "@/api/api";

export async function registerService(formData) {
  const { data } = await axiosInstance.post("/auth/register", {
    ...formData,
    role: "user",
  });
  console.log("data from register service", data);

  return data;
}

export async function loginService(formData) {
  const { data } = await axiosInstance.post("/auth/login", formData);

  return data;
}

export async function checkAuthService() {
  const { data } = await axiosInstance.get("/auth/check-auth");

  return data;
}

export async function mediaUploadService(formData, onProgressCallback) {
  // const { data } = await axiosInstance.post("/media/upload", formData, {
    const { data } = await axiosInstance.post("/instructor/media/upload", formData, {

    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });

  return data;
}

export async function mediaDeleteService(id) {
  const { data } = await axiosInstance.delete(`/instructor/media/delete/${id}`);

  return data;
}

// export async function fetchInstructorCourseListService() {
//   const { data } = await axiosInstance.get(`/instructor/courses`);// CHANGE HERE

//   return data;
// }
export async function fetchInstructorCourseListService(instructorId) {
  const { data } = await axiosInstance.get(`/instructor/courses/${instructorId}`);
  return data;
}

export async function addNewCourseService(formData) {
  const { data } = await axiosInstance.post(`/instructor/courses/add`, formData);

  return data;
}

export async function fetchInstructorCourseDetailsService(id) {
  const { data } = await axiosInstance.get(
    // `/instructor/course/get/details/${id}`
    `/instructor/courses/details/${id}`

  );

  return data;
}

export async function updateCourseByIdService(id, formData) {
  const { data } = await axiosInstance.put(
    // `/instructor/course/update/${id}`,
    `/instructor/courses/update/${id}`,

    formData
  );

  return data;
}

export async function mediaBulkUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/instructor/media/bulk-upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });

  return data;
}

export async function fetchStudentViewCourseListService(query) {
  const { data } = await axiosInstance.get(`/student/courses/get?${query}`);

  return data;
}

export async function fetchStudentViewCourseDetailsService(courseId) {
  const { data } = await axiosInstance.get(
    `/student/courses/details/${courseId}`
  );

  return data;
}

export async function checkCoursePurchaseInfoService(courseId, studentId) {
  const { data } = await axiosInstance.get(
    `/student/courses/purchase-info/${courseId}/${studentId}`
  );

  return data;
}

export async function createPaymentService(formData) {
  const { data } = await axiosInstance.post(`/student/order/create`, formData);

  return data;
}

export async function captureAndFinalizePaymentService(
  paymentId,
  payerId,
  orderId
) {
  const { data } = await axiosInstance.post(`/student/order/capture`, {
    paymentId,
    payerId,
    orderId,
  });

  return data;
}

export async function fetchStudentBoughtCoursesService(studentId) {
  const { data } = await axiosInstance.get(
    `/student/bought-courses/get/${studentId}`
  );

  return data;
}

export async function getCurrentCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.get(
    `/student/course-progress/get/${userId}/${courseId}`
  );

  return data;
}

export async function markLectureAsViewedService(userId, courseId, lectureId) {
  const { data } = await axiosInstance.post(
    `/student/course-progress/mark-lecture-viewed`,
    {
      userId,
      courseId,
      lectureId,
    }
  );

  return data;
}

export async function resetCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.post(
    `/student/course-progress/reset-progress`,
    {
      userId,
      courseId,
    }
  );

  return data;
}


export async function fetchAllCoursesService() {
  const { data } = await axiosInstance.get("/admin/courses");
  return data;
}
 

// Get course statistics (for admin)
export async function fetchCourseStatsService() {
  try {
    const { data } = await axiosInstance.get("/admin/stats");
    return data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
}

// Get all users (for admin)
export async function fetchAllUsersService() {
  try {
    const { data } = await axiosInstance.get("/admin/users");
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}


export const approveCourseService = async (courseId) => {
  // console.log("courseId", courseId);
  const { data } = await axiosInstance.post(`/admin/courses/${courseId}/approve`);
  // console.log("data from approve course service", data);
  return data;
};

export const suspendUserService = async (userId) => {
  const { data } = await axiosInstance.put(`/admin/users/${userId}/suspend`);
  return data;
};