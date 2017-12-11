package com.example.springbootmysql.repository;

import com.example.springbootmysql.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsersRepository extends JpaRepository<Users,Integer> {

    public Users findFirstByEmailAndPwd(String email, String pwd);

}
