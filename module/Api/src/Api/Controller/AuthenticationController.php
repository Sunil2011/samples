<?php

namespace Api\Controller;
 
use Zend\Mvc\Controller\AbstractActionController;
 
use Zend\View\Model\JsonModel;

use Api\Form\LoginForm ;
use Api\Model\Login ;

class AuthenticationController extends AbstractActionController
{
    
    protected $form;
    
    protected $authservice;
    
    public function getAuthService()
    {
        if (! $this->authservice) {
            $this->authservice = $this->getServiceLocator()
                                      ->get('AuthService');
        }
         
        return $this->authservice;
    }
    
     
    public function getForm()
    {
        if (! $this->form) {
        
          $this->form = new LoginForm() ;
        }
         
        return $this->form;
    }
    
    
    /**
     * @SWG\Post(
     *     path="/api/auth/login",
     *     description="login details",
     *     tags={"user"},
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
    
    public function loginAction()
    {
       
        
        $form       = $this->getForm();
        
        $request = $this->getRequest();
       
        if ($request->isPost()){
            
            $data = $this->params()->fromPost();
           
           
            $log = new Login();
            $form->setInputFilter($log->getInputFilter());
            
           
            
           // $form->setData($request->getPost());
            $form->setData($data);
            
            if ( $form->isValid() ){
               
                //check authentication... // set identity and credentials using login form,
                $this->getAuthService()->getAdapter()
                                       ->setIdentity($data['username'])   
                                       ->setCredential($data['password']); 
                                        
                $result = $this->getAuthService()->authenticate();
               
                $authMsg = array();
                foreach($result->getMessages() as $message)
                {             
                    $authMsg[] = $message ;
                }
             
               if ($result->isValid()) {
                  
                   return new JsonModel(array(
                       'success' => true ,
                       'message' => 'authenticated',
                       
                   )) ;
                    
                }else{
                   return new JsonModel(array(
                       'success' => false ,
                       'message' => $authMsg , 
                   )); 
                } 
                
            }
        }
         
        return new JsonModel(array(
            'success' => false ,
            'msg' => 'no post data for authentication ..'
        ));
    }
    
    
    /**
     * @SWG\Get(
     *     path="/api/auth",
     *     description="index",
     *     tags={"user"},
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
           'success' => false ,
            'msg' => "please check the api you are using "
        )) ;
    }
    
    
     public function logoutAction()
    {        
        $this->getAuthService()->clearIdentity();
        
        return new JsonModel(array(
            'success' => true ,
            'msg' => "You've been log out "
        )) ;
    }
    
}
