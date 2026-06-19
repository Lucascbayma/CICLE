package com.projetos3.cicle.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {

    @RequestMapping({
            "/",
            "/usuario",
            "/empresa",
            "/calculadora",
            "/calculadora-ambiental",
            "/metas",
            "/historico",
            "/gamificacao",
            "/floresta"
    })
    public String forward() {
        return "forward:/index.html";
    }
}