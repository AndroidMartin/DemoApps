package com.armco.amarted.Gear;

import com.armco.amarted.Dice.Dice;

public class Weapon {
    private String name;
    private int atkBonus;
    private int numDice;
    private Dice diceType;
    private int dmgBonus;

    public Weapon(String name, int atkBonus, int numDice, Dice diceType, int dmgBonus) {
        this.name = name;
        this.atkBonus = atkBonus;
        this.numDice = numDice;
        this.diceType = diceType;
        this.dmgBonus = dmgBonus;
    }


    public int getDmgBonus() {
        return dmgBonus;
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

    public Dice getDiceType() {
        return diceType;
    }
}
