addLayer("p", {
    name: "Bebracoin", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BC", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    branches: ["b"],
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Bebra Coin", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent

    doReset(layer){
        if(layers[layer].row <= layers[this.layer].row || layers[layer].row == "side")return;

        layerDataReset(this.layer)
      },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 14)) mult = mult.times(upgradeEffect('p', 14))
        if(hasUpgrade('b', 12)) mult = mult.times(2)
        if(hasUpgrade('b', 22)) mult = mult.times(3)
        if(hasUpgrade('b', 32)) mult = mult.times(4)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for bebra coins", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11:{
            title: "Pickaxe",
            description: "Double your point gain.",
            cost: new Decimal(1),
        },
        12:{
            title: "Bebrapick",
            description: "Double your point gain again!",
            cost: new Decimal(3),
        },
        13:{
            title: "Coin Amulet",
            description: "Your Bebracoins boost point gain.",
            cost: new Decimal(7),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14:{
            title: "Point Powers",
            description: "Points boost Bebracoins gain",
            cost: new Decimal(25),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    layerShown(){return true}
})

addLayer("b", {
    name: "Bebra", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#D4CD3C",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "Bebra", // Name of prestige currency
    baseResource: "Bebra coin", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for bebra coins", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11:{
            title: "Miner",
            description: "3x points gain",
            cost: new Decimal(1),
        },
        12:{
            title: "Merchant",
            description: "2x coins gain",
            cost: new Decimal(1),
        },
        13:{
            title: "Keeper",
            description: "Keep first coin upgrade on reset",
            cost: new Decimal(1),
        },
        21:{
            title: "Destroyer",
            description: "5x point gain",
            cost: new Decimal(10),
        },
        22:{
            title: "Dealer",
            description: "3x coin gain",
            cost: new Decimal(10),
        },
        23:{
            title: "Saver",
            description: "Keep second coin upgrade on reset",
            cost: new Decimal(10),
        },
        31:{
            title: "Mech",
            description: "10x points",
            cost: new Decimal(100),
        },
        32:{
            title: "Scammer",
            description: "4x coins",
            cost: new Decimal(100),
        },
        33:{
            title: "Vaulter",
            description: "Keep third coin upgrade on reset",
            cost: new Decimal(100),
        },

    }
})