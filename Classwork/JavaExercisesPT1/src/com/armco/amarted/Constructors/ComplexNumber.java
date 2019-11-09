package com.armco.amarted.Constructors;

public class ComplexNumber {
    private double real;
    private double imaginary;

    public ComplexNumber(double real, double imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    public double getReal() {
        return real;
    }

    public double getImaginary() {
        return imaginary;
    }

    public void add (double real, double imaginary){
        this.real += real;
        this.imaginary += imaginary;
    }

    public void add (ComplexNumber number){
        add(number.getReal(),number.getImaginary());
    }

    public void subtract(double real, double imaginary) {
        add(-real, -imaginary);
    }

    public void subtract(ComplexNumber c) {
        subtract(c.getReal(), c.getImaginary());
    }
}
