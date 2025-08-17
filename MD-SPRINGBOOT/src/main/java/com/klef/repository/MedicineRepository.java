package com.klef.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.entity.Medicine;

public interface MedicineRepository extends JpaRepository<Medicine, Integer> {
    Medicine findByBatchNumber(String batchNumber);
}
