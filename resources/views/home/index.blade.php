<?php use App\Helpers\StringHelper; ?>
<!doctype html>
<html ng-app="app">
<head>
    <title>Members List</title>
    <script type="text/javascript">
        var tmpScope = [];
        var tmpId = [];
        @if(count($users)>0)
            @foreach ($users as $user)
                var found = tmpId.some(function (el) {
                    return el.id === {!! $user->id !!};
                });
                if (!found) {
                    tmpId.push({id: {!! $user->id !!}});
                    tmpScope.push(
                        {
                            name: "{!! $user->name !!}",
                            phone: "{!! $user->phone !!}",
                            address: "{!! StringHelper::escape($user->address) !!}",
                            created_at: "{!! $user->created_at !!}",
                            textscore: "{{ StringHelper::escape($user->textscore) }}",
                            score: "{!! $user->score !!}",
                            review_created_at: "{!! $user->review_created_at !!}"
                        }
                    );
                }
            @endforeach
        @endif
    </script>
    <script src="assets/lib/prism/prism.js"></script>
    <script src="bower_components/angular/angular.min.js"></script>
    <script src="bower_components/angular-bootstrap/ui-bootstrap.min.js"></script>
    <script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
    <script src="bower_components/angular-smart-table/dist/smart-table.js"></script>
    <script src="assets/js/app.js"></script>
    <link rel="stylesheet" href="assets/css/mainStyle.css"/>
    <link rel="stylesheet" href="assets/lib/prism/prism.css"/>
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body class="container-fluid" ng-controller="mainCtrl">
    <section class="clearfix" id="section-pagination" ng-controller="paginationCtrl">
        <table st-table="rowCollection" class="table table-striped">
            <thead>
            <tr>
                <th>name</th>
                <th>phone</th>
                <th>address</th>
                <th st-sort="created_at">created at</th>
                <th>text score</th>
                <th st-sort="score">score</th>
                <th>review created at</th>
            </tr>
            <tr>
                <th colspan="5">
                    <input st-search placeholder="global search" class="input-sm form-control" type="search"/>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr ng-repeat="row in rowCollection">
                <td>@{{row.name}}</td>
                <td>@{{row.phone}}</td>
                <td>@{{row.address}}</td>
                <td>@{{row.created_at}}</td>
                <td>@{{row.textscore}}</td>
                <td>@{{row.score}}</td>
                <td>@{{row.review_created_at}}</td>
            </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="5" class="text-center">
                        <div st-pagination="" st-items-by-page="itemsByPage" st-displayed-pages="7"></div>
                    </td>
                </tr>
            </tfoot>
        </table>
    </section>
</body>
</html>