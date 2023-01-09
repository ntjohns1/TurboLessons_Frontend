import React from "react";
import { Container, Card } from "react-bootstrap";
import Messages from "../components/Messages/Messages";
import SelectStudent from "../components/Messages/SelectStudent";
import PortalNav from "../components/PortalNav";


export default function Messenger() {

    return (
        <Container>
            <PortalNav />
            <Card>
                <h3>Student Messenger</h3>
                <SelectStudent />
                {/* <Messages /> */}
            </Card>
            <Card>
            </Card>
        </Container>

    )
}