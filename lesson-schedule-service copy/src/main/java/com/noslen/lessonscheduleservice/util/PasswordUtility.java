package com.noslen.lessonscheduleservice.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordUtility {

    public static void main(String[] args) {
        PasswordEncoder enc = new BCryptPasswordEncoder();

        String password = "password";

        for (int i = 0; i < 9; i++) {
            String encodedPassword = enc.encode(password);

            System.out.println("insert into users (username, " + encodedPassword + ", enabled, uid) values" );

        }

    }
}
