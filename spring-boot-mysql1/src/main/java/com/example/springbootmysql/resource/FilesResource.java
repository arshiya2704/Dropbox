package com.example.springbootmysql.resource;

import com.example.springbootmysql.model.Files;
import com.example.springbootmysql.repository.FilesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/rest/files")
public class FilesResource {

    @Autowired
    FilesRepository filesRepository;

    @GetMapping(value = "/all")
    public List<Files> getAll(){
        return filesRepository.findAll();
    }

    @PostMapping(value = "/load")
    public List <Files> persist(@RequestBody final Files files){
        filesRepository.save(files);
        return filesRepository.findAll();
    }
}
