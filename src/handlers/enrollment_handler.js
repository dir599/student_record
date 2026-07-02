import prisma from "../db/prisma.js";



const enrollmentStudentInCourse = async (req, res) => {
  try {
    let { student_id, course_id, enrollment_at } = req.body;

    if (!student_id || !course_id) {
      try{
        return res.status(400).json({
        message: `student id and course id is required`,
      });
      }catch(e){
        console.log(e)
        res.json({
          msg: "error"
        })
      }
    }
    if (student_id && (isNaN(student_id) || Number(student_id) <= 0)) {
      return res.status(400).json({
        message: `student id is not valid`,
      });
    }

    if (course_id && (isNaN(course_id) || Number(course_id) <= 0)) {
      return res.status(400).json({
        message: `course id is not valid`,
      });
    }
    if (enrollment_at && isNaN(Date.parse(enrollment_at))) {
      return res.status(400).json({
        message: `enrollment at must be valid date`,
      });
    }

    let enrollmentCreated = await prisma.enrollment.create({
      data: {
        studentId: student_id,
        courseId: course_id,
      },
      select: {
        id: true,
        createdAt:true,
        status:true,
        enrolledAt: enrollment_at ? false : true,
        student: true,
        course: true
      }
    }
);
res.status(201).json({
    message: `Student enrolled to course successfully`,
    data: enrollmentCreated

})
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      message: `server error`,
    });
  }
};

export {
 
  enrollmentStudentInCourse,
};
