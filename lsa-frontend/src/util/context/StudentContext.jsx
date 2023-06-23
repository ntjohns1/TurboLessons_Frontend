import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import config from '../../config';
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
    const accessToken = oktaAuth.getAccessToken();
    const [students, setStudents] = useState([]);
    const [studentFetchFailed, setStudentFetchFailed] = useState(false);


    useEffect(() => {
        if (authState && authState.isAuthenticated) {
            fetch(config.resourceServer.userAdminUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        setStudentFetchFailed(true);
                        return Promise.reject();
                    }
                    return response.json();
                })
                .then((data) => {
                    const res = data.map((s) => {
                        return {
                            id: s.id,
                            displayName: s.profile.displayName,
                            email: s.profile.email
                        };
                    });
                    setStudents(res);
                    setStudentFetchFailed(false);
                    console.log('fetched students:', res);
                })
                .catch((err) => {
                    setStudentFetchFailed(true);
                    console.error(err);
                });
        }
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