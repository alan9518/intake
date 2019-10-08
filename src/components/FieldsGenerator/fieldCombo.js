/* ==========================================================================
** Select Control for Field
** 28/01/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import {SingleSelect, MultiSelect, CreatableCustomSelect , ToolTip } from '../../components';




// --------------------------------------
// Create Functional Component
// --------------------------------------
const fieldCombo = (props) => {
    const { 
            Field_Name, Field_State_Name,  
            Mandatory, columns, General_Value, 
            hasToolTip, wideControl, extraWideControl, 
            mediumControl, toolTipText, 
            value, allowFilter, 
            Enabled, Sequence, visible ,
            isSearchable
        } = props.data;
    
    
    const { renderBorder, isMulti } = props;
    const labelBorderClassName = renderBorder === true ? 'int-fieldLabel bordered' : 'int-fieldLabel';
    const inputWidth = columns === 2 ? 125 : 300;
    let controlWidthName = '';

    if(wideControl === true)
        controlWidthName = '-wide';
    else if(mediumControl === true) 
        controlWidthName = '-medium';
    else if(extraWideControl === true) 
        controlWidthName = '-extra-wide';
    else 
        controlWidthName  = '';

    // --------------------------------------
    // Set Class Name & Class Name Prefix
    // --------------------------------------

        // const selectClassName = wideControl === true ? 'react-select-container-wide' :'react-select-container';
        // const selectClassPrefix = wideControl === true ? 'react-select-wide' :'react-select';

        const validateClass = Mandatory && 'int-validate' ;
        const selectClassName = `react-select-container${controlWidthName}`;
        // className = {  Mandatory ? 'int-textInput int-validate ' : 'int-textInput'  }
        
        const selectClassPrefix = `react-select${controlWidthName}`;

    // --------------------------------------
    // Define Default Value
    // --------------------------------------
        
      
        let selectDisabled =  !Enabled ;
        
        

        // Show/Hide COntainer
        const visibleStyles = {"display" : visible === false ? 'none': 'flex'}

        // Define placeHolder
        const placeHolder = `Select ${ Field_Name}`;
        let comboValueFromDB ;
        
        

        // find Selected Value

        if(!value || value ===  undefined) {
            comboValueFromDB = null
        }
        else if(value.value === "" || value.value === null) 
            comboValueFromDB = value
        else if(value === null || value === {}) 
            comboValueFromDB = {}
            
        else {
             comboValueFromDB = General_Value && General_Value.filter((selectOption, index) => {
                
                if(selectOption.value !== null || selectOption.value !== "") {
                    if(value.value !== null || value.value !== '' ) {
                        return selectOption.value === value.value
                    }
                        
                    else    
                        return {}
                }

            })[0]
        }


        

        
        let indexFromData = 0
        if(General_Value && General_Value.length > 0 ) {
            // indexFromData = General_Value.findIndex((selectOption) =>{ selectOption.value === value.value}) 

            indexFromData = General_Value.findIndex((selectOption) => {
                if(selectOption.value !== null || selectOption.value !== "") {
                    if((value !== null && value.value !== null) || (value !== null && value.value !== '') ) {
                        return selectOption.value === value.value
                    }
                        
                    else    
                        return null
                }

            })

            if(indexFromData === -1)
                indexFromData = null
        }
          
        else
            indexFromData = null
        


        

        let defaultComboValue = comboValueFromDB || value ||  null ;

        let selectValue = value
        
        if(value === null || value === {} || value === undefined || value.value === "")
            selectValue = null
        else 
            selectValue = value


    return (
        <div className={columns === 2 ? 'int-fieldItemContainerRow' : 'int-fieldItemContainerColumn'} style = {visibleStyles}>
            <label htmlFor="" className={labelBorderClassName}> 
                {Field_Name}   
                {columns === 1 && hasToolTip === true &&  <ToolTip tipText = {toolTipText}/> }  
                <ReactTooltip className='extraClass' delayHide={1000} effect='solid'/>

            </label>
            
            <div className="int-fieldText" style={{ minWidth: inputWidth }}>

            {Mandatory && <span className = "int-blueText" style = {{ padding: '4px' }}> * </span>   }
            {
                isMulti ===  false ? 
                
                    <SingleSelect 
                        options = {General_Value} 
                        name = {Field_State_Name} 
                        className = {selectClassName} 
                        classNamePrefix = {selectClassPrefix} 
                        // defaultValue = {defaultComboValue}
                        defaultValue = {indexFromData !== null ? General_Value[indexFromData] : defaultComboValue}
                        onChange = {props.onChange.bind(this,Field_State_Name)}
                        value = {selectValue }
                        id = {Field_State_Name}
                        inputId  = {Field_State_Name}
                        isSearchable = {allowFilter ? true : false}
                        isDisabled = {selectDisabled}
                        tabIndex = {Sequence}
                        placeholder = {placeHolder}
                        key = {Field_State_Name}
                        onBlur = {props.checkErrorClass}
                        onFocus = {props.checkErrorClass}
                        
                    />
                :
                    <MultiSelect 
                        options = {General_Value} 
                        name = {Field_State_Name} 
                        className = {selectClassName} 
                        classNamePrefix = {selectClassPrefix} 
                        // defaultValue = {value}
                        defaultValue = {defaultComboValue}
                        onChange = {props.onChange.bind(this,Field_State_Name)}
                        value = {value}
                        selectedValue = {value}
                        id = {Field_State_Name}
                        inputId  = {Field_State_Name}
                        isSearchable = {allowFilter ? true : false}
                        tabIndex = {Sequence}
                        // placeholder = {placeHolder}
                        key = {Field_State_Name}
                        onBlur = {props.checkErrorClass}
                        onFocus = {props.checkErrorClass}
                    />
            
            }

            {/*<span> {defaultComboValue !== null ?  defaultComboValue.value  : "def"} </span>*/}
                
                    
            </div>
            


            { columns === 2 && hasToolTip === true &&  <ToolTip tipText = {toolTipText}/> }



        </div>

    )

}
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
fieldCombo.propTypes = {
    props: PropTypes
};
// --------------------------------------
// Export Component
// --------------------------------------
export default fieldCombo;


