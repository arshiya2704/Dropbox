package com.example.springbootmysql.resource;

import com.example.springbootmysql.dataObjects.ServiceResponse;
import com.example.springbootmysql.dataObjects.User;
import com.example.springbootmysql.model.Users;
import com.example.springbootmysql.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping(value = "/users")
public class UsersResource {

    @Autowired
    UsersRepository usersRepository;

    @GetMapping(value = "/all")
    public List<Users> getAll(){
        return usersRepository.findAll();
    }

    @PostMapping(value = "/load")
    public List <Users> persist(@RequestBody final Users users){
        usersRepository.save(users);
        return usersRepository.findAll();
    }


    @PostMapping(value = "/api/doRegister")
    public ResponseEntity <ServiceResponse> registerUser(@RequestBody final User user){
        System.out.println("register called");

        System.out.println(user.getFname());
        System.out.println(user.getLname());
        System.out.println(user.getPassword());
        System.out.println(user.getUsername());


        Users u = new Users();
        u.setEmail(user.getUsername());
        u.setFname(user.getFname());
        u.setLname(user.getLname());
        u.setPwd(user.getPassword());

        usersRepository.save(u);
        ServiceResponse r=new ServiceResponse();
        r.setMessage("User Registered!!");
        return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
        //return usersRepository.findAll();
        //return Ht;
    }


    @PostMapping(value = "/api/doLogin")
    public ResponseEntity <ServiceResponse> loginUser(@RequestBody final User user){
        System.out.println("login called");
        System.out.println(user.getPassword());
        System.out.println(user.getUsername());


//        Users u = new Users();
//        u.setEmail(user.getUsername());
//        u.setPwd(user.getPassword());


        Users u = usersRepository.findFirstByEmailAndPwd(user.getUsername(), user.getPassword());
        if(u == null){
        ServiceResponse r=new ServiceResponse();
        r.setMessage("User does not exist!!");
        return new ResponseEntity<ServiceResponse>(r, HttpStatus.INTERNAL_SERVER_ERROR);}
        else{
            ServiceResponse r=new ServiceResponse();
            r.setMessage("logged in");
            return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
        }
        //return usersRepository.findAll();
        //return Ht;
    }
}
