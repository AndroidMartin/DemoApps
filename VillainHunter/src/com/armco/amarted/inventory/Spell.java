package com.armco.amarted.inventory;

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
