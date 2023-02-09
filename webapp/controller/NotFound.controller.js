sap.ui.define([
		"phoenix/zfr_nb_scrnelm_captr_8/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("phoenix.zfr_nb_scrnelm_captr_8.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);