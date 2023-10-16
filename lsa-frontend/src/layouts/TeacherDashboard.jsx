import { Container, Col, Row } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import HomeNav from "../components/Nav";
import StudentTable from "../components/TeacherComponents/Students/StudentTable";
import Calendar from "../components/TeacherComponents/Lessons/Calendar";
import NavLogo from "../util/NavLogo";


export default function DashboardLayout({ children }) {

    return (
        <Container fluid>
            <Row>
                <Col xs={2}  style={{ backgroundColor: '#177E89' }}>
                    <NavLogo />
                    <Sidebar />
                </Col>
                <Col xs={10} style={{ backgroundColor: '#E8E8E8' }}>
                        <HomeNav />
                        {children}
                </Col>
            </Row>
        </Container >
    )
};