<?php

namespace Api\Controller;

use Api\Exception\ApiException;
//use Api\Table\AccountTable;
use DateTime;
use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\Session\Container;
use Zend\View\Model\JsonModel;

// not in use bcz set-up for zfcUser is not completed .... 
class BaseApiController extends AbstractRestfulController
{   
    
    public function checkUserSession()
    {
        if ($this->zfcUserAuthentication()->hasIdentity()) {
            return (array) $this->zfcUserAuthentication()->getIdentity();
        }

        throw new ApiException('Unauthorized, Please login!', 401);
    }
    
    
    
    public function getParameter($params)
    {
        $parameter = array();
        foreach ($params as $key => $value) {
            if ($value) {
                $parameter[$key] = $value;
            }
        }

        return $parameter;
    }
    
    protected function getService($serviceName)
    {
        $sm = $this->getServiceLocator();
        $service = $sm->get($serviceName);
        return $service;
    }
    
    protected function parseJSONString($string)
    {
        $itemData = json_decode($string, TRUE);
        if ($itemData === null && json_last_error() !== JSON_ERROR_NONE) {
            return false;
        }

        return $itemData;
    }
    
    public function successRes($msg, $data = array())
    {
        return new JsonModel(array(
            'success' => true,
            'message' => $msg,
            'data' => $data
        ));
    }

    public function errorRes($msg, $error = array(), $code = 500)
    {
        $this->getResponse()->setStatusCode($code);

        return new JsonModel(array(
            'error' => array_merge(
                    array(
                "type" => "Api\\Exception\\ApiException",
                'message' => $msg,
                "code" => $code
                    ), $error
            ),
        ));
    }
    
}

