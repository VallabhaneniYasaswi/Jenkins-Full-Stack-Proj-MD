package com.klef.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.klef.entity.Medicine;
import com.klef.service.MedicineService;

@RestController
@RequestMapping("/medicineapi")
@CrossOrigin(origins = "*")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @PostMapping("/add")
    public ResponseEntity<Medicine> addMedicine(@RequestBody Medicine medicine) {
        Medicine saved = medicineService.addMedicine(medicine);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Medicine>> getAllMedicines() {
        return new ResponseEntity<>(medicineService.getAllMedicines(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getMedicineById(@PathVariable int id) {
        Medicine medicine = medicineService.getMedicineById(id);
        if (medicine != null)
            return new ResponseEntity<>(medicine, HttpStatus.OK);
        return new ResponseEntity<>("Medicine not found", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateMedicine(@RequestBody Medicine medicine) {
        Medicine existing = medicineService.getMedicineById(medicine.getId());
        if (existing != null) {
            return new ResponseEntity<>(medicineService.updateMedicine(medicine), HttpStatus.OK);
        }
        return new ResponseEntity<>("Cannot update. Medicine not found.", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMedicine(@PathVariable int id) {
        Medicine existing = medicineService.getMedicineById(id);
        if (existing != null) {
            medicineService.deleteMedicineById(id);
            return new ResponseEntity<>("Medicine deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Cannot delete. Medicine not found.", HttpStatus.NOT_FOUND);
    }
}
