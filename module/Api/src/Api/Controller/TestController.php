<?php

namespace Api\Controller;
 
use Zend\Mvc\Controller\AbstractActionController;
 
use Zend\View\Model\JsonModel;

class TestController extends AbstractActionController
{
    
    /**
     * @SWG\Post(
     *     path="/api/test",
     *     description="login details",
     *     tags={"test"},
     *      
     *     @SWG\Response(
     *         response=200,
     *         description="response"
     *     )
     * )
     */
    
    
    public function indexAction()
    {
        return new JsonModel(array(
           'success' => true ,
            'msg' => "test - controller  index action",
        )) ;
    }
    
    
    /**
     * @SWG\Post(
     *     path="/api/test/me",
     *     description="test-details",
     *     tags={"test"},
     *     @SWG\Parameter(
     *         name="username",
     *         in="formData",
     *         description="username",
     *         required=true,
     *         type="string"
     *     ),
     *     @SWG\Parameter(
     *         name="password",
     *         in="formData",
     *         description="password",
     *         required=true,
     *         type="string"
     *     ), 
     *     @SWG\Response(
     *         response=200,
     *         description="response"
     *     )
     * )
     */
    
    public function meAction()
    {
        $data = $this->params()->fromPost();
      
        return new JsonModel(array(
           'success' => true ,
            'data' => $data ,
            'msg' => " test - controller  action",
        )) ;
    }
    
    
    
}
