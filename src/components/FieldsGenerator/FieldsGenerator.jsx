/* ==========================================================================
** Get JSON Data Files and Render Form Fields
** 28/01/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FieldItem, FieldCombo, FieldDate, FieldFilesUpload, FieldSp } from '../../components'
import './styles.css';

// --------------------------------------
// Create Component Class
// --------------------------------------
    class FieldsGenerator extends Component {
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
        // --------------------------------------
        // Set Initial Values
        // --------------------------------------
        componentDidMount() {
        }



        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */
        // --------------------------------------
        // Render Projects
        // --------------------------------------
        renderFieldsGenerator() {
            const { 
                fieldsData, renderBorder, onChangeInputs, 
                onChangeSelect, onDateChange, onFileAdded, 
                onFileRemoved, preloadFiles, showError, 
                onClick, multipleRows, 
                blockFileZone, showFileManager,
                currentView, currentProject,
                checkErrorClass } = this.props;


            return (
                fieldsData && fieldsData.map((fieldItem) => {
                    // const switchType = fieldItem.Type.toLowerCase();
                    switch (fieldItem.Type) {
                        case "Combo":
                            return <FieldCombo
                                data={fieldItem}
                                renderBorder={renderBorder}
                                onChange={onChangeSelect}
                                showError={showError}
                                isMulti={false}
                                key = {fieldItem.Field_State_Name}
                                checkErrorClass = {checkErrorClass}
                            />;
                        case "Date":
                            return <FieldDate
                                data={fieldItem}
                                renderBorder={renderBorder}
                                onDateChange={onDateChange}
                                preloadFiles={preloadFiles}
                                showError={showError}
                            />;
                        case "filesPicker" || "FilesPicker":
                            return <FieldFilesUpload
                                data={fieldItem}
                                renderBorder={renderBorder}
                                onChange={onChangeInputs}
                                onFileAdded={onFileAdded}
                                onFileRemoved={onFileRemoved}
                                preloadFiles={preloadFiles}
                                blockFileZone = {blockFileZone}
                                showFileManager = {showFileManager}
                                currentProject = {currentProject}
                                currentView = {currentView}
                            />;
                        case "DynamicField":
                            return <FieldCombo
                                data={fieldItem}
                                renderBorder={renderBorder}
                                onChange={onChangeSelect}
                                showError={showError}
                                isMulti={true}
                                checkErrorClass = {checkErrorClass}
                            />;

                        case "PeoplePicker":
                            return <FieldSp
                                data={fieldItem}
                                renderBorder={renderBorder}
                                onChange={onChangeInputs}
                                showError={showError}
                                checkErrorClass = {checkErrorClass}
                            >

                            </FieldSp>
                        case "Decimal":
                            return <FieldItem
                                data={fieldItem}
                                renderBorder={renderBorder}
                                onChange={onChangeInputs}
                                showError={showError}
                                onlyNumbers={true}
                                checkErrorClass = {checkErrorClass}
                            />

                        case "Integer":
                            return <FieldItem
                                data={fieldItem}
                                renderBorder={renderBorder}
                                onChange={onChangeInputs}
                                showError={showError}
                                onlyNumbers={true}
                                checkErrorClass = {checkErrorClass}
                            />

                        default:
                            return <FieldItem
                                data={fieldItem}
                                renderBorder={renderBorder}
                                onChange={onChangeInputs}
                                showError={showError}
                                onlyNumbers={false}
                                checkErrorClass = {checkErrorClass}
                            />
                    }
                })

            )
        }



        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            return this.renderFieldsGenerator();
        }
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    FieldsGenerator.propTypes = {
        fieldsData : PropTypes.array ,
        renderBorder : PropTypes.bool,
        onChangeInputs : PropTypes.func,
        onChangeSelect : PropTypes.func,
        onDateChange : PropTypes.func,
        onFileAdded : PropTypes.func,
        onFileRemoved : PropTypes.func,
        preloadFiles : PropTypes.func,
        showError : PropTypes.bool,
        onClick : PropTypes.func,
        multipleRows : PropTypes.bool,
        blockFileZone : PropTypes.bool,
        showFileManager : PropTypes.bool,
        currentView : PropTypes.string,
        currentProject : PropTypes.string,
        checkErrorClass : PropTypes.func
    };
// --------------------------------------
// Export Component
// --------------------------------------
    export default FieldsGenerator;



