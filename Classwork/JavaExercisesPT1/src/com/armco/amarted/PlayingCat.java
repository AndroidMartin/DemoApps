package com.armco.amarted;

public class PlayingCat {

    public static boolean isCatPlaying(boolean summer, int temperature) {
        System.out.println("\nThe cat is playing:");
        if (summer) {
            if ((temperature>=25) && (temperature<=45)) {
                return true;
            }
            return false;
        }
        if ((temperature>=25) && (temperature<=35)) {
            return true;
        }
        return false;
    }
}
