import {Enums} from './enums';

export class EnumsList {
// -- Menu Items
  public static menuItems = [
    {
      text: 'settings', url: '#', submenus: [
        {
          text: 'translations', url: null, submenus: [
            {text: 'languages', url: '/main/language-list'},
            {text: 'static_translations', url: '/main/static-translation'},
            {text: 'dynamic_translations', url: '/main/dynamic-translation'},
            {text: 'enum_translations', url: '/main/enum-translation'}
          ]
        },
        {
          text: 'system', url: null, submenus: [
            {text: 'file_types', url: '/main/file-type-list'},
            {text: 'countries', url: '/main/country-list'},
            {text: 'message_accounts', url: '/main/message-account-list'},
            {text: 'message_templates', url: '/main/message-template-list'},
            {text: 'system_parameters', url: '/main/sys-parameters'}
          ]
        },
        {
          text: 'api', url: null, submenus: [
            {text: 'api_services', url: '/main/api-service-list'},
            {text: 'endpoints', url: '/main/api-endpoint-list'},
            {text: 'api_messages', url: '/main/api-message-list'},
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
