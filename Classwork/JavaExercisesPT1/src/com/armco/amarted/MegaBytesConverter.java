package com.armco.amarted;

public class MegaBytesConverter {


    public static void printMegaBytesAndKiloBytes(int kiloBytes){
        //calculate
        int megaBytes = kiloBytes / 1024;
        int remKiloBytes = kiloBytes % 1024;
        //print
        if (kiloBytes < 0) {
            System.out.println("Invalid Value");
        } else {
            System.out.println(kiloBytes + " KB = " + megaBytes + " MB and " + remKiloBytes + " KB");
        }
    }
}
