/* ==========================================================================
** Select That Can Add Custom Options
** 14/02/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import CreatableSelect from 'react-select/lib/Creatable';
    import PropTypes from 'prop-types';


// --------------------------------------
// Create Component Class
// --------------------------------------
class CreatableCustomSelect extends Component {

    /* ==========================================================================
    ** Component Setup
    ** ========================================================================== */

        // --------------------------------------
        // Constructor
        // --------------------------------------
        constructor(props) {
            super(props);
            this.state = {
                isLoaded: false,
            }
        }


        

        handleChange = (newValue , actionMeta) => {
         

            this.props.onChange(newValue);
        }


    /* ==========================================================================
    ** Render Methods
    ** ========================================================================== */
        // --------------------------------------
        // Render Projects
        // --------------------------------------
        renderCreatableSelect() {
            return (
                    <Fragment>
                        <CreatableSelect
                            isMulti
                            onChange={this.handleChange}
                            className= {this.props.className}
                            classNamePrefix = {this.props.classNamePrefix}
                            defaultValue={this.props.defaultValue}
                            isDisabled={this.props.isDisabled}
                            isLoading={this.props.isLoading}
                            isClearable={this.props.isClearable}
                            isRtl={this.props.isRtl}
                            isSearchable={this.props.isSearchable}
                            name={this.props.controlName}
                            options={this.props.options}
                            value = {this.props.selectedValue}
                            // onChange = {this.props.onChange}
                        />
                    </Fragment>
                )
        }

        
        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            return this.renderCreatableSelect();
        }
}

// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    CreatableCustomSelect.propTypes = {
        props: PropTypes
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default CreatableCustomSelect;