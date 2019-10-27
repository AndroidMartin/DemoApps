package com.armco.amarted.Characters;

import com.armco.amarted.Dice.Dice;
import com.armco.amarted.Gear.Weapon;

import javax.swing.plaf.synth.SynthOptionPaneUI;

public class Character {
    private String name;
    private int ac;
    private int maxHP;
    private int currentHP;
    private int initiative;
    private Weapon weapon;
    private int toHit;

    Dice D20 = new Dice("D20",20);
    Dice D8 = new Dice("D8",8);

    public Character(String name, int ac, int maxHP, int initiative, Weapon weapon) {
        this.name = name;
        this.ac = ac;
        this.maxHP = maxHP;
        this.currentHP = maxHP;
        this.initiative = initiative;
        this.weapon = weapon;
    }

    public void attack(Character enemy){
        int damage = 0;
        System.out.println("...see if you hit...");
        int attackRoll = Dice.rollDice(D20);
        if(attackRoll == 20){
            System.out.println("YOU ROLLED A CRITICAL HIT!!!");
            damage *= 2;
        } else if (attackRoll == 1) {
            System.out.println("YOU CRITICALLY MISSED!!!");
            damage /= 2;
        }
        this.toHit = this.weapon.getAtkBonus() + attackRoll;
        if(this.toHit > enemy.ac){
            System.out.println("...attacking with your " + this.getWeapon().getName() +
                    " (" + this.getWeapon().getNumDice() + this.getWeapon().getDiceType().getName() + "+" + this.getWeapon().getDmgBonus() + ")...");
            damage = (weapon.getNumDice() * Dice.rollDice(this.weapon.getDiceType())) + this.weapon.getDmgBonus();


            System.out.println("You hit, causing " + damage + " damage!");
        } else {
            System.out.println("Your attack misses.  :(");
        }
        enemy.setCurrentHP(enemy.getCurrentHP()-damage);

        if(enemy.getCurrentHP() <= 0){
            System.out.println("You defeated your foe!");
        } else {
            System.out.println("Enemies remaining health: " + enemy.getCurrentHP() + "/" + enemy.getMaxHP());
        }
    }





    public String getName() {
        return name;
    }

    public int getAc() {
        return ac;
    }

    public int getMaxHP() {
        return maxHP;
    }

    public int getCurrentHP() {
        return currentHP;
    }

    public int getInitiative() {
        return initiative;
    }

    public Weapon getWeapon() {
        return weapon;
    }

    public void setCurrentHP(int currentHP) {
        this.currentHP = currentHP;
    }
}
