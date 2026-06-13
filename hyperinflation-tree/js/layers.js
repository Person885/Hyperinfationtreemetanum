const Decimal = window.Decimal
addLayer("i", {
    name: "Inflation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "inflation", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
  if (hasUpgrade("i",21)){
    return player.i.points.plus(2)
  }else return 2
}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  passiveGeneration(){return new Decimal(hasUpgrade("i",12)?1:0)},
  upgrades:{
    11: {
      description: "Gain 100% of points per second",
      cost: new Decimal(1),
    },
    12: {
      description: "Gain 100% of inflation per second",
      cost: new Decimal(10),
      unlocked(){return hasUpgrade("i",11)}
    },
    13: {
      description: "Inflation multiplies points",
      cost: new Decimal("1e10"),
      unlocked(){return hasUpgrade("i",12)}
    },
    21: {
      description: "Points add to inflation gain exponent",
      cost: new Decimal("ee10"),
      unlocked(){return hasUpgrade("i",13)}
    },
    22: {
      description: "Tetrate points to the 10",
      cost: new Decimal("10^^100"),
      unlocked(){return hasUpgrade("i",21)}
    },
    23: {
      description: "Tetrate points to the number of seconds played",
      cost: new Decimal("10^^1000"),
      unlocked(){return hasUpgrade("i",22)}
    },
    31: {
      description: "Tetrate points to slog of itself",
      cost: new Decimal("10^^5000"),
      unlocked(){return hasUpgrade("i",23)}
    },
    32: {
      description: "Tetrate points to slog of itself",
      cost: new Decimal("10^^1e15"),
      unlocked(){return hasUpgrade("i",31)}
    },
    33: {
      description: "Inflate",
      cost: new Decimal("10^^1e50"),
      unlocked(){return hasUpgrade("i",32)}
    },
    41: {
      description: "Tetrate point gain to itself",
      cost: new Decimal("10^^1e308"),
      unlocked(){return hasUpgrade("i",33)}
    },
    42: {
      description: "Pentate point gain to itself",
      cost: new Decimal("10^^^100"),
      unlocked(){return hasUpgrade("i",41)}
    },
    43: {
      description: "Unlock a buyable",
      cost: new Decimal("10^^^^100"),
      unlocked(){return hasUpgrade("i",42)}
    },
    51: {
      description: "Reduce buyable cost",
      cost: new Decimal("10{10}100"),
      unlocked(){return hasUpgrade("i",43)}
    },
    52: {
      description: "Further reduce buyable cost and autobuy buyable levels",
      cost: new Decimal("10{100}10"),
      unlocked(){return hasUpgrade("i",51)}
    },
    53: {
      description: "Remove buyable cost scaling and buy max buyable levels",
      cost: new Decimal("10{308}10"),
      unlocked(){return hasUpgrade("i",52)}
    },
    61: {
      description: "Expand points to square root of its own layer",
      cost: new Decimal("J^100 10"),
      unlocked(){return hasUpgrade("i",53)}
    },
    62: {
      description: "Boost previous upgrade by the number of seconds played",
      cost: new Decimal("J^10000 10"),
      unlocked(){return hasUpgrade("i",61)}
    },
    63: {
      description: "Boost previous upgrade by the number of seconds played",
      cost: new Decimal("J^10000000000 10"),
      unlocked(){return hasUpgrade("i",62)}
    },
    71: {
      description: "Unlock the next layer",
      cost: new Decimal(10).expansion(Number.MAX_SAFE_INTEGER),
      unlocked(){return hasUpgrade("i",63)}
    },
  },
  buyables:{
    11: {
      cost(x=getBuyableAmount(this.layer,this.id)) { 
        if (hasUpgrade("i",53)) return Decimal.arrow(10,x.add(4),1)
        if (hasUpgrade("i",52)) return Decimal.arrow(10,x.add(4),2)
        if (hasUpgrade("i",51)) return Decimal.arrow(10,x.add(4),10)
        return Decimal.arrow(10,x.add(4),100)
      },
      display() { return "N-th arrow point gain to itself.<br>Currently: "+formatWhole(this.effect())+"<br>Cost: "+format(this.cost())+" inflation" },
      title: "Arrow Buyable",
      canAfford() { return player.points.gte(this.cost()) },
      buy() {
          if (hasUpgrade("i",53)) setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.points.div(this.cost())))
          else setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      unlocked(){return hasUpgrade("i",43)},
      effect(){return Decimal.add(3, getBuyableAmount(this.layer,this.id))},
    },
  },
  update(diff){
    if (hasUpgrade("i",52)){
      if (layers.i.buyables[11].canAfford())layers.i.buyables[11].buy()
    }
  },
})
