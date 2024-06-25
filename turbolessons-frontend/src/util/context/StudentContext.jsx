import React, { useState, useEffect, createContext, useContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { getStudentsByTeacher } from '../../service/adminService';
import { setAccessToken } from '../../service/axiosConfig';

const StudentContext = createContext({
    students: [],
    setStudents: () => { },
    studentFetchFailed: false,
    setStudentFetchFailed: () => { },
});

export function useStudentContext() {
    return useContext(StudentContext);
}

export const StudentProvider = ({ children }) => {
    const { authState, oktaAuth } = useOktaAuth();
    const [students, setStudents] = useState([]);
    const [studentFetchFailed, setStudentFetchFailed] = useState(false);


    useEffect(() => {
        const fetchStudents = async () => {
            try {
                if (authState && authState.isAuthenticated) {
                    const accessToken = await oktaAuth.getAccessToken();
                    const principle = authState.idToken.claims.name;
                    setAccessToken(accessToken);
                    const data = await getStudentsByTeacher(principle);
                    setStudents(data);
                    setStudentFetchFailed(false);
                }
            } catch (error) {
                setStudentFetchFailed(true);
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, [authState, oktaAuth]);


    return (
        <StudentContext.Provider value={{
            students,
            setStudents,
            studentFetchFailed,
            setStudentFetchFailed
        }}>
            {children}
        </StudentContext.Provider>
    );
}