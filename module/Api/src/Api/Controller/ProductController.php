<?php

namespace Api\Controller;

//use Api\Model\Product;          // <-- Add this import

//use Product\Form\ProductForm;       // <-- not required
 
 
use Zend\Mvc\Controller\AbstractActionController;
//use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;

class ProductController extends AbstractActionController
{
    protected $productTable;
    
    
    public function getProductTable()
    {
        if (!$this->productTable) {
            $sm = $this->getServiceLocator();
            $this->productTable = $sm->get('Api\Model\ProductTable');
        }
        return $this->productTable;
    }
    
    
    /**
     * @SWG\Get(
     *     path="/api/products",
     *     description="get all products",
     *     tags={"products"},
     *    
     *     @SWG\Response(
     *         response=200,
     *         description="response"
     *     )
     * )
     */
    
    public function indexAction()
    {
        $res = $this->getProductTable()->fetchAll();
       
        $a_res = array();
        
        foreach ($res as $r){
            $a_res['id'] = $r->id  ;  
            $a_res['name']  = $r->name;
            $a_res['category'] = $r->category;
            $a_res['brand'] = $r->brand ;
            $a_res['image'] = $r->thumb ;
            $a_res['created_at'] = $r->created_at;
            $a_res['updated_at'] = $r->updated_at ;
            $a[] = $a_res;  // creating multi. dim. array by adding all
                 
        }
        
        return new JsonModel(array(
           'success' => true ,
           'products' => $a,
        ));
        
    }
    
    
     /**
     * @SWG\Post(
     *     path="/api/products/add",
     *     description="create product",
     *     tags={"products"},
     *     @SWG\Parameter(
     *         name="file",
     *         in="formData",
     *         description="image upload",
     *         required=false,
     *         type="file"
     *     ),
     *     @SWG\Parameter(
     *         name="id",
     *         in="formData",
     *         description="provide product id if you want to update",
     *         required=false,
     *         type="integer"
     *     ),
     *     @SWG\Parameter(
     *         name="name",
     *         in="formData",
     *         description="product name",
     *         required=true,
     *         type="string"
     *     ),
     * @SWG\Parameter(
     *         name="category",
     *         in="formData",
     *         description="category name",
     *         required=true,
     *         type="string"
     *     ),
     * @SWG\Parameter(
     *         name="brand",
     *         in="formData",
     *         description="brand name",
     *         required=true,
     *         type="string"
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="response"
     *     )
     *  ) 
     */
    
    public function addAction()
    {
       $parameter = $this->getParameter($this->params()->fromPost());
       //var_dump($parameter); exit;
        $image = '';
        $File = $this->params()->fromFiles('file');
       
        // if product id is not there then add else update
        if (!isset($parameter['id'])) {
           
            if ($File) {

                $image = $this->upload();
            }
            
            date_default_timezone_set("Asia/Kolkata");

            $data = array(
                'name' => $parameter['name'],
                'brand' => $parameter['brand'],
                'category' => $parameter['category'],
                'thumb' => $image,
                //'created_at' => new Zend\Db\Sql\Expression("NOW()"),
                //'updated_at' => new Zend\Db\Sql\Expression("NOW()"),
                "created_at" => date('Y-m-d H:i:s'),
                'flag' => '0'
            );
            
            $Dt = $this->getProductTable()->saveProduct($data);
           
            return new JsonModel(array(
                'success' => true,
                'product' => $Dt 
            ));
            
        } else {
            // product id is there so update 
            if ($File) {

                $image = $this->upload();

                $data = array(
                    'id' => $parameter['id'],
                    'name' => $parameter['name'],
                    'brand' => $parameter['brand'],
                    'category' => $parameter['category'],
                    'thumb' => $image,
                );
            } else {
                $data = array(
                    'id' => $parameter['id'],
                    'name' => $parameter['name'],
                    'brand' => $parameter['brand'],
                    'category' => $parameter['category'],
                );
            }

             $Dt = $this->getProductTable()->saveProduct($data);

            return new JsonModel(array(
                'success' => true,
                'product' => $Dt
            ));
        }
    }

     /**
     * @SWG\Get(
     *     path="/api/products/getSpecificProduct/{id}",
     *     description="product details",
     *     tags={"products"},
     *     @SWG\Parameter(
     *         name="id",
     *         in="path",
     *         description="product id",
     *         required=true,
     *         type="integer"
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="response"
     *     )
     * )
     */
    
    public function getSpecificProductAction()
    {   
        $prdId = $this->params()->fromRoute('id');
        // $prdId = $parameter['id'] ;
        
        if ($prdId) {
            try {
                $prd = $this->getProductTable()->getProduct($prdId);
            } catch (\Exception $ex) {
                return new JsonModel(array(
                    'success' => false,
                    'msg' => 'data with given id is not present in db !'
                ));
            }

            return new JsonModel(array(
                'success' => true,
                'product' => $prd
            ));
        } else {
            return new JsonModel(array(
                'success' => false,
                'msg' => 'there is no data with id 0 !'
            ));
        }
    }

    /* merge in addAction by checking id
    public function updateAction()
    {
        $parameter = $this->getParameter($this->params()->fromPost());
       
       $image = '' ;
       $File = $this->params()->fromFiles('file') ;
      
       if ($File) {

            $image = $this->upload();

            $data = array(
                'id' => $parameter['id'],
                'name' => $parameter['name'],
                'brand' => $parameter['brand'],
                'category' => $parameter['category'],
                'thumb' => $image,
            );
            
        } else {
            $data = array(
                'id' => $parameter['id'],
                'name' => $parameter['name'],
                'brand' => $parameter['brand'],
                'category' => $parameter['category'],
            );
        }

        $this->getProductTable()->saveProduct($data);
        
        return new JsonModel(array(
            'success' => true
        ));
        
    }
    */
    
    
    /**
     * @SWG\Post(
     *     path="/api/products/delete",
     *     description="delete brand",
     *     tags={"products"},
     *     @SWG\Parameter(
     *         name="id",
     *         in="formData",
     *         description="product id",
     *         required=true,
     *         type="integer"
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="response"
     *     )
     * )
     */
    
    public function deleteAction()
    {
       $parameter = $this->getParameter($this->params()->fromPost());
       $product_id = $parameter['id'] ;
        
       $msg = $this->getProductTable()->deleteProduct($product_id);

        if ($msg) {
            return new JsonModel(array(
                'success' => true,
                'msg' => 'deleted successfully '
            ));
        } else {
            return new JsonModel(array(
                'success' => false,
                'msg' => 'unable to delete '
            ));
        }
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

    public function upload()
    {   
        $file = $this->params()->fromFiles('file');
       /* now not working (2016-07-29)
        $adapter = new \Zend\File\Transfer\Adapter\Http();
        $adapter->setDestination(PUBLIC_PATH.'/uploads/products');
        //  var_dump(boolval($adapter->receive($file['name']))); exit ;//false 
        $adapter->receive($file['name']);
       */
        
        $uploadDir = PUBLIC_PATH.'/uploads/products/' ;
        $uploadfile = $uploadDir . basename($file['name']);
        move_uploaded_file($file['tmp_name'], $uploadfile) ;
        
        return $file['name'] ;
    }

}

