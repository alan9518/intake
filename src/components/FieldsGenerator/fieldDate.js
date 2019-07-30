/* ==========================================================================
** Field Date Item
** 28/01/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import ReactTooltip from 'react-tooltip';
    import { SmallDatePicker , DatePicker, ToolTip } from '../../components'
    import PropTypes from 'prop-types';

    
// --------------------------------------
// Create Functional Component
// --------------------------------------
    const fieldDate = (props) => {

        // --------------------------------------
        // Get Props
        // --------------------------------------
            const { Field_Name, Field_State_Name, Mandatory, columns,  hasToolTip,toolTipText, value, Enabled , small_input, Sequence} = props.data;
            const { renderBorder , showError} = props;
            const labelBorderClassName = renderBorder === true ? 'int-fieldLabel bordered' : 'int-fieldLabel';
            const inputWidth = columns === 2 ? 175 : 300;

        // --------------------------------------
        // Render Component
        // --------------------------------------
            return (
                <div className={columns === 2 ? 'int-fieldItemContainerRow' : 'int-fieldItemContainerColumn'} >
                    <label htmlFor="" className={labelBorderClassName}>
                        {Field_Name}
                        {columns === 1 && hasToolTip === true &&  <ToolTip tipText = {toolTipText}/> }  
                        <ReactTooltip className='extraClass' delayHide={1000} effect='solid'/>
                    </label>
                    
                        <div className="int-fieldText " style={{ minWidth: inputWidth, maxWidth:400  }}>
                            {Mandatory && <span className="int-blueText" style = {{padding:'1px,4px'}}> * </span>}
                            <div className="int-fieldDateContainer">
                            {
                                small_input === true ? 
                                    <SmallDatePicker 
                                            name = {Field_State_Name}
                                            onDateChange = {props.onDateChange}
                                            initialValue = {value}
                                            readOnly = {!Enabled}
                                            tabIndex = {Sequence}
                                    />
                                    :
                                    <DatePicker 
                                            name = {Field_State_Name}
                                            onDateChange = {props.onDateChange}
                                            initialValue = {value}
                                            readOnly = {!Enabled}
                                            tabIndex = {Sequence}
                                    />
                            }   
                            </div>

                        </div>

                
                    { columns === 2 && hasToolTip === true &&  <ToolTip tipText = {toolTipText}/> }
                </div>

            )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
fieldDate.propTypes = {
    props: PropTypes
};
// --------------------------------------
// Export Component
// --------------------------------------
export default fieldDate;