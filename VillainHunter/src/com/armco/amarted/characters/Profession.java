package com.armco.amarted.characters;

import java.util.LinkedList;

public class Profession {
    private String name;

    public Profession(String name) {
        this.name = name;
    }


    public static LinkedList<Profession> inflateProfessions(){
        LinkedList<Profession> allProfessions = new LinkedList<>();
        allProfessions.add(new Profession("Ranger"));
        allProfessions.add(new Profession("Mage"));
        allProfessions.add(new Profession("Fighter"));
        allProfessions.add(new Profession("Theif"));

        return allProfessions;
    }


    public String getName() {
        return name;
    }
}
