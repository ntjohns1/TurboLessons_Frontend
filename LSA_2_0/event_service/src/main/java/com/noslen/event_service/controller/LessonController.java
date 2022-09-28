package com.noslen.event_service.controller;

import com.noslen.event_service.EventServiceApplication;
import com.noslen.event_service.model.LessonEvent;
import com.noslen.event_service.repository.LessonRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RefreshScope
@RestController
//@CrossOrigin("http://locahost:3000")
public class LessonController {

    private static final Logger LOG = LoggerFactory.getLogger(EventServiceApplication.class);

//    @GetMapping("/api/lesson/token")
//    public String resource(BearerTokenAuthentication auth) {
//        LOG.trace("***** Credentials: {}", auth.getCredentials().toString());
//        LOG.trace("***** JWT Claims: {}", auth.getToken().getTokenValue());
////        return String.format("Resource accessed by: %s (with subjectId: %s)" ,
////                auth.get
////                jwt.getSubject());
//        return LOG.getName();
//    }

//    @GetMapping("/api/lesson/token")
//    public String getToken(BearerTokenAuthentication auth ) {
////        CsrfToken token = (CsrfToken) request.getAttribute("_csrf");
////
////        System.out.println(token.getToken());
//        Map<String, Object> m = auth.getTokenAttributes();
////        boolean s = m.get("realm_access").toString().contains("admin");
//        return auth.getToken().getTokenValue();
//    }

    @Autowired
    private LessonRepository lessonEventRepo;

    //    GET ALL LESSONS
    @GetMapping("/api/lesson")
    @ResponseStatus(HttpStatus.OK)
    public List<LessonEvent> getAllLessons() {
        return lessonEventRepo.findAll();
    }

    //GET LESSON BY ID
    @GetMapping("/api/lesson/{id}")
    @ResponseStatus(HttpStatus.OK)
    public LessonEvent getLessonById(@PathVariable Integer id) {
        Optional<LessonEvent> returnVal = lessonEventRepo.findById(id);
        return returnVal.orElse(null);
    }


    //GET LESSONS BY STUDENT ID
    @GetMapping("/api/lesson/student/{studentId}")
    @ResponseStatus(HttpStatus.OK)
    public List<LessonEvent> getLessonsByStudent(@PathVariable String studentId) {
        return lessonEventRepo.findLessonsByStudentId(studentId);
    }

    //CREATE NEW LESSON
    @PostMapping(path = "/api/lesson/", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAnyAuthority('SCOPE_event-service-write')")
    public LessonEvent createLesson(@RequestBody  LessonEvent lesson ) throws Exception {
        lessonEventRepo.save(lesson);
        return lesson;
    }

    //UPDATE LESSON BY ID
    @PutMapping("/api/lesson/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void updateLesson(@RequestBody LessonEvent lesson, @PathVariable Integer id) {
        if(lesson.getId() != id) {
            throw new IllegalArgumentException("Entered ID does not match existing lesson ID");
        }
        lessonEventRepo.save(lesson);
    }

    //DELETE LESSON BY ID
    @DeleteMapping("/api/lesson/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteLesson(@PathVariable Integer id) {
        lessonEventRepo.deleteById(id);
    }
}

