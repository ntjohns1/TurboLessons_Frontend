import DashboardLayout from "./TeacherDashboard";

export default function DashboardLayoutWrapper({ component: Component }) {
    return (
      <DashboardLayout>
        <Component />
      </DashboardLayout>
    );
  }
  