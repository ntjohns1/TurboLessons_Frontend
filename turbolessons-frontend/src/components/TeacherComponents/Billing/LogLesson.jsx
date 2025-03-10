import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const LogLesson = () => {
    const dispatch = useDispatch();


    const onSubmit = () => {
        console.log('Lesson Logged');
        dispatch({ type: 'billing/createMeterEvent', payload: { teacher: 'teacher', student: 'student', event: 'event' } });
    }

    return (
        <Button>
            Log Lesson
        </Button>
    );
}

export default LogLesson;