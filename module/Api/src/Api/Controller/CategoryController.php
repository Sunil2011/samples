<?php

namespace Api\Controller;

use Zend\Mvc\Controller\AbstractRestfulController;
//use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;

class CategoryController extends AbstractRestfulController
{

    protected $categoryTable;

    public function getCategoryTable()
    {
        if (!$this->categoryTable) {
            $sm = $this->getServiceLocator();
            $this->categoryTable = $sm->get('Api\Model\CategoryTable');
        }
        return $this->categoryTable;
    }

    /**
     * @SWG\Get(
     *     path="/api/category",
     *     description="get all categories",
     *     tags={"category"},
     *    
     *     @SWG\Response(
     *         response=200,
     *         description="response"
     *     )
     * )
     */
    public function getList()
    {        
        $res = $this->getCategoryTable()->fetchAll();
        
        $a_res = array();

        foreach ($res as $r) {
            $a_res['id'] = $r->id;
            $a_res['name'] = $r->name;
            $a_res['image'] = $r->thumb;
            $a_res['created_at'] = $r->created_at ;
            $a_res['updated_at'] = $r->updated_at ;
            
            $a[] = $a_res;  // creating multi. dim. array by adding all
        }

        return new JsonModel(array(
            'success' => true,
            'categories' => $a,
        ));
    }

    /**
     * @SWG\Get(
     *     path="/api/category/{id}",
     *     description="category details",
     *     tags={"category"},
     *     @SWG\Parameter(
     *         name="id",
     *         in="path",
     *         description="category id",
     *         required=true,
     *         type="integer"
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="response"
     *     )
     * )
     */
    public function get($id)
    {
        $catId = $id ;
        if ($catId) {
            try {
                $catId = $this->getCategoryTable()->getCategory($catId);
            } catch (\Exception $ex) {
                return new JsonModel(array(
                    'success' => false,
                    'msg' => 'data with given id is not present in db !'
                ));
            }

            return new JsonModel(array(
                'success' => true,
                'category' => $catId
            ));
        } else {
            return new JsonModel(array(
                'success' => false,
                'msg' => 'there is no data with id 0 !'
            ));
        }
    }
    
    /**
     * @SWG\Post(
     *     path="/api/category",
     *     description="create category",
     *     tags={"category"},
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
     *         description="categoty id required for update ",
     *         required=false,
     *         type="integer"
     *     ),
     *     @SWG\Parameter(
     *         name="name",
     *         in="formData",
     *         description="category name",
     *         required=true,
     *         type="string"
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="response"
     *     )
     *  ) 
     */
    
    public function create()
    {
       $parameter = $this->getParameter($this->params()->fromPost());
     
       $image = '';
        $File = $this->params()->fromFiles('file');
       //var_dump($parameter,13, $File); exit;
        // if category id is not there then add else update
        if (!isset($parameter['id'])) {
           
            if ($File) {

                $image = $this->upload();
                
            }
            
            date_default_timezone_set("Asia/Kolkata");

            $data = array(
                'name' => $parameter['name'],
                'thumb' => $image,
                "created_at" => date('Y-m-d H:i:s'),
                'flag' => '0'
            );
           
            $Dt = $this->getCategoryTable()->saveCategory($data);
           
            return new JsonModel(array(
                'success' => true,
                'category' => $Dt 
            ));
            
        } else {
            // product id is there so update 
            if ($File) {

                $image = $this->upload();

                $data = array(
                    'id' => $parameter['id'],
                    'name' => $parameter['name'],
                    'thumb' => $image,
                );
            } else {
                $data = array(
                    'id' => $parameter['id'],
                    'name' => $parameter['name'],
                );
            }

             $Dt = $this->getCategoryTable()->saveCategory($data);

            return new JsonModel(array(
                'success' => true,
                'category' => $Dt
            ));
        }
     
    }
    
    
    /**
     * @SWG\Post(
     *     path="/api/category/delete",
     *     description="delete category",
     *     tags={"category"},
     *     @SWG\Parameter(
     *         name="id",
     *         in="formData",
     *         description="category id",
     *         required=true,
     *         type="integer"
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="response"
     *     )
     * )
     */
    
    public function deleteAction(){
        
       $parameter = $this->getParameter($this->params()->fromPost());
       $category_id = $parameter['id'] ;
        
       $msg = $this->getCategoryTable()->deleteCategory($category_id);

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
       /* now not working 
        $adapter = new \Zend\File\Transfer\Adapter\Http();
        $adapter->setDestination(PUBLIC_PATH.'/uploads/products');
        //  var_dump(boolval($adapter->receive($file['name']))); exit ;//false 
        $adapter->receive($file['name']);
       */
        
        $uploadDir = PUBLIC_PATH.'/uploads/category/' ;
        $uploadfile = $uploadDir . basename($file['name']);
        move_uploaded_file($file['tmp_name'], $uploadfile) ;
        
        return $file['name'] ;
    }
    

}
