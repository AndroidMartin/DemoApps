package com.armco.amarted.Messages;

import com.armco.amarted.Characters.Heroes;
import com.armco.amarted.Gear.Weapons;

import java.util.Scanner;

public class Messages {

    public static Heroes createHero(){
        Scanner scanner = new Scanner(System.in);
        Heroes hero = null;
        boolean isCorrect = false;
        while (!isCorrect) {
            System.out.println("Enter your character's name:");
            String name = scanner.next();
            System.out.println("Are you happy with '" + name + "'?");
            System.out.println("Yes or No");
            String confirm = scanner.next();
            if (confirm.toLowerCase().contentEquals("y") || confirm.toLowerCase().contentEquals("yes")){
                hero = new Heroes(name, 15, 58, 4, weaponSelection());
                isCorrect = true;
            }
        }
//        scanner.close();
        System.out.println("You created " + hero.getName() + ", fighting with their " + hero.getGetActiveWeapon().getName() + "!");
        return hero;
    }

    public static Weapons weaponSelection(){
        Weapons mainWeapon = null;
        boolean validSelection = false;
        Scanner scanner = new Scanner(System.in);

        while (!validSelection) {
            System.out.println("Pick a weapon:");
            System.out.println("1. Longbow  2. Shortsword");
            System.out.println("3. Maul     4. Unarmed");
            int selection = scanner.nextInt();
            if(selection >0 && selection <= 4) {
//                validSelection = true;
                switch (selection) {
                    case 1:
                        mainWeapon = new Weapons("Longbow", 9, 1, 8, 4);
                        break;
                    case 2:
                        mainWeapon = new Weapons("Shortsword", 7, 1, 6, 4);
                        break;
                    case 3:
                        mainWeapon = new Weapons("Maul", 3, 2, 6, 0);
                        break;
                    case 4:
                        mainWeapon = new Weapons("Unarmed Fists", 0, 1, 4, 0);
                        break;
                }
                System.out.println("Are you sure you want them to fight their " + mainWeapon.getName() + " (" + mainWeapon.getNumDice() + "d" + mainWeapon.getDiceType() + "+" + mainWeapon.getDmgBonus() + ")?");
                System.out.println("Yes or No");
                String confirm = scanner.next();
                if (confirm.toLowerCase().contentEquals("y") || confirm.toLowerCase().contentEquals("yes")){
                    validSelection = true;
                }else {
                    mainWeapon = null;
                    validSelection = false;
                }
            }else {
                validSelection = false;
                System.out.println("You picked an incorrect value!\n");
            }
        }

//        scanner.close();
        return mainWeapon;
    }

    public static Heroes createEnemy(){
        Scanner scanner = new Scanner(System.in);
        Heroes enemy = null;
        boolean isCorrect = false;
        while (!isCorrect) {
            System.out.println("Enter your enemy's name:");
            String name = scanner.next();
            scanner.nextLine();
            System.out.println("Are you happy with '" + name + "'?");
            System.out.println("Yes or No");
            String confirm = scanner.next();
            if (confirm.toLowerCase().contentEquals("y") || confirm.toLowerCase().contentEquals("yes")){
                int enemyAC = (int)(Math.random()*18);
                int enemyHP = (int)(Math.random()*40);
                int enemyIni = (int)(Math.random()*6);
                enemy = new Heroes(name, enemyAC, enemyHP, enemyIni, weaponSelection());
                System.out.println(enemy.getName() + "created with the following stats:");
                System.out.println("AC - " + enemy.getAc());
                System.out.println("HP - " + enemy.getCurrentHP() + "/" + enemy.getMaxHP());
                System.out.println("Initiative - " + enemy.getInitiative());
                isCorrect = true;
            }
        }
//        scanner.close();
        System.out.println("You created " + enemy.getName() + ", fighting with their " + enemy.getGetActiveWeapon().getName() + "!");
        return enemy;
    }


    public static int battleActions(){
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
