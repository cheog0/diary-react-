package com.sparta.real_prac.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    // /api/test 경로에 대해서만 CORS 설정
    @CrossOrigin(origins = "http://localhost:5174") // React 앱의 주소
    @GetMapping("/api/test")
    public String hello() {
        return "테스트입니다.";
    }
}
