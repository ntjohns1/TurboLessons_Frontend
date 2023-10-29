import { Col, Row } from "react-bootstrap";
import StudentTable from "../../components/TeacherComponents/Students/StudentTable";
import Calendar from "../../components/TeacherComponents/Lessons/Calendar";
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