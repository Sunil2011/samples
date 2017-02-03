<?php

namespace Api\Model;

use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Sql\Where ;

class BrandTable
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
    
          
     
    public function getBrand($id)
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
        return $row;
    }

    public function saveBrand($brd)
    {
       
        if ( !isset($brd['id']) ) {
            $this->tableGateway->insert($brd);
            $id = $this->tableGateway->getLastInsertValue() ;
              
        } else {
            $dbData = $this->getBrand($brd['id']) ; 
            if ($dbData) {
                $id = $brd['id'] ;
                $this->tableGateway->update($brd, array('id' => $id ));
            } else {
                throw new \Exception('Brand id does not exist');
            }
        }
        
        $data = $this->getBrand($id);
        return $data ;
    }

    public function deleteBrand($id)
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



