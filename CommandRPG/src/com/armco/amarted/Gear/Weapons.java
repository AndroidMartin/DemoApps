package com.armco.amarted.Gear;

import com.armco.amarted.Characters.Character;
import com.armco.amarted.Dice.Dice;

public class Weapons {
    private String name;
    private int atkBonus;
    private int numDice;
    private int diceType;
    private int dmgBonus;
    private int dmgType;

    public Weapons(String name, int atkBonus, int numDice, int diceType, int dmgBonus, String type) {
        this.name = name;
        this.atkBonus = atkBonus;
        this.numDice = numDice;
        this.diceType = diceType;
        this.dmgBonus = dmgBonus;
        this.dmgType = type;
    }









    public int attackDamage(int critRole, Character attacker, Character defender){
        int atkDmg = (attacker.getActiveWeapon().getNumDice() * attacker.getActiveWeapon().diceType) +
                attacker.getActiveWeapon().dmgBonus;

        if(critRole == 20){
            System.out.println("YOU ROLLED A CRITICAL HIT!!!");
            atkDmg *=2;
        } else if(critRole == 1){
            System.out.println("YOU ROLLED A CRIT-FAIL...");
            atkDmg /=2;
        }

        //ToDo: add damage resistance by type
        if(defender.getActiveArmor().getMatType() = 0){
            atkDmg *= 1.25;
        } else if(defender.getActiveArmor().getMatType() = 4) {
            atkDmg *= .75;
        }

        return atkDmg;
    }

    public void attack(Character attacker, Character defender){
        System.out.println("Rolling to see if you hit...");
        int critRole = Dice.rollDice(20);
        int toHitRoll = critRole + attacker.getActiveWeapon().getAtkBonus();
        if(critRole == 20){
            System.out.println("YOU ROLLED A CRITICAL HIT!!!");
        } else if(critRole == 1){
            int selfDMG = (int)(Math.floor(attacker.getCurrentHP() * .05));
            System.out.println("YOU ROLLED A CRIT-FAIL...");
            System.out.println("...you stumble and fall, hitting your head...");
            attacker.takeDamage(selfDMG,"...you take " + selfDMG + "damage!");
        } else {
            System.out.println("...you rolled " + toHitRoll + "...");
        }

        if(toHitRoll >= defender.getAc()){
            System.out.println("...and now you're attacking with your " + attacker.getActiveWeapon().getName() + "...");
            defender.takeDamage(attackDamage(critRole, attacker, defender));
        }
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

    public int getDiceType() {
        return diceType;
    }

    public int getDmgType() {
        return dmgType;
    }
}
