package com.armco.amarted.inventory;

public class Armor {
    private String name;
    private int ac;
    private int matType;

    public Armor(String name, int ac, int matType) {
        this.name = name;
        this.ac = ac;
        this.matType = matType;
    }

    public String getName() {
        return name;
    }

    public int getAc() {
        return ac;
    }

    public int getMatType() {
        return matType;
    }
}
