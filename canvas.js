//images and stuff :)
let canvas = document.querySelector("canvas")
let man = document.querySelector("#man")
let house = document.querySelector("#house")
let dullBlade = document.querySelector("#sword")
let cupcake = document.querySelector("#cupcake")
let rubberChicken = document.querySelector("#rubberChicken")
let stickOfJustice = document.querySelector("#stickOfJustice")
let toothBrushOfDestiny = document.querySelector("#toothBrush")
let bed = document.querySelector("#bed")
let zombie = document.querySelector("#zombie")
let healthBar = document.querySelector("#filledHealthBar")
let MaxHealthBar = document.querySelector("#emptyHealthBar")
let XPBar = document.querySelector("#filledXPBar")
let lvlDisplay = document.querySelector("#lvl")
let skillPointDisplay = document.querySelector("#skillpointDisplay")
let upgradeStrengthButton = document.querySelector("#upgradeStrengthButton")
let upgradeVitalityButton = document.querySelector("#upgradeVitalityButton")
let strengthPointDisplay = document.querySelector("#strengthPointDisplay")
let vitalityPointDisplay = document.querySelector("#vitalityPointDisplay")
let pauseMenu = document.querySelector("#pauseMenu")
let resumeButton = document.querySelector("#resumeButton")
let skeleton = document.querySelector("#skeleton")
let statsScreen = document.querySelector("#stats")
let inventoryScreen = document.querySelector("#inventory")
let needMoreLvl = document.querySelector("#needMoreLvl")

// the variables
let characterX = 50
let characterY = 50
let characterW = 10
let characterH = 16.8
let area = 1
let allZombieStats = []
let allSkeletonStats = []
let nextLevelRequirement = 50
let gamePaused = false
let openedStats = false
let xp = 0
let lvl = 1
let strength = 0
let vitality = 0
let skillPoints = 0
let maxPlayerHealth = 100
let playerHealth = maxPlayerHealth
let attacking = false
let inHouse = false

//weapon types
let weapons = [
    {
        selected:true,
        displayName:"Dull Blade",
        varName: dullBlade,
        damage:1,
        description: `A simple dull blade you took from your grandpas house when he wasn't looking`,
    },
    {
        selected:false,
        displayName:"cupcake",
        varName: cupcake,
        damage:10000000000,
        description: `I can really just make this as long as I want to so... Just kidding, I have no idea what to put here`,
    },
]
let allWeapons = [
    {
        selected:true,
        displayName:"Dull Blade",
        varName: dullBlade,
        damage:1,
        description: `A simple dull blade you took from your grandpas house when he wasn't looking, he isn't happy`,
    },
    {
        selected:false,
        displayName:"cupcake",
        varName: cupcake,
        damage:1000000,
        description: `I can really just make this as long as I want to so... Just kidding, I have no idea what to put here`,
    },
    {
        selected:false,
        displayName:"Zombie Sword",
        varName: dullBlade, // change later
        damage: 2.25,
        description: `Bbbbraaaiiinnzzz`,
    },
    {
        selected: false,
        displayName: "Stick of Justice",
        varName: stickOfJustice,
        damage: 2.5,
        description: `The handle of the sword that once bonked Azureus the Fallen into the underworld, Hmmm, I wonder where the blade went...`,
    },
    {
        selected: false,
        displayName: "Toothbrush of Destiny",
        varName: toothBrushOfDestiny,
        damage: 2,
        description: `Was originally made to clean teeth, now it cleans up battlefield...`,
    },
    {
        selected: false,
        displayName: "Rubber Chicken",
        varName: rubberChicken, 
        damage: 1.5,
        description: `Quack.... wait is quack the correct noice? (im genuinely confused between ducks and chickens)`,
    },

]
//enemy types
let enemies = [
    {
        name:"zombie",
        varName:zombie,
        damage: 10,
        hp:15,
        w: 16,
        h: 20,
        xp:10,
        drops:[
            {
                name:"Rubber Chicken",
                chance:30,
            },
            {
                name:"Toothbrush of Destiny",
                chance:15,
            },
            {
                name:"Zombie Sword",
                chance:10,
            },
        ]
    }, 
    {
        name:"skeleton",
        varName:skeleton,
        damage: 20,
        hp:13,
        w: 20,
        h: 25,
        xp:20,
        drops:[
            {
                name:"Stick of Justice",
                chance:5,
            }
        ]
    }
]



