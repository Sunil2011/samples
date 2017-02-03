<?php

namespace Api\Model;

use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Sql\Where ;

class CategoryTable
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
    
          
     
    public function getCategory($id)
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

    public function saveCategory($cat)
    {   
       
        if ( !isset($cat['id']) ) {
            $this->tableGateway->insert($cat);
            $id = $this->tableGateway->getLastInsertValue() ;
              
        } else {
            $dbData = $this->getCategory($cat['id']) ; 
            if ($dbData) {
                $id = $cat['id'] ;
                $this->tableGateway->update($cat, array('id' => $id ));
            } else {
                throw new \Exception('Category id does not exist');
            }
        }
        
        $data = $this->getCategory($id);
        return $data ;
    }

    public function deleteCategory($id)
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



