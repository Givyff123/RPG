//images and stuff :)
let canvas = document.querySelector("canvas")
let man = document.querySelector("#man")
let house = document.querySelector("#house")
let dullBlade = document.querySelector("#sword")
let cupcake = document.querySelector("#cupcake")
let rubberChicken = document.querySelector("#rubberChicken")
let stickOfJustice = document.querySelector("#stickOfJustice")
let grandpa = document.querySelector("#grandpa")
let toothBrushOfDestiny = document.querySelector("#toothBrush")
let bed = document.querySelector("#bed")
let zombie = document.querySelector("#zombie")
let ghost = document.querySelector("#ghost")
let healthBar = document.querySelector("#filledHealthBar")
let MaxHealthBar = document.querySelector("#emptyHealthBar")
let XPBar = document.querySelector("#filledXPBar")
let lvlDisplay = document.querySelector("#lvl")
let coinDisplay = document.querySelector("#coins")
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
let grandpaShopScreen = document.querySelector("#grandpaShop")
let closeGrandpaShopButton = document.querySelector("#closeGrandpaShopButton")
let grandpaShopItems = document.querySelector("#grandpaShopItems")
let keys = document.querySelector("#keys")
let lightSaber = document.querySelector("#lightsaber")

let selectedWeapon = ""
//wipes data if not current version
let currentVersion = "1";

if (localStorage.getItem("appVersion") !== currentVersion) {
    localStorage.removeItem("grandpaShop")
    localStorage.setItem("appVersion", currentVersion);
}

// the variables
let characterX = 50
let characterY = 50
let characterW = 10
let characterH = 16.8 
let sword = new Audio("./sword.mp3")
let backgroundMusic = new Audio("./music.mp3")
let area = 1
let allZombieStats = []
let allSkeletonStats = []
let allGhostStats = []
let nextLevelRequirement = JSON.parse(localStorage.getItem("nextLvlReq")) || 50
let gamePaused = false
let openedStats = false
let xp = 0
let lvl = JSON.parse(localStorage.getItem("lvl")) || 1
let coins = JSON.parse(localStorage.getItem("coins")) || 0
let strength = JSON.parse(localStorage.getItem("str")) || 0
let vitality = JSON.parse(localStorage.getItem("vit")) || 0
let skillPoints = JSON.parse(localStorage.getItem("skillPoints")) || 0
let maxPlayerHealth = JSON.parse(localStorage.getItem("maxHP")) || 100
let playerHealth = maxPlayerHealth
let attacking = false
let inHouse = false
let speed = characterW / 2



lvlDisplay.innerText = `LVL:  ${lvl}`
strengthPointDisplay.innerText = `STR:  ${strength}`
vitalityPointDisplay.innerText = `VIT:  ${vitality}`

//weapon types
let weapons = JSON.parse(localStorage.getItem("weapons")) || [
    {
        selected:true,
        displayName:"Dull Blade",
        varName: dullBlade,
        damage:1,
        description: `A simple dull blade you took from your grandpas house when he wasn't looking`,
    },

]

