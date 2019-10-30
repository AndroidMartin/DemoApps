package com.armco.amarted.Gear;

import java.util.ArrayList;


public class Main {
    public static void main(String[] args) {

    }
}









public class Armor {
    private String name;
    private int ac;
    private int matType;
    private ArrayList<String> materialArmorArray = {"Naked","Leather","Chain","Heavy Armor"};



    public Armor(String name, int ac, int matType) {
        this.name = name;
        this.ac = ac;
        this.matType = matType;
    }







    //  NO NEED - ALL YOU NEED IS AC, WEAPON HANDLES DAMAGE - USE GetAC() INSTEAD
    public int armorDefense(Weapons weapon,Armor armor){
        int totalDefense = armor.ac;
        //ToDo: add defense type (e.g. chain-slashing, leather-piercing)
        if(weapon.getDmgType() == 0){

        }
        return totalDefense;
    }





    private void addMaterial(String material){
        materialArmorArray.add(material);
    }

    private int findMaterial(String matType){
        return this.materialArmorArray.indexOf(matType);
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

    public String getMaterialArmorArray() {
        return materialArmorArray;
    }
}
