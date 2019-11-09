package com.armco.amarted.Inheritance;

public class Cuboid extends Rectangle {

    private double height;

    public Cuboid(double width, double length, double height) {
        super(length, width);
        this.height = height < 0 ? 0 : height;
    }

    public double getVolume(){
        return height * getArea();
    }

    public double getHeight() {
        return height;
    }
}
