package com.klef.service;

import java.util.List;
import com.klef.entity.Medicine;

public interface MedicineService {
    Medicine addMedicine(Medicine medicine);
    List<Medicine> getAllMedicines();
    Medicine getMedicineById(int id);
    Medicine updateMedicine(Medicine medicine);
    void deleteMedicineById(int id);
}
