import React from 'react';
import { Container } from 'react-bootstrap';
import LessonForm from '../../components/TeacherComponents/Lessons/LessonForm.jsx'
import LessonList from '../../components/TeacherComponents/Lessons/LessonList.jsx';

export default function Lessons() {
    return (
        <Container>
            {/* <LessonForm/> */}
            <LessonList/>
        </Container>
    )
};