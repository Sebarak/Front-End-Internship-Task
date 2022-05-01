import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router';
import {NavLink} from 'react-router-dom';
import Incorrect from './incorrect.svg';

const EditIntern = () => {
    const {id} = useParams();
    const [user, setUser] = useState({});
    const [internshipS, setStart] = useState('');
    const [internshipE, setEnd] = useState('');
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [nameValidate, setNameValidate] = useState(false);
    const [emailValidate, setEmailValidate] = useState(false);
    const [internStartValidate, setInternSValidate] = useState(false);
    const [internEndValidate, setInternEValidate] = useState(false);

    useEffect(() => {
        //TODO: get intern from REST api http://localhost:3001/interns/:id

        fetch(`http://localhost:3001/interns/${id}`)
            .then(response => response.json())
            .then(data => setUser(data));

    }, [id]);

    const Submit = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, internshipStart: internshipS, internshipEnd: internshipE})
        };

        if (name !== '' && email !== '' && internshipE !== '' && internshipS !== '' && internshipS < internshipE) {
            fetch(`http://localhost:3001/interns/${id}`, requestOptions)
                .then(response => response.json())
                .then(data => data);
            setName('');
            setEmail('')
            setStart('');
            setEnd('');
            navigate('/');
        }
        if (name === "") setNameValidate(true);
        if (email === '') setEmailValidate(true);
        if (internshipS === '') setInternSValidate(true);
        if (internshipE === '') setInternEValidate(true);
        if ((internshipS !== '' && internshipE !== '') && internshipS >= internshipE) {
            setInternSValidate(true);
            setInternEValidate(true);
        }
    }

    return (
        <main>
            <div className='container return'>
                <NavLink to="/" className='return_button'>Back to list </NavLink>
            </div>
            <form className='container form' onSubmit={e => {
                Submit(e)
            }}>
                <section className='form_user_values'>
                    <label className='user_name'>Name *</label>
                    <input type="text" id='name' name="name" placeholder={user.name} value={name}
                           onChange={e => setName(e.currentTarget.value)}
                           onFocus={() => setNameValidate(false)}
                           className={nameValidate ? 'user_value incorrect' : 'user_value'}/>
                    {nameValidate && (
                        <>
                            <label htmlFor="name" className='validate_info'>This field is required</label>
                            <img src={Incorrect} alt="incorrect mark" className='internship_end'/>
                        </>
                    )}
                    <label className='user_name'>Email *</label>
                    <input type="email" id='email' name="email" placeholder={user.email} value={email}
                           onChange={e => setEmail(e.currentTarget.value)}
                           onFocus={() => setEmailValidate(false)}
                           className={emailValidate ? 'user_value incorrect' : 'user_value'}/>
                    {emailValidate && (
                        <>
                            <label htmlFor="email" className='validate_info'>This field is required</label>
                            <img src={Incorrect} alt="incorrect mark" className='internship_end'/>
                        </>
                    )}
                </section>
                <section className='form_internship_date'>
                    <div className='internship_date'>
                        <label>Internship start *</label>
                        <input type="text" id='internship_start' placeholder={user.internshipStart} value={internshipS}
                               onChange={e => setStart(e.currentTarget.value)} onFocus={e => {
                            setInternSValidate(false);
                            e.target.type = "date";
                        }}
                               onBlur={e => (e.target.type = "text")} min='01-01-2010' max="12-31-2030"
                               className={internStartValidate ? 'user_date start incorrect' : 'user_date start'}/>
                        {internStartValidate && (
                            <>
                                <label htmlFor="internship_start" className='validate_info'>This date is not
                                    correct</label>
                                <img src={Incorrect} alt="incorrect mark" className='internship_end'/>
                            </>
                        )}
                    </div>
                    <div className='internship_date'>
                        <label>Internship end *</label>
                        <input type="text" id='internship_end' placeholder={user.internshipEnd} value={internshipE}
                               onChange={e => setEnd(e.currentTarget.value)} onFocus={e => {
                            setInternEValidate(false);
                            e.target.type = "date";
                        }}
                               onBlur={e => (e.target.type = "text")} min='01-01-2010' max="12-31-2030"
                               className={internEndValidate ? 'user_date end incorrect' : 'user_date end'}/>
                        {internEndValidate && (
                            <>
                                <label htmlFor="internship_end" className='validate_info'>This date is not
                                    correct</label>
                                <img src={Incorrect} alt="incorrect mark" className='internship_end'/>
                            </>
                        )}
                    </div>
                </section>
                <input type="submit" value="Submit"/>
            </form>
        </main>
    );
};

export default EditIntern;