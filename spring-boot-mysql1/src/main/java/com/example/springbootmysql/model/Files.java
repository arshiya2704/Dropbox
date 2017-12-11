package com.example.springbootmysql.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Files {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Integer id;
    @Column(name="file_type")
    private String type;
    @Column(name="file_name")
    private String name;


    public Files(){
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public Integer getId() {
        return id;
    }
}
