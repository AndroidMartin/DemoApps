package com.armco.amarted.heroes;

import com.armco.amarted.inventory.Armor;
import com.armco.amarted.inventory.Spell;
import com.armco.amarted.inventory.Weapon;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Scanner;


public class Hero {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Hero testHero = testHero();
        Hero testVillain = testVillain();
        testHero.printBio();
        testVillain.printBio();
//        Actions.attack(testVillain);

    }

    public static Hero testHero(){
        String name = "TestHero";
        Race race = new Race("Human",30,6);
        Profession profession = new Profession("Ranger",3);
        Weapon weapon = new Weapon("Longbow",9,1,8,4,"Piercing");
        Armor armor = new Armor("Chain Shirt","Metal", "Medium");
        LinkedList<Spell> knownSpellList = new LinkedList<>();
        knownSpellList.add(new Spell("Ice",true,false,15,1));
        LinkedList<Spell> availSpellList = new LinkedList<>();
        return new Hero(name,race,profession,weapon,armor,knownSpellList,availSpellList);
    }
    public static Hero testVillain(){
        String name = "TestVillain";
        Race race = new Race("Dragonborn",45,2);
        Profession profession = new Profession("Fighter",2);
        Weapon weapon = new Weapon("Sword",9,1,8,4,"Piercing");
        Armor armor = new Armor("Leather Jacket","Leather","Light");
        LinkedList<Spell> knownSpellList = new LinkedList<>();
        knownSpellList.add(new Spell("Fire",true,false,15,1));
        LinkedList<Spell> availSpellList = new LinkedList<>();
        return new Hero(name,race,profession,weapon,armor,knownSpellList,availSpellList);
    }




    // Beginning of Hero class
    private String name;  // -UI
    private Race race;  // -UI
    private Profession profession;  // -UI
    private int ac;  // -armor
    private int maxHP;  // -race
    private int currentHP;  // -race
    private int initiative;  // -(profession + race)/2
    private Weapon activeWeapon;  // -UI
    private Armor activeArmor;  // -UI
    private LinkedList<Weapon> invWeapons;  // -NEW
    private LinkedList<Armor> invArmor;  // -NEW
    private LinkedList<Spell> knownSpells;  // -NEW
    private LinkedList<Spell> availSpells;  // -NEW

    public Hero(String name, Race race, Profession selectedClass, Weapon selectedWeapon, Armor selectedArmor, LinkedList<Spell> knownSpells, LinkedList<Spell> availSpells) {
        this.name = name;
        this.race = race;
        this.profession = selectedClass;
        this.activeWeapon = selectedWeapon;
        this.activeArmor = selectedArmor;
        this.ac = calculateAC();
        this.initiative = calculateInitiative();
        int maxHP = calculateHP();
        this.maxHP = maxHP;
        this.currentHP = maxHP;
        this.invArmor = new LinkedList<>();
        this.invArmor.add(selectedArmor);
        this.invWeapons = new LinkedList<>();
        invWeapons.add(selectedWeapon);
        //ToDo: change above to: invWeapons.add(addWeapon(selectedWeapon));
        this.knownSpells = knownSpells;
        this.availSpells = availSpells;
        System.out.println("Successfully created " + this.name.toUpperCase() + "!!!");
    }



    public static Hero createHero(){
        Scanner scanner = new Scanner(System.in);
        // Inflate Races, Professions, Weapons, Armor, Spells
        LinkedList<Race> allRaces = Race.inflateRaces();
        LinkedList<Profession> allProfessions = Profession.inflateProfessions();
        LinkedList<Weapon> startingWeapons = Weapon.inflateWeapons();
        // todo: implement equipWeapon() from invWeapons
        LinkedList<Weapon> invWeapons = new LinkedList<>();
        LinkedList<Armor> startingArmor = Armor.inflateArmor();
        // todo: implement equipArmor() from invArmor
        LinkedList<Armor> invArmor = new LinkedList<>();
        LinkedList<Spell> allSpells = Spell.inflateSpells();
        LinkedList<Spell> availableSpells = new LinkedList<>(allSpells);
        LinkedList<Spell> knownSpells = new LinkedList<>();

        // CREATE YOUR HERO
        System.out.println("\nEnter your character's name: ");
        String newName = scanner.nextLine();
        Race newRace = selectRace(allRaces);
        Profession newProfession = selectProfession(allProfessions);
        if(newProfession.getName().equals("Mage")){
            availableSpells.add(0,new Spell("Cure All",false,false,5,0));
            availableSpells.add(availableSpells.size(),new Spell("Berserker",true,true,5,0));
        }
        Weapon newWeapon = selectWeapon(startingWeapons);
        invWeapons.add(newWeapon);
        Armor newArmor = selectArmor(startingArmor);
        invArmor.add(newArmor);
        Spell newSpell = selectSpell(availableSpells);
        knownSpells.add(newSpell);
        availableSpells.remove(newSpell);
        if(newProfession.getName().equals("Mage")){
            System.out.println("\n- Because you're a Mage, you've earned another spell slot -");
            newSpell = selectSpell(availableSpells);
            knownSpells.add(newSpell);
            availableSpells.remove(newSpell);
        }
        if(newWeapon.getName().equals("Staff")){
            System.out.println("\n- Because you're using a staff, you gain another spell slot -");
            newSpell = selectSpell(availableSpells);
            knownSpells.add(newSpell);
            availableSpells.remove(newSpell);
        }

        Hero hero = new Hero(newName,newRace,newProfession,newWeapon,newArmor,knownSpells,availableSpells);
        hero.printBio();
        return hero;
    }

    private void printBio(){
        System.out.println("\n=====PRINTING INFO=====");
        System.out.println("\t\t" + this.name);
        System.out.println("\t" + this.race.getName() + "\t" +  this.profession.getName());
        System.out.println("AC: " + this.ac + " | HP: " + this.currentHP  + "/" + this.maxHP + " | Ini: " + this.initiative);
        System.out.println("\t" + this.activeWeapon.getName()  + "\t" + this.activeArmor.getName());
        System.out.println("Spells Known:");
        if(this.knownSpells.size()<=0){
            System.out.println("\tNONE");
        } else{
            for (int i = 0; i < this.knownSpells.size(); i++) {
                System.out.println("\t" + (i+1) + ". " + this.knownSpells.get(i).getName());
            }
        }
    }

    private static Race selectRace(LinkedList<Race> linkedList){
        Scanner scanner = new Scanner(System.in);
        boolean done = false;
        Race selected = null;

        //pick <=0 -> show options
        //pick >0 -> select option

        while(!done){
            int j =0;
            System.out.println("\n - Select your race -");
            Iterator<Race> i = linkedList.iterator();
            while (i.hasNext()) {
                j++;
                System.out.println(j + ". " + i.next().getName());
            }
            System.out.print("--> ");
            int pick = scanner.nextInt();
            scanner.nextLine();
            if(pick > linkedList.size() || pick <= 0) {
                System.out.println("You picked incorrect option");
            } else {
                selected = linkedList.get(pick-1);
                done = true;
            }
        }
        return selected;
    }

    private static Profession selectProfession(LinkedList<Profession> linkedList){
        Scanner scanner = new Scanner(System.in);
        boolean done = false;
        Profession selected = null;
        while(!done){
            int j =0;
            System.out.println("\n - Select your class -");
            Iterator<Profession> i = linkedList.iterator();
            while (i.hasNext()) {
                j++;
                System.out.println(j + ". " + i.next().getName());
            }
            System.out.print("--> ");
            int pick = scanner.nextInt();
            scanner.nextLine();
            if(pick > linkedList.size() || pick <= 0) {
                System.out.println("You picked incorrect option");
            } else {
                selected = linkedList.get(pick-1);
                done = true;
            }
        }
        return selected;
    }

    private static Weapon selectWeapon(LinkedList<Weapon> linkedList){
        Scanner scanner = new Scanner(System.in);
        boolean done = false;
        Weapon selected = null;
        while(!done){
            int j =0;
            System.out.println("\n - Select your weapon -");
            Iterator<Weapon> i = linkedList.iterator();
            while (i.hasNext()) {
                j++;
                System.out.println(j + ". " + i.next().getName());
            }
            System.out.print("--> ");
            int pick = scanner.nextInt();
            scanner.nextLine();
            if(pick > linkedList.size() || pick <= 0) {
                System.out.println("You picked incorrect option");
            } else {
                selected = linkedList.get(pick-1);
                done = true;
            }
        }
        return selected;
    }

    private static Armor selectArmor(LinkedList<Armor> linkedList){
        Scanner scanner = new Scanner(System.in);
        boolean done = false;
        Armor selected = null;
        while(!done){
            int j =0;
            System.out.println("\n - Select your armor -");
            Iterator<Armor> i = linkedList.iterator();
            while (i.hasNext()) {
                j++;
                System.out.println(j + ". " + i.next().getName());
            }
            System.out.print("--> ");
            int pick = scanner.nextInt();
            scanner.nextLine();
            if(pick > linkedList.size() || pick <= 0) {
                System.out.println("You picked incorrect option");
            } else {
                selected = linkedList.get(pick-1);
                done = true;
            }
        }
        return selected;
    }

    private static Spell selectSpell(LinkedList<Spell> linkedList){
        Scanner scanner = new Scanner(System.in);
        boolean done = false;
        Spell selected = null;
        while(!done){
            int j =0;
            System.out.println("\n - Select your spell -");
            Iterator<Spell> i = linkedList.iterator();
            while (i.hasNext()) {
                j++;
                System.out.println(j + ". " + i.next().getName());
            }
            System.out.print("--> ");
            int pick = scanner.nextInt();
            scanner.nextLine();
            if(pick > linkedList.size() || pick <= 0) {
                System.out.println("You picked incorrect option");
            } else {
                selected = linkedList.get(pick-1);
                done = true;
            }
        }
        return selected;
    }

    private int calculateAC(){
        return this.activeArmor.getAc() + (this.race.getMaxHP() / 10);
    }

    private int calculateHP() {
        return this.race.getMaxHP();
    }

    private int calculateInitiative() {
        return (this.race.getInitiative() + this.activeArmor.getInitiative() + this.profession.getInitiative())/2;
//        return (this.race.getInitiative() + this.activeArmor.getInitiative());
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Race getRace() {
        return race;
    }

    public void setRace(Race race) {
        this.race = race;
    }

    public Profession getProfession() {
        return profession;
    }

    public void setProfession(Profession profession) {
        this.profession = profession;
    }

    public int getAc() {
        return ac;
    }

    public void setAc(int ac) {
        this.ac = ac;
    }

    public int getMaxHP() {
        return maxHP;
    }

    public void setMaxHP(int maxHP) {
        this.maxHP = maxHP;
    }

    public int getCurrentHP() {
        return currentHP;
    }

    public void setCurrentHP(int currentHP) {
        this.currentHP = currentHP;
    }

    public int getInitiative() {
        return initiative;
    }

    public void setInitiative(int initiative) {
        this.initiative = initiative;
    }

    public Weapon getActiveWeapon() {
        return activeWeapon;
    }

    public void setActiveWeapon(Weapon activeWeapon) {
        this.activeWeapon = activeWeapon;
    }

    public Armor getActiveArmor() {
        return activeArmor;
    }

    public void setActiveArmor(Armor activeArmor) {
        this.activeArmor = activeArmor;
    }

    public LinkedList<Weapon> getInvWeapons() {
        return invWeapons;
    }

    public void setInvWeapons(LinkedList<Weapon> invWeapons) {
        this.invWeapons = invWeapons;
    }

    public LinkedList<Armor> getInvArmor() {
        return invArmor;
    }

    public void setInvArmor(LinkedList<Armor> invArmor) {
        this.invArmor = invArmor;
    }

    public LinkedList<Spell> getKnownSpells() {
        return knownSpells;
    }

    public void setKnownSpells(LinkedList<Spell> knownSpells) {
        this.knownSpells = knownSpells;
    }

    public LinkedList<Spell> getAvailSpells() {
        return availSpells;
    }

    public void setAvailSpells(LinkedList<Spell> availSpells) {
        this.availSpells = availSpells;
    }
}
