import { Container, Col, Row } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import HomeNav from "../../components/Nav";
import StudentTable from "../../components/TeacherComponents/Students/StudentTable";
import Calendar from "../../components/TeacherComponents/Lessons/Calendar";
import NavLogo from "../../util/NavLogo";
// import StudentOverview from "./StudentOverview/StudentOverview";
// import ScheduleContainer from "./ScheduleOverview/ScheduleContainer";


export default function TeacherDashboard() {

    return (
            <Row xs={10} style={{ backgroundColor: '#F4F4F5' }}>
                <Col xs={3}>
                    <StudentTable />
                </Col>
                <Col xs={9}>
                    <Calendar />
                </Col>
            </Row>
    )
};