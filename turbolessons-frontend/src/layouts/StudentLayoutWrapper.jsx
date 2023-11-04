import StudentLayout from "./StudentLayout";

export default function StudentLayoutWrapper({ component: Component }) {
    return (
      <StudentLayout>
        <Component />
      </StudentLayout>
    );
  }
  