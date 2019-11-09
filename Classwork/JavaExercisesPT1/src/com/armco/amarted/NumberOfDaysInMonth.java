package com.armco.amarted;

import java.time.Month;

public class NumberOfDaysInMonth {

    public static boolean isLeapYear(int year){
        if ((year <1) || (year > 9999)){
            return false;
        }

        if ((year % 4 == 0) && (year % 100 == 0) && (year % 400 == 0)) {
            return true;
        } else if ((year % 4 == 0) && (year % 100 != 0)) {
            return true;
        } else {
            return false;
        }
    }

    public static int getDaysInMonth(int month, int year){
        if ((year <1) || (year >9999)){
            return -1;
        }

        switch (month) {
            case 1:
                return 31;
                //return Month.JANUARY.length(isLeapYear(year));
            case 2:
                if (isLeapYear(year)){
                    return 29;
                }
                return 28;
                //return Month.FEBRUARY.length(isLeapYear(year));
            case 3:
                return 31;
                //return Month.MARCH.length(isLeapYear(year));
            case 4:
                return 30;
                //return Month.APRIL.length(isLeapYear(year));
            case 5:
                return 31;
                //return Month.MAY.length(isLeapYear(year));
            case 6:
                return 30;
                //return Month.JUNE.length(isLeapYear(year));
            case 7:
                return 31;
                //return Month.JULY.length(isLeapYear(year));
            case 8:
                return 31;
                //return Month.AUGUST.length(isLeapYear(year));
            case 9:
                return 30;
                //return Month.SEPTEMBER.length(isLeapYear(year));
            case 10:
                return 31;
                //return Month.OCTOBER.length(isLeapYear(year));
            case 11:
                return 30;
                //return Month.NOVEMBER.length(isLeapYear(year));
            case 12:
                return 31;
                //return Month.DECEMBER.length(isLeapYear(year));
            default:
                return -1;
        }
    }

    public static void printNumberOfDaysInMonth(int month, int year){
        System.out.println("\n" + year + " is a leap year: " + NumberOfDaysInMonth.isLeapYear(year));
        System.out.println("There are " + getDaysInMonth(month,year) + " days in that month (" + month + ")");
    }
}

