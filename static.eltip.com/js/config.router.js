'use strict';
/**
 * Config for the router
 */
angular.module('app')
    .run(
    [          '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
)
    .config(
    [          '$stateProvider', '$urlRouterProvider',
        function ($stateProvider,   $urlRouterProvider) {

            $urlRouterProvider
                .otherwise('/access/signin');
            $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: 'tpl/app.html'
                })
                .state('app.dashboard-v1', {
                    url: '/dashboard-v1',
                    templateUrl: 'tpl/app_dashboard_v1.html',
                    resolve: {
                        deps: ['$ocLazyLoad', 'uiLoad',
                            function( $ocLazyLoad, uiLoad ){
                                return uiLoad.load(
                                    ['vendor/jquery/fullcalendar/fullcalendar.css',
                                        'vendor/jquery/fullcalendar/theme.css',
                                        'vendor/jquery/jquery-ui-1.10.3.custom.min.js',
                                        'vendor/libs/moment.min.js',
                                        'vendor/jquery/fullcalendar/fullcalendar.min.js',
                                        'js/app/calendar/calendar.js']
                                ).then(
                                    function(){
                                        return $ocLazyLoad.load('ui.calendar');
                                    }
                                )
                            }]
                    }
                })
                .state('app.dashboard-v5', {
                    url: '/app_dashboard_v5',
                    templateUrl: 'tpl/app_dashboard_v5.html',
                    resolve: {
                        deps: ['$ocLazyLoad', 'uiLoad',
                            function( $ocLazyLoad, uiLoad ){
                                return uiLoad.load(
                                    ['vendor/echarts/echarts-all.js' ]
                                ).then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/line.js');
                                    }
                                )
                            }]

                    }
                })

                .state('app.softmanager', {
                    url: '/softmanager',
                    templateUrl: 'tpl/app_softmanager.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/tree.js',
                                            'js/app/weather/skycons.js',
                                            'vendor/libs/moment.min.js',
                                            'js/app/weather/angular-skycons.js',
                                            'js/app/weather/ctrl.js',
                                            'js/controllers/chart.js'

                                        );
                                    }
                                );
                            }
                        ]
                    }
                })

                .state('app.safeweekly', {
                    url: '/safeweekly',
                    templateUrl: 'tpl/app_safeweekly.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/tree.js',
                                            'js/app/weather/skycons.js',
                                            'vendor/libs/moment.min.js',
                                            'js/app/weather/angular-skycons.js',
                                            'js/app/weather/ctrl.js',
                                            'js/controllers/chart.js'

                                        );
                                    }
                                );
                            }
                        ]
                    }
                })

                .state('app.hardwaremanager', {
                    url: '/hardwaremanager',
                    templateUrl: 'tpl/app_hardwaremanager.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/tree.js',
                                            'js/app/weather/skycons.js',
                                            'vendor/libs/moment.min.js',
                                            'js/app/weather/angular-skycons.js',
                                            'js/app/weather/ctrl.js',
                                            'js/controllers/chart.js'

                                        );
                                    }
                                );
                            }
                        ]
                    }
                })


                .state('app.see', {
                    url: '/see',
                    templateUrl: 'tpl/app_see.html',
                   /* resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load([

                                    'js/echarts/echarts-all.js',

                                ]);

                            }]
                    }
                })*/
                    resolve: {
                        deps: ['$ocLazyLoad', 'uiLoad',
                            function( $ocLazyLoad, uiLoad ){
                                return uiLoad.load(
                                    ['vendor/echarts/echarts-all.js' ]
                                ).then(
                                    function(){
                                        return $ocLazyLoad.load(
                                            'js/controllers/weekline.js'


                                        );
                                    }
                                )
                            }]
                    }
                })


                .state('app.webpagecontrol', {
                    url: '/app_webpagecontrol',
                    templateUrl: 'tpl/app_webpagecontrol.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/tree.js',
                                            'js/app/weather/skycons.js',
                                            'vendor/libs/moment.min.js',
                                            'js/app/weather/angular-skycons.js',
                                            'js/app/weather/ctrl.js',
                                            'js/controllers/chart.js'

                                        );
                                    }
                                );
                            }
                        ]
                    }
                })
                .state('app.commoncount', {
                    url: '/commoncount',
                    templateUrl: 'tpl/app_commoncount.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load('vendor/echarts/echarts-all.js').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/line.js'

                                        );
                                    }
                                );
                            }
                        ]
                    }
                })

                .state('app.dashboard-v2', {
                    url: '/dashboard-v2',
                    templateUrl: 'tpl/app_dashboard_v2.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/tree.js',
                                            'js/app/weather/skycons.js',
                                            'vendor/libs/moment.min.js',
                                            'js/app/weather/angular-skycons.js',
                                            'js/app/weather/ctrl.js',
                                            'js/controllers/chart.js'

                                        );
                                    }
                                );
                            }
                        ]
                    }
                })


                .state('app.client-manage', {
                    url: '/app_client_manage',
                    templateUrl: 'tpl/app_client_manage.html',
                    /* resolve: {
                     deps: ['$ocLazyLoad',
                     function( $ocLazyLoad ){
                     return $ocLazyLoad.load(['js/controllers/chart.js']);
                     }]
                     }*/
                    resolve: {
                        deps: ['$ocLazyLoad', 'uiLoad',
                            function( $ocLazyLoad, uiLoad ){
                                return uiLoad.load(
                                    ['js/controllers/chart.js']
                                ).then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/tree.js');
                                    }
                                )
                            }]

                    }
                })
                .state('app.checkhealth', {
                    url: '/app_checkhealth',
                    templateUrl: 'tpl/app_checkhealth.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load(['js/controllers/chart.js']);
                            }]
                    }
                })
                .state('app.health', {
                    url: '/app_health',
                    templateUrl: 'tpl/app_health.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load('vendor/echarts/echarts-all.js').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/line.js'

                                        );
                                    }
                                );
                            }
                        ]
                    }
                })
                .state('app.tool', {
                    url: '/app_tool',
                    templateUrl: 'tpl/app_tool.html'
                })
                .state('app.safe-sets', {
                    url: '/app_safe_sets',
                    templateUrl: 'tpl/app_safe_sets.html'
                })
                .state('app.ui', {
                    url: '/ui',
                    template: '<div ui-view class="fade-in-up"></div>'
                })
                .state('app.ui.buttons', {
                    url: '/buttons',
                    templateUrl: 'tpl/ui_buttons.html'
                })
                .state('app.ui.icons', {
                    url: '/icons',
                    templateUrl: 'tpl/ui_icons.html'
                })
                .state('app.ui.grid', {
                    url: '/grid',
                    templateUrl: 'tpl/ui_grid.html'
                })
                .state('app.ui.widgets', {
                    url: '/widgets',
                    templateUrl: 'tpl/ui_widgets.html'
                })
                .state('app.ui.bootstrap', {
                    url: '/bootstrap',
                    templateUrl: 'tpl/ui_bootstrap.html'
                })
                .state('app.ui.sortable', {
                    url: '/sortable',
                    templateUrl: 'tpl/ui_sortable.html'
                })
                .state('app.ui.portlet', {
                    url: '/portlet',
                    templateUrl: 'tpl/ui_portlet.html'
                })
                .state('app.ui.timeline', {
                    url: '/timeline',
                    templateUrl: 'tpl/ui_timeline.html'
                })
                .state('app.ui.tree', {
                    url: '/tree',
                    templateUrl: 'tpl/ui_tree.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/tree.js');
                                    }
                                );
                            }
                        ]
                    }
                })
                .state('app.ui.toaster', {
                    url: '/toaster',
                    templateUrl: 'tpl/ui_toaster.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load('toaster').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/toaster.js');
                                    }
                                );
                            }]
                    }
                })
                .state('app.ui.jvectormap', {
                    url: '/jvectormap',
                    templateUrl: 'tpl/ui_jvectormap.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load('js/controllers/vectormap.js');
                            }]
                    }
                })
                .state('app.ui.googlemap', {
                    url: '/googlemap',
                    templateUrl: 'tpl/ui_googlemap.html',
                    resolve: {
                        deps: ['uiLoad',
                            function( uiLoad ){
                                return uiLoad.load( [
                                    'js/app/map/load-google-maps.js',
                                    'js/app/map/ui-map.js',
                                    'js/app/map/map.js'] ).then(
                                    function(){
                                        return loadGoogleMaps();
                                    }
                                );
                            }]
                    }
                })
                .state('app.chart', {
                    url: '/chart',
                    templateUrl: 'tpl/ui_chart.html',
                    resolve: {
                        deps: ['uiLoad',
                            function( uiLoad){
                                return uiLoad.load('js/controllers/chart.js');
                            }]
                    }
                })
                // table
                .state('app.table', {
                    url: '/table',
                    template: '<div ui-view></div>'
                })
                .state('app.table.static', {
                    url: '/static',
                    templateUrl: 'tpl/table_static.html'
                })
                .state('app.table.datatable', {
                    url: '/datatable',
                    templateUrl: 'tpl/table_datatable.html'
                })
                .state('app.table.footable', {
                    url: '/footable',
                    templateUrl: 'tpl/table_footable.html'
                })
                .state('app.table.grid', {
                    url: '/grid',
                    templateUrl: 'tpl/table_grid.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load('ngGrid').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/grid.js');
                                    }
                                );
                            }]
                    }
                })
                // form
                .state('app.form', {
                    url: '/form',
                    template: '<div ui-view class="fade-in"></div>',
                    resolve: {
                        deps: ['uiLoad',
                            function( uiLoad){
                                return uiLoad.load('js/controllers/form.js');
                            }]
                    }
                })
                .state('app.form.elements', {
                    url: '/elements',
                    templateUrl: 'tpl/form_elements.html'
                })
                .state('app.form.validation', {
                    url: '/validation',
                    templateUrl: 'tpl/form_validation.html'
                })
                .state('app.form.wizard', {
                    url: '/wizard',
                    templateUrl: 'tpl/form_wizard.html'
                })
                .state('app.form.fileupload', {
                    url: '/fileupload',
                    templateUrl: 'tpl/form_fileupload.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load('angularFileUpload').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/file-upload.js');
                                    }
                                );
                            }]
                    }
                })
                .state('app.form.imagecrop', {
                    url: '/imagecrop',
                    templateUrl: 'tpl/form_imagecrop.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad){
                                return $ocLazyLoad.load('ngImgCrop').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/imgcrop.js');
                                    }
                                );
                            }]
                    }
                })
                .state('app.form.select', {
                    url: '/select',
                    templateUrl: 'tpl/form_select.html',
                    controller: 'SelectCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load('ui.select').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/select.js');
                                    }
                                );
                            }]
                    }
                })
                .state('app.form.slider', {
                    url: '/slider',
                    templateUrl: 'tpl/form_slider.html',
                    controller: 'SliderCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load('vr.directives.slider').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/slider.js');
                                    }
                                );
                            }]
                    }
                })
                .state('app.form.editor', {
                    url: '/editor',
                    templateUrl: 'tpl/form_editor.html',
                    controller: 'EditorCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load('textAngular').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/editor.js');
                                    }
                                );
                            }]
                    }
                })
                // pages
                .state('app.page', {
                    url: '/page',
                    template: '<div ui-view class="fade-in-down"></div>'
                })
                .state('app.page.profile', {
                    url: '/profile',
                    templateUrl: 'tpl/page_profile.html'
                })
                .state('app.page.post', {
                    url: '/post',
                    templateUrl: 'tpl/page_post.html'
                })
                .state('app.page.search', {
                    url: '/search',
                    templateUrl: 'tpl/page_search.html'
                })
                .state('app.page.invoice', {
                    url: '/invoice',
                    templateUrl: 'tpl/page_invoice.html'
                })
                .state('app.page.price', {
                    url: '/price',
                    templateUrl: 'tpl/page_price.html'
                })

                .state('app.price', {
                    url: '/price',
                    templateUrl: 'tpl/app_price.html'
                })
                .state('app.alipay', {
                    url: '/app.alipay',
                    templateUrl: 'tpl/app_alipay.html'
                })
                .state('app.docs', {
                    url: '/docs',
                    templateUrl: 'tpl/docs.html'
                })
                // others
                .state('lockme', {
                    url: '/lockme',
                    templateUrl: 'tpl/page_lockme.html'
                })
                .state('access', {
                    url: '/access',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('access.signin', {
                    url: '/signin',
                    templateUrl: 'asset/system/view/page_signin.html',
                    resolve: {
                        deps: ['uiLoad',
                            function( uiLoad ){
                                return uiLoad.load( ['asset/system/controller/signin.js',
                                    'asset/system/service/auth.js'] );
                            }]
                    }
                })
                .state('access.signup', {
                    url: '/signup',
                    templateUrl: 'tpl/page_signup.html',
                    resolve: {
                        deps: ['uiLoad',
                            function( uiLoad ){
                                return uiLoad.load( ['js/controllers/signup.js'] );
                            }]
                    }
                })
                .state('access.forgotpwd', {
                    url: '/forgotpwd',
                    templateUrl: 'tpl/page_forgotpwd.html'
                })
                .state('access.404', {
                    url: '/404',
                    templateUrl: 'tpl/page_404.html'
                })

                // fullCalendar
                .state('app.calendar', {
                    url: '/calendar',
                    templateUrl: 'tpl/app_calendar.html',
                    // use resolve to load other dependences
                    resolve: {
                        deps: ['$ocLazyLoad', 'uiLoad',
                            function( $ocLazyLoad, uiLoad ){
                                return uiLoad.load(
                                    ['vendor/jquery/fullcalendar/fullcalendar.css',
                                        'vendor/jquery/fullcalendar/theme.css',
                                        'vendor/jquery/jquery-ui-1.10.3.custom.min.js',
                                        'vendor/libs/moment.min.js',
                                        'vendor/jquery/fullcalendar/fullcalendar.min.js',
                                        'js/app/calendar/calendar.js']
                                ).then(
                                    function(){
                                        return $ocLazyLoad.load('ui.calendar');
                                    }
                                )
                            }]
                    }
                })

                // mail
                .state('app.mail', {
                    abstract: true,
                    url: '/mail',
                    templateUrl: 'tpl/mail.html',
                    // use resolve to load other dependences
                    resolve: {
                        deps: ['uiLoad',
                            function( uiLoad ){
                                return uiLoad.load( ['js/app/mail/mail.js',
                                    'js/app/mail/mail-service.js',
                                    'vendor/libs/moment.min.js'] );
                            }]
                    }
                })
                .state('app.mail.list', {
                    url: '/inbox/{fold}',
                    templateUrl: 'tpl/mail.list.html'
                })
                .state('app.mail.detail', {
                    url: '/{mailId:[0-9]{1,4}}',
                    templateUrl: 'tpl/mail.detail.html'
                })
                .state('app.mail.compose', {
                    url: '/compose',
                    templateUrl: 'tpl/mail.new.html'
                })

                .state('layout', {
                    abstract: true,
                    url: '/layout',
                    templateUrl: 'tpl/layout.html'
                })
                .state('layout.fullwidth', {
                    url: '/fullwidth',
                    views: {
                        '': {
                            templateUrl: 'tpl/layout_fullwidth.html'
                        },
                        'footer': {
                            templateUrl: 'tpl/layout_footer_fullwidth.html'
                        }
                    },
                    resolve: {
                        deps: ['uiLoad',
                            function( uiLoad ){
                                return uiLoad.load( ['js/controllers/vectormap.js'] );
                            }]
                    }
                })
                .state('layout.mobile', {
                    url: '/mobile',
                    views: {
                        '': {
                            templateUrl: 'tpl/layout_mobile.html'
                        },
                        'footer': {
                            templateUrl: 'tpl/layout_footer_mobile.html'
                        }
                    }
                })
                .state('layout.app', {
                    url: '/app',
                    views: {
                        '': {
                            templateUrl: 'tpl/layout_app.html'
                        },
                        'footer': {
                            templateUrl: 'tpl/layout_footer_fullwidth.html'
                        }
                    },
                    resolve: {
                        deps: ['uiLoad',
                            function( uiLoad ){
                                return uiLoad.load( ['js/controllers/tab.js'] );
                            }]
                    }
                })
                .state('apps', {
                    abstract: true,
                    url: '/apps',
                    templateUrl: 'tpl/layout.html'
                })
                .state('apps.note', {
                    url: '/note',
                    templateUrl: 'tpl/apps_note.html',
                    resolve: {
                        deps: ['uiLoad',
                            function( uiLoad ){
                                return uiLoad.load( ['js/app/note/note.js',
                                    'vendor/libs/moment.min.js'] );
                            }]
                    }
                })
                .state('apps.contact', {
                    url: '/contact',
                    templateUrl: 'tpl/apps_contact.html',
                    resolve: {
                        deps: ['uiLoad',
                            function( uiLoad ){
                                return uiLoad.load( ['js/app/contact/contact.js'] );
                            }]
                    }
                })
                .state('app.weather', {
                    url: '/weather',
                    templateUrl: 'tpl/apps_weather.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load(
                                    {
                                        name: 'angular-skycons',
                                        files: ['js/app/weather/skycons.js',
                                            'vendor/libs/moment.min.js',
                                            'js/app/weather/angular-skycons.js',
                                            'js/app/weather/ctrl.js' ]
                                    }
                                );
                            }]
                    }
                })
                .state('music', {
                    url: '/music',
                    templateUrl: 'tpl/music.html',
                    controller: 'MusicCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                                return $ocLazyLoad.load([
                                    'com.2fdevs.videogular',
                                    'com.2fdevs.videogular.plugins.controls',
                                    'com.2fdevs.videogular.plugins.overlayplay',
                                    'com.2fdevs.videogular.plugins.poster',
                                    'com.2fdevs.videogular.plugins.buffering',
                                    'js/app/music/ctrl.js',
                                    'js/app/music/theme.css'
                                ]);
                            }]
                    }
                })
                .state('music.home', {
                    url: '/home',
                    templateUrl: 'tpl/music.home.html'
                })
                .state('music.genres', {
                    url: '/genres',
                    templateUrl: 'tpl/music.genres.html'
                })
                .state('music.detail', {
                    url: '/detail',
                    templateUrl: 'tpl/music.detail.html'
                })
                .state('music.mtv', {
                    url: '/mtv',
                    templateUrl: 'tpl/music.mtv.html'
                })
                .state('music.mtvdetail', {
                    url: '/mtvdetail',
                    templateUrl: 'tpl/music.mtv.detail.html'
                })
                .state('music.playlist', {
                    url: '/playlist/{fold}',
                    templateUrl: 'tpl/music.playlist.html'
                })
                
                
                // demo
                .state('app.lab-manage', {
                    url: '/lab-manage',
                    templateUrl: 'tpl/lab-manage.html'
                })
                
                .state('app.teach-plan', {
                    url: '/teach-plan',
                    templateUrl: 'tpl/teach-plan.html'
                })
            
                .state('app.lab-praxis', {
                    url: '/lab-praxis',
                    templateUrl: 'asset/system/view/question/lab-praxis.html',
                    resolve: {
                        deps: ['uiLoad',
                            function( uiLoad ){
                                return uiLoad.load( ['asset/system/controller/question/questionCtr.js',
                                    'asset/system/service/question.js'] );
                            }]
                    }
                })
            
                .state('app.lab-expaper', {
                    url: '/lab-expaper',
                    templateUrl: 'asset/system/view/question/lab-expaper.html',
                    resolve: {
                        deps: ['uiLoad',
                            function( uiLoad ){
                                return uiLoad.load( ['asset/system/controller/question/paperCtr.js',
                                    'asset/system/service/question.js',
                                    'asset/system/directives/directives.js'] );
                            }]
                    }
                })
            
                .state('app.lab-preview-test', {
                    url: '/lab-preview-test',
                    templateUrl: 'tpl/lab-preview-test.html'
                })
            
                .state('app.lab-student', {
                    url: '/lab-student',
                    templateUrl: 'tpl/lab-student.html'
                })
            
                .state('app.lab-monitor-report', {
                    url: '/lab-monitor-report',
                    templateUrl: 'tpl/lab-monitor-report.html'
                })
            
                .state('app.lab-report', {
                    url: '/lab-report',
                    templateUrl: 'tpl/lab-report.html'
                })
            
                .state('app.lab-upload-error', {
                    url: '/lab-upload-error',
                    templateUrl: 'tpl/lab-upload-error.html'
                })
            
                .state('app.lab-upload-error-sudent', {
                    url: '/lab-upload-error-sudent',
                    templateUrl: 'tpl/lab-upload-error-sudent.html'
                })
            
                .state('app.lab-concern', {
                    url: '/lab-concern',
                    templateUrl: 'tpl/lab-concern.html'
                })
                
                .state('app.lab-room', {
                    url: '/lab-room',
                    templateUrl: 'tpl/lab-room.html'
                })
                
                .state('app.lab-room-device', {
                    url: '/lab-roomdevice',
                    templateUrl: 'tpl/lab-room-device.html'
                })
                 
                .state('app.machine-manage', {
                    url: '/machine-manage',
                    templateUrl: 'tpl/machine-manage.html'
                })
                
                .state('app.student-mylab', {
                    url: '/student-mylab',
                    templateUrl: 'tpl/mylab.html'
                })
        }
    ]
);