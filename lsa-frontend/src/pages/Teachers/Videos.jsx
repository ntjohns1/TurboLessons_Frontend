import React from 'react';
import { Container } from 'react-bootstrap';
import PortalNav from '../../components/PortalNav';
import Uploadvideo from '../../components/TeacherComponents/Videos/UploadVideo';
import VideoPlayback from '../../components/TeacherComponents/Videos/VideoPlayback';

export default function Videos() {
    return (
        <Container className='fluid'>
            <PortalNav />
            <VideoPlayback />
            <Uploadvideo />
        </Container>
    )
};