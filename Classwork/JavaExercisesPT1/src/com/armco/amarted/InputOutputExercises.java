package com.armco.amarted;

import java.util.Scanner;

public class InputOutputExercises {

    public static void inputThenPrintSumAndAverage(){
        // Define your variables
        int sum = 0;
        int avg = 0;
        int counter = 0;
        double math = 0;
        Scanner scanner = new Scanner(System.in);
        boolean isInt = true;

        while (isInt) {
            System.out.println("Enter a number:");  // <--Print what you want entered
            isInt = scanner.hasNextInt();  // <--Verify what is entered is what is expected

            // Run code here
            if (isInt) {  // <--If input is correct, run this code
                sum += scanner.nextInt();
                counter++;
                math = ((double)(sum))/((double)(counter));
                avg = (int)(Math.round(math));
            } else {
                break;  // <--Breaks out when invalid input is detected
            }
        }

        if (sum == 0 || avg == 0) {
            System.out.println("No valid numbers...");
        }

        System.out.println("SUM = " + sum + " AVG = " + avg);
        scanner.close();
    }


    public static int getBucketCount(double width,double height,double areaPerBucket,int extraBuckets){
        if (width<=0 || height<=0 || areaPerBucket<=0 || extraBuckets<0){
            return -1;
        }

        double areaNeeded = (width*height);
        double bucketsNeeded = (areaNeeded/areaPerBucket);
        return (int)(Math.ceil(bucketsNeeded-extraBuckets));
    }
    public static int getBucketCount(double width,double height,double areaPerBucket){
        if (width<=0 || height<=0 || areaPerBucket<=0){
            return -1;
        }

        double areaNeeded = (width*height);
        double bucketsNeeded = (areaNeeded/areaPerBucket);
        return (int)(Math.ceil(bucketsNeeded));
    }
    public static int getBucketCount(double area,double areaPerBucket){
        if (area<=0 ||  areaPerBucket<=0){
            return -1;
        }

        double bucketsNeeded = (area/areaPerBucket);
        return (int)(Math.ceil(bucketsNeeded));
    }

}
