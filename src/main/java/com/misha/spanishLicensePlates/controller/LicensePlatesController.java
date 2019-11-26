package com.misha.spanishLicensePlates.controller;

import com.misha.spanishLicensePlates.model.CarModel;
import com.misha.spanishLicensePlates.model.LicensePlateModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class LicensePlatesController {

  @RequestMapping(value = "/report", produces = "application/json", method = RequestMethod.POST)
  public ResponseEntity<CarModel> reportRequest(@RequestBody LicensePlateModel licensePlate) {

    CarModel car = new CarModel();

    return new ResponseEntity<>(car, HttpStatus.OK);

  }
}
