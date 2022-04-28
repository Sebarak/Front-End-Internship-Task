import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

const EditIntern = () => {
    const { id } = useParams();

    useEffect(() => {
        //TODO: get intern from REST api http://localhost:3001/interns/:id
        console.log(`I want to get intern with id: ${id}!`)
    }, [id]);

    return (
        <main>
            <div className='container return'>
                <NavLink to="/" className='return_button'>Back to list </NavLink>
            </div>
            <form className='container form'>
                <section className='form_user_values'>
                    <label className='user_name'>Name *</label>
                    <input type="text" name="name" className='user_value'/>
                    <label className='user_name'>Email *</label>
                    <input type="text" name="email" className='user_value'/>
                </section>
                <section className='form_internship_date'>
                    <div className='internship_date'>
                        <label>Internship start *</label>
                        <input type="date" className='user_date start'/>
                    </div>
                    <div className='internship_date'>
                        <label>Internship end *</label>
                        <input type="date" className='user_date end'/>
                    </div>
                </section>
                <input type="submit" value="Submit" />
            </form>
        </main>
    );
};

export default EditIntern;