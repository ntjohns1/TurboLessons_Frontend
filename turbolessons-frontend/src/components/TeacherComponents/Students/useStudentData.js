import { useAuth } from "@ntjohns1/react-oidc";
import {
  useGetStudentsByTeacherQuery,
  useCreateStudentMutation,
  useEditStudentMutation,
  useDeleteStudentMutation,
} from "./studentsApi";

/**
 * Feature facade for the teacher's students roster.
 * Server state (list + mutations) comes from studentsApi (RTK Query).
 * Form/edit UI state stays in StudentSlice and is used directly by the forms.
 *
 * For a single student's full profile, call useGetStudentProfileQuery(id)
 * from studentsApi directly (it's keyed per id).
 */
export default function useStudentData() {
  const { claims } = useAuth();
  // Cohort groups are keyed by USERNAME (active_student_<preferred_username>),
  // not the display name — so query the roster by preferred_username.
  const teacher = claims.preferred_username || claims.name;

  const {
    data: students = [],
    isLoading,
    isError,
    error,
  } = useGetStudentsByTeacherQuery(teacher, { skip: !teacher });

  const [createStudent, createState] = useCreateStudentMutation();
  const [editStudent, editState] = useEditStudentMutation();
  const [deleteStudent, deleteState] = useDeleteStudentMutation();

  return {
    teacher,
    students,
    isLoading,
    isError,
    error,
    createStudent,
    editStudent,
    deleteStudent,
    createState,
    editState,
    deleteState,
  };
}
