<?php

return array(
     'controllers' => array(
         'invokables' => array(
            'Api\Controller\Product' => 'Api\Controller\ProductController',
            'Api\Controller\Category' =>  'Api\Controller\CategoryController',
            'Api\Controller\Brand' => 'Api\Controller\BrandController', 
            'Api\Controller\Authentication' => 'Api\Controller\AuthenticationController',
             'Api\Controller\Test' => 'Api\Controller\TestController'
         ),
     ),
    
    
    'router' => array(
        'routes' => array(
               
            
            'produdts-details' => array(
                'type' => 'Segment',
                'options' => array(
                    'route'=> '/api/products[/:action][/:id]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id' => '[0-9]+'
                    ),
                    'defaults' => array(
                        'controller' => 'Api\Controller\Product',
                        'action' => 'index',
                    ),
                ),
            ),
            
            'category-details' => array(
                'type' => 'Segment',
                'options' => array(
                    'route'=> '/api/category[/:action][/:id]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id' => '[0-9]+'
                    ),
                    'defaults' => array(
                        'controller' => 'Api\Controller\Category',
                       
                    ),
                ),
            ),
         
            'brand-details' => array(
                'type' => 'Segment',
                'options' => array(
                    'route'=> '/api/brand[/:action][/:id]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id' => '[0-9]+'
                    ),
                    'defaults' => array(
                        'controller' => 'Api\Controller\Brand',
                        
                    ),
                ),
            ),
            
            'api-auth-rest' => array(
                'type' => 'Segment',
                'options' => array(
                    'route'=> '/api/auth[/:action]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',                        
                         
                        ),
                    'defaults' => array(
                        'controller' => 'Api\Controller\Authentication',
                        'action' => 'index' ,
                                                
                    ),
                ),
            ),
            
            'api-test' => array(
                'type' => 'Segment',
                'options' => array(
                    'route'=> '/api/test[/:action]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',                        
                         
                        ),
                    'defaults' => array(
                        'controller' => 'Api\Controller\Test',
                        'action' => 'index',
                                                
                    ),
                ),
            ),
            
            
        ),
    ),
    
    
    'view_manager' => array(
        'template_path_stack' => array(
            'product' => __DIR__ . '/../view',
        ),
        
        // for JSON file return
        'strategies' => array(
            'ViewJsonStrategy',
        ),
        
    ),
    
    
);

