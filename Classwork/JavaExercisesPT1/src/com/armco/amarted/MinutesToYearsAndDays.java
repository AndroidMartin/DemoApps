package com.armco.amarted;

public class MinutesToYearsAndDays {

    public static void printYearsAndDays (long minutes) {
        System.out.println("\nMinutes Calculator:");

        if (minutes < 0) {
            System.out.println("Invalid Value");
        } else {
            long days = (minutes / 60) / 24;
            long years = days / 365;
            days = days % 365;
            System.out.println(minutes + " min = " + years + " y and " + days + " d");
        }
    }
}
