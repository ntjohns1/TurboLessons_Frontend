package com.noslen.event_service.repository;

import com.noslen.event_service.model.LessonEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<LessonEvent, Integer> {

    List<LessonEvent> findLessonsByStudentId(String studentId);
}
