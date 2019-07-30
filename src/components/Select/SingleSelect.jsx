/* ==========================================================================
 * Custom Single Option Select Component 
 * Using react-Singleselect 
 * 15/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
import React from "react";
import PropTypes from "prop-types";
import Select from 'react-select';



// --------------------------------------
// Create Component Class
// --------------------------------------
const SingleSelect = (props) => {
    return (
        <Select
            className= {props.className}
            classNamePrefix = {props.classNamePrefix}
            // className='react-select-container'
            // classNamePrefix="react-select"
            defaultValue={props.defaultValue}
            isDisabled={props.isDisabled}
            isLoading={props.isLoading}
            isClearable={props.isClearable}
            isRtl={props.isRtl}
            isSearchable={props.isSearchable}
            name={props.controlName}
            inputId={props.inputId}
            id={props.id}
            options={props.options}
            value = {props.selectedValue}
            onChange = {props.onChange}
            tabIndex = {props.tabIndex}
            placeholder = {props.placeholder}
            loadingMessage = {()=>  "Loading Options"}
            onBlur = {props.onBlur}
            onFocus = {props.onFocus}
        />

    //     <Select
    //     className="basic-single"
    //     classNamePrefix="select"
    //     defaultValue = {modelos[0]} 
    //     isClearable={false}
    //     isSearchable={true}
    //     name = {'brandSelect'}
    //     value={selectedModelo}
    //     onChange={this.handleSelectModeloChange}
    //     options={this.formatSelectValues(modelos)}
    // />


    )

    
}

// --------------------------------------
// Define PropTypes
// --------------------------------------
SingleSelect.propTypes = {
    options: PropTypes.array,
    isClearable: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    isRtl: PropTypes.bool,
    isSearchable: PropTypes.bool,
    value : PropTypes.string,
    onChange : PropTypes.func
};

// --------------------------------------
// Export Component
// --------------------------------------
export default SingleSelect;
