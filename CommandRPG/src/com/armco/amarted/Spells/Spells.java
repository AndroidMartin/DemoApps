package com.armco.amarted.Spells;

import java.util.ArrayList;

public class Spells {
    private String name;
    private int hpValue;
    private boolean isDefensive;
    private int elementType;

    public Spells(String name, int hpValue, boolean isDefensive, int elementType) {
        this.name = name;
        this.hpValue = hpValue;
        this.isDefensive = isDefensive;
        this.elementType = elementType;
    }


    public String getName() {
        return name;
    }

    public int getHpValue() {
        return hpValue;
    }

    public boolean isDefensive() {
        return isDefensive;
    }

    public int getElementType() {
        return elementType;
    }
}
