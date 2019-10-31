package com.armco.amarted.Actions;

import com.armco.amarted.Characters.Heroes;
import com.armco.amarted.Dice.Dice;
import com.armco.amarted.Gear.Armor;
import com.armco.amarted.Gear.Weapons;
import com.armco.amarted.Spells.Spells;

import java.util.ArrayList;

public class HeroActions {
    private ArrayList<Weapons> invWeapons;
    private ArrayList<Armor> invArmor;
    private ArrayList<Spells> knownSpells;


    public void attack(Heroes attacker, Heroes defender, boolean isBonusAction) {
        System.out.println("Rolling to see if you hit...");
        int critRole = Dice.rollDice(20);
        int toHitRoll = critRole + attacker.getActiveWeapon().getAtkBonus();
        if (critRole == 20) {
            System.out.println("YOU ROLLED A CRITICAL HIT!!!");
        } else if (critRole == 1) {
            int selfDMG = (int) (Math.floor(attacker.getCurrentHP() * .05));
            System.out.println("YOU ROLLED A CRIT-FAIL...");
            System.out.println("...you stumble and fall, hitting your head...");
            attacker.takeDamage(selfDMG, "...you take " + selfDMG + "damage!");
        } else {
            System.out.println("...you rolled " + toHitRoll + "...");
        }

        if (toHitRoll >= defender.getAc()) {
            System.out.println("...and now you're attacking with your " + attacker.getActiveWeapon().getName() + "...");
            defender.takeDamage(attacker.getActiveWeapon().attackDamage(critRole, attacker, defender, isBonusAction));
        }
    }

    public void addSpell(Spells newSpell){
        this.knownSpells.add(newSpell);
        if(findSpell(newSpell.getName()) == null) {
            addSpell(newSpell);
        }
    }

    public Spells findSpell(String spell){
        for(int i=0; i<knownSpells.size(); i++){
            Spells knownSpell = this.knownSpells.get(i);
            if(knownSpell.getName().equals(spell)){
                return knownSpell;
            }
        }
        return null;
    }

    public void magicAttack(Spells spell){
        System.out.println("...you cast " + spell.getName() + "...");
    }

    public void useMagic(Spells cast){

    }

    public void useItem(){
        System.out.println("YOU USE AN ITEM");
    }

    public void runAway(){
        System.out.println("YOU DISENGAGE");
    }

}
