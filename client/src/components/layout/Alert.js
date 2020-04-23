import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Alert = (props) => {
    const { alert } = props
    return (
        [
            alert.length > 0 && alert.map(item => {
                return (
                    <div key={item.id} className={`alert alert-${item.alertType}`}>
                        {item.msg}
                    </div>
                )
            })
        ]
    )
}

Alert.propTypes = {
    alert: PropTypes.array
}

const mapStateToProps = (state) => {
    return {
        alert: state.alert
    }
}

export default connect(mapStateToProps)(Alert);