insertEnemy("zombie", 210, 20)
insertEnemy("zombie", 210, 80)

//the thing im rendering the stuff with
let ctx = canvas.getContext("2d")

//drawing the character
function drawCharacter(x, y) {
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(man, x, y, characterW, characterH)
}

// clearing everything so that the character doesn't duplicate itself
function clearAll() {
    ctx.clearRect(0, 0, 1000, 1000)
}

// attacking
function attackAnimation() {
    ctx.imageSmoothingEnabled = false
    let selectedWeapon = ""
    weapons.forEach(weapon => {
        console.log(weapon)
        if(weapon.selected==true) {
            selectedWeapon = weapon.varName
        }
    });
    ctx.drawImage(selectedWeapon, characterX+characterW*9/10, characterY+characterW*3/10, characterW*7/10, characterW*7/10)
}

// making an enemy(in the works)
function makeEnemy(selectedEnemy, x, y) {
        ctx.imageSmoothingEnabled = false
        enemies.forEach(enemy => {
            if(enemy.name == selectedEnemy) {
                ctx.drawImage(enemy.varName, x, y, enemy.w, enemy.h)
            }
        })
}

// insert a enemy into the designated enemy array
function insertEnemy(selectedEnemy, x, y) {
    if(selectedEnemy=="zombie") {
        enemies.forEach(enemy => {
            if(enemy.name == selectedEnemy) {
                allZombieStats.push({
                    x:x,
                    y:y,
                    beforeX:x,
                    beforeY:y,
                    health:enemy.hp,
                    xp:enemy.xp,
                
                })
            }
        })

    }
    if(selectedEnemy=="skeleton") {
        enemies.forEach(enemy => {
            if(enemy.name == selectedEnemy) {
                allSkeletonStats.push({
                    x:x,
                    y:y,
                    beforeX:x,
                    beforeY:y,
                    health:enemy.hp,
                    xp:enemy.xp,
                
                })
            }
        })

    }

}

// the enemies when entering a new area
function enterNewArea() {
    allZombieStats = []
    allSkeletonStats = []
    if (area === 1) {
        insertEnemy("zombie", 210, 80)
        insertEnemy("zombie", 210, 20)
    } else if (area === 2) {
        if(lvl<2) {

        }
        insertEnemy("zombie", 180, 60)
        insertEnemy("zombie", 250, 40)
        insertEnemy("zombie", 200, 80)
    } else if (area === 3) {
        insertEnemy("skeleton", 180, 60)
        insertEnemy("skeleton", 250, 40)
        insertEnemy("skeleton", 200, 80)
        insertEnemy("skeleton", 140, 100)
    }
}

// when an enemy touches the player
function handleEnemyTouchingPlayer(selectedEnemy) {
    enemies.forEach(enemy => {
        if(enemy.name == selectedEnemy) {
            playerHealth-=enemy.damage
            
        }
    })
}

// drawing the house 
function drawHouse (x, y) {
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(house, x, y, 35, 30)
}

// draw a basic rectangle of any size and location
function drawRect(x, y, w, h) {
    ctx.fillRect(x, y, w, h)
}

// handles what happens when the player goes inside the house
function handleCharacterTouchingHouse() {
    if(characterX==105 && characterY==65) {
        canvas.style.backgroundColor = "burlywood"
        inHouse=true
        characterH = 32.8
        characterW = 20
        characterX=140
        characterY=110
    }
}

