package com.armco.amarted.inventory;

import java.util.LinkedList;

public class Armor {
    private String name;
    private int ac;
    private String material;
    private String weight;
    private int initiative;

    public Armor(String name, String material, String weight) {
        this.name = name;
        this.ac = calcualateAC(weight);
        this.material = material;
        this.initiative = calcInitiative(weight);
    }

    private int calcInitiative(String matWeight){
        if(matWeight.equals("Heavy")) {
            return -2;
        }else if(matWeight.equals("Medium")) {
            return 0;
        }else if(matWeight.equals("Light")){
            return 2;
        } else if(matWeight.equals("None")){
            return 4;
        } else {
            return -10;
        }
    }

    private int calcualateAC(String matWeight){
        if(matWeight.equals("Heavy")) {
            return 16;
        }else if(matWeight.equals("Medium")) {
            return 14;
        }else if(matWeight.equals("Light")){
            return 12;
        } else if(matWeight.equals("None")){
            return 8;
        } else {
            return -10;
        }
    }

    public static LinkedList<Armor> inflateArmor(){
        LinkedList<Armor> startingArmor = new LinkedList<>();
        startingArmor.add(new Armor("Naked","None","None"));
        startingArmor.add(new Armor("Leather Jacket","Leather","Light"));
        startingArmor.add(new Armor("Chain Shirt","Metal", "Medium"));
        startingArmor.add(new Armor("Heavy Armor","Metal","Heavy"));
        return startingArmor;
    }

    public String getName() {
        return name;
    }

    public int getAc() {
        return ac;
    }

    public String getMaterial() {
        return material;
    }

    public String getWeight() {
        return weight;
    }

    public int getInitiative() {
        return initiative;
    }
}
