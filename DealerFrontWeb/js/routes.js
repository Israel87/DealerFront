angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {

  $urlRouterProvider.otherwise('/login');

  $ocLazyLoadProvider.config({
    // Set to true if you want to see what and when is dynamically loaded
    debug: true
  });

  $breadcrumbProvider.setOptions({
    prefixStateName: 'app.main',
    includeAbstract: true,
    template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
  });

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'app/views/common/layouts/full.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Root',
      skip: true
    },
    resolve: {
      loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load CSS files
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Flags',
          files: ['node_modules/flag-icon-css/css/flag-icon.min.css']
        },{
          serie: true,
          name: 'Font Awesome',
          files: ['node_modules/font-awesome/css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['node_modules/simple-line-icons/css/simple-line-icons.css']
        }]);
      }],
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([{
          serie: true,
          name: 'chart.js',
          files: [
            'node_modules/chart.js/dist/Chart.min.js',
            'node_modules/angular-chart.js/dist/angular-chart.min.js'
          ]
        }]);
      }],
    }
  })
  .state('app.main', {
    url: '/main',
    templateUrl: 'app/views/main.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Home',
    },
    //page subtitle goes here
    params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' },
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([
          {
            serie: true,
            name: 'chart.js',
            files: [
              'node_modules/chart.js/dist/Chart.min.js',
              'node_modules/angular-chart.js/dist/angular-chart.min.js'
            ]
          },
        ]);
      }],
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/main.js']
        });
      }]
    }
  })
  .state('appSimple', {
    abstract: true,
    templateUrl: 'views/common/layouts/simple.html',
    resolve: {
      loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load CSS files
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Font Awesome',
          files: ['node_modules/font-awesome/css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['node_modules/simple-line-icons/css/simple-line-icons.css']
        }]);
      }],
    }
  })

  // Additional Pages
  .state('login', {
    url: '/login',
    templateUrl: 'app/views/pages/login.html'
  })
 .state('app.dashboard', {
    url: '/dashboard',
    templateUrl: 'app/views/pages/dashboard.html',
    ncyBreadcrumb: {
        label: 'Dashboard',
    },
     controller: 'DashboardController'
  })
  .state('appSimple.register', {
    url: '/register',
    templateUrl: 'app/views/pages/register.html'
  })
  .state('appSimple.404', {
    url: '/404',
    templateUrl: 'views/pages/404.html'
  })
  .state('appSimple.500', {
    url: '/500',
    templateUrl: 'views/pages/500.html'
  })


.state('app.createsecurity', {
    url: '/securities/create',
    templateUrl: 'app/views/pages/admin/securities/create-security.html',
    ncyBreadcrumb: {
        label: 'Create Security',
    },
    controller: 'SecurityController'
})

    .state('app.fgbonds', {
        url: '/securities/bonds',
        templateUrl: 'app/views/pages/admin/securities/fg-bonds.html',
        ncyBreadcrumb: {
            label: 'FG Bond',
        },
        controller: 'FGBondController'
        })

      .state('app.eurobonds', {
          url: '/securities/eurobonds',
          templateUrl: 'app/views/pages/admin/securities/eurobonds.html',
          ncyBreadcrumb: {
              label: 'EURO Bond',
          },
          controller: 'EUROBondController'
        })


      .state('app.counterparty', {
          url: '/features/counterparty',
          templateUrl: 'app/views/pages/admin/features/counterparty.html',
          ncyBreadcrumb: {
              label: 'Counter Party',
          },
          controller: 'CounterPartyController'
      })

      .state('app.currency', {
          url: '/features/currency',
          templateUrl: 'app/views/pages/admin/features/currency.html',
          ncyBreadcrumb: {
              label: 'Currency',
          },
          controller: 'CurrencyController'
        })

      .state('app.createuser', {
          url: '/users/createuser',
          templateUrl: 'app/views/pages/admin/users/createusers.html',
          ncyBreadcrumb: {
              label: 'Create Users',
          },
          controller: 'CreateUserController'
        })

      .state('app.viewusers', {
          url: '/users/viewusers',
          templateUrl: 'app/views/pages/admin/users/viewusers.html',
          ncyBreadcrumb: {
              label: 'View Users',
          },
          controller: 'CreateUserController'
      })

      // Euro bonds under trades
      .state('app.eurosetupvolume', {
          url: '/eurobonds/setupvolume',
          templateUrl: 'app/views/pages/trades/eurobonds/setupvolume.html',
          ncyBreadcrumb: {
              label: 'EuroBonds Setup Volume',
          },
          controller: 'EuroVolumeController'
       })
      .state('app.eurobuy', {
          url: '/eurobonds/eurobuy',
          templateUrl: 'app/views/pages/trades/eurobonds/buy.html',
          ncyBreadcrumb: {
              label: 'EuroBonds Buy Trade',
          },
          controller: 'EuroBuyController'
        })
      .state('app.eurosell', {
          url: '/eurobonds/eurosell',
          templateUrl: 'app/views/pages/trades/eurobonds/sell.html',
          ncyBreadcrumb: {
              label: 'EuroBonds Sell Trade',
          },
          controller: 'EuroSellController'
        })

    // FGN Bonds under trades.
      .state('app.fgnsetupvolume', {
          url: '/fgbonds/setupvolume',
          templateUrl: 'app/views/pages/trades/fgbonds/setupvolume.html',
          ncyBreadcrumb: {
              label: 'FGN Setup Volume',
          },
          controller: 'FGNVolumeController'
      })
      .state('app.fgnbuy', {
          url: '/fgbonds/fgnbuy',
          templateUrl: 'app/views/pages/trades/fgbonds/buy.html',
          ncyBreadcrumb: {
              label: 'FGN Bonds Buy Trade',
          },
          controller: 'FGNBuyController'
      })
      .state('app.fgnsell', {
          url: '/fgbonds/fgnsell',
          templateUrl: 'app/views/pages/trades/fgbonds/sell.html',
          ncyBreadcrumb: {
              label: 'EuroBonds Sell Trade',
          },
          controller: 'FGNSellController'
      })

    // Treasury Bills under trades.
      .state('app.tbillsSell', {
          url: '/treasurybills/tbillsSell',
          templateUrl: 'app/views/pages/trades/treasurybills/sell.html',
          ncyBreadcrumb: {
              label: 'Treasury Bills Sell Trade',
          },
          controller: 'TbillsSellController'
      })

      .state('app.tbillsBuy', {
          url: '/treasurybills/tbillsbuy',
          templateUrl: 'app/views/pages/trades/treasurybills/buy.html',
          ncyBreadcrumb: {
              label: 'Treasury Bills Buy Trade',
          },
          controller: 'TbillsBuyController'
      })

      .state('app.tbillssetupvolume', {
          url: '/treasurybills/tbillsSetupvolume',
          templateUrl: 'app/views/pages/trades/treasurybills/setupvolume.html',
          ncyBreadcrumb: {
              label: 'Treasury Bills Setup Volume',
          },
          controller: 'TbillsVolumeController'
      })
}]);
