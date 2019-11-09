package com.armco.amarted;

import java.util.Scanner;

public class ControlFlowStatements {

    public static boolean isPalindrome(int number) {

        if (number < 0) {
            number *= -1;
        }

        int org = number;
        int inverse = 0;
        int calc = 0;

        while (number > 0) {
            calc = number % 10;
            inverse *= 10;
            inverse += calc;
            number /= 10;
        }

        if (inverse == org) {
            return true;
        }
        return false;
    }

    public static int sumFirstAndLastDigit (int number){
        int firstDigit = 0;
        int lastDigit = 0;

        if (number < 10) {
            if (number < 0){
                return -1;
            }
            return number + number;
        }

        lastDigit = number % 10;

        while (number >= 10){
            number /= 10;
        }
        return lastDigit + number;
    }

    public static int getEvenDigitSum (int number){
        int digit = number;
        int sum = 0;

        if (number < 0){
            return -1;
        }

        // 123456789
        while (number > 0) {
            digit = number % 10;
            number /= 10;
            if (digit % 2 == 0){
                sum += digit;
            }
        }

        return sum;
    }

    public static boolean hasSharedDigit (int a, int b){
        if (a<10 || a>99 || b<10 || b>99){
            return false;
        }

        int check = 0;
        int against = 0;
        int orgB = b;

        while (a>0){
            check = a % 10;
            a /= 10;
            b = orgB;  // <-- reset's b after each digit of a is checked
//            System.out.println("check: " + check + "   a: " + a);
            while (b>0){
                against = b % 10;
                b /= 10;
//                System.out.println("against: " + against + "   b: " + b);
                if (check == against){
                    return true;
                }
            }
        }
        return false;

    }

    public static boolean hasSameLastDigit (int a, int b, int c){
        if (a<10 || b<10 || c<10 || a>1000 || b>1000 || c>1000){
            return false;
        }

        a %= 10;
        b %= 10;
        c %= 10;

        if (a==b || b==c || c==a){
            return true;
        }
        return false;
    }
    public static boolean isValid (int i) {
        if (i<10 || i>1000) {
            return false;
        }
        return true;
    }


    public static int getGreatestCommonDivisor(int a, int b){
        if (a<10 || b<10) {
            return -1;
        }

        int commonDivisor = 0;
        int i = 0;
        while (i<a){
            i++;
            if (a % i == 0 && b % i == 0) {
                commonDivisor = i;
            }
        }
        return commonDivisor;
    }

    public static void printFactors (int number){
        if (number<1){
            System.out.println("Invalid Value");
        }

        for (int i=1; i<=number; i++){
            if (number % i == 0) {
                System.out.println(i);
            }
        }
    }

    public static boolean isPerfectNumber(int number){
        if (number < 1){
            return false;
        }

        int sum = 0;

        for (int i=1; i<number; i++) {
            if (number % i == 0) {
                sum += i;
            }
        }

        if (sum == number) {
            return true;
        } else {
            return false;
        }
    }

    public static void numberToWords(int number){
        if (number<0){
            System.out.println("Invalid Value");
        }

        System.out.println("Converting " + number + "...");
        System.out.println("Factoring all " + getDigitCount(number) + " digits...");

        int numberToPrint = reverse(number);
        int digit = 0;
        int places = getDigitCount(numberToPrint);
        int leadingZeroes = getDigitCount(number) - getDigitCount(numberToPrint);

        while (places > 0) {
            places--;
            digit = numberToPrint % 10;
            numberToPrint /= 10;
            switch (digit) {
                case 0:
                    System.out.println("Zero");
                    break;
                case 1:
                    System.out.println("One");
                    break;
                case 2:
                    System.out.println("Two");
                    break;
                case 3:
                    System.out.println("Three");
                    break;
                case 4:
                    System.out.println("Four");
                    break;
                case 5:
                    System.out.println("Five");
                    break;
                case 6:
                    System.out.println("Six");
                    break;
                case 7:
                    System.out.println("Seven");
                    break;
                case 8:
                    System.out.println("Eight");
                    break;
                case 9:
                    System.out.println("Nine");
                    break;
            }
        }

        if (getDigitCount(number) != getDigitCount(numberToPrint)){
            for (int i = leadingZeroes; i>0; i--){
                System.out.println("Zero");
            }
        }
    }

    public static int reverse(int a) {
    // Reverses the number submitted

        int inverse = 0;
        int digit;
        int count = 0;
        boolean wasNegative = false;

        if (a<0){
            a *= -1;
            wasNegative = true;
        }

        count = getDigitCount(a);

        while (count > 0) {
            digit = a % 10;
            inverse *= 10;
            inverse += digit;
            a /= 10;
            count--;
        }
        System.out.println("Inverse is: " + inverse);
        if (wasNegative) {
            inverse *= -1;
        }
        return inverse;
    }

    public static int getDigitCount (int i){
    // Accounts for leading 0s -  100 -> 001
        if (i<0){
            return -1;
        } else if (i==0) {
            return 1;
        }

        int digitCount = 0;

        while (i>0){
                digitCount++;
                i /= 10;
        }
        return digitCount;
    }


    public static boolean canPack(int bigCount, int smallCount, int goal) {

        if ((bigCount < 0) || (smallCount < 0) || (goal < 0)) {
            return false;
        }

        int sumCount = ((bigCount * 5) + smallCount);
        int remainder = goal % 5;
        if (sumCount >= goal){
            if (remainder > smallCount){
                return false;
            }
            return true;
        }
        return false;
    }


    public static int getLargestPrime(int number){
        // SKIPPED CHALLENGE - NEED TO FIGURE OUT LOGIC FOR isPrimeNumber
        if (number < 2) {
            return -1;
        }
        return 0;
    }




}
