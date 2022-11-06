package com.noslen.lessonscheduleservice.controller;




import com.noslen.lessonscheduleservice.dao.LessonEventRepo;
import com.noslen.lessonscheduleservice.dto.LessonEvent;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
//@CrossOrigin("http://localhost:3000")
public class EventController {




    @Autowired
    private LessonEventRepo lessonEventRepo;

    @GetMapping("/say_hi_public")
    public String sayHiPublic() {
        return "PUBLIC: Hello!!!!";
    }

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
    @GetMapping("/api/lesson/student/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<LessonEvent> getLessonsByStudent(@PathVariable String studentId) {
        return lessonEventRepo.findLessonsByStudentId(studentId);
    }

    //CREATE NEW LESSON
    @PostMapping("/api/postlesson")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyAuthority('SCOPE_event-service-write')")
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
