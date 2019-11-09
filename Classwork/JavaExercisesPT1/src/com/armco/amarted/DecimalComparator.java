package com.armco.amarted;

public class DecimalComparator {

    public static boolean areEqualByThreeDecimalPlaces(double i,double p) {
        int roundedI = (int)(i * 1000);
        int roundedP = (int)(p * 1000);
        if (roundedI == roundedP){
            return true;
        }
        return false;
    }
}