let allWeapons = [
    {
        selected:true,
        displayName:"Dull Blade",
        varName: dullBlade,
        damage:1,
        soundEffect:sword,
        description: `A simple dull blade you took from your grandpas house when he wasn't looking, he isn't happy`,
    },
    {
        selected:false,
        displayName:"Zombie Sword",
        varName: dullBlade, 
        damage: 2.25,
        soundEffect:sword,
        description: `Bbbbraaaiiinnzzz`,
    },
    {
        selected: false,
        displayName: "Stick of Justice",
        varName: stickOfJustice,
        damage: 2.5,
        soundEffect:sword,
        description: `The handle of the sword that once bonked Azureus the Fallen into the underworld, Hmmm, I wonder where the blade went...`,
    },
    {
        selected: false,
        displayName: "Toothbrush of Destiny",
        varName: toothBrushOfDestiny,
        damage: 2,
        soundEffect:sword,
        description: `Was originally made to clean teeth, now it cleans up battlefield...`,
    },
    {
        selected: false,
        displayName: "Rubber Chicken",
        varName: rubberChicken, 
        damage: 1.5,
        soundEffect:sword,
        description: `Quack.... wait is quack the correct noice? (im genuinely confused between ducks and chickens)`,
    },
    {
        selected:false,
        displayName:"cupcake",
        varName: cupcake,
        damage:10000000000,
        soundEffect:sword,
        description: `I can really just make this as long as I want to so... Just kidding, I have no idea what to put here`,
    },
    {
        selected:false,
        displayName:"ULTIMATE WEAPON",
        varName: dullBlade,
        damage:1000000,
        soundEffect:sword,
        description:"very bad weapon guys, trust"
    },
    {
        selected:false,
        displayName:"Spirit Saber",
        varName: lightSaber,
        damage:6,
        soundEffect:sword,
        description:"Who you gonna call? GHO- (2007 TV be tweaking)"
    }
]


let grandpaShop = JSON.parse(localStorage.getItem("grandpaShop")) || [
    {
        name:"test",
        cost:100000,
        type:"weapon",
        item:allWeapons[5]
    },
    {
        name:"STICK OF JUSTICE",
        cost:5,
        type:"weapon",
        item:allWeapons[2]
    },
    {
        name:"2ND ROW!!!!",
        cost:0,
        type:"weapon",
        item:allWeapons[1]
    },
    {
        name:"THIS IS ONLY HERE FOR A LIMITED TIME, SO GET IT BEFORE I REMOVE IT FROM THE SHOP",
        cost:0,
        type:"weapon",
        item:allWeapons[6]
    }
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
        coinDrops: 5,
        drops:[
            {
                name:"Rubber Chicken",
                chance:20,
            },
            {
                name:"Toothbrush of Destiny",
                chance:15,
            },
            {
                name:"Zombie Sword",
                chance:10,
            },
            {
                name:"cupcake",
                chance:0.1,
            },
        ]
    }, 
    {
        name:"skeleton",
        varName:skeleton,
        damage: 40,
        hp:10,
        w: 20,
        h: 25,
        xp:20,
        coinDrops:10,
        drops:[
            {
                name:"Stick of Justice",
                chance:5,
            },
            {
                name:"ULTIMATE WEAPON",
                chance:0.1,
            }
        ]
    },
    {
        name:"ghost",
        varName:ghost,
        damage: 40,
        hp:40,
        w: 20,
        h: 25,
        xp:60,
        coinDrops:25,
        drops:[
            {
                name:"Spirit Saber",
                chance:5,
            }
        ]
    }
]



insertEnemy("zombie", 210, 20)
insertEnemy("zombie", 210, 80)
insertEnemy("zombie", 210, 50)

backgroundMusic.play()

setTimeout(()=>{
    keys.style.display = "none"
}, 10000)

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
    // console.log(selectedWeapon)
    let selectedWeapon = findSelectedWeapon()
    ctx.drawImage(selectedWeapon.varName, characterX+characterW*9/10, characterY+characterW*3/20, characterW*7/7, characterW*7/7)
}

//finding the selected weapon
function findSelectedWeapon() {
    let selectedWeapon = ""
    weapons.forEach((weapon) => {
        if(weapon.selected==true) {
            allWeapons.forEach((allWeaponsWeapon, i) => {
                if(allWeaponsWeapon.displayName == weapon.displayName) {
                    selectedWeapon = allWeapons[i]

                }
            });
        }
    });
    return selectedWeapon
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
                    coinDrops:enemy.coinDrops
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
                    coinDrops:enemy.coinDrops
                
                })
            }
        })

    }

    if(selectedEnemy=="ghost") {
        enemies.forEach(enemy => {
            if(enemy.name == selectedEnemy) {
                allGhostStats.push({
                    x:x,
                    y:y,
                    beforeX:x,
                    beforeY:y,
                    health:enemy.hp,
                    xp:enemy.xp,
                    coinDrops:enemy.coinDrops
                
                })
            }
        })

    }

}

