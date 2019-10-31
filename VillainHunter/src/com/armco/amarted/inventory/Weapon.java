package com.armco.amarted.inventory;

import java.util.ArrayList;
import java.util.LinkedList;

public class Weapon {
    private String name;
    private int atkBonus;
    private int numDice;
    private int diceType;
    private int dmgBonus;
    private String dmgType;

    public Weapon(String name, int atkBonus, int numDice, int diceType, int dmgBonus, String dmgType) {
        this.name = name;
        this.atkBonus = atkBonus;
        this.numDice = numDice;
        this.diceType = diceType;
        this.dmgBonus = dmgBonus;
        this.dmgType = dmgType;
    }




    public static LinkedList<Weapon> inflateWeapons(){
        LinkedList<Weapon> startingWeapons = new LinkedList<>();
        startingWeapons.add(new Weapon("Bare Fists",3,1,4,1,"Bludgeoning"));
        startingWeapons.add(new Weapon("Staff",9,1,8,4,"Piercing"));
        startingWeapons.add(new Weapon("Sword",9,1,8,4,"Piercing"));
        startingWeapons.add(new Weapon("Dual Daggers",9,1,8,4,"Piercing"));
        startingWeapons.add(new Weapon("Longbow",9,1,8,4,"Piercing"));
        return startingWeapons;
    }















    public String getName() {
        return name;
    }

    public int getAtkBonus() {
        return atkBonus;
    }

    public int getNumDice() {
        return numDice;
    }

    public int getDiceType() {
        return diceType;
    }

    public int getDmgBonus() {
        return dmgBonus;
    }

    public String getDmgType() {
        return dmgType;
    }
}
