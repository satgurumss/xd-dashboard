var utilsModule = function() {

	function isNullOrEmpty (data) {
		var isValid;
		isValid = false;
		if (data === null || data === void 0 || typeof data === "undefined") {
			isValid = true;
		} else {
			isValid = false;
		}
		return isValid;
	};

	function isNotNullOrEmpty  (data) {
		return !this.isNullOrEmpty(data);
	};

	return{
		isNullOrEmpty : isNullOrEmpty,
		isNotNullOrEmpty : isNotNullOrEmpty
	}
};

module.exports = utilsModule();