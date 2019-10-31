package com.armco.amarted.inventory;

import java.util.ArrayList;

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
