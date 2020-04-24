import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileAction';

function Education({ education, deleteEducation }) {
    const educations = education.map( ed => {
        return (
            <tr key={ed._id}>
                <td>{ed.school}</td>
                <td className="hide-sm">{ed.degree}</td>
                <td>
                <Moment date={ed.from} format='YYYY/MM/DD'/> - {' '}{
                        ed.to === null? ('Now') : (<Moment date={ed.to} format='YYYY/MM/DD'/>)
                    }
                </td>
                <td>
                    <button className="btn btn-danger" onClick={ () => deleteEducation(ed._id) }>Delete</button>
                </td>
            </tr>
        )
    });
    return (
        <>
            <h2 className="my-2">Education Credential</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </>
    )
}

Education.propTypes = {
    education: PropTypes.array,
    deleteEducation: PropTypes.func
}

const mapDispatchToProps = dispatch => {
    return {
        deleteEducation: (id) => dispatch(deleteEducation(id))
    }
}

export default connect(null, mapDispatchToProps)(Education);

