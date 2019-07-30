/* ==========================================================================
** Field Input Text With Dynamic Rows
** 14/02/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import {ToolTip} from '../../components';
    import PropTypes from 'prop-types';
    import {AddInputButton} from '../../components'
    import ReactTooltip from 'react-tooltip'


// --------------------------------------
// Render Inputs
// --------------------------------------
    const renderInputs = (rows,  Field_State_Name, value, onChange)=> {
		//console.log('TCL: renderInputs -> rows', rows)
        return (
            rows.map((rowData)=> {
				//console.log('TCL: renderInputs -> rowData', rowData)
                return (
                            <input 
                                type="text" 
                                name={Field_State_Name} 
                                id={Field_State_Name} 
                                className = "int-textInput" 
                                value = {value}
                                onChange = {onChange}
                                
                            />)
            })
        )
    }



// --------------------------------------
// Create Functional Component
// --------------------------------------
    const MultiFieldInput = (props) => {
        
        const { Field_Name, Field_State_Name, Mandatory, columns, isTextArea, hasToolTip, toolTipText, multipleRows,  value } = props.data;
        const {onChange, rows} = props;
		
        
        const { renderBorder } = props;
        const labelBorderClassName = renderBorder === true ? 'int-fieldLabel bordered' : 'int-fieldLabel';
        const inputWidth = columns === 2 ? 175 : 300;

        // --------------------------------------
        // Get Current Row
        // --------------------------------------
        const currentRow = Field_State_Name === 'Site_Usage' ? rows[0] : rows[1];
		//console.log('TCL: MultiFieldInput -> currentRow' + Field_State_Name, currentRow)

        return (
            <div className={columns === 2 ? 'int-fieldItemContainerRow' : 'int-fieldItemContainerColumn'} >
                <label htmlFor="" className={labelBorderClassName}> 
                    {Field_Name}   
                    {columns === 1 && hasToolTip === true &&  <ToolTip tipText = {toolTipText} isButton = {false}/> }  
                    
                    <ReactTooltip className='extraClass' delayHide={1000} effect='solid'/>

                    {multipleRows && <AddInputButton onClick = {props.onClick} name = {`${Field_State_Name}Btn`}/>}    

                    
                </label>
                
                {
                    // Simple Text Input
                    !isTextArea &&  
                        <div className="int-fieldText" style={{ minWidth: inputWidth }}>
                            {Mandatory && <span className = "int-blueText"> * </span>   }
                            {renderInputs(currentRow, Field_State_Name, value, onChange )}
                          {/*  <input 
                                type="text" 
                                name={Field_State_Name} 
                                id={Field_State_Name} 
                                className = "int-textInput" 
                                value = {value}
                                onChange = {props.onChange}
                            
                            />*/}

                            
                        </div>
                        
                }

            { columns === 2 && hasToolTip === true &&  <ToolTip tipText = {toolTipText}/> }
        
            

            </div>

        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    MultiFieldInput.propTypes = {
        data: PropTypes.object,
        renderBorder : PropTypes.bool
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default MultiFieldInput;


