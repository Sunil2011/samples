<?php

namespace Api\Model;

 // Add these import statements
 use Zend\InputFilter\InputFilter;
 use Zend\InputFilter\InputFilterAwareInterface;
 use Zend\InputFilter\InputFilterInterface;

 // not needed in this project
 
 class Product implements InputFilterAwareInterface
 {
     public $id;
     public $name;
     public $category;
     public $brand ;
     public $thumb ;
     protected $inputFilter;                       // <-- Add this variable

     public function exchangeArray($data)
     {
         $this->id     = (isset($data['id']))     ? $data['id']     : null;
         $this->name = (isset($data['name'])) ? $data['name'] : null;
         $this->category  = (isset($data['category']))  ? $data['category']  : null;
         $this->category  = (isset($data['brand']))  ? $data['brand']  : null;
         $this->category  = (isset($data['thumb']))  ? $data['thumb']  : null;
     }
     public function getArrayCopy()
     {
      return get_object_vars($this);
     }

     // Add content to these methods:
     public function setInputFilter(InputFilterInterface $inputFilter)
     {
         throw new \Exception("Not used");
     }

     public function getInputFilter()
     {
         if (!$this->inputFilter) {
             $inputFilter = new InputFilter();

            

             $this->inputFilter = $inputFilter;
         }

         return $this->inputFilter;
     }
     
 }


