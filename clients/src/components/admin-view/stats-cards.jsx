export default function AdminStatsCards({ stats, loading }) {
    if (loading) return <div>Loading stats...</div>;
    if (!stats) return <div>No stats available</div>;
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Total Courses</h3>
          <p className="text-3xl font-bold">{stats.totalCourses}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Total Students</h3>
          <p className="text-3xl font-bold">{stats.totalStudents}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Total Instructors</h3>
          <p className="text-3xl font-bold">{stats.totalInstructors}</p>
        </div>
        
        {/* Popular Courses Section */}
        <div className="md:col-span-3 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Most Popular Courses</h3>
          <div className="space-y-4">
            {stats.popularCourses?.map((course) => (
              <div key={course._id} className="flex justify-between items-center">
                <span>{course.title}</span>
                <span className="font-bold">{course.studentsCount} students</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }