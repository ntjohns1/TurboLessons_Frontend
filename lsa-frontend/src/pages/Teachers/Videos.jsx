import React from 'react';
import { Container } from 'react-bootstrap';
import Uploadvideo from '../../components/TeacherComponents/Videos/UploadVideo';
import VideoPlayback from '../../components/TeacherComponents/Videos/VideoPlayback';

export default function Videos() {
    return (
        <Container className='fluid'>
            <VideoPlayback />
            <Uploadvideo />
        </Container>
    )
};