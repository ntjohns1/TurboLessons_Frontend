package com.noslen.event_service.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.noslen.event_service.model.LessonEvent;
import com.noslen.event_service.repository.LessonRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class LessonControllerTests {

    @Autowired
    private MockMvc mockMvc;

    ObjectMapper mapper = new ObjectMapper();

    @MockBean
    private LessonRepository lessonRepo;

    LessonEvent outputLesson;

    String outputLessonJson;

    List<LessonEvent> lessonList;

    String lessonListJson;

    @BeforeEach
    public void setUp() throws JsonProcessingException {

        LocalDateTime date = LocalDateTime.of(LocalDate.of(2023, 1, 1), LocalTime.of(13, 0));
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        outputLesson = new LessonEvent("6967f66b-8a23-4549-bb5e-0b6612fd4f5a", date, "This is a test LessonEvent");
        outputLesson.setId(1);
        outputLessonJson = mapper.writeValueAsString(outputLesson);
        lessonList = new ArrayList<>();
        lessonList.add(outputLesson);
        lessonListJson = mapper.writeValueAsString(lessonList);
    }

    @Test
    public void shouldCreateNewLessonOnPostRequest() throws Exception {

        LocalDateTime date = LocalDateTime.of(LocalDate.of(2023, 1, 1), LocalTime.of(13, 0));
        LessonEvent lesson1 = new LessonEvent("6967f66b-8a23-4549-bb5e-0b6612fd4f5a", date, "This is a test LessonEvent");
        lesson1.setId(1);
        String inputJson = mapper.writeValueAsString(lesson1);

        when(lessonRepo.save(lesson1)).thenReturn(lesson1);

        mockMvc.perform(
                        post("/api/lesson/")
                                .content(inputJson)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(content().json(outputLessonJson));
    }

    @Test
    public void shouldFetchLessonById() throws Exception {

        when(lessonRepo.findById(outputLesson.getId())).thenReturn(Optional.ofNullable(outputLesson));

        mockMvc.perform(get("/api/lesson/1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().json(outputLessonJson));
    }

    @Test
    public void shouldFetchAllLessons() throws Exception {

        when(lessonRepo.findAll()).thenReturn(lessonList);

        mockMvc.perform(get("/api/lesson/"))
                .andExpect(status().isOk())
                .andExpect(content().json(lessonListJson));
    }
    
    @Test
    public void shouldFetchLessonsByStudentId() throws Exception {
        LocalDateTime date = LocalDateTime.of(LocalDate.of(2023, 1, 8), LocalTime.of(16, 30));
        LessonEvent lesson1 = new LessonEvent("6967f66b-8a23-4549-bb5e-0b6612fd4f5a", date, "This is a 2nd test LessonEvent");
        lesson1.setId(2);
        date = LocalDateTime.of(LocalDate.of(2023, 1, 15), LocalTime.of(16, 30));
        when(lessonRepo.save(lesson1)).thenReturn(lesson1);
        LessonEvent lesson2 = new LessonEvent("6967f66b-8a23-4549-bb5e-0b6612fd4f5a", date, "This is a 3rd test LessonEvent");
        lesson1.setId(3);
        when(lessonRepo.save(lesson2)).thenReturn(lesson2);

        List<LessonEvent> lessonList2 = new ArrayList<>();
        lessonList2.add(lesson1);
        lessonList2.add(lesson2);
        String lessonListJson2 = mapper.writeValueAsString(lessonList2);

        when(lessonRepo.findLessonsByStudentId(lesson1.getStudentId())).thenReturn(lessonList2);

        mockMvc.perform(get("/api/lesson/student/6967f66b-8a23-4549-bb5e-0b6612fd4f5a"))
                .andExpect(status().isOk())
                .andExpect(content().json(lessonListJson2));
    }

    @Test
    public void shouldUpdateLessonOnPut() throws Exception {
        LocalDateTime date = LocalDateTime.of(LocalDate.of(2023, 2, 2), LocalTime.of(16, 30));
        LessonEvent lesson1 = new LessonEvent("6967f66b-8a23-4549-bb5e-0b6612fd4f5a", date, "This is a test LessonEvent");
        lesson1.setId(1);

        String inputJson = mapper.writeValueAsString(lesson1);

        mockMvc.perform(
                        put("/api/lesson/1")
                                .content(inputJson)
                                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void shouldDeleteLessonAndReturn200StatusCode() throws Exception {
        mockMvc.perform(delete("/api/lesson/1"))
                .andDo(print())
                .andExpect(status().isOk());
    }

}
