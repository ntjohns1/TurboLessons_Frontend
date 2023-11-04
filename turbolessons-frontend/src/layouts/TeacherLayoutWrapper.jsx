import TeacherLayout from "./TeacherLayout";

export default function TeacherLayoutWrapper({ component: Component }) {
    return (
      <TeacherLayout>
        <Component />
      </TeacherLayout>
    );
  }
  