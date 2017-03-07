/**
 * User: laurentrenard
 * Date: 10/3/13
 * Time: 9:55 PM
 **/
var app = angular.module('app', ['ui.bootstrap','smart-table']);
//app.directive('custom', ['$log', function (log) {
//    return {
//        restrict: 'E',
//        //include smart table controller to use its API if needed
//        require: '^smartTable',
//        template: '<select ng-model="favouriteColor">' +
//            '<option value="">--choose favorite color--</option>' +
//            '<option value="red">red</option>' +
//            '<option value="blue">blue</option>' +
//            '<option value="yellow">yellow</option>' +
//            '</select>',
//        replace: true,
//        link: function (scope, element, attrs, ctrl) {
//
//            var allowedColors = ['red', 'yellow', 'blue'];
//
//            //can use scope.dataRow, scope.column, scope.formatedValue, and ctrl API
//            scope.$watch('favouriteColor', function (value) {
//                if (allowedColors.indexOf(value) != -1) {
//                    scope.dataRow.favouriteColor = scope.favouriteColor;
//                }
//            });
//        }
//    }
//}]);
//app.directive('columnFilter', function () {
//    return {
//        restrict: 'C',
//        require: '^smartTable',
//        link: function (scope, element, attrs, ctrl) {
//            scope.searchValue = '';
//            scope.$watch('searchValue', function (value) {
//                ctrl.search(value, scope.column);
//            })
//        }
//    }
//});
app.controller('mainCtrl', ['$scope', function (scope) {
    scope.greeting = 'hello Laurent';
}]);