// handles what happens when the player exits the house
function handleCharacterExitingHouse() {
    if(characterX>110 && characterX<160 && characterY==130 ) {
        canvas.style.backgroundColor = "green"
        inHouse=false
        characterW = 10
        characterH = 16.8
        characterX=105
        characterY=75
        zmbX = 210
        zmbY = 50

    }
}


// renders the graphics every 1/10 of a second or 100 ms
setInterval(() => {
    clearAll()
    healthBar.style.width = (playerHealth/maxPlayerHealth)*100 + "%"
    skillPointDisplay.innerText = `Skill Points: ${skillPoints}`

    if (inHouse === false) {
        allZombieStats.forEach(zombieStats => {
            makeEnemy("zombie", zombieStats.x, zombieStats.y)
        })
        allSkeletonStats.forEach(skeletonStats => {
            makeEnemy("skeleton", skeletonStats.x, skeletonStats.y)
        })
        if (area === 1) {
            canvas.style.backgroundColor = "green"
            drawHouse(100, 50)
            handleCharacterTouchingHouse()
        } else if (area === 2) {
            canvas.style.backgroundColor = "darkgreen"
        } else if (area === 3) {
            canvas.style.backgroundColor = "darkslateblue"
        }
    } 
    else {
        if(playerHealth<maxPlayerHealth) {
            playerHealth+=maxPlayerHealth/1000
        }
        area=1
        enterNewArea()
        drawRect(122, 146, 50, 10)
        handleCharacterExitingHouse()
        ctx.drawImage(bed, 40, 20, 75, 75)
    }

    if (attacking) {
        attackAnimation()
    }

    // moving to the next area
    if (characterX > canvas.width - characterW) {
        area += 1
        enterNewArea()
        characterX = 0
        inHouse = false
    }

    // going back to the previous area
    if (characterX < 0) {
        if (area > 1) {
            area -= 1
            characterX = canvas.width - characterW
            inHouse = false
        } else {
            characterX = 0
        }
    }


    drawCharacter(characterX, characterY)
}, 100)


//zombie attacks and movement
setInterval(()=>{
    if (gamePaused) return
    

    allZombieStats.forEach(zombieStats => {

        if (!inHouse) {
            if (Math.abs(characterX - zombieStats.x) < 10 && Math.abs(characterY - zombieStats.y) < 10) {
                handleEnemyTouchingPlayer("zombie")
                if (playerHealth < 1) {
                    canvas.style.backgroundColor = "burlywood"
                    inHouse = true
                    characterH = 32.8
                    characterW = 20
                    characterX = 60
                    characterY = 30
                    playerHealth = maxPlayerHealth
                    
                }
            } else {
                if (Math.abs(characterX - zombieStats.x) < 100 && Math.abs(characterY - zombieStats.y) < 100) {
                    if (characterX - zombieStats.x > 0) {
                        zombieStats.x += characterW / 2
                    } else {
                        zombieStats.x -= characterW / 2
                    }

                    if (characterY - zombieStats.y > 0) {
                        zombieStats.y += characterH / 2
                    } else {
                        zombieStats.y -= characterH / 2
                    }
                }
            }
        }
})
    allSkeletonStats.forEach(skeletonStats => {

        if (!inHouse) {
            if (Math.abs(characterX - skeletonStats.x) < 10 && Math.abs(characterY - skeletonStats.y) < 10) {
                handleEnemyTouchingPlayer("skeleton")
                if (playerHealth < 1) {
                    canvas.style.backgroundColor = "burlywood"
                    inHouse = true
                    characterH = 32.8
                    characterW = 20
                    characterX = 60
                    characterY = 30
                    playerHealth = maxPlayerHealth
                    
                }
            } else {
                if (Math.abs(characterX - skeletonStats.x) < 100 && Math.abs(characterY - skeletonStats.y) < 100) {
                    if (characterX - skeletonStats.x > 0) {
                        skeletonStats.x += characterW / 2
                    } else {
                        skeletonStats.x -= characterW / 2
                    }

                    if (characterY - skeletonStats.y > 0) {
                        skeletonStats.y += characterH / 2
                    } else {
                        skeletonStats.y -= characterH / 2
                    }
                }
            }
        }
    })

}, 200)

