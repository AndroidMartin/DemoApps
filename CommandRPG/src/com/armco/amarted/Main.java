package com.armco.amarted;

import com.armco.amarted.Characters.Character;
import com.armco.amarted.Dice.Dice;
import com.armco.amarted.Gear.Weapon;
import com.armco.amarted.Messages.Messages;

import java.util.Scanner;

public class Main {


    public static void main(String[] args) {
        System.out.println("Setting up game interface...");
        Scanner scanner = new Scanner(System.in);
        int choice = 0;
        System.out.println("...Creating Dice...");
        Dice D20 = new Dice("D20a",20);
        Dice D12 = new Dice("D12",12);
        Dice D10 = new Dice("D10",10);
        Dice D8 = new Dice("D8",8);
        Dice D6 = new Dice("D6",6);
        Dice D4 = new Dice("D4",4);
        Dice D100 = new Dice("D100",100);

//        for (int i = 1;i <= 20; i++){
//            D100.rollDice();
//            D8.rollDice();
//            D4.rollDice();
//        }

        System.out.println("\nEnter your character's name:");
        String name = scanner.next();
        scanner.nextLine();
        System.out.println("Generating characters...");
        Weapon longbow = new Weapon("Longbow",9,1,D8,4);
        Character hero = new Character(name,15,58,4,longbow);

        System.out.println("Creating your villain...");
        Weapon maul = new Weapon("Maul",3,2,D6,0);
        Character villain = new Character("Drako",12,38,3,maul);

        System.out.println("\nYou are playing as the noble hero " + hero.getName() + ", fighting against the mighty " + villain.getName());


        choice = Messages.mainActions();
//        choice = scanner.nextInt();
//        scanner.nextLine();
        boolean turn = true;
        while (turn) {
            if(choice > 0 && choice <= 4){
                switch (choice) {
                    case 1:
                        System.out.println("\n" + hero.getName() + " attacks!");
                        hero.attack(villain);
                        break;
                    case 2:
                        System.out.println("You use magic");
                        break;
                    case 3:
                        System.out.println("You use your item");
                        break;
                    case 4:
                        System.out.println("You decide to disengage");
                        break;
                }
                turn = false;
            } else {
                System.out.println("You entered an incorrect value...");
                choice = Messages.mainActions();
            }
        }




//        System.out.println("\n" + hero.getName() + " attacks!");
//        hero.attack(villain);
//        System.out.println("\n" + villain.getName() + " attacks!");
//        villain.attack(hero);
//        System.out.println("\n" + hero.getName() + " attacks!");
//        hero.attack(villain);
//        System.out.println("\n" + villain.getName() + " attacks!");
//        villain.attack(hero);
//        System.out.println("\n" + hero.getName() + " attacks!");
//        hero.attack(villain);
//        System.out.println("\n" + hero.getName() + " attacks!");
//        hero.attack(villain);
//        System.out.println("\n" + hero.getName() + " attacks!");
//        hero.attack(villain);
//        System.out.println("\n" + hero.getName() + " attacks!");
//        hero.attack(villain);

    }
}
