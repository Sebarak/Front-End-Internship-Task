import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router';
import {NavLink} from 'react-router-dom';

const EditIntern = () => {
    const {id} = useParams();
    const [user, setUser] = useState({});
    const [internshipS, setStart] = useState('');
    const [internshipE, setEnd] = useState('');
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

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
                    <input type="text" name="name" placeholder={user.name} value={name}
                           onChange={e => setName(e.currentTarget.value)} className='user_value'/>
                    <label className='user_name'>Email *</label>
                    <input type="email" name="email" placeholder={user.email} value={email}
                           onChange={e => setEmail(e.currentTarget.value)} className='user_value'/>
                </section>
                <section className='form_internship_date'>
                    <div className='internship_date'>
                        <label>Internship start *</label>
                        <input type="text" placeholder={user.internshipStart} value={internshipS}
                               onChange={e => setStart(e.currentTarget.value)} onFocus={e => (e.target.type = "date")}
                               onBlur={e => (e.target.type = "text")} min='01-01-2010' max="12-31-2030"
                               className='user_date start'/>
                    </div>
                    <div className='internship_date'>
                        <label>Internship end *</label>
                        <input type="text" placeholder={user.internshipEnd} value={internshipE}
                               onChange={e => setEnd(e.currentTarget.value)} onFocus={e => (e.target.type = "date")}
                               onBlur={e => (e.target.type = "text")} min='01-01-2010' max="12-31-2030"
                               className='user_date end '/>
                    </div>
                </section>
                <input type="submit" value="Submit"/>
            </form>
        </main>
    );
};

export default EditIntern;