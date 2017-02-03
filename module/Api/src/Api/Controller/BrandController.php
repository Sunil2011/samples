<?php

namespace Api\Controller;
  
use Zend\Mvc\Controller\AbstractRestfulController;
//use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;

class BrandController extends AbstractRestfulController
{
    
    protected $brandTable;
    
    
    public function getBrandTable()
    {
        if (!$this->brandTable) {
            $sm = $this->getServiceLocator();
            $this->brandTable = $sm->get('Api\Model\brandTable');
        }
        return $this->brandTable;
    }
    
    
     /**
     * @SWG\Get(
     *     path="/api/brand",
     *     description="get all brands",
     *     tags={"brand"},
     *    
     *     @SWG\Response(
     *         response=200,
     *         description="response"
     *     )
     * )
     */
    public function getList()
    {        
        $res = $this->getBrandTable()->fetchAll();
        
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
            'brands' => $a,
        ));
    }

    /**
     * @SWG\Get(
     *     path="/api/brand/{id}",
     *     description="category details",
     *     tags={"brand"},
     *     @SWG\Parameter(
     *         name="id",
     *         in="path",
     *         description="brand id",
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
        $brdId = $id ;
        if ($brdId) {
            try {
                $brdId = $this->getBrandTable()->getBrand($brdId);
            } catch (\Exception $ex) {
                return new JsonModel(array(
                    'success' => false,
                    'msg' => 'data with given id is not present in db !'
                ));
            }

            return new JsonModel(array(
                'success' => true,
                'brand' => $brdId
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
     *     path="/api/brand",
     *     description="create brand",
     *     tags={"brand"},
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
     *         description="brand id required for update ",
     *         required=false,
     *         type="integer"
     *     ),
     *     @SWG\Parameter(
     *         name="name",
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
    
    public function create()
    {
     $parameter = $this->getParameter($this->params()->fromPost());
     
     $image = '';
        $File = $this->params()->fromFiles('file');
       
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
            
            $Dt = $this->getBrandTable()->saveBrand($data);
           
            return new JsonModel(array(
                'success' => true,
                'brand' => $Dt 
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

             $Dt = $this->getBrandTable()->saveBrand($data);

            return new JsonModel(array(
                'success' => true,
                'brand' => $Dt
            ));
        }
     
    }
    
    
    /**
     * @SWG\Post(
     *     path="/api/brand/delete",
     *     description="delete brand",
     *     tags={"brand"},
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
       $brand_id = $parameter['id'] ;
        
       $msg = $this->getBrandTable()->deleteBrand($brand_id);

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
        
        $uploadDir = PUBLIC_PATH.'/uploads/brands/' ;
        $uploadfile = $uploadDir . basename($file['name']);
        move_uploaded_file($file['tmp_name'], $uploadfile) ;
        
        return $file['name'] ;
    }
    
    
}
