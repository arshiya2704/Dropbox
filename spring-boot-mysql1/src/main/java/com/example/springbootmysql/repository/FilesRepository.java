package com.example.springbootmysql.repository;

import com.example.springbootmysql.model.Files;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilesRepository extends JpaRepository<Files,Integer> {
}
