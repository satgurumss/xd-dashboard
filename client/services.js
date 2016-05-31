(function() {
  'use strict';

  var webViewMessages = {
      hypr_login: "hypr_login",
      hypr_register: "hypr_register"
    },
    hyprLoggedIn = false,
    usingHypr = false;

  angular.module('app')
    .factory('loggedInUser', loggedInUser)
    .factory('gaugesService', gaugesService)
    .factory('WebViewService', webViewService)
    .factory('spreadSheetService', spreadSheetService)
    .factory('utils', utils);

  function loggedInUser($cookies, $location, $http, $q, $rootScope) {
    console.log("loggedInUser")

    return {
      logOutUser: function() {
        $http.post("/logout")
          .success(function(data, status, headers, config) {
            hyprLoggedIn = false;
            $location.url("/signin");
          })
          .error(function(data, status, headers, config) {
            console.log("error");
          })
      },
      isLoggedIn: function(route) {

        $http.get("/isLoggedInUser")
          .success(function(data, status) {
            if (!data.isLoggedIn && !usingHypr)
              $location.url("/signin");
            else if (!hyprLoggedIn && usingHypr) {
              $location.url("/signin");
            } else {

              if (!usingHypr) {
                $rootScope.$broadcast("userLoggedIn", {
                  "userRole": data.user.userRole
                });
              } else {
                $rootScope.$broadcast("userLoggedIn", {
                  "userRole": "CEO"
                });
              }

              $location.url(route)
            }
          })
          .error(function(data, status) {
            $location.url("/signin");
          });
      },
      fetchCurrentUser: function() {
        return $http.get("/fetch-current-user");
      }
    };
  }

  function gaugesService(CONST) {
    return {
      updateGaugeState: function(gaugesList) {
        _.each(gaugesList, function(gauge) {
          if (gauge.percent <= 30) {
            gauge.colors = CONST.gaugeDanger
            gauge.className = "circle-danger"
          } else if (30 < gauge.percent && gauge.percent <= 50) {
            gauge.colors = CONST.gaugeWarning
            gauge.className = "circle-warning"
          } else if (50 < gauge.percent && gauge.percent <= 100) {
            gauge.colors = CONST.gaugeSuccess
            gauge.className = "circle-success"
          }
        });

        return gaugesList;
      }
    }
  }

  function webViewService($window, $location) {
    return {
      hyprLogin: function(name) {
        usingHypr = true;
        var message = {
          action: webViewMessages.hypr_login,
          name: name
        };
        message = JSON.stringify(message);
        console.log(message);
        if ($window.WebViewBridge) $window.WebViewBridge.send(message);
      },
      hyprRegister: function(hyprname) {
        usingHypr = true;
        var message = {
          name: hyprname,
          action: webViewMessages.hypr_register
        };
        message = JSON.stringify(message);
        console.log(message);
        if ($window.WebViewBridge) $window.WebViewBridge.send(message);
      },
      responseHandler: function(response) {

        console.log(response);
        response = JSON.parse(response);

        console.log("in service");
        console.log(response);

        switch (response.action) {
          case "reg_response":
            if (response.data.Response === 'Success') {
              console.log("iin iff");
              hyprLoggedIn = true;
              $location.url("/landing");

            }
            break;

          case "auth_response":
            if (response.data.Response === 'Success!') {
              console.log("iin iff");
              hyprLoggedIn = true;
              $location.url("/landing");

            }
            break;
        }
      }
    }
  }

  /*function spreadSheetService(XDENSITY, $http, $log, $rootScope) {
    // This will read data for all the sheets
    function readGoogleSpreadSheet(spreadSheetId, sheets, callback) {
      console.log("fetching data");
      var promises = [];

      for (var sheet in sheets) {
        if (sheets.hasOwnProperty(sheet)) {
          promises.push(readGoogleSheet(spreadSheetId, sheets[sheet]));
        }
      }

      Promise.all(promises)
        .then(callback)
        .catch(function(err) {
          $rootScope.$broadcast("excelDataLoaded", {
            "isLoaded": XDENSITY.isLoaded
          });
          console.log(err);
        });
    }

    // This will read a data for single sheet
    function readGoogleSheet(spreadSheetId, sheet) {
      return new Promise(function(resolve, reject) {
        $.ajax(XDENSITY.urls.googleSheetUrl1 + spreadSheetId + XDENSITY.urls.googleSheetUrl2 + sheet.id)
          .done(function(result) {
            if (sheet.isArray) {
              sheet.data = CSVToArray(result);
            } else {
              sheet.data = CSVToObject(result);
            }
            resolve();
          })
          .fail(function(response) {
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
  }*/

  function spreadSheetService($http) {

    return {
      fetchData: function() {
        return $http.get("/fetchExcelData")
      }
    }
  }

  function utils(XDENSITY, spreadSheetService, $log) {

    function abbreviateNumber(num, digits) {
      var si = [{
          value: 1E18,
          symbol: "E"
        }, {
          value: 1E15,
          symbol: "P"
        }, {
          value: 1E12,
          symbol: "T"
        }, {
          value: 1E9,
          symbol: "B"
        }, {
          value: 1E6,
          symbol: "M"
        }, {
          value: 1E3,
          symbol: "K"
        }],
        i;

      num = typeof num !== "undefined" ? parseInt(num) : "";
      if (num > 0 && num != "") {

        for (i = 0; i < si.length; i++) {
          if (num >= si[i].value) {
            return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].symbol;
          }
        }
        return num.toString();
      } else {
        return num;
      }
    };

    function formatNumberToSD(num, digits) {
      var si = [{
          value: 1E18,
          symbol: "E"
        }, {
          value: 1E15,
          symbol: "P"
        }, {
          value: 1E12,
          symbol: "T"
        }, {
          value: 1E9,
          symbol: "B"
        }, {
          value: 1E6,
          symbol: "M"
        }, {
          value: 1E3,
          symbol: "K"
        }],
        i;

      num = typeof num !== "undefined" ? parseInt(num) : "";
      if (num > 0 && num != "") {

        for (i = 0; i < si.length; i++) {
          if (num >= si[i].value) {
            return parseInt((num / si[i].value).toFixed(digits));
          }
        }
      }
      return num;
    };

    function calculateGaugePercentage(property) {
      console.log(property);
      var budget = XDENSITY.sheets.departments.data[property].Budget,
        spent = XDENSITY.sheets.departments.data[property].Spend;

      console.log(budget)
      console.log(spent)

      budget = parseInt(budget.replace(/,/g, ""));
      spent = parseInt(spent.replace(/,/g, ""));

      return Math.round((spent / budget) * 100);
    };

    function getDeptData(property) {
      return XDENSITY.sheets.departments.data[property]
    }

    function formatNumberFromString(number) {
      var formattedNumber = abbreviateNumber(parseInt(number.replace(/,/g, "")));
      return !_.isNaN(formattedNumber) ? formattedNumber : "-";
    }

    function getVendorsAlignment(property) {
      var total = XDENSITY.sheets.departments.data[property].vendors,
        aligned = XDENSITY.sheets.departments.data[property].fYAlignment;

      total = parseInt(total.replace(/,/g, ""));
      aligned = parseInt(aligned.replace(/,/g, ""));

      return Math.round((aligned / total) * 100);
    }

    function getDataFromDepartments(dept, value) {
      return parseInt(XDENSITY.sheets.departments.data[dept][value].replace(/,/g, ""))
    }

    function getAutoCompleteData(queryText) {
      queryText = queryText.toLowerCase();

      return _.filter(XDENSITY.sheets.vendors.data, function(vendor) {
        var vendorName = angular.copy(vendor.vendorName.toLowerCase());
        return vendorName.includes(queryText);
      })
    }

    function searchVendors(queryText) {
      if (_.isEmpty(queryText)) {
        return XDENSITY.sheets.vendors.data
      };

      return _.filter(XDENSITY.sheets.vendors.data, function(vendor) {
        return vendor.vendorName === queryText
      });
    }

    function getDeptTrendData(deptName) {
      function getYearData(year) {
        var data = _.map(_.where(XDENSITY.sheets.spend.data, {
          department: deptName,
          year: year
        }), function(object) {
          return {
            budget: formatNumberToSD(parseInt(object.budget.replace(/,/g, ""))),
            spend: formatNumberToSD(parseInt(object.spend.replace(/,/g, "")))
          };
        });
        return data;
      }

      var trendData = {
        "2014": getYearData("2014")[0],
        "2015": getYearData("2015")[0],
        "2016": getYearData("2016")[0]
      };

      console.log(trendData)
      return trendData;
    }

    function getTopVendors(deptName) {
      var topVendors = [],
        deptVendors = [];

      if (deptName !== "Organization") {
        deptVendors = _.filter(XDENSITY.sheets.vendors.data, function(vendor) {
          return vendor.businessVertical === deptName;
        });
      } else {
        deptVendors = XDENSITY.sheets.vendors.data;
      }

      deptVendors = _.sortBy(deptVendors, function(vendor) {
        vendor.contractValue = angular.copy(parseInt(vendor.contractValue2016.replace(/,/g, ""))) / 1000000;
        vendor.contractValue = parseFloat(vendor.contractValue.toFixed(2));
        return vendor.contractValue;
      }).reverse();

      topVendors = deptVendors.splice(0, 5);

      /*      _.each(topVendors, function(vendor){
        vendor.contractValue = formatNumberToSD(vendor.contractValue);
      });*/

      return topVendors;
    }

    function formatDeptChartData() {
      $log.info("formatDeptChartData")
      var series = {
        budget: [],
        spent: [],
        overSpent: []
      };

      var departments = _.filter(XDENSITY.sheets.departments.data, function(dept, key) {
        return key !== "Organization"
      });

      $log.info(departments)
      _.each(departments, function(dept) {
        $log.info("Current department")
        $log.info(dept)

        var budget = dept.Budget,
          spent = dept.Spend,
          diff = 0,
          budgetData = {
            low: 0,
            high: 0
          },
          spentData = {
            low: 0,
            high: 0
          },
          overSpentData = {
            low: 0,
            high: 0
          };

        budget = parseInt(budget.replace(/,/g, "")) / 1000000;
        spent = parseInt(spent.replace(/,/g, "")) / 1000000;

        budget = parseFloat(budget.toFixed(2));
        spent = parseFloat(spent.toFixed(2));
        diff = budget - spent;

        if (diff > 0) {
          budgetData.low = spent;
          budgetData.high = budget;

          spentData.high = spent;
        } else if (diff < 0) {
          budgetData.high = budget;

          overSpentData.low = budget;
          overSpentData.high = budget + -1 * (diff);
        }

        series.budget.push(budgetData);
        series.spent.push(spentData);
        series.overSpent.push(overSpentData);
      });
      return series;
    }

    function validateExcelData(callback) {
      $log.info(XDENSITY.isLoaded)
      if (XDENSITY.isLoaded)
        callback()
      else {
        //spreadSheetService.fetchData(XDENSITY.spreadSheetId, XDENSITY.sheets, callback);
        spreadSheetService.fetchData().then(function(res) {
          $log.info("data loaded on reload");
          XDENSITY = angular.copy(res.data);

          $log.info(XDENSITY);
          callback()
        });
      }
    }

    return {
      abbreviateNumber: abbreviateNumber,
      getGaugePercent: calculateGaugePercentage,
      getDeptData: getDeptData,
      getDeptTrendData: getDeptTrendData,
      formatNumberFromString: formatNumberFromString,
      getTopVendors: getTopVendors,
      getVendorsAlignment: getVendorsAlignment,
      getDataFromDepartments: getDataFromDepartments,
      getAutoCompleteData: getAutoCompleteData,
      searchVendors: searchVendors,
      validateExcelData: validateExcelData,
      formatNumberToSD: formatNumberToSD,
      formatDeptChartData : formatDeptChartData
    }
  }

})();