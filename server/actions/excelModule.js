var excelModule = function() {
  var https = require("https"),
    XLSX = require("xlsx"),
    sheetPath = "./actions/vendor-sheet.xlsx"
  XDENSITY = {
    sheets: {
      vendors: {
        data: []
      },
      departments: {
        data: {}
      },
      spend: {
        data: []
      }
    },
    isLoaded: true
  };

  // This will read data for all the sheets
  function readGoogleSpreadSheet(req, res) {
    var workbook = XLSX.readFile(sheetPath);

    XDENSITY.sheets.vendors.data = XLSX.utils.sheet_to_json(workbook.Sheets["Vendors"]);
    XDENSITY.sheets.spend.data = XLSX.utils.sheet_to_json(workbook.Sheets["Spend"]);
    XDENSITY.sheets.departments.data = convertObjectNotation(XLSX.utils.sheet_to_json(workbook.Sheets["Departments"]));
    
    res.send(XDENSITY);
  }

  function convertObjectNotation(sheet) {
    var convertedObject = {}

    sheet.forEach(function(item, index, array) {
      if (!convertedObject.hasOwnProperty(item.department)) {
        convertedObject[item.department] = item;
      }
    });
    
    return convertedObject;
  }

  // This will read a data for single sheet
  function readGoogleSheet(sheet) {
    var options = {
      hostname: XDENSITY.urls.googleSheetUrl1,
      path: XDENSITY.urls.googleSheetUrl2 + spreadSheetId + XDENSITY.urls.googleSheetUrl3 + sheet.id,
      method: "GET"
    };

    console.log(options)
    return new Promise(function(resolve, reject) {
      var req = https.request(options, function(res) {
        //console.log(res)
        if (sheet.isArray) {
          sheet.data = CSVToArray(res.data);
        } else {
          sheet.data = CSVToObject(res.data);
        }
        resolve();
      });

      req.end();

      req.on("error", function(response) {
        reject(Error(response));
      });
    });
  }

  // This will parse a delimited string into an array of
  // arrays. The default delimiter is the comma, but this
  // can be overriden in the second argument.
  function CSVToArray(strData, strDelimiter) {
    var props = [],
      arrData = [], // This holds the data
      arrMatches = null, // This holds our individual pattern matching groups.
      propsIterator = 0;

    // Check to see if the delimiter is defined. If not, then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
      (
        // Delimiters.
        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
        // Quoted fields.
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
        // Standard fields.
        "([^\"\\" + strDelimiter + "\\r\\n]*))"
      ),
      "gi"
    );
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
      // Get the delimiter that was found.
      var strMatchedDelimiter = arrMatches[1];
      // Check to see if the given delimiter has a length
      // (is not the start of string) and if it matches
      // field delimiter. If id does not, then we know
      // that this delimiter is a row delimiter.
      if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {

        // Since we have reached a new row of data,
        // add an empty row to our data array.
        propsIterator = 0;
        arrData.push({});
      }

      // Now that we have our delimiter out of the way,
      // let's check to see which kind of value we
      // captured (quoted or unquoted).
      if (arrMatches[2]) {
        // We found a quoted value. When we capture
        // this value, unescape any double quotes.
        var strMatchedValue = arrMatches[2].replace(
          new RegExp("\"\"", "g"),
          "\""
        );
      } else {
        // We found a non-quoted value.
        var strMatchedValue = arrMatches[3];
      }

      if (arrData.length > 0) {
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1][props[propsIterator++]] = strMatchedValue;
      } else {
        props.push(strMatchedValue);
      }


    }
    // Return the parsed data.
    return (arrData);
  }

  // This will parse a delimited string into an array of
  // arrays. The default delimiter is the comma, but this
  // can be overriden in the second argument.
  function CSVToObject(strData, strDelimiter) {
    var props = [],
      object = undefined, // This holds the data
      objProp = undefined,
      arrMatches = null, // This holds our individual pattern matching groups.
      propsIterator = 0;

    // Check to see if the delimiter is defined. If not, then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
      (
        // Delimiters.
        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
        // Quoted fields.
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
        // Standard fields.
        "([^\"\\" + strDelimiter + "\\r\\n]*))"
      ),
      "gi"
    );
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
      // Get the delimiter that was found.
      var strMatchedDelimiter = arrMatches[1];
      // Check to see if the given delimiter has a length
      // (is not the start of string) and if it matches
      // field delimiter. If id does not, then we know
      // that this delimiter is a row delimiter.
      if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {

        // Since we have reached a new row of data,
        // add an empty row to our data array.
        propsIterator = 0;
        if (object) {

        } else {
          object = {};
        }
      }

      // Now that we have our delimiter out of the way,
      // let's check to see which kind of value we
      // captured (quoted or unquoted).
      if (arrMatches[2]) {
        // We found a quoted value. When we capture
        // this value, unescape any double quotes.
        var strMatchedValue = arrMatches[2].replace(
          new RegExp("\"\"", "g"),
          "\""
        );
      } else {
        // We found a non-quoted value.
        var strMatchedValue = arrMatches[3];
      }

      if (object) {
        // Now that we have our value string, let's add
        // it to the data array.
        if (propsIterator == 0) {
          object[strMatchedValue] = {};
          propsIterator++;
          objProp = strMatchedValue;
        } else {
          object[objProp][props[propsIterator++]] = strMatchedValue;
        }
      } else {
        props.push(strMatchedValue);
      }


    }
    // Return the parsed data.
    return (object);
  }

  return {
    fetchData: readGoogleSpreadSheet
  }
}

module.exports = excelModule();