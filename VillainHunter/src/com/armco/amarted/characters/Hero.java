package com.armco.amarted.characters;

import com.armco.amarted.inventory.Armor;
import com.armco.amarted.inventory.Spell;
import com.armco.amarted.inventory.Weapon;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.ListIterator;
import java.util.Scanner;


public class Hero {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        LinkedList<Weapon> allWeapons = new LinkedList<>();
        allWeapons.add(new Weapon("Bare Fists",3,1,4,1,"Bludgeoning"));
        allWeapons.add(new Weapon("Staff",9,1,8,4,"Piercing"));
        allWeapons.add(new Weapon("Sword",9,1,8,4,"Piercing"));
        allWeapons.add(new Weapon("Dual Daggers",9,1,8,4,"Piercing"));
        allWeapons.add(new Weapon("Longbow",9,1,8,4,"Piercing"));

        LinkedList<Armor> allArmor = new LinkedList<>();
        allArmor.add(new Armor("Naked",8,0));
        allArmor.add(new Armor("Leather Jacket",14,1));
        allArmor.add(new Armor("Chain Shirt",16,2));
        allArmor.add(new Armor("Heavy Armor",18,2));

        LinkedList<Spell> allSpells = new LinkedList<>();
        //   ToDo: add Cure All if a mage
        allSpells.add(new Spell("Cure",false,false,10,0));
        allSpells.add(new Spell("Fire",true,false,15,1));
        allSpells.add(new Spell("Blizzard",true,false,15,2));
        allSpells.add(new Spell("Bolt",true,false,15,3));
        allSpells.add(new Spell("Tornado",true,false,15,4));

        LinkedList<Spell> knownSpells = new LinkedList<>();


//        Weapon firstWeapon = new Weapon("Longbow",9,1,8,4,"Piercing");
//        Weapon fists = new Weapon("Bare Fists",3,1,4,1,"Bludgeoning");
//        Armor firstArmor = new Armor("Chain Shirt",16,2);
//        Armor naked = new Armor("Naked",8,0);
        // ToDo: create hero
        // ToDo: enter your name
        // ToDO: select your race
        String race = "Human";
        // ToDo: select your profession
        Weapon firstWeapon = selectWeapon(allWeapons);
        Armor firstArmor = selectArmor(allArmor);
        Spell startingSpells = startingSpells(race, allSpells);
        Hero hero = new Hero("Andreas",race,"Ranger",firstWeapon,firstArmor);
//        hero.invWeapons.add(firstWeapon);
        Hero hero1 = new Hero();
        hero1.selectWeapon(allWeapons);
//        Hero hero1 = new Hero("Volkan","Dragonborn","Monk",fists,naked);
//        selectWeapon(hero.invWeapons);


    }








    // Beginning of Hero class
    private String name;  // -UI
    private String race;  // -UI
    private String profession;  // -UI
    private int ac;  // -armor
    private int maxHP;  // -race
    private int currentHP;  // -race
    private int initiative;  // -(profession + race)/2
    private Weapon activeWeapon;  // -UI
    private Armor activeArmor;  // -UI
    private LinkedList<Weapon> invWeapons;  // -NEW
    private LinkedList<Armor> invArmor;  // -NEW
    private LinkedList<Spell> knownSpells;  // -NEW

    public Hero(String name, String race, String profession, Weapon selectedWeapon, Armor selectedArmor) {
        this.name = name;
        this.race = race;
        this.profession = profession;
        this.activeWeapon = selectedWeapon;
        this.activeArmor = selectedArmor;
        this.ac = calculateAC(selectedArmor);
        this.initiative = calculateInitiative(race,selectedArmor);
        int maxHP = calculateHP(race);
        this.maxHP = maxHP;
        this.currentHP = maxHP;
        this.invArmor = new LinkedList<>();
        this.invArmor.add(selectedArmor);
        this.invWeapons = new LinkedList<>();
        invWeapons.add(selectedWeapon);
        //ToDo: change above to: invWeapons.add(addWeapon(selectedWeapon));
        this.knownSpells = new LinkedList<>();
        System.out.println("Successfully created " + this.name + "!!!");
        System.out.println(this.race + " | " + this.profession);
        System.out.println("AC:" + this.ac + " | HP:" + this.currentHP  + "/" + this.maxHP + " | Initiative:" + this.initiative);
        System.out.println(this.activeWeapon.getName()  + " | " + this.activeArmor.getName());
    }

    public Hero(){

    }

    public Hero createHero() {
        String name;
        String race;
        String profession;



        Scanner scanner = new Scanner(System.in);
        System.out.println("\nTime to create your adventurer...");
        System.out.println("Enter your hero's name:");
        name = scanner.nextLine();
        // todo: select race
        // todo: select profession;

        Hero newHero = new Hero();
        return newHero;
    }
    //          --------------------------------------


