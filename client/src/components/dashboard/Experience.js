import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileAction';

function Experience({ experience, deleteExperience }) {
    const experiences = experience.map( exp => {
        return (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td className="hide-sm">{exp.title}</td>
                <td>
                <Moment date={exp.from} format='YYYY/MM/DD'/> - {' '}{
                        exp.to === null? ('Now') : (<Moment date={exp.to} format='YYYY/MM/DD'/>)
                    }
                </td>
                <td>
                    <button className="btn btn-danger" onClick={() => deleteExperience(exp._id)}>Delete</button>
                </td>
            </tr>
        )
    });
    return (
        <>
            <h2 className="my-2">Experience Credential</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </>
    )
}

Experience.propTypes = {
    experience: PropTypes.array,
    deleteExperience: PropTypes.func
}

const mapDispatchToProps = dispatch => {
    return {
        deleteExperience: (id) => dispatch(deleteExperience(id))
    }
}

export default connect(null, mapDispatchToProps)(Experience);

