package com.armco.amarted.Dice;

public class Dice {
    private String name;
    private int sides;
    private int rolledValue;


    public Dice(String name, int sides) {
        this.name = name;
        this.sides = sides;
    }

    public static void generateDice() {
        System.out.println("...Creating Dice...");
        Dice D20 = new Dice("D20a",20);
        Dice D12 = new Dice("D12",12);
        Dice D10 = new Dice("D10",10);
        Dice D8 = new Dice("D8",8);
        Dice D6 = new Dice("D6",6);
        Dice D4 = new Dice("D4",4);
        Dice D100 = new Dice("D100",100);
    }

    public static int rollDice(int di){
//        int maxValue = di-1;
//        int rolledValue = (int)(Math.round(Math.random() * maxValue)+1);
        return (int)(Math.floor(Math.random()*di)+1);
    }


    public int rollDiceORG(){
        int maxValue = this.sides-1;
        rolledValue = (int)(Math.round(Math.random() * maxValue)+1);
        if (rolledValue == this.sides){
            System.out.println("YOU ROLLED A CRITICAL HIT!!! (" + rolledValue + ")");
        } else if (rolledValue == 1) {
            System.out.println("YOU ROLLED A CRITICAL FAIL!!! (" + rolledValue + ")");
        } else {
            System.out.println("You rolled a " + rolledValue);
        }
        return rolledValue;
    }

    public String getName() {
        return name;
    }

    public int getSides() {
        return sides;
    }

    public int getRolledValue() {
        return rolledValue;
    }
}
