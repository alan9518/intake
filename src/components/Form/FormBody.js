/* ==========================================================================
** Form Body Layout Container
** 28/01/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const FormBody = (props) => {
        const {children} = props;
        // const children = React.Children.map(props.children, child => React.cloneElement(child, { submitForm: submitForm.bind(this) }));
        return (
            <div className = "int-formBodyContainer" >
                <div className="int-separator int-separatorLeft"></div>

                <div className="int-formFieldsContainer">
                    {children}
                </div>
                <div className="int-separator int-separatorRight"></div>

            </div>
        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    FormBody.propTypes = {
        props: PropTypes
    };
// --------------------------------------
// Export Component
// --------------------------------------
    export default FormBody;

