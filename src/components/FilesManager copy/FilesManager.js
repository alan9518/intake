/* ==========================================================================
** File Manager Component Using Drag & Drop
** Using React Dropzone https://github.com/react-dropzone/react-dropzone
** 30/01/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import DropzoneComponent from 'react-dropzone-component';
    import './dropzone.min.css';
    import PropTypes from 'prop-types';



// --------------------------------------
// Handle Config
// --------------------------------------
    // const componentConfig = {
    //     iconFiletypes: ['.jpg', '.png', '.gif'],
    //     showFiletypeIcon: true,
    //     postUrl: '/uploadHandler'
    // };

    // const eventHandlers = { addedfile: (file) => //console.log(file) }


    const componentConfig = {
        // iconFiletypes: ['.jpg', '.doc', '.txt', '.pdf'],
        showFiletypeIcon: true,
        postUrl: '/no-url'
    }


// --------------------------------------
// Create Functional Component
// --------------------------------------

    const FilesManager = (props) => { 

        // const {Enabled} = props.data;
		// console.log("TCL: FilesManager -> props.data", props.disabled)
    
    // --------------------------------------
    // Event Handlers
    // --------------------------------------
        const eventHandlers = {
            init: function (dropzone) {
                dropzone.autoDiscover = false;
                // props.preloadFiles(dropzone)
                props.preloadFiles(dropzone)
                // props.pre
                // context.preloadFiles(dropzone);
            },
            addedfile : props.onFileAdded,
            removedfile : props.onFileRemoved
            // addedfile: this.handleFileAdded.bind(this),
            // removedfile: this.handleFileRemoved.bind(this)
        }

        const djsConfig = { 
            addRemoveLinks: true,
            autoProcessQueue: false 
        }

        


        return ( 
            <DropzoneComponent 
                config={componentConfig}
                eventHandlers={eventHandlers}
                disabled = {props.disabled}
                djsConfig={djsConfig} />
        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    FilesManager.propTypes = { 
        props : PropTypes 
    }; 
// --------------------------------------
// Export Component
// --------------------------------------
    export default FilesManager;