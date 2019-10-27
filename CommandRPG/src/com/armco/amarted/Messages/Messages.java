package com.armco.amarted.Messages;

import com.armco.amarted.Dice.Dice;

import java.util.Scanner;

public class Messages {

    public static int mainActions(){
        Scanner scanner = new Scanner(System.in);

        System.out.println("\nWhat would you like to do?");
        System.out.println("1: Attack    2: Magic");
        System.out.println("3: Item      4: Runaway");
        System.out.println("Enter your selection:");

        int selection = scanner.nextInt();
        scanner.nextLine();
        return selection;
    }
}
