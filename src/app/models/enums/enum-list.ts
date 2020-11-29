import {Enums} from './enums';

export class EnumsList {
// -- Menu Items
  public static menuItems = [
    {
      text: 'Order',icon:'fas fa-clipboard-check', url: '#', submenus: [
        {
          text: 'new_order', url: null, icon:'fas fa-plus'
        },
        {
          text: 'order_list', url: null, icon:'fas fa-clipboard'
        },
        {
          text: 'order_approvement', url: null, icon: 'fas fa-tasks'
        },
        {
          text: 'order_archieve', url: null, icon: 'fas fa-archive'
        },
        {
          text: 'campaings', url: null, icon: 'fas fa-tag'
        },
        {
          text: 'fairs', url: null, icon: 'fas fa-star'
        }
      ]
    },
    {
      text: 'Account',icon:'fas fa-clipboard-check', url: '#', submenus: [
        {
          text: 'account_groups', url: null, icon:'fas fa-user-friends'
        },
        {
          text: 'account', url: null, icon:'fas fa-user'
        },
        {
          text: 'retailer_approviment', url: null, icon:'fas fa-user-check'
        }
      ]
    },
    {
      text: 'Stock',icon:'fas fa-clipboard-check', url: '#', submenus: [
        {
          text: 'stock_categories', url: null, icon:'fas fa-th'
        },
        {
          text: 'stock_groups', url: null, icon:'fas fa-layer-group'
        },
        {
          text: 'stock_sub_groups', url: null, icon:'fas fa-ellipsis-h'
        },
        {
          text: 'brands', url: null, icon:'fas fa-star'
        },
        {
          text: 'units', url: null, icon:'fas fa-folder-open'
        },
        {
          text: 'stocks', url: null, icon:'fas fa-box'
        }
      ]
    },
    {
      text: 'reports',icon:'fas fa-clipboard-check', url: '#', submenus: [
        {
          text: 'report_1', url: null, icon:'far fa-chart-bar'
        },
        {
          text: 'report_2', url: null, icon:'far fa-chart-bar'
        },
        {
          text: 'report_3', url: null, icon:'far fa-chart-bar'
        },
        {
          text: 'report_4', url: null, icon:'far fa-chart-bar'
        },
        {
          text: 'report_5', url: null, icon:'far fa-chart-bar'
        },
        
      ]
    },
    {
      text: 'Settings',icon:'fas fa-clipboard-check', url: '#', submenus: [
        {
          text: 'system', url: null, icon:'fas fa-tools'
        },
        {
          text: 'translation', url: null, icon:'fas fa-flag'
        },
        {
          text: 'security', url: null, icon:'fas fa-key'
        },
        {
          text: 'geography', url: null, icon:'fas fa-route',submenus: [
            {
              text: 'countries', url: null, icon:'fas fa-tools'
            },
            {
              text: 'teams', url: null, icon:'fas fa-tools'
            },
            {
              text: 'cities', url: null, icon:'fas fa-tools'
            },
            {
              text: 'regions', url: null, icon:'fas fa-tools'
            },
          ]
        }
      ]
    }
  ];

// -- HTTP Method List
  public static httpMethods = [
    {Id: 'POST', Description: 'POST'},
    {Id: 'GET', Description: 'GET'},
    {Id: 'DELETE', Description: 'DELETE'}
  ];
// -- Parameter Types
  public static parameterTypes = [
    {Id: 1, Description: 'Boolean'},
    {Id: 2, Description: 'Integer'},
    {Id: 3, Description: 'Double'},
    {Id: 4, Description: 'String'},
    {Id: 5, Description: 'Date'},
    {Id: 6, Description: 'Time'},
    {Id: 7, Description: 'DateTime'},
    {Id: 8, Description: 'Guid'},
    {Id: 9, Description: 'SingleObject'},
    {Id: 10, Description: 'ArrayObject'},
  ];
  // -- API Response Types
  public static responseTypes = [
    {Id: 0, Description: 'NoResponse'},
    {Id: 1, Description: 'SingleObject'},
    {Id: 2, Description: 'ArrayList'}
  ];
  // -- API Parameter Locations
  public static apiParameterLocations = [
    {Id: 10, Description: 'QueryString'},
    {Id: 20, Description: 'RequestObject'},
    {Id: 30, Description: 'ResponseObject'}
  ];
  // -- API Object Type
  public static apiObjectTypes = [
    {Id: 1, Description: 'SinlgeObject'},
    {Id: 2, Description: 'ArrayList'}
  ];
  // -- Production Line Situations
  public static productionLineSituation = [
    {Id: -225, Description: 'all'},
    {Id: -10, Description: 'stopped'},
    {Id: 0, Description: 'undefined'},
    {Id: 90, Description: 'running_bad_quality'},
    {Id: 100, Description: 'running_good_quality'}
  ];
  // -- Page records
  public static pageRecordCounts = [
    {Id: 10, Description: 10},
    {Id: 20, Description: 20},
    {Id: 30, Description: 30},
    {Id: 50, Description: 50},
    {Id: 100, Description: 100},
  ];
  // -- Platforms For Resources
  public static platformsForResources = [
    {Id: 'web', Description: 'web'}
  ];
}
