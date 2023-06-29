import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PlayVideo from "./PlayVideo";
import SelectVideo from "./SelectVideo"

export default function VideoPlayback() {

    const [selected, setSelected] = useState({
        name: '',
        id: ''
    })

    useEffect(() => {console.log(selected);}, [selected])

    return (
        <Container>
            <Row>
                <Col xs={9}>
                    <PlayVideo selected={selected}/>
                </Col>
                <Col xs={3}>
                    <SelectVideo setSelected={setSelected}/>
                </Col>
            </Row>
        </Container>
    )
}