// the enemies when entering a new area
function enterNewArea() {
    allZombieStats = []
    allSkeletonStats = []
    allGhostStats = []
    if (area === 1) {
        insertEnemy("zombie", 210, 80)
        insertEnemy("zombie", 210, 20)
    } else if (area == 2 ) {
        insertEnemy("zombie", 180, 60)
        insertEnemy("zombie", 250, 40)
        insertEnemy("zombie", 200, 80)
    } else if (area == 3 ) {
        insertEnemy("skeleton", 180, 60)
        insertEnemy("skeleton", 250, 40)
        insertEnemy("skeleton", 200, 80)
        insertEnemy("skeleton", 140, 100)
    } else if (area == 4) {
        insertEnemy("ghost", 210, 50)
        insertEnemy("ghost", 230, 70)
        insertEnemy("ghost", 230, 30)
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

// lvlDisplay

function drawGrandpa(x, y) {
    ctx.imageSmoothingEnabled=false
    ctx.drawImage(grandpa, x, y, 45, 45)
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

setInterval(()=>{
    backgroundMusic.play()
}, 126000)

// renders the graphics every 1/10 of a second or 100 ms
setInterval(() => {
    localStorage.setItem("weapons", /*JSON.stringify(weapons)*/ JSON.stringify(weapons))
    localStorage.setItem("lvl", JSON.stringify(lvl))
    localStorage.setItem("coins", JSON.stringify(coins))
    localStorage.setItem("str", JSON.stringify(strength))
    localStorage.setItem("vit", JSON.stringify(vitality))
    localStorage.setItem("maxHP", JSON.stringify(maxPlayerHealth))
    localStorage.setItem("grandpaShop", JSON.stringify(grandpaShop))
    localStorage.setItem("skillPoints", JSON.stringify(skillPoints))
    localStorage.setItem("nextLvlReq", JSON.stringify(nextLevelRequirement))
    clearAll()
    healthBar.style.width = (playerHealth/maxPlayerHealth)*100 + "%"
    skillPointDisplay.innerText = `Skill Points: ${skillPoints}`
    coinDisplay.innerText = `C$: ${coins}`

    if (inHouse === false) {
        allZombieStats.forEach(zombieStats => {
            makeEnemy("zombie", zombieStats.x, zombieStats.y)
        })
        allSkeletonStats.forEach(skeletonStats => {
            makeEnemy("skeleton", skeletonStats.x, skeletonStats.y)
        })
        allGhostStats.forEach(ghostStats => {
            makeEnemy("ghost", ghostStats.x, ghostStats.y)
        })
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
            enterNewArea()
        } else {
            characterX = 0
            
        }
        
    }
        if (area === 1) {
            canvas.style.backgroundColor = "green"
            drawHouse(100, 50)
            handleCharacterTouchingHouse()
        } else if (area === 2 ) {
            canvas.style.backgroundColor = "darkgreen"
        } else if (area === 3 ) {
            canvas.style.backgroundColor = "darkslateblue"
        }
    } 
    else {
        if(playerHealth<maxPlayerHealth) {
            playerHealth+=maxPlayerHealth/500
        }
        area=1
        enterNewArea()
        drawRect(122, 146, 50, 10)
        handleCharacterExitingHouse()
        ctx.drawImage(bed, 40, 20, 75, 75)
        drawGrandpa(205, 25)
        if(Math.abs(characterX - 205) < 20 && Math.abs(characterY - 25) < 20 && grandpaShopScreen.style.display == "none" || Math.abs(characterX - 205) < 20 && Math.abs(characterY - 25) < 20 && grandpaShopScreen.style.display == "") {
            openGrandpaShop()
        }
    }

    if (attacking) {
        attackAnimation()
    }


    drawCharacter(characterX, characterY)
}, 100)

document.addEventListener("keydown", (e)=>{

            //pausing and opening the stats window
        
            if (e.key=="Escape") {
            
                if (gamePaused) {
                    pauseMenu.style.display = "none"
                }
                else {
                    pauseMenu.style.display = "block"
                }
                gamePaused = !gamePaused
    
            }
            if (e.key=="r") {
                
                if (gamePaused) {
                    statsScreen.style.display = "none"
                }
                else {
                    statsScreen.style.display = "block"
                }
                gamePaused = !gamePaused
            }
    
            // opening the inventory
            if (e.key=="e") {
                
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
            if (gamePaused==false) {
                if(e.key=="f" || e.key=="F") {
                    attack()
                }
            }
    
})
// key presses



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
                        zombieStats.x += characterW / 3
                    } else {
                        zombieStats.x -= characterW / 3
                    }

                    if (characterY - zombieStats.y > 0) {
                        zombieStats.y += characterH / 3
                    } else {
                        zombieStats.y -= characterH / 3
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

    allGhostStats.forEach(ghostStats => {

        if (!inHouse) {
            if (Math.abs(characterX - ghostStats.x) < 10 && Math.abs(characterY - ghostStats.y) < 10) {
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
                if (Math.abs(characterX - ghostStats.x) < 100 && Math.abs(characterY - ghostStats.y) < 100) {
                    if (characterX - ghostStats.x > 0) {
                        ghostStats.x += characterW / 1.5
                    } else {
                        ghostStats.x -= characterW / 1.5
                    }

                    if (characterY - ghostStats.y > 0) {
                        ghostStats.y += characterH / 1.5
                    } else {
                        ghostStats.y -= characterH / 1.5
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
    pauseMenu.style.display = "none"
    gamePaused = !gamePaused
})



document.addEventListener('keydown', (e) => {
    e.preventDefault()
    if(keysPressed==undefined) {
        let keysPressed = []
    }
    else {
        keysPressed[e.key] = true;
    }
    if (gamePaused==false) {
        if (keysPressed["w"] || keysPressed["W"] || keysPressed["ArrowUp"]) {
            characterY -= speed
        }
        if (keysPressed["s"] || keysPressed["S"] || keysPressed["ArrowDown"]) {
            characterY += speed
        }
        if (keysPressed["a"] || keysPressed["A"] || keysPressed["ArrowLeft"]) {
            characterX -= speed
        }
        if (keysPressed["d"] || keysPressed["D"] || keysPressed["ArrowRight"]) {
            characterX += speed
        }
    
    }


});

//clearing your keys pressed once you let go so that you cant technically press "w" 100 times at once
document.addEventListener("keyup", ()=>{
    keysPressed={}
})

//displaying the weapons in the inventory
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

// the damaging and logic part of attacking
function attack() {
    if(attacking==false) {

        let selectedWeapon = ""
        weapons.forEach(weapon => {
            if(weapon.selected==true) {
                selectedWeapon = weapon
            }
        });
        attacking=true
        sword.currentTime=0
        sword.play()
        
        allZombieStats.forEach((zombieStats, i) => {
            if(Math.abs(characterX-zombieStats.x)<20 && Math.abs(characterY-zombieStats.y)<20) {
                zombieStats.health-=selectedWeapon.damage*((strength/5)+1)
                if(zombieStats.health<1 ) {
                    handleDrops("zombie")
                    xp+=zombieStats.xp
                    coins+=zombieStats.coinDrops
                    if(xp>=nextLevelRequirement) {
                        XPBar.style.backgroundColor = "yellow"
                        setTimeout(()=>{
                            XPBar.style.backgroundColor = "blue"
                            lvl+=1
                            skillPoints+=1
                            lvlDisplay.innerText = `LVL:${lvl}`
                            xp=0
                            nextLevelRequirement*=1.5
                            XPBar.style.width = (xp)*(100/nextLevelRequirement) + "%"
                        }, 1000)
    
                    }
                    // )
                    // mbieStats.xp)
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
            }
        })
    
    
        allSkeletonStats.forEach((skeletonStats, i) => {
            if(Math.abs(characterX-skeletonStats.x)<20 && Math.abs(characterY-skeletonStats.y)<20) {
                skeletonStats.health-=selectedWeapon.damage*((strength/5)+1)
                if(skeletonStats.health<1 ) {
                    handleDrops("skeleton")
                    xp+=skeletonStats.xp
                    coins+=skeletonStats.coinDrops
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
            }
        })


        allGhostStats.forEach((ghostStats, i) => {
            if(Math.abs(characterX-ghostStats.x)<20 && Math.abs(characterY-ghostStats.y)<20) {
                ghostStats.health-=selectedWeapon.damage*((strength/5)+1)
                if(ghostStats.health<1 ) {
                    handleDrops("ghost")
                    xp+=ghostStats.xp
                    coins+=ghostStats.coinDrops
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

                    XPBar.style.width = (xp)*(100/nextLevelRequirement) + "%"
                    let ghostBeforeXAndY = [ghostStats.beforeX, ghostStats.beforeY]
                    console.ghostBeforeXAndY
                    allGhostStats.splice(i, 1)
                    let currentArea = area
                    setTimeout(()=>{
                        if(currentArea==area) {
                            insertEnemy("ghost", ghostBeforeXAndY[0], ghostBeforeXAndY[1])
                        }
                    }, 4000)
                }
            }
        })
    
        setTimeout(()=>{
            attacking=false
        }, 200)
    }
    

}

function showGameAlert(message) {
    const alertBox = document.getElementById('gameAlert');
    alertBox.textContent = message;
    alertBox.style.display = 'block';

    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

function openGrandpaShop() {
    grandpaShopScreen.style.display = "flex"

    grandpaShop.forEach(shopItem => {
        console.log(shopItem.item)
        grandpaShopItems.innerHTML+=`
        <div class="grandpaShopItem">
            <h3>${shopItem.name}<h3>
            <p>${shopItem.item.description}<p>
            <h4>Cost: ${shopItem.cost}</h4>
            <button class="grandpaShopButton">Buy</button>
        </div>
        `
    })
    let grandpaShopButtons = document.querySelectorAll(".grandpaShopButton")
    grandpaShopButtons.forEach((shopButton, i)=>{
        shopButton.addEventListener("click", ()=>{
            if(coins>=grandpaShop[i].cost) {
                coins-=grandpaShop[i].cost
                if(grandpaShop[i].type=="weapon") {
                    weapons.push(grandpaShop[i].item)
                    grandpaShop.splice(i, 1)
                    closeGrandpaShop()
                    openGrandpaShop()
                }
            }

        })
    })
}


function closeGrandpaShop() {
    grandpaShopScreen.style.display = "none"
    grandpaShopItems.innerHTML = ""
    characterX=190
    characterY=45
}

closeGrandpaShopButton.addEventListener("click", closeGrandpaShop)

// handling the drops from enemies
function handleDrops(enemyName) {
    enemies.forEach(enemy => {
        if (enemy.name === enemyName) {
            enemy.drops.forEach(drop => {
                let roll = Math.random() * 100
                console.log(roll)
                if (roll <= drop.chance) {
                    let alreadyOwned = weapons.some(w => w.displayName === drop.name)
                    if (!alreadyOwned) {
                        let weaponData = allWeapons.find(w => w.displayName === drop.name)
                        if (weaponData) {
                            weapons.push({...weaponData})
                            showGameAlert(`You found: ${drop.name}!`)
                        }
                    }
                }
            })
        }
    })
}


// weapon