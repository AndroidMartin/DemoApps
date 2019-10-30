package com.armco.amarted.Characters;

import com.armco.amarted.Dice.Dice;
import com.armco.amarted.Gear.Armor;
import com.armco.amarted.Gear.Weapons;

import java.util.ArrayList;


public class Character {
    private String name;
    private int ac;
    private int toHit;
    private int maxHP;
    private int currentHP;
    private int initiative;
    private Weapons activeWeapon;
    private Armor activeArmor;
    private ArrayList<Weapons> inventoryWeapons;
    private ArrayList<Armor> inventoryArmor;


    public Character(String name, int ac, int maxHP, int initiative, Weapons initialWeapon, Armor initialArmor) {
        this.name = name;
        this.ac = ac;
        this.maxHP = maxHP;
        this.currentHP = maxHP;
        this.initiative = initiative;
        this.activeWeapon = initialWeapon;
        this.inventoryWeapons = new ArrayList<>();
        this.inventoryWeapons.add(initialWeapon);
        this.activeArmor = initialArmor;
        this.inventoryArmor = new ArrayList<>();
        this.inventoryArmor.add(initialArmor);

    }



    private int damage(int attackRoll, Weapons attacker, Armor defender){
        int damageDealt = 0;
        //ToDo: add weaponDamage(weapon) && armorDefense(armor)
        return damageDealt;
    }



    public void attack(Character enemy){
        int damage = 0;
        System.out.println("...see if you hit...");
        int attackRoll = Dice.rollDice(20);
        if(attackRoll == 20){
            System.out.println("YOU ROLLED A CRITICAL HIT!!!");
            damage *= 2;
        } else if (attackRoll == 1) {
            System.out.println("YOU CRITICALLY MISSED!!!");
            damage /= 2;
        }
        this.toHit = this.activeWeapon.getAtkBonus() + attackRoll;
        if(this.toHit > enemy.ac){
            System.out.println("...attacking with your " + this.getActiveWeapon().getName() +
                    " (" + this.getActiveWeapon().getNumDice() + "D" + this.getActiveWeapon().getDiceType() + "+" + this.getActiveWeapon().getDmgBonus() + ")...");
            damage = (activeWeapon.getNumDice() * Dice.rollDice(this.activeWeapon.getDiceType())) + this.activeWeapon.getDmgBonus();


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



    public void takeDamage(int damage){
        this.currentHP -= damage;
        System.out.println("..." + " takes " + damage + "...");
        if(currentHP <= 0) {
            System.out.println(this.getName() + " HAS DIED!");
            //ToDo: remove from active battle array(s)
        }
    }

    public void takeDamage(int damage, String message){
        this.currentHP -= damage;
        System.out.println(message);
        if(currentHP <= 0) {
            System.out.println(this.getName() + " HAS DIED!");
            //ToDo: remove from active battle array(s)
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

    public Weapons getActiveWeapon() {
        return activeWeapon;
    }

    public Armor getActiveArmor() {
        return activeArmor;
    }

    public ArrayList<Weapons> getInventoryWeapons() {
        return inventoryWeapons;
    }

    public ArrayList<Armor> getInventoryArmor() {
        return inventoryArmor;
    }

    public void setCurrentHP(int currentHP) {
        this.currentHP = currentHP;
    }


}
