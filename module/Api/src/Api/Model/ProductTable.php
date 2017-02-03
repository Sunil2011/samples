<?php

namespace Api\Model;

use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Sql\Where ;

class ProductTable
{

    protected $tableGateway;

    public function __construct(TableGateway $tableGateway)
    {
        $this->tableGateway = $tableGateway;
    }

    public function fetchAll()
    {   
        $where = new Where() ;
        $where->notEqualTo('flag', '-1');
        $resultSet = $this->tableGateway->select($where);
        return $resultSet;
    }
    
          
     
    public function getProduct($id)
    {
        // var_dump($this->tableGateway);
        
        $rowset = $this->tableGateway->select(array('id' => $id));
        $row = $rowset->current();
       
        if (!$row) {
            throw new \Exception("Could not find row $id");
        }
        
        // changing row key name thumb to image 
        $row['image'] = $row['thumb'];
        unset($row['thumb']);
        // var_dump($row); exit;
        return $row;
    }

    public function saveProduct($prd)
    {        
       
        if ( !isset($prd['id']) ) {
            $this->tableGateway->insert($prd);
            $id = $this->tableGateway->getLastInsertValue() ;
              
        } else {
            $dbData = $this->getProduct($prd['id']) ; 
            if ($dbData) {
                $id = $prd['id'] ;
                $this->tableGateway->update($prd, array('id' => $id ));
            } else {
                throw new \Exception('Product id does not exist');
            }
        }
        
        $data = $this->getProduct($id);
        return $data ;
    }

    public function deleteProduct($id)
    {
        //var_dump($id);
        try {
          $this->tableGateway->update(array('flag' => '-1'), array('id' => $id)); 
          return true ;
          
        } catch (Exception $ex) {
            return false ;  
        } 
        
    }
    

}


