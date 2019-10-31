package com.armco.amarted.Characters;

import com.armco.amarted.Actions.HeroActions;
import com.armco.amarted.Dice.Dice;
import com.armco.amarted.Gear.Armor;
import com.armco.amarted.Gear.Weapons;
import com.armco.amarted.Spells.Spells;

import java.util.ArrayList;


public class Heroes extends HeroActions {
    private String name;
    private int ac;
    private int maxHP;
    private int currentHP;
    private int initiative;
    private Weapons activeWeapon;
    private Armor activeArmor;
    private Spells activeSpell;
    private ArrayList<Weapons> inventoryWeapons;
    private ArrayList<Armor> inventoryArmor;
    private ArrayList<Spells> knownSpells;



    public Heroes(String name, int ac, int maxHP, int initiative, Weapons initialWeapon, Armor initialArmor) {
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
        this.knownSpells = new ArrayList<>();


    }



    public void activateSpell(Spells spell){
        this.activeSpell = spell;
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

    public Spells getActiveSpell() {
        return activeSpell;
    }

    public ArrayList<Spells> getKnownSpells() {
        return knownSpells;
    }
}
