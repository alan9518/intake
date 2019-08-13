<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" meta:progid="SharePoint.WebPartPage.Document" %>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
  <WebPartPages:AllowFraming runat="server" />
  <SharePoint:ScriptLink name="clientforms.js" runat="server" LoadAfterUI="true" Localizable="false" />
  <SharePoint:ScriptLink name="clientpeoplepicker.js" runat="server" LoadAfterUI="true" Localizable="false" />
  <SharePoint:ScriptLink name="autofill.js" runat="server" LoadAfterUI="true" Localizable="false" />
  <SharePoint:ScriptLink name="sp.js" runat="server" LoadAfterUI="true" Localizable="false" />
  <SharePoint:ScriptLink name="sp.runtime.js" runat="server" LoadAfterUI="true" Localizable="false" />
  <SharePoint:ScriptLink name="sp.core.js" runat="server" LoadAfterUI="true" Localizable="false" />
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
  <head><meta charset="utf-8"/><link rel="shortcut icon" href="https://flextronics365.sharepoint.com/sites/gsd/intake_process/intake_process_v3/favicon.ico"/><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"/><meta name="theme-color" content="#000000"/><link rel="manifest" href="https://flextronics365.sharepoint.com/sites/gsd/intake_process/intake_process_v3/manifest.json"/><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous"><link href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto+Mono:400,500" rel="stylesheet"><title>Project Intake</title><style>.modal-backdrop{display:none}#s4-bodyContainer,#s4-workspace{padding-bottom:0!important;width:100%;height:100%;min-height:100vh;background-image:url(/sites/gsd/intake_process/IntakeProcess/static/media/bg.389c3075.jpg);background-position:top;background-size:cover}#DeltaHelpPanel,#DeltaPageInstrumentation,#DeltaPlaceHolderUtilityContent,#flexFooter,#s4-ribbonrow,div#s4-titlerow,div#sideNavBox,span#DeltaDelegateControls,span#DeltaSPWebPartManager{display:none!important}#contentBox{margin-right:0!important;margin-left:0!important;width:100%!important}#contentRow{padding-top:0}#s4-bodyContainer{padding-bottom:0!important}#containerParallax{padding-left:0!important;padding-right:0!important}.container .jumbotron,.container-fluid .jumbotron{border-radius:0!important}</style><link href="https://flextronics365.sharepoint.com/sites/gsd/intake_process/intake_process_v3/static/css/2.2fc614db.chunk.css" rel="stylesheet"><link href="https://flextronics365.sharepoint.com/sites/gsd/intake_process/intake_process_v3/static/css/main.496d10f6.chunk.css" rel="stylesheet"></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div><script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script><script>/* ==========================================================================
    ** Sharepoint Methods
    ** ========================================================================== */

    // --------------------------------------
    // Get SP Loggedin User
    // --------------------------------------

    function getCurrentSPUser() {
      var currentUser = {
        userID: _spPageContextInfo.userId,
        userEmail: _spPageContextInfo.userEmail,
        userName: _spPageContextInfo.userDisplayName,

      }
      return currentUser;
    }


    // --------------------------------------
    // Configure People Picker 
    // --------------------------------------

    function initializePeoplePicker($peoplePicker, $peoplePickerWidth, $tabIndex) {
      //console.log('TCL: initializePeoplePicker -> $peoplePicker', $peoplePicker)
      // Create a schema to store picker properties, and set the properties.
      var $schema = {};
      // var width = $peoplePickerWidth+'px';
      $schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
      $schema['PrincipalAccountType'] = 'User';
      $schema['SearchPrincipalSource'] = 15;
      $schema['ResolvePrincipalSource'] = 15;
      $schema['AllowMultipleValues'] = false;
      $schema['MaximumEntitySuggestions'] = 70;
      $schema['Width'] = $peoplePickerWidth;

      //console.log('TCL: initializePeoplePicker -> $schema ', $schema)
      // Render and initialize the picker.
      // Pass the ID of the DOM element that contains the picker, an array of initial
      // PickerEntity objects to set the picker value, and a schema that defines
      // picker properties.
      SPClientPeoplePicker_InitStandaloneControlWrapper($peoplePicker, null, $schema);
    }


    // --------------------------------------
    // Prefill PeoplePickers
    // peoplePickerBusiness_lead_TopSpan
    // peoplePickerBusiness_lead_TopSpan
    // --------------------------------------
    function fillPeoplePicker($user, $peoplePicker) {
      // //console.log('user owner', user)
      var pickerName = `peoplePicker${$peoplePicker}_TopSpan`
      // cleanPeoplePicker('peoplePickerOwner_TopSpan');
      // cleanPeoplePicker(pickerName);
      // var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerOwner_TopSpan
      var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[pickerName]
      
      var usrObj = {
        'Key': $user
      };
      console.log("TCL: fillPeoplePicker -> usrObj", usrObj)

      console.log("TCL: fillPeoplePicker -> peoplePicker", peoplePicker)

      if(peoplePicker !== null || peoplePicker !== undefined)
        peoplePicker.AddUnresolvedUser(usrObj, true);
    }



    // --------------------------------------
    // Clean PeoplePickers
    // --------------------------------------
    function cleanPeoplePicker($peoplePicker) {
      // Get the instance of the People Picker from the Dictionary

      var spclientPeoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[$peoplePicker];

      if (spclientPeoplePicker) {
        //Get the Resolved Users list from Client People Picker


        var ResolvedUsers = document.getElementById(spclientPeoplePicker.ResolvedListElementId).querySelector("span[class='sp-peoplepicker-userSpan']");

        //Clear the Client People Picker
        if (ResolvedUsers !== null) {
          for (var i = 0; i < ResolvedUsers.children.length; i++) {
            spclientPeoplePicker.DeleteProcessedUser(ResolvedUsers[i]);
          }
        }

      }

    }


    // --------------------------------------
    // Clean PeoplePickers
    // --------------------------------------
    function disablePeoplePickers() {
      jQuery(".sp-peoplepicker-editorInput").attr('disabled' , 'disabled');
    }


    /** --------------------------------------
    // Create Folder Structure on Sharepoint
    // Create Parent Folder, if there are 
    // Children, call the Child Function
    // Parent/Child/Child
    // @param {listTitle} intakeFiles
    // @param {folderURL} folderID/Req || /pmo
    // @returns {}
    // -------------------------------------- */

    function createFolderStructure(listTitle, folderUrl, sucessCallback, failCallback) {
      var ctx = SP.ClientContext.get_current();
      var list = ctx.get_web().get_lists().getByTitle(listTitle);
      var createFolderInternal = function (parentFolder, folderUrl, success, error) {
        var ctx = parentFolder.get_context();
        var folderNames = folderUrl.split('/');
        var folderName = folderNames[0];
        var curFolder = parentFolder.get_folders().add(folderName);
        ctx.load(curFolder);
        ctx.executeQueryAsync(
          function () {
            if (folderNames.length > 1) {
              var subFolderUrl = folderNames.slice(1, folderNames.length).join('/');
              createFolderInternal(curFolder, subFolderUrl, success, error);
            }
            success(curFolder);
          },
          error);
      };
      createFolderInternal(list.get_rootFolder(), folderUrl, sucessCallback, failCallback);

    }



    // --------------------------------------
    // Create Project Folder
    // --------------------------------------
    function createFolder(folderName, sucessCallback, failCallback) {
      var clientContext;
      var oWebsite;
      var oList;
      var itemCreateInfo;


      clientContext = new SP.ClientContext.get_current();
      oWebsite = clientContext.get_web();
      //console.log('TCL: createFolder -> oWebsite.get_lists()', oWebsite.get_lists())
      oList = oWebsite.get_lists().getByTitle("intakeFiles");


      itemCreateInfo = new SP.ListItemCreationInformation();
      itemCreateInfo.set_underlyingObjectType(SP.FileSystemObjectType.folder);
      itemCreateInfo.set_leafName(folderName);
      this.oListItem = oList.addItem(itemCreateInfo);
      this.oListItem.update();

      clientContext.load(this.oListItem);
      clientContext.executeQueryAsync(

        Function.createDelegate(this, successHandler),
        Function.createDelegate(this, errorHandler)
      );

      //console.log('TCL: createFolder -> clientContext', clientContext)

      function successHandler() {

        sucessCallback();



      }

      function errorHandler() {
        //console.log("Request failed: " + arguments[1].get_message())
        failCallback();
      }
    }

    // --------------------------------------
    // Create SubFolder
    // --------------------------------------
    function createSubFolder(parentFolder, folderName, sucessCallback, failCallback) {
      //console.log('TCL: createSubFolder -> folderName', folderName)
      var clientContext;
      var oWebsite;
      var oList;
      var itemCreateInfo;
      var mainFolder = "intakeFiles/" + parentFolder;

      clientContext = new SP.ClientContext.get_current();
      oWebsite = clientContext.get_web();
      //console.log('TCL: createFolder -> oWebsite.get_lists()', oWebsite.get_lists())
      oList = oWebsite.get_lists().getByTitle(mainFolder);


      itemCreateInfo = new SP.ListItemCreationInformation();
      itemCreateInfo.set_underlyingObjectType(SP.FileSystemObjectType.folder);
      itemCreateInfo.set_leafName(folderName);
      this.oListItem = oList.addItem(itemCreateInfo);
      this.oListItem.update();

      clientContext.load(this.oListItem);
      clientContext.executeQueryAsync(

        Function.createDelegate(this, successHandler),
        Function.createDelegate(this, errorHandler)
      );

      //console.log('TCL: createFolder -> clientContext', clientContext)

      function successHandler(data) {
        //console.log('TCL: successHandler -> data', data)
        let reqFolder = folderName + "/req";
        // createFolder(reqFolder, sucessCallback, failCallback)
        // sucessCallback();


      }

      function errorHandler() {
        //console.log("Request failed: " + arguments[1].get_message())
        failCallback();
      }
    }


    // --------------------------------------
    // Upload File With Ajax
    // --------------------------------------
    function uploadFilesToFolder(folderUrl, filename, file, docslength, successCallback) {
      console.log('TCL: uploadFilesToFolder -> docslength', docslength)
      console.log('rel url', folderUrl);
      console.log('filename', filename);
      console.log('file', file);
      var auxCount = 0;
      var reader = new FileReader();
      reader.onloadend = function (evt) {
        if (evt.target.readyState == FileReader.DONE) {
          var buffer = evt.target.result;

          var completeUrl = _spPageContextInfo.webAbsoluteUrl +
            "/_api/web/GetFolderByServerRelativeUrl('" + folderUrl + "')/Files/add(url='" + filename +
            "',overwrite=true)";

          //console.log('TCL: reader.onloadend -> completeUrl', completeUrl)


          $.ajax({
            url: completeUrl,
            type: "POST",
            data: buffer,
            dataType: 'json',
            async: false,
            processData: false,
            headers: {
              "accept": "application/json;odata=verbose",
              "X-RequestDigest": $("#__REQUESTDIGEST").val()
              // "content-length": buffer.byteLength
            },
            complete: function (data) {

              auxCount++;
              // //console.log('upload Complete ', data);
              //console.log('count', auxCount);
              if (auxCount === docslength) {
                console.log('files Uploaded');
                // successCallback()
              }

            },
            error: function (err) {
              console.log('error at uploading pic', err)
            }
          });

        }
      };
      reader.readAsArrayBuffer(file);
    }


    // --------------------------------------
    // Open Sharepoint Lightbox
    // --------------------------------------
    function openDialog(pageUrl, title) {
      var width = window.innerWidth;
      var height = window.innerHeight;
      width = width / 1.6;
      height = height / 1.2;

      var options = {
        url: pageUrl,
        title: title,
        allowMaximize: true,
        showClose: true,
        width: width,
        height: height
      };
      SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
    }</script><script>!function(l){function e(e){for(var r,t,n=e[0],o=e[1],u=e[2],i=0,f=[];i<n.length;i++)t=n[i],p[t]&&f.push(p[t][0]),p[t]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(l[r]=o[r]);for(s&&s(e);f.length;)f.shift()();return c.push.apply(c,u||[]),a()}function a(){for(var e,r=0;r<c.length;r++){for(var t=c[r],n=!0,o=1;o<t.length;o++){var u=t[o];0!==p[u]&&(n=!1)}n&&(c.splice(r--,1),e=i(i.s=t[0]))}return e}var t={},p={1:0},c=[];function i(e){if(t[e])return t[e].exports;var r=t[e]={i:e,l:!1,exports:{}};return l[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=l,i.c=t,i.d=function(e,r,t){i.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(r,e){if(1&e&&(r=i(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)i.d(t,n,function(e){return r[e]}.bind(null,n));return t},i.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(r,"a",r),r},i.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},i.p="https://flextronics365.sharepoint.com/sites/gsd/intake_process/intake_process_v3/";var r=window.webpackJsonp=window.webpackJsonp||[],n=r.push.bind(r);r.push=e,r=r.slice();for(var o=0;o<r.length;o++)e(r[o]);var s=n;a()}([])</script><script src="https://flextronics365.sharepoint.com/sites/gsd/intake_process/intake_process_v3/static/js/2.6aa544bf.chunk.js"></script><script src="https://flextronics365.sharepoint.com/sites/gsd/intake_process/intake_process_v3/static/js/main.5b31cd8e.chunk.js"></script></body>


</asp:Content>



