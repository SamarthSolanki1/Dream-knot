package com.sergio.jwt.backend.entites;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "app_user")
public class User {

    public User(String name, String email, String login, String mobileNumber, String encodedPassword) {
        this.name = name;
        this.email = email;
        this.login = login;
        this.mobileNumber = mobileNumber;
        this.password = encodedPassword;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public String getname() {
        return name;
    }

    public void setname(String name) {
        name = name;
    }

    public String getNumber() {
        return mobileNumber;
    }

    public void setNumber(String mobileNumber) {
       this.mobileNumber = mobileNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "name", nullable = false)
    @Size(max = 100)
    private String name;
     @Column(name = "mobileNumber")
    private String mobileNumber;



    @Column(name = "email" , nullable = false)
   private String email;

    @Column(nullable = false)
    @Size(max = 100)
    private String login;

    @Column(nullable = false)
    @Size(max = 100)
    private String password;


}