//strength skill upgrade
upgradeStrengthButton.addEventListener("click", ()=>{
    if(skillPoints>0) {
        strength+=1
        strengthPointDisplay.innerText = `STR: ${strength}`
        skillPoints-=1
    }
    else {
        upgradeStrengthButton.style.backgroundColor = "red"
        setTimeout(()=>{
            upgradeStrengthButton.style.backgroundColor = "green"
        }, 100)
    }
})

//vitality skill upgrade
upgradeVitalityButton.addEventListener("click", ()=>{
    if(skillPoints>0) {
        vitality+=1
        vitalityPointDisplay.innerText = `VIT: ${vitality}`
        maxPlayerHealth*=1.2
        playerHealth*=1.2
        skillPoints-=1
    }
    else {
        upgradeVitalityButton.style.backgroundColor = "red"
        setTimeout(()=>{
            upgradeVitalityButton.style.backgroundColor = "green"
        }, 100)
    }
})

resumeButton.addEventListener("click", ()=>{
    gamePaused = !gamePaused
    pauseMenu.classList.add("hidden")
})

//character movement
document.body.addEventListener("keydown", (e)=>{

    //pausing and opening the stats window
    if (e.key === "Escape") {
        gamePaused = !gamePaused
        if (gamePaused) {
            pauseMenu.style.display = "none"
        }
        else {
            pauseMenu.style.display = "block"
        }
    }
    if (e.key === "r") {
        if (gamePaused) {
            statsScreen.style.display = "none"
        }
        else {
            statsScreen.style.display = "block"
        }
        gamePaused = !gamePaused
    }

    // opening the inventory
    if (e.key === "e") {
        if (gamePaused) {
            inventoryScreen.style.display = "none"
            inventoryScreen.innerHTML=""
        }
        else {
            inventoryScreen.style.display = "flex"
            addWeapons()

        }
        gamePaused = !gamePaused
    }

    // attacking
    if(e.key == "f") {
        attack()
    }
})

let keysPressed = {};

document.addEventListener('keydown', (e) => {
    // movement with wasd

    keysPressed[e.key] = true;
    //number 1 rule of programming, if it works, keep it
    if(keysPressed["r"])

    if (gamePaused) return
    let speed = characterW / 2
    console.log(keysPressed)
    if (keysPressed["w"]) {
        characterY -= speed
    }
    if (keysPressed["s"]) {
        characterY += speed
    }
    if (keysPressed["a"]) {
        characterX -= speed
    }
    if (keysPressed["d"]) {
        characterX += speed
    }

});
document.addEventListener("keyup", ()=>{
    keysPressed={}
})
function addWeapons() {
    // clears inventory
    inventoryScreen.innerHTML = ""

    weapons.forEach((weapon, i) => {
        if (weapon.selected) {
            inventoryScreen.innerHTML += `
                <div class="item">
                    <h2>${weapon.displayName}</h2>
                    <h3>Type: Weapon</h3>
                    <p>${weapon.description}</p>
                    <br><br>
                    <p>DMG: ${weapon.damage}</p>
                    <br>
                    <p style="color:lightgreen;font-size:20px;position:absolute">[Equipped]</p>
                </div>
            `
        } else {
            inventoryScreen.innerHTML += `
                <div class="item" data-index="${i}">
                    <h2>${weapon.displayName}</h2>
                    <h3>Type: Weapon</h3>
                    <p>${weapon.description}</p>
                    <br><br>
                    <p>DMG: ${weapon.damage}</p>
                    <br>
                    <button class="equip">Equip</button>
                </div>
            `
        }
    });
    let equipButtons = document.querySelectorAll(".equip")
    equipButtons.forEach(button => {
        button.addEventListener("click", () => {
            let parent = button.closest(".item")
            let weaponIndex = parseInt(parent.dataset.index)

            weapons.forEach((weapon, i) => {
                weapon.selected = (i == weaponIndex)
            })

            addWeapons()
        })
    })
}

