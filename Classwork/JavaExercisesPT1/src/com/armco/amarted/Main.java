package com.armco.amarted;

import com.armco.amarted.Constructors.CarpetCostAp.Calculator;
import com.armco.amarted.Constructors.CarpetCostAp.Carpet;
import com.armco.amarted.Constructors.CarpetCostAp.Floor;
import com.armco.amarted.Constructors.Point;
import com.armco.amarted.Constructors.Wall;

public class Main {

    public static void main(String[] args) {

        // SpeedConverter.java
        System.out.println("\nSpeed Converter:");
        SpeedConverter.printConversion(1.5);
        SpeedConverter.printConversion(10.25);
        SpeedConverter.printConversion(-5.6);

        // MegaBytesConverter.java
        System.out.println("\nMegaBytes Converter:");
        MegaBytesConverter.printMegaBytesAndKiloBytes(2500);
        MegaBytesConverter.printMegaBytesAndKiloBytes(-2500);
        MegaBytesConverter.printMegaBytesAndKiloBytes(5000);

        System.out.println("\nShould we wake up:");
        System.out.println(BarkingDog.shouldWakeUp(true,1));
        System.out.println(BarkingDog.shouldWakeUp(false,2));
        System.out.println(BarkingDog.shouldWakeUp(true,8));
        System.out.println(BarkingDog.shouldWakeUp(true,26));
        System.out.println();

        System.out.println("isLeapYear = " + LeapYear.isLeapYear(1924));

        System.out.println("decimals to 3 places: " + DecimalComparator.areEqualByThreeDecimalPlaces(3.148,3.1456));

        System.out.println("\na + b = c: " + EqualSumChecker.hasEqualSum(1,-1,0));

        System.out.println("\nTeen Number Checker:");
        TeenNumberChecker.showTeenNumberChecker(43,28,77,13);

        System.out.println(("\nArea Calculator:"));
        System.out.println("The area is " + AreaCalculator.area(5,3));

        MinutesToYearsAndDays.printYearsAndDays(561600);

        IntEqualityPrinter.printEqual(1,2,4);

        System.out.println(PlayingCat.isCatPlaying(false,35));

        NumberOfDaysInMonth.printNumberOfDaysInMonth(10,2017);

        System.out.println("\nSum Odd Ranges:\n" + SumOddRange.sumOdd(100,1000));

        System.out.println("\nIs the number a palindrome?\n" + ControlFlowStatements.isPalindrome(-717));

        System.out.println("\nSum of first and last digit is: " + ControlFlowStatements.sumFirstAndLastDigit(7353));
        System.out.println("Sum of the even digits is: " + ControlFlowStatements.getEvenDigitSum(123456789));
        System.out.println("Has shared digit: " + ControlFlowStatements.hasSharedDigit(12,13));
        System.out.println("Has same last digit: " + ControlFlowStatements.hasSameLastDigit(426,874,126));

        System.out.println("\nGreatest Common Denominator is: " + ControlFlowStatements.getGreatestCommonDivisor(81,153));

        System.out.println("\nFactors of number are: ");
        ControlFlowStatements.printFactors(32);

        System.out.println("Is it a perfect number:");
        System.out.println(ControlFlowStatements.isPerfectNumber(5));

        System.out.println("\nNumber to Words: ");
        ControlFlowStatements.numberToWords(1234);

        System.out.println("\nCan make package: " + ControlFlowStatements.canPack(2,10,18));

//        System.out.println();
//        InputOutputExercises.inputThenPrintSumAndAverage();

        System.out.println("\nBuckets Needed: " + InputOutputExercises.getBucketCount(2.75,3.25,2.5,1));

        System.out.println("\n*** CONSTRUCTOR TESTS ***");
        System.out.println("Finding area of wall using Wall.java...");
        Wall wall = new Wall(5,4);
        System.out.println("area= " + wall.getArea());
        wall.setHeight(-1.5);
        System.out.println("width= " + wall.getWidth());
        System.out.println("height= " + wall.getHeight());
        System.out.println("area= " + wall.getArea());
        System.out.println("\nFinding distance of two points on 2D surface...");
        Point first = new Point(6, 5);
        Point second = new Point(3, 1);
        System.out.println("distance(0,0)= " + first.distance());
        System.out.println("distance(second)= " + first.distance(second));
        System.out.println("distance(2,2)= " + first.distance(2, 2));
        Point point = new Point();
        System.out.println("distance()= " + point.distance());

        // Carpet Cost App
        System.out.println("\nCarpet Costing App");
        Carpet carpet = new Carpet(3.5);
        Floor floor = new Floor(2.75, 4.0);
        Calculator calculator = new Calculator(floor, carpet);
        System.out.println("total= " + calculator.getTotalCost());
        carpet = new Carpet(1.5);
        floor = new Floor(5.4, 4.5);
        calculator = new Calculator(floor, carpet);
        System.out.println("total= " + calculator.getTotalCost());


    }
}
