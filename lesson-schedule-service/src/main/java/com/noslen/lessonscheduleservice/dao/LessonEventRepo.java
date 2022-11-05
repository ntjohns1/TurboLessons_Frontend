package com.noslen.lessonscheduleservice.dao;

import com.noslen.lessonscheduleservice.dto.LessonEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonEventRepo extends JpaRepository<LessonEvent, Integer> {
    List<LessonEvent> findLessonsByStudentId(String studentId);
}