function attack() {
    let selectedWeapon = ""
    weapons.forEach(weapon => {
        if(weapon.selected==true) {
            selectedWeapon = weapon
        }
    });
    attacking=true
    console.log(allZombieStats)
    allZombieStats.forEach((zombieStats, i) => {
        if(Math.abs(characterX-zombieStats.x)<20 && Math.abs(characterY-zombieStats.y)<20) {
            zombieStats.health-=selectedWeapon.damage*((strength/10)+1)
            if(zombieStats.health<1 ) {
                handleDrops("zombie")
                xp+=zombieStats.xp
                if(xp>=nextLevelRequirement) {
                    xp=0
                    XPBar.style.backgroundColor = "yellow"
                    setTimeout(()=>{
                        XPBar.style.backgroundColor = "blue"
                        lvl+=1
                        skillPoints+=1
                        lvlDisplay.innerText = `LVL:${lvl}`
                        nextLevelRequirement*=1.5
                        XPBar.style.width = (xp)*(100/nextLevelRequirement) + "%"
                    }, 1000)

                }
                // console.log(xp)
                // console.log(zombieStats.xp)
                XPBar.style.width = (xp)*(100/nextLevelRequirement) + "%"
                let zombieBeforeXAndY = [zombieStats.beforeX, zombieStats.beforeY]
                console.zombieBeforeXAndY
                allZombieStats.splice(i, 1)
                let currentArea = area
                setTimeout(()=>{
                    if(currentArea==area) {
                        insertEnemy("zombie", zombieBeforeXAndY[0], zombieBeforeXAndY[1])
                    }
                }, 4000)
            }
            console.log(zombieStats)
        }
    })


    allSkeletonStats.forEach((skeletonStats, i) => {
        if(Math.abs(characterX-skeletonStats.x)<20 && Math.abs(characterY-skeletonStats.y)<20) {
            skeletonStats.health-=selectedWeapon.damage*((strength/10)+1)
            if(skeletonStats.health<1 ) {
                handleDrops("skeleton")
                xp+=skeletonStats.xp
                if(xp>=nextLevelRequirement) {
                    xp=0
                    XPBar.style.backgroundColor = "yellow"
                    setTimeout(()=>{
                        XPBar.style.backgroundColor = "blue"
                        lvl+=1
                        skillPoints+=1
                        lvlDisplay.innerText = `LVL:${lvl}`
                        nextLevelRequirement*=1.5
                        XPBar.style.width = (xp)*(100/nextLevelRequirement) + "%"
                    }, 1000)

                }
                // console.log(xp)
                // console.log(skeletonStats.xp)
                XPBar.style.width = (xp)*(100/nextLevelRequirement) + "%"
                let skeletonBeforeXAndY = [skeletonStats.beforeX, skeletonStats.beforeY]
                console.skeletonBeforeXAndY
                allSkeletonStats.splice(i, 1)
                let currentArea = area
                setTimeout(()=>{
                    if(currentArea==area) {
                        insertEnemy("skeleton", skeletonBeforeXAndY[0], skeletonBeforeXAndY[1])
                    }
                }, 4000)
            }
            console.log(skeletonStats)
        }
    })

    setTimeout(()=>{
        attacking=false
    }, 200)
}

function handleDrops(enemyName) {
    enemies.forEach(enemy => {
        if (enemy.name === enemyName) {
            enemy.drops.forEach(drop => {
                let roll = Math.random() * 100
                if (roll <= drop.chance) {
                    // Check if the weapon already exists
                    let alreadyOwned = weapons.some(w => w.displayName === drop.name)
                    if (!alreadyOwned) {
                        let weaponData = allWeapons.find(w => w.displayName === drop.name)
                        if (weaponData) {
                            weapons.push({...weaponData})
                            alert(`You found: ${drop.name}!`)
                        }
                    }
                }
            })
        }
    })
}
