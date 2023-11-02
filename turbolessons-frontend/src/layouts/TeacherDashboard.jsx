import { Container, Col, Row } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StudentTable from "../components/TeacherComponents/Students/StudentTable";
import Calendar from "../components/TeacherComponents/Lessons/Calendar";
import NavLogo from "../util/NavLogo";


export default function DashboardLayout({ children }) {

    return (
        <Container fluid>
            <Row>
                <Col xs={2} style={{ backgroundColor: '#177E89' }}>
                    <NavLogo />
                    <Sidebar />
                </Col>
                <Col xs={10}>
                    <Header  style={{ height: '10vh'} }/>
                    <div style={{ height: '90vh'} }>
                        {children}
                    </div>
                </Col>
            </Row>
        </Container >
    )
};