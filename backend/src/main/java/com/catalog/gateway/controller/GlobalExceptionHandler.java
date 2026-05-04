package com.catalog.gateway.controller;

import feign.FeignException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(FeignException.class)
    public ResponseEntity<Map<String, String>> handleFeignException(FeignException e) {
        Map<String, String> error = new HashMap<>();
        error.put("mensagem", "Erro na comunicação com a API externa (OMDb)");
        error.put("detalhe", e.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneralException(Exception e) {
        Map<String, String> error = new HashMap<>();
        error.put("mensagem", "Ocorreu um erro interno inesperado.");

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
