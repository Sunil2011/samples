<?php

namespace Api ;

use Zend\ModuleManager\Feature\AutoloaderProviderInterface;
//use Zend\ModuleManager\Feature\ConfigProviderInterface;

 //use Api\Model\Product;
 use Api\Model\ProductTable;
 use Api\Model\CategoryTable;
 use Api\Model\BrandTable;
 
 use Zend\Db\ResultSet\ResultSet;
 use Zend\Db\TableGateway\TableGateway;

//use Zend\Authentication\Storage;
use Zend\Authentication\AuthenticationService;
use Zend\Authentication\Adapter\DbTable as DbTableAuthAdapter;


 
class Module implements AutoloaderProviderInterface
{
    public function getAutoloaderConfig(){
        return array(
             'Zend\Loader\ClassMapAutoloader' => array(
                 __DIR__ . '/autoload_classmap.php',
             ),
             'Zend\Loader\StandardAutoloader' => array(
                 'namespaces' => array(
                     __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                 ),
             ),
         );
        
    }
    
    
    public function getConfig(){ 
        
         return include __DIR__ . '/config/module.config.php';
    }
    
    
    public function getServiceConfig(){
        
    return array(
            'factories' => array(
                'Api\Model\ProductTable' => function($sm) {
                    $tableGateway = $sm->get('ProductTableGateway');
                    $table = new ProductTable($tableGateway);
                    return $table;
                },
                'ProductTableGateway' => function ($sm) {
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    $resultSetPrototype = new ResultSet();
                    // $resultSetPrototype->setArrayObjectPrototype(new Products());
                    return new TableGateway('products', $dbAdapter, null, $resultSetPrototype);
                    // here products is db table name 
                },
                        
                'Api\Model\CategoryTable' => function($sm) {
                    $tableGateway = $sm->get('CategoryTableGateway');
                    $table = new CategoryTable($tableGateway);
                    return $table;
                },
                'CategoryTableGateway' => function ($sm) {
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    $resultSetPrototype = new ResultSet();
                    
                    return new TableGateway('categories', $dbAdapter, null, $resultSetPrototype);
                    // here categories is db table name 
                },
                        
                'Api\Model\BrandTable' => function($sm) {
                    $tableGateway = $sm->get('BrandTableGateway');
                    $table = new BrandTable($tableGateway);
                    return $table;
                },
                'BrandTableGateway' => function ($sm) {
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    $resultSetPrototype = new ResultSet();
                    
                    return new TableGateway('brand', $dbAdapter, null, $resultSetPrototype);
                    // here brand is db table name 
                },
                       
                'AuthService' => function($sm) {
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    $dbTableAuthAdapter  = new DbTableAuthAdapter($dbAdapter, 
                                              'account','username','password');
             
                    $authService = new AuthenticationService();
                    $authService->setAdapter($dbTableAuthAdapter);
                    
                    return $authService;
                    
                } ,
                        
            )
        );
    }
    
}
    
    

