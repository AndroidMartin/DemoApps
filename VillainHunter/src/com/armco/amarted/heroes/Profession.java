package com.armco.amarted.heroes;

import java.util.LinkedList;

public class Profession {
    private String name;
    private int initiative;

    public Profession(String name, int ini) {
        this.name = name;
        this.initiative = ini;
    }


    public static LinkedList<Profession> inflateProfessions(){
        LinkedList<Profession> allProfessions = new LinkedList<>();
        allProfessions.add(new Profession("Ranger",3));
        allProfessions.add(new Profession("Mage",6));
        allProfessions.add(new Profession("Fighter",2));
        allProfessions.add(new Profession("Theif",5));
        return allProfessions;
    }


    public String getName() {
        return name;
    }

    public int getInitiative() {
        return initiative;
    }
}
