import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router';
import {NavLink} from 'react-router-dom';
import Incorrect from './incorrect.svg';
import Calendar from './calendar.svg';

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
    const [textTypeStart,setTypeStart] = useState(true);
    const [textTypeEnd,setTypeEnd] = useState(true);

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
                <h1 className='edit_header'>Edit</h1>
                <section className='form_user_values'>
                    <div className='form_user_holder'>
                    <label htmlFor='name' className='user_name title_section'>Full name *</label>
                    <input type="text" id='name' name="name" placeholder={user.name} value={name}
                           onChange={e => setName(e.currentTarget.value)}
                           onFocus={() => setNameValidate(false)}
                           className={nameValidate ? 'user_value incorrect' : 'user_value'}/>
                    {nameValidate && (
                        <div className='validate_info_holder'>
                            <label htmlFor="name" className='validate_info'>This field is required</label>
                            <img src={Incorrect} alt="incorrect mark" className='internship_mark'/>
                        </div>
                    )}
                    </div>
                    <div className='form_user_holder'>
                    <label htmlFor='email' className='user_name title_section'>Email address *</label>
                    <input type="email" id='email' name="email" placeholder={user.email} value={email}
                           onChange={e => setEmail(e.currentTarget.value)}
                           onFocus={() => setEmailValidate(false)}
                           className={emailValidate ? 'user_value incorrect' : 'user_value'}/>
                    {emailValidate && (
                        <div className='validate_info_holder'>
                            <label htmlFor="email" className='validate_info'>This field is required</label>
                            <img src={Incorrect} alt="incorrect mark" className='internship_mark'/>
                        </div>
                    )}
                    </div>
                </section>
                <section className='form_internship_date'>
                    <div className='internship_date first'>
                        <label htmlFor='internship_start' className='title_section'>Internship start *</label>
                        <input type="text" id='internship_start' placeholder={user.internshipStart} value={internshipS}
                               onChange={e => setStart(e.currentTarget.value)} onFocus={e => {
                            setInternSValidate(false);
                            e.target.type = "date";
                            setTypeStart(false);
                        }}
                               onBlur={e => {
                                   e.target.type = "text";
                                   setTypeStart(true);
                               }} min='01-01-2010' max="12-31-2030"
                               className={internStartValidate ? 'user_date start incorrect' : 'user_date start'}/>
                        {internStartValidate && (
                            <label htmlFor='internship_start' className='validate_info_holder'>
                                <h2 className='validate_info'>This date is not
                                    correct</h2>
                                <img src={Incorrect} alt="incorrect mark" className='internship_mark internship_mark_date'/>
                            </label>
                        )}
                        {textTypeStart && (
                            <label htmlFor='internship_start'>
                                <img src={Calendar} className='calendar first_calendar' alt="calendar"/>
                                <input type="date" className='datepicker_input' onChange={e => setStart(e.currentTarget.value)}/>
                            </label>
                        )}
                    </div>
                    <div className='internship_date second'>
                        <label htmlFor='internship_end' className='title_section'>Internship end *</label>
                        <input type="text" id='internship_end' placeholder={user.internshipEnd} value={internshipE}
                               onChange={e => setEnd(e.currentTarget.value)} onFocus={e => {
                            setInternEValidate(false);
                            e.target.type = "date";
                            setTypeEnd(false);
                        }}
                               onBlur={e => {
                                   e.target.type = "text"
                                   setTypeEnd(true);
                               }}
                               min='01-01-2010' max="12-31-2030"
                               className={internEndValidate ? 'user_date end incorrect' : 'user_date end'}/>
                        {internEndValidate && (
                            <label htmlFor='internship_end' className='validate_info_holder'>
                                <h2 className='validate_info'>This date is not
                                    correct</h2>
                                <img src={Incorrect} alt="incorrect mark"
                                     className='internship_mark internship_mark_date'/>
                            </label>
                        )}
                        {textTypeEnd && (
                            <label htmlFor='internship_end'>
                                <img src={Calendar} className='calendar' alt="calendar"/>
                                <input type="date" className='datepicker_input second_datepicker' onChange={e => setEnd(e.currentTarget.value)}/>
                            </label>
                        )}
                    </div>
                </section>
                <input type="submit" className='submit' value="Submit"/>
            </form>
        </main>
    );
};

export default EditIntern;