//app.directive('scrollTreshold', ['$window', function (window) {
//    return {
//        link: function (scope, element, attr) {
//            var treshold = attr.scrollTreshold || 100;
//            window.addEventListener('scroll', function (event) {
//                if (window.scrollY > treshold) {
//                    element.addClass('scroll-treshold');
//                } else {
//                    element.removeClass('scroll-treshold');
//                }
//            });
//        }
//    }
//}]);
app.controller('basicsCtrl', ['$scope', function (scope) {
    scope.rowCollection = [
        {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
        {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
        {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
    ];
}]);


app.controller('safeCtrl', ['$scope', function ($scope) {

    var firstnames = ['Laurent', 'Blandine', 'Olivier', 'Max'];
    var lastnames = ['Renard', 'Faivre', 'Frere', 'Eponge'];
    var dates = ['1987-05-21', '1987-04-25', '1955-08-27', '1966-06-06'];
    var id = 1;

    function generateRandomItem(id) {

        var firstname = firstnames[Math.floor(Math.random() * 3)];
        var lastname = lastnames[Math.floor(Math.random() * 3)];
        var birthdate = dates[Math.floor(Math.random() * 3)];
        var balance = Math.floor(Math.random() * 2000);

        return {
            id: id,
            firstName: firstname,
            lastName: lastname,
            birthDate: new Date(birthdate),
            balance: balance
        }
    }

    $scope.rowCollection = [];

    for (id; id < 5; id++) {
        $scope.rowCollection.push(generateRandomItem(id));
    }

    //add to the real data holder
    $scope.addRandomItem = function addRandomItem() {
        $scope.rowCollection.push(generateRandomItem(id));
        id++;
    };

    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
    }
}]);

app.controller('formatCtrl', ['$scope', function (scope) {
    scope.rowCollection = [
        {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
        {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
        {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
    ];

    scope.removeRow = function removeRow(row) {
        var index = scope.rowCollection.indexOf(row);
        if (index !== -1) {
            scope.rowCollection.splice(index, 1);
        }
    }
}]);
app.controller('sortCtrl', ['$scope', '$filter', function (scope, filter) {
    scope.rowCollection = [
        {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
        {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
        {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
    ];

    scope.getters={
        firstName: function (value) {
            //this will sort by the length of the first name string
            return value.firstName.length;
        }
    }
}]);

app.controller('filterCtrl', ['$scope', '$filter', function (scope, filter) {
    scope.rowCollection = [
        {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com', strictSearchValue: "abc", strictSelectValue: "ab"},
        {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com', strictSearchValue: "ab", strictSelectValue: "abc"},
        {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com', strictSearchValue: "abc", strictSelectValue: "abc"}
    ];

  scope.displayCollection = [].concat(scope.rowCollection);

    scope.predicates = ['firstName', 'lastName', 'birthDate', 'balance', 'email'];
    scope.selectedPredicate = scope.predicates[0];
}]);

app.filter('myStrictFilter', function($filter){
  return function(input, predicate){
    return $filter('filter')(input, predicate, true);
  }
});

app.filter('unique', function() {

  return function (arr, field) {
    var o = {}, i, l = arr.length, r = [];
    for(i=0; i<l;i+=1) {
      o[arr[i][field]] = arr[i];
    }
    for(i in o) {
      r.push(o[i]);
    }
    return r;
  };
})
app.controller('selectionCtrl', ['$scope', '$filter', function (scope, filter) {
    scope.rowCollection = [
        {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
        {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
        {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
    ];
}]);

app.controller('paginationCtrl', ['$scope', '$http', function(scope, http) {
    scope.itemsByPage = 15;
    scope.rowCollection = tmpScope;
}]);

app.controller('pipeCtrl', ['Resource', function (service) {

  var ctrl = this;

  this.displayed = [];

  this.callServer = function callServer(tableState) {

    ctrl.isLoading = true;

    var pagination = tableState.pagination;

    var start = pagination.start || 0;
    var number = pagination.number || 10;

    service.getPage(start, number, tableState).then(function (result) {
      ctrl.displayed = result.data;
      tableState.pagination.numberOfPages = result.numberOfPages;//set the number of pages so the pagination can update
      ctrl.isLoading = false;
    });
  };

}])
  .factory('Resource', ['$q', '$filter', '$timeout', function ($q, $filter, $timeout) {

    //this would be the service to call your server, a standard bridge between your model an $http

    // the database (normally on your server)
    var randomsItems = [];

    function createRandomItem(id) {
      var heroes = ['Batman', 'Superman', 'Robin', 'Thor', 'Hulk', 'Niki Larson', 'Stark', 'Bob Leponge'];
      return {
        id: id,
        name: heroes[Math.floor(Math.random() * 7)],
        age: Math.floor(Math.random() * 1000),
        saved: Math.floor(Math.random() * 10000)
      };

    }

    for (var i = 0; i < 1000; i++) {
      randomsItems.push(createRandomItem(i));
    }


    //fake call to the server, normally this service would serialize table state to send it to the server (with query parameters for example) and parse the response
    //in our case, it actually performs the logic which would happened in the server
    function getPage(start, number, params) {

      var deferred = $q.defer();

      var filtered = params.search.predicateObject ? $filter('filter')(randomsItems, params.search.predicateObject) : randomsItems;

      if (params.sort.predicate) {
        filtered = $filter('orderBy')(filtered, params.sort.predicate, params.sort.reverse);
      }

      var result = filtered.slice(start, start + number);

      $timeout(function () {
        //note, the server passes the information about the data set size
        deferred.resolve({
          data: result,
          numberOfPages: Math.ceil(filtered.length / number)
        });
      }, 1500);


      return deferred.promise;
    }

    return {
      getPage: getPage
    };


  }]);


app.controller('customCtrl', ['$scope', function (scope) {
    scope.rowCollection = [
        {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
        {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
        {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
    ];
}]);
app.directive('csSelect', function () {
    return {
        require: '^stTable',
        template: '<input type="checkbox"/>',
        scope: {
            row: '=csSelect'
        },
        link: function (scope, element, attr, ctrl) {

            element.bind('change', function (evt) {
                scope.$apply(function () {
                    ctrl.select(scope.row, 'multiple');
                });
            });

            scope.$watch('row.isSelected', function (newValue, oldValue) {
                if (newValue === true) {
                    element.parent().addClass('st-selected');
                } else {
                    element.parent().removeClass('st-selected');
                }
            });
        }
    };
});
