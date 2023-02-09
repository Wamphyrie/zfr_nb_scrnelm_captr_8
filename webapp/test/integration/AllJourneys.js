/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"phoenix/zfr_nb_scrnelm_captr_8/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"phoenix/zfr_nb_scrnelm_captr_8/test/integration/pages/Worklist",
	"phoenix/zfr_nb_scrnelm_captr_8/test/integration/pages/Object",
	"phoenix/zfr_nb_scrnelm_captr_8/test/integration/pages/NotFound",
	"phoenix/zfr_nb_scrnelm_captr_8/test/integration/pages/Browser",
	"phoenix/zfr_nb_scrnelm_captr_8/test/integration/pages/App"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "phoenix.zfr_nb_scrnelm_captr_8.view."
	});

	sap.ui.require([
		"phoenix/zfr_nb_scrnelm_captr_8/test/integration/WorklistJourney",
		"phoenix/zfr_nb_scrnelm_captr_8/test/integration/ObjectJourney",
		"phoenix/zfr_nb_scrnelm_captr_8/test/integration/NavigationJourney",
		"phoenix/zfr_nb_scrnelm_captr_8/test/integration/NotFoundJourney",
		"phoenix/zfr_nb_scrnelm_captr_8/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});