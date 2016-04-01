var clickEvent;
(function() {
  'use strict';

  angular.module('app')
    .controller('DashboardCtrl', ['$scope', '$http', '$location', 'backendApi', 'loggedInUser', '$timeout', DashboardCtrl])
    .filter('singleDecimal', function($filter) {
      return function(input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
      };
    });

  function DashboardCtrl($scope, $http, $location, backendApi, loggedInUser, $timeout) {
    $scope.searchbarWidth = "col-xs-12"
    $scope.searchTypeWidth = "col-xs-10"
    $scope.line2 = {};
    $scope.radar1 = {};
    $scope.deals = [];
    $scope.queryText = "";
    $scope.showChart = false;
    $scope.showAdded = false;
    var currentUser;
    $scope.bar1 = {};
    $scope.userName = "Administrator"
    $scope.setColClass = function(widget) {
      return widget.mapData ? 'col-md-8 col-sm-12' : 'col-md-4 col-sm-6';
    }
    $scope.init = function() {
      //use this to get current user
      currentUser = loggedInUser.getCurrentUser();
      console.log("currentUser ", currentUser)

      if (!_.isEmpty(currentUser)) {
        $scope.userName = currentUser.account_s[0];
        $scope.name_s = currentUser.name_s[0]

        $scope.qBoost = loggedInUser.getQBoost();
        console.log('qboost:: ', $scope.qBoost);
        // $scope.qBoost = loggedInUser.getQBoost().then(function());

        backendApi.search(dealReport).then(function(res) {
          console.log("report data");
          console.log(res);
          $scope.reportData = res.data.documents;
          // for (let i = 0; i < res.data.documents.length; i++) {
          //   $scope.bar3.options.series[0].data.push(parseInt(res.data.documents[i].fields.AVG[0]));
          //   $scope.bar3.options.series[1].data.push(parseInt(res.data.documents[i].fields.MAX[0]));
          //   $scope.bar3.options.series[2].data.push(parseInt(res.data.documents[i].fields.MIN[0]));
          //   $scope.bar3.options.series[3].data.push(parseInt(res.data.documents[i].fields.STDEV[0]));
          //   $scope.bar3.options.series[4].data.push(parseInt(res.data.documents[i].fields.SUM[0]));
          //   $scope.bar3.options.series[5].data.push(parseInt(res.data.documents[i].fields.count[0]));

          //   if (i === res.data.documents.length - 1) {
          //     $scope.showChart = true;
          //   }
          // }
          console.log($scope.bar3.options);
        });
      } else
        loggedInUser.logOutUser();

      $scope.valueRange = [0, 10000000];
      $scope.colorRange = ["#F03B20", "#FFEDA0"];
      $scope.dimension = 600;
      $scope.mapWidth = 300;
      // $scope.descriptiveText = 'failure %';
      $scope.countryFillColor = "#0079c1";
      $scope.countryBorderColor = "#fff";

      $scope.isoCountries = {
        "Afghanistan": "AFG",
        "Albania": "ALB",
        "Algeria": "DZA",
        "Angola": "AGO",
        "Antarctica": "ATA",
        "Argentina": "ARG",
        "Armenia": "ARM",
        "Australia": "AUS",
        "Austria": "AUT",
        "Azerbaijan": "AZE",
        "Bangladesh": "BGD",
        "Belarus": "BLR",
        "Belgium": "BEL",
        "Belize": "BLZ",
        "Benin": "BEN",
        "Bhutan": "BTN",
        "Bolivia": "BOL",
        "Bosnia and Herzegovina": "BIH",
        "Botswana": "BWA",
        "Brazil": "BRA",
        "Brunei": "BRN",
        "Bulgaria": "BGR",
        "Burkina Faso": "BFA",
        "Burundi": "BDI",
        "Cambodia": "KHM",
        "Cameroon": "CMR",
        "Canada": "CAN",
        "Central African Republic": "CAF",
        "Chad": "TCD",
        "Chile": "CHL",
        "China": "CHN",
        "Colombia": "COL",
        "Costa Rica": "CRI",
        "Croatia": "HRV",
        "Cuba": "CUB",
        "Cyprus": "CYP",
        "Czech Republic": "CZE",
        "Democratic Republic of the Congo": "COD",
        "Denmark": "DNK",
        "Djibouti": "DJI",
        "Dominican Republic": "DOM",
        "East Timor": "TLS",
        "Ecuador": "ECU",
        "Egypt": "EGY",
        "El Salvador": "SLV",
        "Equatorial Guinea": "GNQ",
        "Eritrea": "ERI",
        "Estonia": "EST",
        "Ethiopia": "ETH",
        "Falkland Islands": "FLK",
        "Fiji": "FJI",
        "Finland": "FIN",
        "France": "FRA",
        "French Southern and Antarctic Lands": "ATF",
        "Gabon": "GAB",
        "Gambia": "GMB",
        "Georgia": "GEO",
        "Germany": "DEU",
        "Ghana": "GHA",
        "Greece": "GRC",
        "Greenland": "GRL",
        "Guatemala": "GTM",
        "Guinea": "GIN",
        "Guinea Bissau": "GNB",
        "Guyana": "GUY",
        "Haiti": "HTI",
        "Honduras": "HND",
        "Hungary": "HUN",
        "Iceland": "ISL",
        "India": "IND",
        "Indonesia": "IDN",
        "Iran": "IRN",
        "Iraq": "IRQ",
        "Ireland": "IRL",
        "Israel": "ISR",
        "Italy": "ITA",
        "Ivory Coast": "CIV",
        "Jamaica": "JAM",
        "Japan": "JPN",
        "Jordan": "JOR",
        "Kazakhstan": "KAZ",
        "Kenya": "KEN",
        "Kosovo": "-99",
        "Kuwait": "KWT",
        "Kyrgyzstan": "KGZ",
        "Laos": "LAO",
        "Latvia": "LVA",
        "Lebanon": "LBN",
        "Lesotho": "LSO",
        "Liberia": "LBR",
        "Libya": "LBY",
        "Lithuania": "LTU",
        "Luxembourg": "LUX",
        "Macedonia": "MKD",
        "Madagascar": "MDG",
        "Malawi": "MWI",
        "Malaysia": "MYS",
        "Mali": "MLI",
        "Mauritania": "MRT",
        "Mexico": "MEX",
        "Moldova": "MDA",
        "Mongolia": "MNG",
        "Montenegro": "MNE",
        "Morocco": "MAR",
        "Mozambique": "MOZ",
        "Myanmar": "MMR",
        "Namibia": "NAM",
        "Nepal": "NPL",
        "Netherlands": "NLD",
        "New Caledonia": "NCL",
        "New Zealand": "NZL",
        "Nicaragua": "NIC",
        "Niger": "NER",
        "Nigeria": "NGA",
        "North Korea": "PRK",
        "Northern Cyprus": "-99",
        "Norway": "NOR",
        "Oman": "OMN",
        "Pakistan": "PAK",
        "Panama": "PAN",
        "Papua New Guinea": "PNG",
        "Paraguay": "PRY",
        "Peru": "PER",
        "Philippines": "PHL",
        "Poland": "POL",
        "Portugal": "PRT",
        "Puerto Rico": "PRI",
        "Qatar": "QAT",
        "Republic of Serbia": "SRB",
        "Republic of the Congo": "COG",
        "Romania": "ROU",
        "Russia": "RUS",
        "Rwanda": "RWA",
        "Saudi Arabia": "SAU",
        "Senegal": "SEN",
        "Sierra Leone": "SLE",
        "Slovakia": "SVK",
        "Slovenia": "SVN",
        "Solomon Islands": "SLB",
        "Somalia": "SOM",
        "Somaliland": "-99",
        "South Africa": "ZAF",
        "South Korea": "KOR",
        "South Sudan": "SDS",
        "Spain": "ESP",
        "Sri Lanka": "LKA",
        "Sudan": "SDN",
        "Suriname": "SUR",
        "Swaziland": "SWZ",
        "Sweden": "SWE",
        "Switzerland": "CHE",
        "Syria": "SYR",
        "Taiwan": "TWN",
        "Tajikistan": "TJK",
        "Thailand": "THA",
        "The Bahamas": "BHS",
        "Togo": "TGO",
        "Trinidad and Tobago": "TTO",
        "Tunisia": "TUN",
        "Turkey": "TUR",
        "Turkmenistan": "TKM",
        "Uganda": "UGA",
        "Ukraine": "UKR",
        "United Arab Emirates": "ARE",
        "United Kingdom": "GBR",
        "United Republic of Tanzania": "TZA",
        "United States of America": "USA",
        "Uruguay": "URY",
        "Uzbekistan": "UZB",
        "Vanuatu": "VUT",
        "Venezuela": "VEN",
        "Vietnam": "VNM",
        "West Bank": "PSE",
        "Western Sahara": "-99",
        "Yemen": "YEM",
        "Zambia": "ZMB",
        "Zimbabwe": "ZWE"
      };

      $scope.widgets = [{
        title: "My Deals",
        iconUrl: "images/icons/deals.png",
        smallIconUrl: "images/icons-small/icon_deals.png",
        searches: [],
        isHide: false,
        query: {
          "workflow": "myDeals",
          "query": "*",
          "username": $scope.name_s,
          "realm": "Anonymous",
          "restParams": {
            "q.boost": $scope.qBoost
          }
        }
      }, {
        title: "My Investments",
        iconUrl: "images/icons/investment.png",
        smallIconUrl: "images/icons-small/icon_investment.png",
        searches: [],
        isHide: false,
        query: {
          "workflow": "myInvestments",
          "query": "*",
          "username": $scope.name_s,
          "realm": "Anonymous",
          "restParams": {
            "q.boost": $scope.qBoost
          }
        }
      }, {
        title: "My Region",
        iconUrl: "images/icons/location.png",
        smallIconUrl: "images/icons-small/icon_location.png",
        searches: [],
        isHide: false,
        query: {
          "workflow": "myRegion",
          "query": "*",
          "username": $scope.userName,
          "realm": "Anonymous",
          "restParams": {
            "q.boost": $scope.qBoost
          }
        }
      }, {
        title: "MAP",
        iconUrl: "images/icons/icon_map.png",
        smallIconUrl: "images/icons-small/icon_map.png",
        isHide: false,
        dealTypes: [{
          'label': 'All Deal Types',
          'value': 'all'
        }, {
          'label': 'Change of Control',
          'value': 'Change of Control'
        }, {
          'label': 'Growth Capital',
          'value': 'Growth Capital'
        }, {
          'label': 'LBO',
          'value': 'LBO'
        }, {
          'label': 'MBO',
          'value': 'MBO'
        }, {
          'label': 'Replacement Capital',
          'value': 'Replacement Capital'
        }],
        selectedDealType: {
          'label': 'All Deal Types',
          'value': 'all'
        },
        metrics: [{
          'label': 'Total Investment',
          'value': 'total_investment_d'
        }, {
          'label': 'Number of Employees',
          'value': 'number_of_employees_i'
        }, {
          'label': 'Enterprise Value',
          'value': 'enterprise_value_d'
        }, {
          'label': 'Coinvestment Ammount',
          'value': 'available_coinvestment_amount_d'
        }, {
          'label': 'Acquisition Debt',
          'value': 'acquisition_debt_d'
        }],
        selectedMetric: {
          'label': 'Total Investment',
          'value': 'total_investment_d'
        },
        mapData: {
          valueRange: [0, 10000],
          colorRange: ["#C4D3BF", "#F56505"],
          dimension: 1400,
          mapWidth: 800,
          // descriptiveText: 'failure %',
          countryFillColor: "#aaa",
          countryBorderColor: "#fff",
          worldData: []
        },
        query: {
          "workflow": "abraajSearch",
          "query": "table:deal",
          "username": $scope.name_s,
          "realm": "Anonymous",
          "rows": 100,
          "queryLanguage": "simple",
          "restParams": {
            "highlight": ["true"],
            "q.boost": $scope.qBoost
          }
        }
      }, {
        title: "My Interests",
        iconUrl: "images/icons/interests.png",
        smallIconUrl: "images/icons-small/icon_interests.png",
        searches: [],
        isHide: false,
        query: {
          "workflow": "myInterests",
          "query": "*",
          "username": $scope.userName,
          "realm": "Anonymous",
          "restParams": {
            "q.boost": $scope.qBoost
          }
        }
      }, {
        title: "Carrying Value Bar Chart",
        iconUrl: "images/icons/value2.png",
        smallIconUrl: "images/icons-small/icon_value2.png",
        searches: [],
        showBar: true,
        chartOptions: [{
          value: "SUM",
          label: "SUM"
        }, {
          value: "AVG",
          label: "AVERAGE"
        }, {
          value: "count",
          label: "count"
        }],
        selectedOption: {
          value: "SUM",
          label: "SUM"
        },
        isHide: false,
        query: {
          "workflow": "investmentReport",
          "query": "*",
          "username": $scope.userName,
          "realm": "Anonymous",
          "restParams": {
            "metric": ["carrying_value_d"],
            "grouping": ["fund_s"],
            "q.boost": $scope.qBoost
          }
        },
        chartConfig: {
          options: {
            chart: {
               type: 'bar'
            }
          },
          cursor: 'pointer',
          series: [{
            name: 'count',
            data: []
          }],
          title: {
            text: 'Funds'
          },
          xAxis: {
            categories: []
          },
          size: {
            width: 400,
            height: 300
          },

          loading: false
        }
      }, {
        title: "Recent Deals",
        iconUrl: "images/icons/recent-deals.png",
        smallIconUrl: "images/icons-small/icon_deals.png",
        searches: [],
        isHide: false,
        query: {
          "workflow": "recentDeals",
          "query": "*",
          "username": $scope.userName,
          "realm": "Anonymous",
          "restParams": {
            "q.boost": $scope.qBoost
          }
        }
      }, {
        title: "Recent Investments",
        iconUrl: "images/icons/investment_recent.png",
        smallIconUrl: "images/icons-small/icon_investment.png",
        searches: [],
        isHide: false,
        query: {
          "workflow": "recentInvestments",
          "query": "*",
          "username": $scope.userName,
          "realm": "Anonymous",
          "restParams": {
            "q.boost": $scope.qBoost
          }
        }
      }, {
        title: "Recent News",
        iconUrl: "images/icons/recent-news.png",
        smallIconUrl: "images/icons-small/icon_news.png",
        searches: [],
        isHide: false,
        query: {
          "workflow": "recentNews",
          "query": "*",
          "username": $scope.userName,
          "realm": "Anonymous",
          "restParams": {
            "q.boost": $scope.qBoost
          }
        }
      }, {
        title: "Recent Documents",
        iconUrl: "images/icons/documents-recent.png",
        smallIconUrl: "images/icons-small/icon_documents.png",
        searches: [],
        isHide: false,
        query: {
          "workflow": "recentDocuments",
          "query": "*",
          "username": $scope.userName,
          "realm": "Anonymous",
          "restParams": {
            "q.boost": $scope.qBoost
          }
        }
      }, {
        title: "Equity Value Pie Chart (fund)",
        iconUrl: "images/widgets/placeholder.png",
        smallIconUrl: "images/icons-small/icon_pie.png",
        searches: [],
        showBar: true,
        showPie: true,
        chartOptions: [{
          value: "SUM",
          label: "SUM"
        }, {
          value: "AVG",
          label: "AVERAGE"
        }, {
          value: "count",
          label: "count"
        }],
        selectedOption: {
          value: "SUM",
          label: "SUM"
        },
        isHide: false,
        query: {
          "workflow": "investmentReport",
          "query": "*",
          "username": $scope.userName,
          "realm": "Anonymous",
          "restParams": {
            "metric": ["equity_value_d"],
            "grouping": ["fund_s"],
            "q.boost": $scope.qBoost
          }
        },
        chartConfig: {
          options: {
            chart: {
              type: 'pie'
            },
            colors: ['#E03274', '#4D7AF3', '#792E6D', '#689477']
          },
          series: [{
            name: 'count',
            data: []
          }],
          sliced: true,
          title: {
            text: ''
          },
          xAxis: {
            categories: []
          },
          size: {
            width: 450,
            height: 300
          },

          loading: false
        }
      }, {
        title: "Total Investments",
        iconUrl: "images/icons/equity.png",
        smallIconUrl: "images/icons-small/icon_equity.png",
        searches: [],
        options: [{
          value: "deal_type_s",
          label: "Deal Type"
        }, {
          value: "stage_s",
          label: "Deal Stage"
        }, {
          value: "status_s",
          label: "Deal Status"
        }, {
          value: "region_s",
          label: "Region"
        }, {
          value: "sector_s",
          label: "Sector"
        }],
        selectedOption: {
          value: "deal_type_s",
          label: "Deal Type"
        },
        isHide: false,
        query: {
          "workflow": "dealReport",
          "query": "*",
          "username": $scope.userName,
          "realm": "Anonymous",
          "restParams": {
            "metric": ["total_investment_d"],
            "grouping": ["deal_type_s"],
            "q.boost": $scope.qBoost
          }
        }
      }, {
        title: "Enterprise Value",
        iconUrl: "images/icons/values.png",
        smallIconUrl: "images/icons-small/icon_values.png",
        searches: [],
        options: [{
          value: "deal_type_s",
          label: "Deal Type"
        }, {
          value: "stage_s",
          label: "Deal Stage"
        }, {
          value: "status_s",
          label: "Deal Status"
        }, {
          value: "region_s",
          label: "Region"
        }, {
          value: "sector_s",
          label: "Sector"
        }],
        selectedOption: {
          value: "deal_type_s",
          label: "Deal Type"
        },
        isHide: false,
        query: {
          "workflow": "dealReport",
          "query": "*",
          "username": $scope.userName,
          "realm": "Anonymous",
          "restParams": {
            "metric": ["enterprise_value_d"],
            "grouping": ["deal_type_s"],
            "q.boost": $scope.qBoost
          }
        }
      }, {
        title: "Employees",
        iconUrl: "images/icons/employe-icon.png",
        smallIconUrl: "images/icons-small/icon_employee.png",
        searches: [],
        options: [{
          value: "deal_type_s",
          label: "Deal Type"
        }, {
          value: "stage_s",
          label: "Deal Stage"
        }, {
          value: "status_s",
          label: "Deal Status"
        }, {
          value: "region_s",
          label: "Region"
        }, {
          value: "sector_s",
          label: "Sector"
        }],
        selectedOption: {
          value: "deal_type_s",
          label: "Deal Type"
        },
        isHide: false,
        query: {
          "workflow": "dealReport",
          "query": "*",
          "username": $scope.userName,
          "realm": "Anonymous",
          "restParams": {
            "metric": ["number_of_employees_i"],
            "grouping": ["deal_type_s"],
            "q.boost": $scope.qBoost
          }
        }
      }, {
        title: "Total Investments",
        iconUrl: "images/icons/equity.png",
        smallIconUrl: "images/icons-small/icon_equity.png",
        searches: [],
        options: [{
          value: "fund_s",
          label: "Fund"
        }, {
          value: "region_s",
          label: "Region"
        }, {
          value: "sector_s",
          label: "Sector"
        }],
        selectedOption: {
          value: "fund_s",
          label: "Fund"
        },
        isHide: false,
        query: {
          "workflow": "investmentReport",
          "query": "*",
          "username": $scope.userName,
          "realm": "Anonymous",
          "restParams": {
            "metric": ["total_investment_d"],
            "grouping": ["fund_s"],
            "q.boost": $scope.qBoost
          }
        }
      }, {
        title: "Carrying Value",
        iconUrl: "images/icons/value2.png",
        smallIconUrl: "images/icons-small/icon_value2.png",
        searches: [],
        options: [{
          value: "fund_s",
          label: "Fund"
        }, {
          value: "region_s",
          label: "Region"
        }, {
          value: "sector_s",
          label: "Sector"
        }],
        selectedOption: {
          value: "fund_s",
          label: "Fund"
        },
        isHide: false,
        query: {
          "workflow": "investmentReport",
          "query": "*",
          "username": $scope.userName,
          "realm": "Anonymous",
          "restParams": {
            "metric": ["carrying_value_d"],
            "grouping": ["fund_s"],
            "q.boost": $scope.qBoost
          }
        }
      }, {
        title: "Equity Value",
        iconUrl: "images/icons/equity.png",
        smallIconUrl: "images/icons-small/icon_equity.png",
        searches: [],
        options: [{
          value: "fund_s",
          label: "Fund"
        }, {
          value: "region_s",
          label: "Region"
        }, {
          value: "sector_s",
          label: "Sector"
        }],
        selectedOption: {
          value: "fund_s",
          label: "Fund"
        },
        isHide: false,
        query: {
          "workflow": "investmentReport",
          "query": "*",
          "username": $scope.userName,
          "realm": "Anonymous",
          "restParams": {
            "metric": ["equity_value_d"],
            "grouping": ["fund_s"],
            "q.boost": $scope.qBoost
          }
        }
      }];

      // $scope.chartConfig = {
      //   options: {
      //     chart: {
      //       type: 'bar'
      //     },
      //     colors: ['red'],
      //   },
      //   series: [{
      //     name: 'count',
      //     data: []
      //   }],
      //   title: {
      //     text: 'Funds'
      //   },
      //   xAxis: {
      //     categories: []
      //   },
      //   size: {
      //     width: 400,
      //     height: 300
      //   },

      //   loading: false
      // }


      $scope.chartOptionChanged = function (widget) {
        console.log("===chart option changed===");
        console.log(widget);
        if (widget.showBar && !widget.showPie) {
          $scope.setBarData(widget);
        }

        if(widget.showBar && widget.showPie) {
          $scope.setPieData(widget);
        }
        // $scope.chartConfig.series = [];
      }
      var dealReport = {
        "workflow": "dealReport",
        "query": "*",
        "username": $scope.userName,
        "realm": "Anonymous",
        "restParams": {
          "metric": ["total_investment_d"],
          "grouping": ["deal_type_s"]
        }
      };

      console.log("----widgets----");
      console.log($scope.widgets);

      $scope.widgets.forEach(function(widget, index, array) {
        backendApi.search(widget.query).then(function(res) {
          // console.log(widget.title, res.data.documents);
          widget.data = res.data.documents;
          if (widget.mapData) {
            $scope.formatMapData(widget);
          }

          if (widget.showBar && !widget.showPie) {
            $scope.setBarData(widget);
          }

          if(widget.showBar && widget.showPie) {
            $scope.setPieData(widget);
          }
          // console.log(res);
        });
      })

    }

    $scope.setPieData = function(widget) {
      widget.chartConfig.series[0].data = [];

      widget.chartConfig.series[0].name = widget.selectedOption.label;
      console.log('pie data');
      console.log(widget);
      widget.data.forEach(function(data) {
        var pieData = [data.fields.label[0], data.fields[widget.selectedOption.value][0]]
        widget.chartConfig.series[0].data.push(pieData);
      });
      // angular.element('tspan')[0].innerHTML('Funds');
    }

    $scope.setBarData = function(widget) {
      widget.chartConfig.series[0].data = [];

      widget.chartConfig.series[0].name = widget.selectedOption.label;
      console.log('bar data');
      console.log(widget);
      widget.data.forEach(function(data) {
        // var pieData = [data.fields.label[0], data.fields[widget.selectedOption.value]]
        widget.chartConfig.series[0].data.push(data.fields[widget.selectedOption.value]);
        widget.chartConfig.xAxis.categories.push(data.fields.label[0])
      });
      // angular.element('tspan')[0].innerHTML('Funds');
    }

    $scope.mapOptionChanged = function(widget) {
      console.log("----map option changed----");
      console.log(widget);

      $scope.showMap = false;
      widget.mapData.worldData.forEach(function(country) {
        country.value = 0;
        widget.data.forEach(function(data, index, array) {
          if (country.countryCode === $scope.getCountryCode(data.fields.country_s) && (data.fields.deal_type_s[0] === widget.selectedDealType.value || widget.selectedDealType.value === 'all')) {
            country.value = typeof data.fields[widget.selectedMetric.value] !== 'undefined' ? country.value + data.fields[widget.selectedMetric.value][0] : country.value;
          }
        })
      });
      console.log(widget);
      $timeout(function() {
        $scope.showMap = true;
      }, 200);
    }

    $scope.formatMapData = function(widget) {
      console.log("----map data----");
      console.log(widget);

      widget.data.forEach(function(data, index, array) {
        widget.mapData.worldData.push({
          'countryCode': $scope.getCountryCode(data.fields.country_s),
          'value': 0
        });
      });

      widget.mapData.worldData = _.uniq(widget.mapData.worldData, function(item, key, a) {
        return item.countryCode;
      });

      $scope.mapOptionChanged(widget);

      // widget.data.forEach(function(data, index, array) {
      //   widget.mapData.worldData.forEach(function(country) {
      //     //if (data.fields.deal_type_s === 'MBO') {
      //     if(country.countryCode === $scope.getCountryCode(data.fields.country_s)) {
      //       country.value = country.value + data.fields['total_investment_d'][0];
      //     }
      //   })
      // });
      // $scope.showMap = true;
      console.log(widget.mapData);
    }

    $scope.getCountryCode = function(country) {
      if ($scope.isoCountries.hasOwnProperty(country)) {
        return $scope.isoCountries[country];
      } else {
        return country;
      }
    }

    $scope.groupingChanged = function(widget) {
      widget.query.restParams.grouping[0] = widget.selectedOption.value;
      console.log(widget);
      widget = $scope.updateQuery(widget);
      console.log(widget);

      backendApi.search(widget.query).then(function(res) {
        // console.log(widget.title, res.data.documents);
        widget.data = res.data.documents;
        // console.log(res);
      });
    }

    $scope.pie2 = {
      title: "Pie Chart",
      iconUrl: "images/widgets/placeholder.png",
      isHide: false
    };

    $scope.bar3 = {
      title: "Deal Report",
      iconUrl: "images/widgets/icon_top-categories.png",
      isHide: false
    };

    $scope.updateQuery = function(widget) {
      if (widget.selectedOption.value === 'region_s') {
        if (widget.query.workflow === 'dealReport')
          widget.query.workflow = 'dealReportByRegion';
        if (widget.query.workflow === 'investmentReport')
          widget.query.workflow = 'investmentReportByRegion';
      } else if (widget.selectedOption.value === 'sector_s') {
        if (widget.query.workflow === 'dealReport')
          widget.query.workflow = 'dealReportBySector';
        if (widget.query.workflow === 'investmentReport')
          widget.query.workflow = 'investmentReportBySector';
      } else {
        if (widget.query.workflow === 'dealReportByRegion' || widget.query.workflow === 'dealReportBySector') {
          widget.query.workflow = 'dealReport';
        }

        if (widget.query.workflow === 'investmentReportByRegion' || widget.query.workflow === 'investmentReportBySector') {
          widget.query.workflow = 'investmentReport';
        }
      }

      return widget;
    }

    // $scope.bar3.options = {
    //   title: {
    //     text: '',
    //     subtext: ''
    //   },
    //   tooltip: {
    //     trigger: 'axis'
    //   },
    //   legend: {
    //     data: ['2011', '2012', '2013']
    //   },
    //   toolbox: {
    //     show: true,
    //     feature: {
    //       restore: {
    //         show: true,
    //         title: "restore"
    //       saveAsImage: {
    //         show: true,
    //         title: "save as image"
    //       }
    //     }
    //   },
    //   calculable: true,
    //   xAxis: [{
    //     type: 'value',
    //     boundaryGap: [0, 0.01]
    //   }],
    //   yAxis: [{
    //     type: 'category',
    //     data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'Population']
    //   }],
    //   series: [{
    //     name: '2011',
    //     type: 'bar',
    //     data: [18203, 23489, 29034, 104970, 131744, 630230]
    //   }, {
    //     name: '2012',
    //     type: 'bar',
    //     data: [19325, 23438, 31000, 121594, 134141, 681807
    //   }, {
    //     name: '2013',
    //     type: 'bar',
    //     data: [17325, 21438, 35000, 100000, 134141, 581807]
    //   }]
    // };

    $scope.bar1.options = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Evaporation']
      },
      toolbox: {
        show: true,
        feature: {
          restore: {
            show: true,
            title: "restore"
          },
          saveAsImage: {
            show: true,
            title: "save as image"
          }
        }
      },
      calculable: true,
      xAxis: [{
        type: 'category',
        data: ['2', '1', '3', '4']
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: 'Evaporation',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        markPoint: {
          data: [{
            type: 'max',
            name: 'Max'
          }, {
            type: 'min',
            name: 'Min'
          }]
        },
        markLine: {
          data: [{
            type: 'average',
            name: 'Average'
          }]
        }
      }, {
        name: 'Precipitation',
        type: 'bar',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        markPoint: {
          data: [{
            name: 'Highest',
            value: 182.2,
            xAxis: 7,
            yAxis: 183,
            symbolSize: 18
          }, {
            name: 'Lowest',
            value: 2.3,
            xAxis: 11,
            yAxis: 3
          }]
        },
        markLine: {
          data: [{
            type: 'average',
            name: 'Average'
          }]
        }
      }]
    };
    $scope.bar3.options = {
      title: {
        text: '',
        subtext: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['AVG', 'MAX', 'MIN', 'STDEV', 'SUM', 'COUNT']
      },
      toolbox: {
        show: false,
        feature: {
          restore: {
            show: true,
            title: "restore"
          },
          saveAsImage: {
            show: true,
            title: "save as image"
          }
        }
      },
      calculable: true,
      xAxis: [{
        type: 'value',
        boundaryGap: [0, 0.01]
      }],
      yAxis: [{
        type: 'category',
        data: ['Change of Control', 'Growth Capital', 'LBO', 'MBO', 'Replacement Capital']
      }],
      series: [{
        name: 'AVG',
        type: 'bar',
        data: []
      }, {
        name: 'MAX',
        type: 'bar',
        data: []
      }, {
        name: 'MIN',
        type: 'bar',
        data: []
      }, {
        name: 'STDEV',
        type: 'bar',
        data: []
      }, {
        name: 'SUM',
        type: 'bar',
        data: []
      }, {
        name: 'COUNT',
        type: 'bar',
        data: []
      }]
    };


    $scope.pie2.options = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['Direct', 'Email', 'Affiliate', 'Video Ads', 'Search']
      },
      toolbox: {
        show: true,
        feature: {
          restore: {
            show: true,
            title: "restore"
          },
          saveAsImage: {
            show: true,
            title: "save as image"
          }
        }
      },
      calculable: true,
      series: [{
        name: 'Traffic source',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          },
          emphasis: {
            label: {
              show: true,
              position: 'center',
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          }
        },
        data: [{
          value: 335,
          name: 'Direct'
        }, {
          value: 310,
          name: 'Email'
        }, {
          value: 234,
          name: 'Affiliate'
        }, {
          value: 135,
          name: 'Video Ads'
        }, {
          value: 1548,
          name: 'Search'
        }]
      }]
    };

    $scope.removeWidget = function(widget, $event) {
      clickEvent = $event;

      console.log("sdhfsdlfbjsdlkbf ", $event);
      console.log("cksfdjfdnsd ", clickEvent);
      widget.isHide = true;
      console.log(widget);
      var storeIndex;
      storeIndex = -1;
      // angular.forEach($scope.widgets, function(value, key) {
      //   if (value.title === widget.title) {
      //     storeIndex = key;
      //     return false;
      //   }
      // });
      // if (storeIndex > -1) {
      //   $scope.widgets[storeIndex].added = false;
      // }
    };

    $scope.search = function(queryText) {
      if (queryText != "")
        $location.url("/search-result?queryText=" + queryText)
    }

    $scope.onSelect = function($item, $model, $label) {
      $scope.search($model)
    }

    $scope.fetchAutoComplete = function(queryText) {
      return backendApi.getAutocompleteData(queryText).then(function(res) {
        return res.data;
      });
    }
  }

})();

