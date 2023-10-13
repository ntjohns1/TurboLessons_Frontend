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
        <Container fluid>
            <Row>
                <Col xs={2}>
                    <Sidebar />
                </Col>
                <Col xs={10}>
                    <Row xs={10}>
                        <Col xs={3}>
                            <StudentTable />
                        </Col>
                        <Col xs={9}>
                            <Calendar />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container >
    )
};