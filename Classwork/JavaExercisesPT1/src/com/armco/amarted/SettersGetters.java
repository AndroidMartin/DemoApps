package com.armco.amarted;

public class SettersGetters {
    private String firstName;
    private String lastName;
    private int age;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if ((age < 0) || (age > 100)){
            age = 0;
        }
        this.age = age;
    }

    public boolean isTeen(){
        if (age > 12 && age < 20){
            return true;
        }
        return false;
    }

//    public String getFullName(){
//        if (firstName.isEmpty() || lastName.isEmpty()){
//            return "";
//        } else if (firstName){
//            return lastName;
//        } else if (lastName == "") {
//            return firstName;
//        }
//    }

    public String getFullName(){
        if (firstName.isEmpty()){
            if (lastName.isEmpty()){
                return "";
            }
            return lastName;
        } else if (lastName.isEmpty()){
            return firstName;
        }
        return firstName + " " + lastName;
    }



}
