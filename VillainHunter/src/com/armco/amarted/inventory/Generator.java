package com.armco.amarted.inventory;

public class Generator {

    public static void main(String[] args) {
        for(int i=0; i<20; i++){
            System.out.println("You rolled: " + rollDice(20));
        }
    }

    public static int rollDice(int di){
        return (int)(Math.random()*di)+1;
    }
}
