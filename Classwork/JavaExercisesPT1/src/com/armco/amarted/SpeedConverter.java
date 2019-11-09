package com.armco.amarted;

public class SpeedConverter {

    public static long toMilesPerHour (double kilometersPerHour){
        if (kilometersPerHour < 0) {
            return -1;
        }
        //calculate mph, round it, return it
        long mph = Math.round(kilometersPerHour / 1.609);
        return mph;
    }

    public static void printConversion (double kilometersPerHour) {

        if (kilometersPerHour < 0){
            System.out.println("Invalid Value");
        } else {
            String finalResult = kilometersPerHour + " km/h = " + toMilesPerHour(kilometersPerHour) + " mi/h";
            System.out.println(finalResult);
        }
    }
}
