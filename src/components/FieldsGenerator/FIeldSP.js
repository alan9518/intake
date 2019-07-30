/* ==========================================================================
** FIeld Layout For People Picker
** 14/02/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
import React from 'react';
import { ToolTip } from '../../components';
import PropTypes from 'prop-types';
import { AddInputButton, SPPeoplePicker } from '../../components'
import ReactTooltip from 'react-tooltip'


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const FieldSp = (props) => {

        const { Field_Name, Field_State_Name, Mandatory, columns,  Enabled, hasToolTip, toolTipText,  value, Sequence} = props.data;
        const { renderBorder } = props;
        const labelBorderClassName = renderBorder === true ? 'int-fieldLabel bordered' : 'int-fieldLabel';
        const inputWidth = columns === 2 ? 175 : 300;
        let classNames = Enabled === false ? 'int-controlDisabled' : 'int-controlEnabled';

        // maxWidth: 400 


        return (
            <div className={columns === 2 ? 'int-FieldSpContainerRow' : 'int-fieldItemContainerColumn'} >
                <label htmlFor="" className={labelBorderClassName}>
                    {Field_Name}
                    {columns === 1 && hasToolTip === true && <ToolTip tipText={toolTipText} isButton={false} />}

                    <ReactTooltip className='extraClass' delayHide={1000} effect='solid' />
                </label>
                

                <div className = {`int-fieldText ${classNames}`} style={{ minWidth: inputWidth, }}>
                    {Mandatory && <span className="int-blueText"> * </span>}


                    
                    <SPPeoplePicker 
                        name={Field_State_Name} 
                        value={value} 
                        onChange={props.onChange} 
                        tabIndex = {Sequence} 
                        enabled = {Enabled}
                        checkErrorClass = {props.checkErrorClass}/>
                 

                </div>





                {columns === 2 && hasToolTip === true && <ToolTip tipText={toolTipText} />}



            </div>

        )
    }

    
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    FieldSp.propTypes = {
        data: PropTypes.object,
        renderBorder: PropTypes.bool
    };


// --------------------------------------
// Export Component
// --------------------------------------
export default FieldSp;
