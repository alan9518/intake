/* ==========================================================================
** Field Input Item
** 28/01/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import { ToolTip } from '../../components';
    import PropTypes from 'prop-types';
    import { AddInputButton } from '../../components'
    import ReactTooltip from 'react-tooltip'







// --------------------------------------
// Create Functional Component
// --------------------------------------
    const fieldItem = (props) => {

        const { Field_Name, Field_State_Name, Mandatory, columns, isTextArea, hasToolTip, toolTipText, multipleRows, value, Enabled, Sequence   } = props.data;
    
        const { index, renderBorder, onlyNumbers } = props;
        const labelBorderClassName = renderBorder === true ? 'int-fieldLabel bordered' : 'int-fieldLabel';
        const inputWidth = columns === 2 ? 175 : 300;

        return (
            <div className={columns === 2 ? 'int-fieldItemContainerRow' : 'int-fieldItemContainerColumn'} >
                <label htmlFor="" className={labelBorderClassName}>
                    {Field_Name}
                    {columns === 1 && hasToolTip === true && <ToolTip tipText={toolTipText} isButton={false} />}

                    <ReactTooltip className='extraClass' delayHide={1000} effect='solid' />

                    {multipleRows && <AddInputButton onClick={props.onClick} />}

                    {/*{multipleRows && true &&  <ToolTip tipText = {'Add More Fields'} isButton = {true} onClick = {props.onClick}/> }  */}
                </label>

                {
                    // Simple Text Input
                    !isTextArea &&
                    <div className="int-fieldText" style={{ minWidth: inputWidth }}>
                    
                        {Mandatory && <span className="int-blueText" style = {{padding:'5px'}}> * </span>}


                        <input
                            type = {onlyNumbers !== true ? 'text' : 'number'}
                            name = {Field_State_Name}
                            id = {Field_State_Name}
                            className = {  Mandatory ? 'int-textInput int-validate ' : 'int-textInput'  }
                            value={value}
                            onChange={props.onChange}
                            index={index}
                            readOnly={!Enabled}
                            min = {onlyNumbers && 0}
                            tabIndex = {Sequence}
                            onKeyDown={  (evt) => onlyNumbers === true && evt.key === 'e' && evt.preventDefault() }
                            onFocus = {props.checkErrorClass}
                            onBlur = {props.checkErrorClass}
                            // required = {Mandatory && 'required' }
                            // {onlyNumbers && }
                        />




                        
                    </div>

                }

                {
                    // Text Area
                    isTextArea &&
                    <div className="int-fieldText int-fieldTextArea" style={{ minWidth: inputWidth }} name={Field_Name} >
                        {Mandatory && <span className="int-blueText"> * </span>}
                        <textarea
                            rows="4"
                            value={value}
                            id = {Field_State_Name}
                            name={Field_State_Name}
                            className = {  Mandatory ? 'int-textInput int-validate ' : 'int-textInput'  }
                            onChange={props.onChange}
                            readOnly={!Enabled}
                            required = {Mandatory && true }
                            tabIndex = {Sequence}
                            maxlength = {1200}
                            onFocus = {props.checkErrorClass}
                            onBlur = {props.checkErrorClass}
                        >
                        </textarea>
                        { value && <span className = "int-textCounter"> {value.length}  of 1200 Characters Available  </span> }
                        
                    </div>
                }

                {columns === 2 && hasToolTip === true && <ToolTip tipText={toolTipText} />}


                {Mandatory && <span className = 'int-inputMessageError' id={`error-${Field_State_Name}`}>  This field is required  </span>}
            </div>

        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    fieldItem.propTypes = {
        data: PropTypes.object,
        renderBorder: PropTypes.bool
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default fieldItem;
