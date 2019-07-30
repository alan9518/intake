/* ==========================================================================
 * Custom Loader Component
 * Using react-loader-spinner
 * 30/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React  from "react";
    import PropTypes from "prop-types";
    import Loader from 'react-loader-spinner';
    import './styles.css';

// --------------------------------------
// Create Component
// --------------------------------------    
    const Apploader = (props) => {  
        const {customHeight, isTransparent, customWidth, currentMessage} = props;
        const transparentClass = isTransparent && 'int-transparentBackground';
        return (
            <div className = {`xpl-loaderContainer ${transparentClass}`} style = {{minHeight : customHeight, width:customWidth}}>
                <div className="xpl-loaderHolder">
                    <Loader
                        type = "Oval"
                        color = "#1197D3"
                        height = {100}
                        width = {100}
                    ></Loader>

                    {currentMessage && <h4 className = "int-loaderMessage"> {currentMessage}  </h4> }
                </div>
            </div>
        )
    }   

    
    // --------------------------------------
    // Props types
    // --------------------------------------  
    Apploader.propTypes = {
        customHeight : PropTypes.number
    }
    
    // --------------------------------------
    // Default Props
    // --------------------------------------  
    Apploader.defaultProps = {
        customHeight : 800
    }


// --------------------------------------
// Export Component
// --------------------------------------
    export default Apploader;