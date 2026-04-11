package com.tienda.angel.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

@GetMapping("/")
public String home(@RequestParam(required = false) String param) {
    return param != null ? "Hola " + param : "Hola mundo";
}

}