angular.module('app')
  .animation('.slide', [
    function() {
      var support;
      support = jQuery.keyframe.isSupported();
      jQuery.keyframe.debug = true;
      return {
        leave: function(element, doneFn) {
          var elemHeight, elemScaledHeight, elemScaledWidth, elemWidth, firstFrame, scaledLeftOffset, scaledTopOffset, secondFrame, widgetControlWidth;

          elemHeight = parseInt(element.css('height'));
          elemWidth = parseInt(element.css('width'));
          elemScaledHeight = elemHeight * 0.08;
          elemScaledWidth = elemWidth * 0.08;
          elemX = parseInt(typeof clickEvent != "undefined" ? clickEvent.pageX : 0);
          elemY = parseInt(typeof clickEvent != "undefined" ? clickEvent.pageY : 0);

          typeAheadWidthPx = angular.element('.search-field-wrapper').outerWidth(true);
          searchTypeWidthPx = angular.element('.search-type').outerWidth(true);
          searchPanelHeightPx = angular.element('.search-panel').outerHeight(true);
          widgetControlWidth = angular.element('.widget-control').width();

          buttonOffset = typeAheadWidthPx + searchTypeWidthPx;
          //12 has been added because of container's extreme left padding
          wigdetButtonOffset = (elemX - ((elemWidth - elemScaledWidth) / 2) - (widgetControlWidth + 120));

          scaledTopOffset = ((elemHeight - elemScaledHeight) / 2) + elemY - searchPanelHeightPx;
          scaledLeftOffset = buttonOffset - wigdetButtonOffset;

          secondFrame = {
            'opacity': '0.1',
            // 'z-index': '5',
            'top': '-' + scaledTopOffset + 'px',
            'left': scaledLeftOffset + 'px',
            '-webkit-transform': 'scale3d(.08,.08,.08)',
            '-moz-transform': 'scale3d(.08,.08,.08)',
            '-o-transform': 'scale3d(.08,.08,.08)',
            'transform': 'scale3d(.08,.08,.08)'
          };

          firstFrame = {
            'opacity': '1',
            '-webkit-transform': 'scale3d( 0.475 , 0.475 , 0.475 ) translate3d(0px , 60px ,50px)',
            '-moz-transform': 'scale3d( 0.475 , 0.475 , 0.475 ) translate3d(0px , 60px ,50px)',
            '-o-transform': 'scale3d( 0.475 , 0.475 , 0.475 ) translate3d(0px , 60px ,50px)',
            'transform': 'scale3d( 0.475 , 0.475 , 0.475 ) translate3d(0px , 60px ,50px)'
          };

          jQuery.keyframe.define([{
            name: 'onMove',
            '30%': firstFrame,
            '100%': secondFrame
          }]);
          element.resetKeyframe(function() {
            return element.playKeyframe({
              name: 'onMove',
              duration: '3s',
              delay: '0s',
              timingFunction: 'linear',
              complete: doneFn
            });
          });
        }
      };
    }
  ]);

Array.prototype.getUnique = function() {
  var u = {},
    a = [];
  for (var i = 0, l = this.length; i < l; ++i) {
    if (u.hasOwnProperty(this[i])) {
      continue;
    }
    a.push(this[i]);
    u[this[i]] = 1;
  }
  return a;
}