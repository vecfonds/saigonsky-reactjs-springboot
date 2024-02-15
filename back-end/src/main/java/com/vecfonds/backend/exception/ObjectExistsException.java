package com.vecfonds.backend.exception;

public class ObjectExistsException extends RuntimeException{
    public ObjectExistsException(String message){
        super(message);
    }

}