//    public static boolean addSpell (LinkedList<Spell> knownSpells, Spell newSpell){
//        ListIterator<Spell> spellListIterator = knownSpells.listIterator();
//        while (spellListIterator.hasNext()){
//            String comp = spellListIterator.next().getName();
//        }
//    }







//    public ArrayList<Weapon> startingWeapons()    {
//        ArrayList<Weapon> startingWeapons = new ArrayList<Weapon>();
//        startingWeapons.add(new Weapon("Bare Fists",3,1,4,1,"Bludgeoning"));
//        startingWeapons.add(new Weapon("Dualing Shortswords",7,1,6,4,"Piercing"));
//        startingWeapons.add(new Weapon("Long Sword",5,1,8,6,"Slashing"));
//        startingWeapons.add(addWeapon("Longbow",9,1,8,4,"Piercing"));
//        return(startingWeapons);
//    }


    public static Spell startingSpells(String race, LinkedList<Spell> linkedList){
        Scanner scanner = new Scanner(System.in);
        int j = 0;
        boolean done = false;
        Spell selected = null;
        Iterator<Spell> i = linkedList.iterator();
        System.out.println("\n - Select your armor -");

        while(!done){
            while (i.hasNext()) {
                j++;
                System.out.println(j + ". " + i.next().getName());
            }
            System.out.print("--> ");
            int pick = scanner.nextInt();
            scanner.nextLine();
            if(pick > linkedList.size() || pick < 0) {
                System.out.println("You picked incorrect option");
            } else {
                selected = linkedList.get(pick-1);
                done = true;
            }
        }
        return selected;
    }




    public static Weapon selectWeapon(LinkedList<Weapon> linkedList){
        Scanner scanner = new Scanner(System.in);
        int j = 0;
        boolean done = false;
        Weapon selected = null;
        Iterator<Weapon> i = linkedList.iterator();
        System.out.println("\n - Select your weapon -");

        while(!done){
            while (i.hasNext()) {
                j++;
                System.out.println(j + ". " + i.next().getName());
            }
            System.out.print("--> ");
            int pick = scanner.nextInt();
            scanner.nextLine();
            if(pick > linkedList.size() || pick < 0) {
                System.out.println("You picked incorrect option");
            } else {
                selected = linkedList.get(pick-1);
                done = true;
            }
        }
        return selected;
    }

    public static Armor selectArmor(LinkedList<Armor> linkedList){
        Scanner scanner = new Scanner(System.in);
        int j = 0;
        boolean done = false;
        Armor selected = null;
        Iterator<Armor> i = linkedList.iterator();
        System.out.println("\n - Select your armor -");

        while(!done){
            while (i.hasNext()) {
                j++;
                System.out.println(j + ". " + i.next().getName());
            }
            System.out.print("--> ");
            int pick = scanner.nextInt();
            scanner.nextLine();
            if(pick > linkedList.size() || pick < 0) {
                System.out.println("You picked incorrect option");
            } else {
                selected = linkedList.get(pick-1);
                done = true;
            }
        }
        return selected;
    }



    private int calculateAC(Armor armor){
        return armor.getAc();
    }


    public int calculateHP(String race) {
        int maxHP = 0;
        if (race.equals("Dwarf")) {
            maxHP = 25;
        } else if (race.equals("Human")) {
            maxHP = 30;
        } else if (race.equals("Elf")) {
            maxHP = 40;
        } else if (race.equals("Dragonborn")) {
            maxHP = 45;
        } else {
            System.out.println("Incorrect 'Race' Selected");
            maxHP = -1;
        }
        return maxHP;
    }

    public int calculateInitiative(String race, Armor armor) {
        int initiative = 0;
        if (armor.getName().equals("Naked")) {
            initiative += 1;
        } else if (armor.getName().equals("Heavy Armor")) {
            initiative -= 1;
        }

        if (race.equals("Dwarf")) {
            initiative += 3;
        } else if (race.equals("Human")) {
            initiative += 4;
        } else if (race.equals("Elf")) {
            initiative += 5;
        } else if (race.equals("Dragonborn")) {
            initiative += 2;
        } else {
            System.out.println("Incorrect 'Race' Selected");
            initiative = -1;
        }
        return initiative;
    }


}
