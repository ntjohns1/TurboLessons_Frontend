import { Container, Col, Row } from "react-bootstrap";
import Sidebar from "../components/StudentComponents/Sidebar";
import Header from "../components/StudentComponents/Header";
import NavLogo from "../util/NavLogo";

export default function StudentLayout({ children }) {

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