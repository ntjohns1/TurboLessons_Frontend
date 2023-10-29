import React from "react";
import { Col, Card, Row } from "react-bootstrap";
import SelectStudent from "../../components/TeacherComponents/Messages/SelectStudent";


export default function Messenger() {

    return (
        <Row xs={10} style={{ backgroundColor: '#F4F4F5' }}>
            <Col>
                <Card>
                    <h3>Student Messenger</h3>
                    <SelectStudent />
                </Card>
            </Col>
        </Row>
    )
}