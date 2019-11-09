package com.armco.amarted;

public class TeenNumberChecker {

    public static boolean hasTeen (int a, int b, int c){
        if ((a <20 && a >12) || (b<20 && b>12) || (c<20 && c>12)) {
            return true;
        }
        return false;
    }

    public static boolean isTeen (int i) {
        if (i >= 13 && i <=19) {
            return true;
        }
        return false;
    }

    public static void showTeenNumberChecker(int a, int b, int c, int i) {
        System.out.println("The first array contains a teen? - " + hasTeen(a, b, c));
        System.out.println("Your last number is in the teens: " + isTeen(i));
    }
}
