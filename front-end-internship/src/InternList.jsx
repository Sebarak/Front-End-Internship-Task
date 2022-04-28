import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import  Vector  from './vector.svg';

const InternList = () => {

    const [interns, setInterns] = useState([]);

    useEffect(() => {
        const fetchInterns = async () => {
            const response = await fetch('http://localhost:3001/interns');
            const interns = await response.json();
            setInterns(interns);
        }
        fetchInterns();
    }, []);

    return (
            <main className='container participants'>
                <h1 className='list_header'>Participants</h1>
                <ul className='list'>
                    {interns.map(u => (
                        <li key={u.id} className='list_element'>{u.name} <NavLink to={{pathname:`/interns/${u.id}`,state:{user:`u`}}} className='list_element_edit'><img
                            src={Vector} alt="Vector"/>Edit</NavLink></li>))}
                </ul>
            </main>
    );
};

export default InternList;