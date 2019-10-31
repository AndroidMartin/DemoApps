package com.armco.amarted.Actions;

import com.armco.amarted.Characters.Heroes;
import com.armco.amarted.Gear.Armor;
import com.armco.amarted.Gear.Weapons;
import com.armco.amarted.Spells.Spells;

import java.util.ArrayList;


public class Main {
    public static void Main(String[] args){
        Startup initializeInventory = new Startup(new ArrayList<Armor>(),new ArrayList<Weapons>(),new ArrayList<Spells>());
        initializeInventory.startArmor();
        initializeInventory.startWeapons();
        initializeInventory.startSpells();
    }
}


public class Startup {
    public ArrayList<Armor> allArmor;
    public ArrayList<Weapons> allWeapons;
    public ArrayList<Spells> allSpells;
    public ArrayList<Heroes> enemyArray;


    public Startup(ArrayList<Armor> allArmor, ArrayList<Weapons> allWeapons, ArrayList<Spells> allSpells) {
        this.allArmor = allArmor;
        this.allWeapons = allWeapons;
        this.allSpells = allSpells;
        this.enemyArray = new ArrayList<>();
    }

    public void startArmor(){
        allArmor.add(new Armor("Naked",8,0));
        allArmor.add(new Armor("Leather Jacket",14,1));
        allArmor.add(new Armor("Chain Shirt",16,2));
        allArmor.add(new Armor("Heavy Armor",18,2));
    }

    public void startWeapons(){
        allWeapons.add(new Weapons("Bare Fists",3,1,4,1,"Bludgeoning"));
        allWeapons.add(new Weapons("Dualing Shortswords",7,1,6,4,"Piercing"));
        allWeapons.add(new Weapons("Long Sword",5,1,8,6,"Slashing"));
        allWeapons.add(new Weapons("Longbow",9,1,8,4,"Piercing"));
    }

    public void startSpells(){
        allSpells.add(new Spells("Cure",10,true,0));
        allSpells.add(new Spells("Fire",12,false,1));
        allSpells.add(new Spells("Ice",12,false,2));
        allSpells.add(new Spells("Bolt",12,false,3));
        allSpells.add(new Spells("Earth",12,false,4));
    }

    public void startEnemyArray(){

    }

    public ArrayList<Armor> getAllArmor() {
        return allArmor;
    }

    public void setAllArmor(ArrayList<Armor> allArmor) {
        this.allArmor = allArmor;
    }
}
