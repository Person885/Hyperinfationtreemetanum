const Decimal = window.Decimal
let modInfo = {
  name: "The Hyperinflation Tree",
  id: "hyperinflation",
  author: "voidgwa",
  pointsName: "points",
  discordName: "",
  discordLink: "",
  initialStartPoints: new Decimal (10), // Used for hard resets and new players
  
  offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
  num: "1.0",
  name: "",
}

let changelog = `<h1>Changelog:</h1><br>
  <h3>v0.0</h3><br>
    - Added things.<br>
    - Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
  return true
}

// Calculate points/sec!
function getPointGen() {
  if(!canGenPoints())return new Decimal(0)

  let gain = new Decimal(1)
  if (hasUpgrade("i",11)){gain=gain.times(player.points)}
  if (hasUpgrade("i",13)){gain=gain.times(player.i.points)}
  if (hasUpgrade("i",22)){gain=gain.tetrate(10)}
  if (hasUpgrade("i",23)){gain=gain.tetrate(player.timePlayed)}
  if (hasUpgrade("i",31)){gain=gain.tetrate(player.points.slog())}
  if (gain.gte("10^^9e15")){gain=new Decimal(10).tetrate(Decimal.times(player.points.slog(), hasUpgrade("i",32)?4:2))}
  if (hasUpgrade("i",33)){gain=new Decimal(10).tetrate(new Decimal(player.points.slog()).times(100))}
  if (hasUpgrade("i",41)){gain=new Decimal(10).tetrate(player.points)}
  if (hasUpgrade("i",42)){gain=new Decimal(10).pentate(player.points)}
  if (hasUpgrade("i",43)){gain=new Decimal(10).arrow(buyableEffect("i",11))(player.points)}
  if (hasUpgrade("i",61)){gain=gain.expansion(Math.round(Math.sqrt(player.points.layer)*(hasUpgrade("i",62)?player.timePlayed:1)*(hasUpgrade("i",63)?player.timePlayed:1)))}
  if (gain.isInfinite()||gain.isNaN()&&hasUpgrade("i",61)){gain=new Decimal(10).expansion(Number.MAX_SAFE_INTEGER)}
  
  return gain.max(1)
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
  return hasUpgrade("i",71)
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
  return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
