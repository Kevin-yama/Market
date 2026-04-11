package com.tienda.angel.config;

import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ErrorResponse manejarError(RuntimeException ex, HttpServletRequest request) {
        System.out.println("Error manejado: " + ex.getMessage());
        return new ErrorResponse(
                500,
                ex.getMessage(),
                request.getRequestURI()
        );
    }
}