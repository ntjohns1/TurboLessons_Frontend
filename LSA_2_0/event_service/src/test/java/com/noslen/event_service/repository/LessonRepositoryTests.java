package com.noslen.event_service.repository;

import com.noslen.event_service.model.LessonEvent;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class LessonRepositoryTests {

    @Autowired
    LessonRepository lessonRepo;

    @BeforeEach
    public void setup() throws Exception {
        lessonRepo.deleteAll();
    }

    @Test
    public void addGetDeleteLesson() {

        LocalDateTime date = LocalDateTime.of(LocalDate.of(2023, 1, 1), LocalTime.of(13, 0));
        LessonEvent lesson = new LessonEvent("6967f66b-8a23-4549-bb5e-0b6612fd4f5a", date, "This is a test LessonEvent");

        lessonRepo.save(lesson);

        Optional<LessonEvent> lesson1 = lessonRepo.findById(lesson.getId());

        Assertions.assertTrue(lesson1.isPresent());
        Assertions.assertEquals(lesson, lesson1.get());

        lessonRepo.deleteById(lesson.getId());

        lesson1 = lessonRepo.findById(lesson.getId());

        Assertions.assertFalse(lesson1.isPresent());

    }

    @Test
    public void getAllLessonEvents() {

        LocalDateTime date = LocalDateTime.of(LocalDate.of(2023, 1, 1), LocalTime.of(13, 0));
        LessonEvent lesson = new LessonEvent("6967f66b-8a23-4549-bb5e-0b6612fd4f5a", date, "This is a test LessonEvent");

        lessonRepo.save(lesson);

        date = LocalDateTime.of(LocalDate.of(2023, 1, 1), LocalTime.of(13, 0));
        lesson = new LessonEvent("62235094-d908-4814-abbc-e0fefcfef0fd", date, "This is another test LessonEvent");
        lessonRepo.save(lesson);

        List<LessonEvent> lList = lessonRepo.findAll();

        Assertions.assertEquals(2, lList.size());

    }

    @Test
    public void updateLessonEvent() {

        LocalDateTime date = LocalDateTime.of(LocalDate.of(2023, 1, 1), LocalTime.of(13, 0));
        LessonEvent lesson = new LessonEvent("6967f66b-8a23-4549-bb5e-0b6612fd4f5a", date, "This is a test LessonEvent");

        lessonRepo.save(lesson);

        date = LocalDateTime.of(LocalDate.of(2024, 2, 2), LocalTime.of(16, 30));
        lesson.setStudentId("62235094-d908-4814-abbc-e0fefcfef0fd");
        lesson.setDate(date);
        lesson.setComments("NEW COMMENT");
        lessonRepo.save(lesson);

        Optional<LessonEvent> lesson1 = lessonRepo.findById(lesson.getId());

        Assertions.assertTrue(lesson1.isPresent());

        Assertions.assertEquals(lesson, lesson1.get());
    }

//    @Test
//    public void getLessonByStudentId
}
