package com.armco.amarted.characters;

import java.util.ArrayList;
import java.util.LinkedList;

public class Race {
    private String name;
    private int maxHP;
    private int initiative;

    public Race(String name, int maxHP, int initiative) {
        this.name = name;
        this.maxHP = maxHP;
        this.initiative = initiative;
    }


    static LinkedList<Race> inflateRaces(){
        LinkedList<Race> allRaces = new LinkedList<>();
        allRaces.add(new Race("Dwarf",25,5));
        allRaces.add(new Race("Human",30,4));
        allRaces.add(new Race("Elf",40,5));
        allRaces.add(new Race("Dragonborn",45,2));
        return allRaces;
    }



    public String getName() {
        return name;
    }

    public int getMaxHP() {
        return maxHP;
    }

    public int getInitiative() {
        return initiative;
    }
}
