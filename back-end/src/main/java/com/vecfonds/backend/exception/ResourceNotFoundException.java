package com.vecfonds.backend.exception;

public class ResourceNotFoundException extends RuntimeException{
    String resourceName;
    String field;
    String fieldName;
    Long fieldId;
    public ResourceNotFoundException(String message){
        super(message);
    }

    public ResourceNotFoundException(String resourceName, String field, String fieldName) {
        super(String.format("%s không tìm thấy với %s: %s", resourceName, field, fieldName));
        this.resourceName = resourceName;
        this.field = field;
        this.fieldName = fieldName;
    }

    public ResourceNotFoundException(String resourceName, String field, Long fieldId) {
        super(String.format("%s không tìm thấy với %s: %d", resourceName, field, fieldId));
        this.resourceName = resourceName;
        this.field = field;
        this.fieldId = fieldId;
    }
}
