import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { selectCurrentVideo } from './VideoSlice';
import PlayVideo from "./PlayVideo";
import SelectVideo from "./SelectVideo";

export default function VideoPlayback() {
    const selected = useSelector(selectCurrentVideo) || { name: '', id: '' };

    return (
        <Container fluid>
            <Row>
                <Col md={9} className="mb-3">
                    {selected.name ? (
                        <PlayVideo selected={selected} />
                    ) : (
                        <div className="text-center p-5 bg-light rounded">
                            <h4>No Video Selected</h4>
                            <p>Please select a video from the list to play</p>
                        </div>
                    )}
                </Col>
                <Col md={3}>
                    <SelectVideo setSelected={() => {}} /> {/* setSelected prop will be removed in future */}
                </Col>
            </Row>
        </Container>
    );
}
