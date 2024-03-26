package com.vecfonds.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ExceptionGlobalHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    @ExceptionHandler(TokenRefreshException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorResponse handleTokenRefreshException(TokenRefreshException ex, WebRequest request) {
        return new ErrorResponse(
                HttpStatus.FORBIDDEN.value(),
                new Date(),
                ex.getMessage());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handlerNotFoundException(ResourceNotFoundException ex, WebRequest req){
        return new ErrorResponse(HttpStatus.NOT_FOUND.value(), new Date(), ex.getMessage());
    }

    @ExceptionHandler(ObjectExistsException.class)
    @ResponseStatus(HttpStatus.OK)
    public ErrorResponse handlerObjectExistsException(ObjectExistsException ex, WebRequest req){
        return new ErrorResponse(HttpStatus.OK.value(), new Date(), ex.getMessage());
    }

    @ExceptionHandler(APIException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handlerAPIException(APIException ex, WebRequest req){
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), new Date(), ex.getMessage());
    }

    @ExceptionHandler(IllegalStateException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handlerIllegalStateException(IllegalStateException ex, WebRequest req){
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), new Date(), ex.getMessage());
    }
}