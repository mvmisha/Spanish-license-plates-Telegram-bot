package com.misha.spanishLicensePlates.services;

import com.misha.spanishLicensePlates.model.CarModel;
import com.misha.spanishLicensePlates.model.LicensePlateModel;

public interface carInformation {

    public CarModel getCarInformation(LicensePlateModel licensePlate);
}
