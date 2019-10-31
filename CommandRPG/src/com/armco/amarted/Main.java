package com.armco.amarted;

import com.armco.amarted.Actions.Startup;
import com.armco.amarted.Characters.Heroes;
import com.armco.amarted.Gear.Armor;
import com.armco.amarted.Gear.Weapons;
import com.armco.amarted.Messages.Messages;
import com.armco.amarted.Spells.Spells;

import java.util.ArrayList;
import java.util.Scanner;

public class Main {


    public static void main(String[] args) {
        System.out.println("Setting up game interface...");

        Scanner scanner = new Scanner(System.in);
        int choice = 0;
        boolean confirmation = false;

        //Setup the Game - WORKING UNTIL ENEMY CREATION
//        Startup initializeInventory = new Startup(new Armor())
        Startup initializeInventory = new Startup(new ArrayList<Armor>(),new ArrayList<Weapons>(),new ArrayList<Spells>());
        initializeInventory.startArmor();


        Heroes hero = Messages.createHero();
        System.out.println("\n" + hero.getName() + " has an AC of " + hero.getAc() + ", with " + hero.getMaxHP() + " hit points, and an initiative of +" + hero.getInitiative());
        System.out.println("\nNow it's time to select who you're fighting...");
//        Character enemy1 = new Character("BigBad",14,38,3,Messages.weaponSelection());
        Heroes villain = Messages.createEnemy();
        System.out.println(villain.getName() + " has an AC of " + villain.getAc() + " and health of " +
                villain.getCurrentHP() + "/" + villain.getMaxHP());

        hero.attack(hero,villain,false);
        villain.activateSpell(new Spells("Fire",8,false,4));
        hero.addSpell(new Spells("Cure",12,true,0));
//        hero.useMagic(hero.getKnownSpells().get());

//        System.out.println("How many enemies would you like to fight?");
//        choice = scanner.nextInt();
//        System.out.println("Confirm, you want to fight " + choice + " enemies?");
//        System.out.println("Yes or No");


//        for (int i = 1;i <= 20; i++){
//            D100.rollDice();
//            D8.rollDice();
//            D4.rollDice();
//        }

//        System.out.println("\nEnter your character's name:");
//        String name = scanner.next();
//        scanner.nextLine();
//        System.out.println("Generating characters...");
//
//
//        Weapon longbow = new Weapon("Longbow",9,1,8,4);
//        Character hero = new Character(name,15,58,4,longbow);
//
//        System.out.println("Creating your villain...");
//        Weapon maul = new Weapon("Maul",3,2,6,0);
//        Character villain = new Character("Drako",12,38,3,maul);
//
//        System.out.println("\nYou are playing as the noble hero " + hero.getName() + ", fighting against the mighty " + villain.getName());


//        choice = Messages.battleActions();

//        choice = scanner.nextInt();
//        scanner.nextLine();

//        boolean turn = true;
//        while (turn) {
//            if(choice > 0 && choice <= 4){
//                switch (choice) {
//                    case 1:
//                        System.out.println("\n" + hero.getName() + " attacks!");
//                        hero.attack(villain);
//                        break;
//                    case 2:
//                        System.out.println("You use magic");
//                        break;
//                    case 3:
//                        System.out.println("You use your item");
//                        break;
//                    case 4:
//                        System.out.println("You decide to disengage");
//                        break;
//                }
//                turn = false;
//            } else {
//                System.out.println("You entered an incorrect value...");
//                choice = Messages.battleActions();
//            }
//        }




        System.out.println("\n" + hero.getName() + " attacks!");
        hero.attack(villain);
        System.out.println("\n" + villain.getName() + " attacks!");
        villain.attack(hero);
        System.out.println("\n" + hero.getName() + " attacks!");
        hero.attack(villain);
        System.out.println("\n" + villain.getName() + " attacks!");
        villain.attack(hero);
        System.out.println("\n" + hero.getName() + " attacks!");
        hero.attack(villain);
        System.out.println("\n" + hero.getName() + " attacks!");
        hero.attack(villain);
        System.out.println("\n" + hero.getName() + " attacks!");
        hero.attack(villain);
        System.out.println("\n" + hero.getName() + " attacks!");
        hero.attack(villain);

    }
}
