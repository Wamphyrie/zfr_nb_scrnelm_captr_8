/*global location*/
sap.ui.define([
		"phoenix/zfr_nb_scrnelm_captr_8/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History",
		"phoenix/zfr_nb_scrnelm_captr_8/model/formatter"
	], function (
		BaseController,
		JSONModel,
		History,
		formatter
	) {
		"use strict";

		return BaseController.extend("phoenix.zfr_nb_scrnelm_captr_8.controller.Object", {

			formatter: formatter,

			/* =========================================================== */
			/* lifecycle methods                                           */
			/* =========================================================== */

			/**
			 * Called when the worklist controller is instantiated.
			 * @public
			 */
			onInit : function () {
				// Model used to manipulate control states. The chosen values make sure,
				// detail page is busy indication immediately so there is no break in
				// between the busy indication for loading the view's meta data
				var iOriginalBusyDelay,
					oViewModel = new JSONModel({
						busy : true,
						delay : 0
					});

				this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

				// Store original busy indicator delay, so it can be restored later on
				iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
				this.setModel(oViewModel, "objectView");
				this.getOwnerComponent().getModel().metadataLoaded().then(function () {
						// Restore original busy indicator delay for the object view
						oViewModel.setProperty("/delay", iOriginalBusyDelay);
					}
				);
			},

			/* =========================================================== */
			/* event handlers                                              */
			/* =========================================================== */

			/**
			 * Event handler when the share in JAM button has been clicked
			 * @public
			 */
			onShareInJamPress : function () {
				var oViewModel = this.getModel("objectView"),
					oShareDialog = sap.ui.getCore().createComponent({
						name: "sap.collaboration.components.fiori.sharing.dialog",
						settings: {
							object:{
								id: location.href,
								share: oViewModel.getProperty("/shareOnJamTitle")
							}
						}
					});
				oShareDialog.open();
			},


			/* =========================================================== */
			/* internal methods                                            */
			/* =========================================================== */

			/**
			 * Binds the view to the object path.
			 * @function
			 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
			 * @private
			 */
			_onObjectMatched : function (oEvent) {
				var sObjectId =  oEvent.getParameter("arguments").objectId;
				this.getModel().metadataLoaded().then( function() {
					var sObjectPath = this.getModel().createKey("WorkerSet", {
						Userid :  sObjectId
					});
					this._bindView("/" + sObjectPath);
				}.bind(this));
			},

			/**
			 * Binds the view to the object path.
			 * @function
			 * @param {string} sObjectPath path to the object to be bound
			 * @private
			 */
			_bindView : function (sObjectPath) {
				var oViewModel = this.getModel("objectView"),
					oDataModel = this.getModel();

				this.getView().bindElement({
					path: sObjectPath,
					events: {
						change: this._onBindingChange.bind(this),
						dataRequested: function () {
							oDataModel.metadataLoaded().then(function () {
								// Busy indicator on view should only be set if metadata is loaded,
								// otherwise there may be two busy indications next to each other on the
								// screen. This happens because route matched handler already calls '_bindView'
								// while metadata is loaded.
								oViewModel.setProperty("/busy", true);
							});
						},
						dataReceived: function () {
							oViewModel.setProperty("/busy", false);
						}
					}
				});
			},

			_onBindingChange : function () {
				var oView = this.getView(),
					oViewModel = this.getModel("objectView"),
					oElementBinding = oView.getElementBinding();

				// No data for the binding
				if (!oElementBinding.getBoundContext()) {
					this.getRouter().getTargets().display("objectNotFound");
					return;
				}

				var oResourceBundle = this.getResourceBundle(),
					oObject = oView.getBindingContext().getObject(),
					sObjectId = oObject.Userid,
					sObjectName = oObject.Firstname;

				oViewModel.setProperty("/busy", false);
				// Add the object page to the flp routing history
				this.addHistoryEntry({
					title: this.getResourceBundle().getText("objectTitle") + " - " + sObjectName,
					icon: "sap-icon://enter-more",
					intent: "#CaptureValuesformScreenElements-display&/WorkerSet/" + sObjectId
				});

				oViewModel.setProperty("/saveAsTileTitle", oResourceBundle.getText("saveAsTileTitle", [sObjectName]));
				oViewModel.setProperty("/shareOnJamTitle", sObjectName);
				oViewModel.setProperty("/shareSendEmailSubject",
				oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
				oViewModel.setProperty("/shareSendEmailMessage",
				oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
			},
			
			submitData : function()
			{
				var lv_userId	= this.getView().byId("id_userId").getValue();
				var lv_pWrd 	= this.getView().byId("id_pWrd").getValue();
				var lv_fName	= this.getView().byId("id_fName").getValue();
				var lv_lName	= this.getView().byId("id_lName").getValue();
				var lv_email	= this.getView().byId("id_email").getValue();
				var lv_cntr		= this.getView().byId("id_cntr").getValue();
				var lv_sal		= this.getView().byId("id_sal").getValue();
				var lv_mbl		= this.getView().byId("id_mbl").getValue();
				var  lv_cBox	= this.getView().byId("id_cBox").getSelected();
				var lv_dt		= this.getView().byId("id_dt").getValue();
				var lv_tim  	= this.getView().byId("id_tim").getValue();
				var lv_progInd	= this.getView().byId("id_progInd").getPercentValue();
				var lv_rtng		= this.getView().byId("id_rtng").getValue();
				var lv_sldr		=	this.getView().byId("id_sldr").getValue();
				var lv_tArea	= this.getView().byId("id_tArea").getValue();
				var lv_dDown    = this.getView().byId("id_dDown").getSelectedItem().getText();
				var  lv_cmBox	= this.getView().byId("id_cmBox").getSelectedItem().getText();
				var  lv_mCBox	= this.getView().byId("id_mCBox").getSelectedItems();	
				var  lv_mInpt	= this.getView().byId("id_mInpt").getTokens();
				
				var  la_mCBox	=	[];
				var  la_mInpt	=	[];
				
				for(var i = 0; i < lv_mCBox.length; i++)
				{
					la_mCBox.push(lv_mCBox[i].getText());
				}
				
				for(var j = 0; j < lv_mInpt.length; j++)
				{
					la_mInpt.push(lv_mInpt[j].getText());
				}
				
				// Display captured values
				sap.m.MessageBox.success( lv_userId + " " + lv_pWrd + " " + lv_fName + " " + lv_lName +
										  " " + lv_email + " " + lv_cntr + " " + lv_sal + " " + lv_mbl +
										  " " + lv_cBox + " " + lv_dt + " " + lv_tim + " " + lv_progInd +
										  " " + lv_rtng + " " + lv_sldr + " " + lv_tArea + " " + lv_dDown +
										  " " + lv_cmBox + " " + la_mCBox + " " + la_mInpt );

			}

		});

	}
);