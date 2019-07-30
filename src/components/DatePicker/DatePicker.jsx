/* ==========================================================================
** Custom Datepicker
** Using https://github.com/airbnb/react-dates
** 28/01/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component } from 'react';
    import 'react-dates/initialize';
    import 'react-dates/lib/css/_datepicker.css';
    import { DateRangePicker, SingleDatePicker } from 'react-dates';
    import moment from 'moment';
    import PropTypes from 'prop-types';

// --------------------------------------
// Create Component Class
// --------------------------------------

class DatePicker extends Component {
    
    // --------------------------------------
    // Constructor
    // --------------------------------------
    constructor(props) {
        super(props);
        this.state = {
            startDate: props.initialValue ||  moment() ,
            focusedInput: null,
        };
    }

    // --------------------------------------
    // Set Component TabIndex
    // --------------------------------------
    componentDidMount() {
        const {name, tabIndex} = this.props;
        document.getElementById(name).tabIndex = tabIndex;
    }

    // --------------------------------------
    // Use empty value instead of null to ensure it's treated as a controlled component
    // --------------------------------------
    getValueAsString = date => (date ? date.toISOString() : '')


    // --------------------------------------
    // Handle Input Change
    // --------------------------------------
    handleChange = (startDate) => {
		const {name} = this.props;
		
        this.setState({ startDate })
        const dateStr = this.getValueAsString(startDate)
        this.props.onDateChange(name, dateStr, startDate);
    }



    render() {
        const {name, initialValue, readOnly, tabIndex} = this.props;
        const showIcon = readOnly ? true : false;
        return (
                <SingleDatePicker
                    date={this.state.startDate} // momentPropTypes.momentObj or null
                    // onDateChange={startDate => this.setState({ startDate })} // PropTypes.func.isRequired
                    onDateChange = {this.handleChange}
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                    id = {name} // PropTypes.string.isRequired,
                    showDefaultInputIcon = {true}
                    inputIconPosition="after"
                    small = {true}
                    disabled = {readOnly}
                    readOnly 
                    tabIndex = {tabIndex}

                />
        );
    }
}




// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
DatePicker.propTypes = {
    props: PropTypes
};
// --------------------------------------
// Export Component
// --------------------------------------
export default DatePicker;