import React from 'react';
import { Container } from 'react-bootstrap';
import PortalNav from '../components/PortalNav';
import Uploadvideo from '../components/Videos/UploadVideo';
import VideoPlayback from '../components/Videos/VideoPlayback';

export default function Videos() {
    return (
        <Container className='fluid'>
            <PortalNav />
            <VideoPlayback />
            <Uploadvideo />
        </Container>
    )
};