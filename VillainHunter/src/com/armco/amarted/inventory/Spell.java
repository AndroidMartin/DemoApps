package com.armco.amarted.inventory;

import java.util.LinkedList;

public class Spell {
    private String name;
    private boolean isDmg;
    private boolean isStatus;
    private int hpValue;
    private int damageType;

    public Spell(String name, boolean isDmg, boolean isStatus, int hpValue, int damageType) {
        this.name = name;
        this.isDmg = isDmg;
        this.isStatus = isStatus;
        this.hpValue = hpValue;
        this.damageType = damageType;
    }


    public static LinkedList<Spell> inflateSpells(){
        LinkedList<Spell> allSpells = new LinkedList<>();
        allSpells.add(new Spell("Cure",false,false,10,0));
        allSpells.add(new Spell("Fire",true,false,15,1));
        allSpells.add(new Spell("Blizzard",true,false,15,2));
        allSpells.add(new Spell("Bolt",true,false,15,3));
        allSpells.add(new Spell("Tornado",true,false,15,4));
        return allSpells;
    }



    public String getName() {
        return name;
    }

    public boolean isDmg() {
        return isDmg;
    }

    public boolean isStatus() {
        return isStatus;
    }

    public int getHpValue() {
        return hpValue;
    }

    public int getDamageType() {
        return damageType;
    }
}
